import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createClient()

  // 1. Fetch category info
  let categoryName = 'All News'
  
  let query = supabase
    .from('articles')
    .select(`
      id, title, slug, summary, published_at,
      categories!inner(name, slug)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(25)

  if (slug !== 'all') {
    const { data: catData } = await supabase.from('categories').select('name').eq('slug', slug).single()
    if (!catData) {
      return new NextResponse('Category not found', { status: 404 })
    }
    categoryName = catData.name
    query = query.eq('categories.slug', slug)
  }

  const { data: articles } = await query

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bbnnews.com'
  const feedUrl = `${siteUrl}/api/feed/${slug}`

  // 2. Generate XML
  const items = (articles || []).map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/article/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/article/${article.slug}</guid>
      <pubDate>${new Date(article.published_at || new Date()).toUTCString()}</pubDate>
      <description><![CDATA[${article.summary || ''}]]></description>
    </item>
  `).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BBN NEWS - ${categoryName}</title>
    <link>${siteUrl}</link>
    <description>Latest ${categoryName} news from BBN NEWS</description>
    <language>en-us</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 's-maxage=600, stale-while-revalidate=1200'
    }
  })
}
