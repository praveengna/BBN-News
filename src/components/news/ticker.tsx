"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface TickerArticle {
  id: string
  title: string
  slug: string
  published_at: string
  category_name: string
  source: string
}

function getRelativeTime(dateString: string) {
  const publishedAt = new Date(dateString)
  const now = new Date()
  const diffHours = Math.floor((now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60))
  if (diffHours > 24) return `${Math.floor(diffHours / 24)}d ago`
  if (diffHours > 0) return `${diffHours}h ago`
  const diffMins = Math.floor((now.getTime() - publishedAt.getTime()) / (1000 * 60))
  return diffMins > 0 ? `${diffMins}m ago` : 'Just now'
}

function getSourceDomain(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return 'BBN NEWS'
  }
}

export function Ticker() {
  const [articles, setArticles] = useState<TickerArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLiveNews = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('articles')
        .select(`
          id, title, slug, published_at, source_url,
          categories(name)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(10)

      if (!error && data) {
        setArticles(data.map(a => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          published_at: a.published_at,
          category_name: (a.categories as any)?.name || (Array.isArray(a.categories) ? (a.categories as any[])[0]?.name : null) || 'News',
          source: a.source_url ? getSourceDomain(a.source_url) : 'BBN NEWS'
        })))
      }
      setLoading(false)
    }

    // Initial fetch
    fetchLiveNews()

    // Poll every 1 minute (60,000 ms) to capture new RSS imports
    const intervalId = setInterval(fetchLiveNews, 60000)
    return () => clearInterval(intervalId)
  }, [])

  if (loading) return <div className="w-full bg-black h-12 border-b-2 border-primary" />

  return (
    <div className="w-full bg-black text-white py-2 overflow-hidden border-b-2 border-primary relative flex items-center h-12">
      <div className="absolute left-0 top-0 bottom-0 z-10 bg-black flex items-center px-4 font-bold font-heading tracking-wider gap-3 shrink-0 shadow-[10px_0_15px_-5px_rgba(0,0,0,1)]">
        <span className="text-primary flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
          LIVE NEWS
        </span>
        <span className="text-white/30 px-2">|</span>
      </div>

      <div className="ml-40 md:ml-48 flex-1 overflow-hidden relative flex group h-full items-center">
        {articles.length === 0 ? (
          <span className="text-sm font-medium text-white/50 pl-8">No live news available.</span>
        ) : (
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] min-w-max">
            {/* Double the array for seamless infinite loop */}
            {[...articles, ...articles].map((article, i) => {
              // Consider articles less than 3 hours old as "Breaking" for the ticker
              const diffHours = (new Date().getTime() - new Date(article.published_at).getTime()) / (1000 * 60 * 60)
              const isBreaking = diffHours < 3

              return (
                <div key={`${article.id}-${i}`} className="flex items-center mx-8">
                  <Link href={`/article/${article.slug}`} className="flex items-center hover:text-primary transition-colors group/link">
                    {isBreaking && (
                      <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mr-3 shrink-0">
                        NEW
                      </span>
                    )}
                    <span className="text-sm font-medium font-heading">
                      {article.title}
                    </span>
                  </Link>
                  <div className="flex items-center gap-2 ml-4 text-[10px] font-bold uppercase tracking-wider text-white/50 shrink-0">
                    <span className="text-primary/80">{article.category_name}</span>
                    <span>•</span>
                    <span>{getRelativeTime(article.published_at)}</span>
                    <span>•</span>
                    <span>{article.source}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      
      <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />
    </div>
  )
}
