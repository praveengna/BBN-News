import Parser from 'rss-parser'
import slugify from 'slugify'
import { createClient } from '@supabase/supabase-js'
import * as cheerio from 'cheerio'
import { processNewsItem } from '../ai/news-processor'
import crypto from 'crypto'
import stringSimilarity from 'string-similarity'

// Max articles to insert per feed per cron call — keeps us under the 10s serverless limit
const MAX_ARTICLES_PER_FEED = 5

function getCanonicalUrl(url: string) {
  try {
    const urlObj = new URL(url)
    // Remove common tracking params
    const paramsToRemove = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'source']
    for (const param of paramsToRemove) {
      urlObj.searchParams.delete(param)
    }
    return urlObj.toString()
  } catch {
    return url
  }
}

function generateHash(title: string, url: string) {
  return crypto.createHash('sha256').update(`${title.toLowerCase().trim()}|${url}`).digest('hex')
}

export async function runRSSAggregation() {
  console.log('Starting RSS Aggregation (single-feed round-robin)...')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials for RSS engine')
    return { error: 'Missing Supabase credentials' }
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const parser = new Parser({
    customFields: {
      item: [
        ['media:content', 'mediaContent'],
        ['media:thumbnail', 'mediaThumbnail']
      ]
    }
  })

  // Round-robin: pick the single active feed that was fetched least recently
  const { data: feeds, error: feedsError } = await supabase
    .from('rss_feeds')
    .select('*')
    .eq('is_active', true)
    .order('last_fetched_at', { ascending: true, nullsFirst: true })
    .limit(1)

  if (feedsError || !feeds || feeds.length === 0) {
    console.error('No active RSS feeds found:', feedsError)
    return { error: 'No active RSS feeds' }
  }

  const feed = feeds[0]
  console.log(`Processing feed: ${feed.name}`)

  // Pre-fetch recent 200 article titles for duplicate check (reduced for speed)
  const { data: recentArticles } = await supabase
    .from('articles')
    .select('title')
    .order('created_at', { ascending: false })
    .limit(200)

  const recentTitles = recentArticles?.map((a: any) => a.title) || []

  // Process this single feed
  const result = await processFeed(supabase, parser, feed, recentTitles)

  // Run cleanup every call (it's fast — just a DB update)
  await cleanUpOldArticles(supabase)

  console.log(`RSS Aggregation complete. Feed: ${feed.name}, Processed: ${result.processed}, Added: ${result.added}`)
  return { success: true, feed: feed.name, processed: result.processed, added: result.added }
}

