import { createClient } from '@/lib/supabase/server'
import { Article } from '@/lib/data'

// Map a database row to the frontend Article interface
export function mapDatabaseArticleToFrontend(row: Record<string, any>): Article {
  // Generate a rough reading time based on word count of summary + content
  const wordCount = ((row.content || '') + (row.summary || '')).split(' ').length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  // Relative timestamp calculation
  const publishedAt = new Date(row.published_at || row.created_at)
  const now = new Date()
  const diffHours = Math.floor((now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60))
  let timestamp = 'Just now'
  if (diffHours > 24) {
    timestamp = `${Math.floor(diffHours / 24)}d ago`
  } else if (diffHours > 0) {
    timestamp = `${diffHours}h ago`
  } else {
    const diffMins = Math.floor((now.getTime() - publishedAt.getTime()) / (1000 * 60))
    if (diffMins > 0) timestamp = `${diffMins}m ago`
  }

  // Fallback image mechanism using the local logo
  const fallbackImage = '/Logo.png'

  return {
    id: row.id,
    headline: row.title,
    summary: row.summary || 'Click to read full article...',
    category: row.categories?.name || 'News',
    timestamp: timestamp,
    author: row.authors?.name || row.profiles?.full_name || 'BBN Staff',
    readingTime: `${readingTime} min read`,
    image: row.featured_image || fallbackImage,
    url: `/article/${row.slug}`,
  }
}

export async function getLatestArticles(limit: number = 10, categorySlug?: string, offset: number = 0): Promise<Article[]> {
  const supabase = await createClient()

  // Use an inner join for categories if we are filtering by it,
  // otherwise use a normal left join.
  const categoryJoin = categorySlug ? 'categories!inner(name, slug)' : 'categories(name, slug)';

  let query = supabase
    .from('articles')
    .select(`
      *,
      ${categoryJoin},
      authors(name),
      profiles!articles_created_by_fkey(full_name)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (categorySlug) {
    // Because of !inner, this safely filters the top-level articles table
    query = query.eq('categories.slug', categorySlug)
  }

  // Apply range AFTER filtering
  query = query.range(offset, offset + limit - 1)

  const { data, error } = await query

  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }

  // Filter out nulls from inner joins if category was specified
  let validData = data
  if (categorySlug) {
      validData = data.filter(d => d.categories !== null)
  }

  return validData.map(mapDatabaseArticleToFrontend)
}

export async function searchArticles(searchQuery: string, limit: number = 20): Promise<Article[]> {
  const supabase = await createClient()

  let query = supabase
    .from('articles')
    .select(`
      *,
      categories(name, slug),
      authors(name),
      profiles!articles_created_by_fkey(full_name)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (searchQuery) {
    // Simple ilike search on title and summary
    query = query.or(`title.ilike.%${searchQuery}%,summary.ilike.%${searchQuery}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error searching articles:', error)
    return []
  }

  return data.map(mapDatabaseArticleToFrontend)
}

export async function getArticleBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories(name, slug),
      authors(name, avatar_url, bio),
      profiles!articles_created_by_fkey(full_name, avatar_url),
      article_tags(tags(name, slug))
    `)
    .eq('slug', slug)
    .single()

  if (error || !data) {
    console.error(`Article not found: ${slug}`, error)
    return null
  }

  return data
}

export async function getAdjacentArticles(publishedAt: string) {
  const supabase = await createClient()
  
  // Previous article (older)
  const { data: prevData } = await supabase
    .from('articles')
    .select('title, slug')
    .eq('status', 'published')
    .lt('published_at', publishedAt)
    .order('published_at', { ascending: false })
    .limit(1)
    .single()
    
  // Next article (newer)
  const { data: nextData } = await supabase
    .from('articles')
    .select('title, slug')
    .eq('status', 'published')
    .gt('published_at', publishedAt)
    .order('published_at', { ascending: true })
    .limit(1)
    .single()

  return {
    prev: prevData ? { title: prevData.title, slug: prevData.slug } : null,
    next: nextData ? { title: nextData.title, slug: nextData.slug } : null
  }
}

export const getArticles = () => getLatestArticles(20)

export async function getAdminArticles() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories(name, slug),
      authors(name)
    `)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching admin articles:', error)
    return []
  }
  return data
}

export async function getAdminStats() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('status')
  
  if (error) return { published: 0, drafts: 0, scheduled: 0, total: 0 }
  
  return {
    total: data.length,
    published: data.filter(d => d.status === 'published').length,
    drafts: data.filter(d => d.status === 'draft').length,
    scheduled: data.filter(d => d.status === 'scheduled').length
  }
}

export async function deleteArticle(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting article:', error)
    throw error
  }
}