async function processFeed(supabase: any, parser: any, feed: any, recentTitles: string[]) {
  let itemsProcessed = 0
  let itemsAdded = 0
  let status = 'success'
  let errorMessage = null
  const feedStartTime = Date.now()

  try {
      console.log(`Fetching feed: ${feed.name} (${feed.url})`)
      const parsedFeed = await parser.parseURL(feed.url)

      for (const item of parsedFeed.items) {
        // Stop if we've already added enough articles for this feed this run
        if (itemsAdded >= MAX_ARTICLES_PER_FEED) break
        // Stop if this feed has taken more than 7 seconds already
        if (Date.now() - feedStartTime > 7000) {
          console.log(`[Cron] Feed ${feed.name} time budget exceeded, moving on.`)
          break
        }
        itemsProcessed++
        
        if (!item.title || !item.link) continue

        const canonicalUrl = getCanonicalUrl(item.link)
        const guid = item.guid || (item as any).id || canonicalUrl
        const hash = generateHash(item.title, canonicalUrl)

        // 1. Check GUID or URL
        const { data: existingExact } = await supabase
          .from('articles')
          .select('id')
          .or(`guid.eq.${guid},canonical_url.eq.${canonicalUrl},source_url.eq.${item.link}`)
          .limit(1)

        if (existingExact && existingExact.length > 0) continue

        // 2. Similarity Check
        if (recentTitles.length > 0) {
          const match = stringSimilarity.findBestMatch(item.title, recentTitles)
          if (match.bestMatch.rating >= 0.92) {
            console.log(`Skipping duplicate (similarity ${(match.bestMatch.rating*100).toFixed(1)}%): ${item.title}`)
            continue
          }
        }

        console.log(`Processing new article: ${item.title}`)

        const rawContent = item.content || item.contentSnippet || ''
        
        // Find best image
        let imageUrl = null
        if (item.enclosure?.url && item.enclosure.type?.startsWith('image/')) {
          imageUrl = item.enclosure.url
        } else if (item.mediaContent?.$?.url) {
          imageUrl = item.mediaContent.$.url
        } else if (item.mediaThumbnail?.$?.url) {
          imageUrl = item.mediaThumbnail.$.url
        } else if (rawContent) {
          const $ = cheerio.load(rawContent)
          const firstImg = $('img').first().attr('src')
          if (firstImg) {
            imageUrl = firstImg
          }
        }

        const $text = cheerio.load(rawContent)
        const plainTextContent = $text.text().trim() || item.contentSnippet || ''

        // Location Tagging Logic
        let assignedCountry = feed.country || 'India'
        let assignedState = feed.state || null
        let assignedDistrict = feed.district || null

        const fullText = `${item.title} ${plainTextContent}`.toLowerCase()
        
        const gunaKeywords = ['guna', 'गुना', 'guna district', 'raghogarh', 'aron', 'bamori', 'chachaura']
        const mpKeywords = ['madhya pradesh', 'mp', 'bhopal', 'indore', 'gwalior', 'jabalpur', 'ujjain', 'rewa', 'satna', 'ratlam', 'dewas', 'vidisha', 'sagar', 'shivpuri']

        if (gunaKeywords.some(kw => fullText.includes(kw))) {
          assignedCountry = 'India'
          assignedState = 'Madhya Pradesh'
          assignedDistrict = 'Guna'
        } else if (mpKeywords.some(kw => fullText.includes(kw))) {
          assignedCountry = 'India'
          assignedState = 'Madhya Pradesh'
        }

        // AI Processing (BYPASSED for initial speed)
        let aiResult: { summary?: string; seo_title?: string; seo_description?: string; category_slug?: string; tags?: string[] } | null = null
        // if (plainTextContent.length > 50) {
        //   aiResult = await processNewsItem(item.title, plainTextContent)
        // }

        // Download and host Image — SKIPPED to stay within serverless time limits.
        // We use the original source image URL directly instead.
        const hostedImageUrl = imageUrl

        const rawSlug = slugify(item.title, { lower: true, strict: true }).substring(0, 80)
        const slug = `${rawSlug}-${Math.random().toString(36).substring(2, 8)}`

        let categoryId = feed.default_category_id
        if ((aiResult as any)?.category_slug) {
          const { data: category } = await supabase
            .from('categories')
            .select('id')
            .eq('slug', (aiResult as any).category_slug)
            .single()
          
          if (category) {
            categoryId = category.id
          }
        }

        // 5. Insert Article
        const { data: articleData, error: insertError } = await supabase
          .from('articles')
          .insert({
            title: item.title,
            slug: slug,
            summary: (aiResult as any)?.summary || item.contentSnippet || plainTextContent.substring(0, 200) + '...',
            content: rawContent || plainTextContent, 
            featured_image: hostedImageUrl || imageUrl, // fallback to raw image url if download fails
            category_id: categoryId,
            status: 'published',
            seo_title: (aiResult as any)?.seo_title || item.title,
            seo_description: (aiResult as any)?.seo_description || item.contentSnippet?.substring(0, 150) || plainTextContent.substring(0, 150),
            published_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
            is_auto_generated: true,
            source_url: item.link,
            guid: guid,
            canonical_url: canonicalUrl,
            country: assignedCountry,
            state: assignedState,
            district: assignedDistrict
          })
          .select()
          .single()

        if (insertError) {
          console.error(`Failed to insert article: ${item.title}`, insertError)
          continue
        }

        itemsAdded++
        recentTitles.push(item.title) // Add to in-memory check for next iterations

        if (articleData && (aiResult as any)?.tags && (aiResult as any).tags.length > 0) {
          for (const tagName of (aiResult as any).tags) {
            const tagSlug = slugify(tagName, { lower: true, strict: true })
            const { data: tagData } = await supabase
              .from('tags')
              .upsert({ name: tagName, slug: tagSlug }, { onConflict: 'slug' })
              .select()
              .single()

            if (tagData) {
              const { error: tagInsertError } = await supabase
                .from('article_tags')
                .insert({ article_id: articleData.id, tag_id: tagData.id })
              
              if (tagInsertError && tagInsertError.code !== '23505') {
                console.error('Failed to link tag', tagInsertError)
              }
            }
          }
        }
      }

      await supabase
        .from('rss_feeds')
        .update({ 
          last_fetched_at: new Date().toISOString(),
          last_successful_fetch: new Date().toISOString(),
          error_count: 0,
          status: 'active'
        })
        .eq('id', feed.id)

    } catch (error: unknown) {
      console.error(`Feed failed: ${feed.name}`, error)
      status = 'error'
      errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      // Increment error count
      const { error: rpcError } = await supabase.rpc('increment_rss_error', { feed_id: feed.id })
      
      if (rpcError) {
        // Fallback if RPC doesn't exist
        await supabase.from('rss_feeds').update({ 
          error_count: (feed.error_count || 0) + 1,
          status: 'error'
        }).eq('id', feed.id)
      }
    }

    await supabase
      .from('rss_logs')
      .insert({
        feed_id: feed.id,
        status,
        items_processed: itemsProcessed,
        items_added: itemsAdded,
        error_message: errorMessage
      })

  return { processed: itemsProcessed, added: itemsAdded }
}

async function cleanUpOldArticles(supabase: any) {
  console.log('Running automatic RSS retention cleanup...')

  try {
    const maxDays = parseInt(process.env.RSS_RETENTION_DAYS || '30', 10)
    const maxArticles = parseInt(process.env.RSS_MAX_TOTAL_ARTICLES || '10000', 10)

    // 1. Time-Based Retention: Archive articles older than X days
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - maxDays)
    
    console.log(`Archiving auto-generated articles older than ${maxDays} days (${cutoffDate.toISOString()})...`)
    const { error: timeError } = await supabase
      .from('articles')
      .update({ status: 'archived' })
      .eq('is_auto_generated', true)
      .eq('status', 'published')
      .lt('published_at', cutoffDate.toISOString())

    if (timeError) console.error('Error during time-based cleanup:', timeError)

    // 2. Global Limit Retention: Keep only the latest N articles
    console.log(`Enforcing global limit of ${maxArticles} auto-generated articles...`)
    
    // We fetch the Nth article's published_at to use as a cutoff
    const { data: nthArticle } = await supabase
      .from('articles')
      .select('published_at')
      .eq('is_auto_generated', true)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(maxArticles - 1, maxArticles - 1)
      .single()

    if (nthArticle?.published_at) {
      console.log(`Limit reached. Archiving articles older than ${nthArticle.published_at}...`)
      const { error: limitError } = await supabase
        .from('articles')
        .update({ status: 'archived' })
        .eq('is_auto_generated', true)
        .eq('status', 'published')
        .lt('published_at', nthArticle.published_at)

      if (limitError) console.error('Error during limit-based cleanup:', limitError)
    } else {
      console.log('Total articles are well within the global limit.')
    }
  } catch (error) {
    console.error('Failed to run RSS cleanup:', error)
  }
}
