"use client"
import { useState, useEffect } from "react"
import { InfoLayout } from "@/components/layout/info-layout"
import { Copy, Check, Rss } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function RssFeedsPage() {
  const [categories, setCategories] = useState<{name: string, slug: string}[]>([])
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient()
      const { data } = await supabase.from('categories').select('name, slug').order('name')
      if (data) setCategories(data)
    }
    fetchCategories()
  }, [])

  const copyToClipboard = (slug: string) => {
    const url = `${window.location.origin}/api/feed/${slug}`
    navigator.clipboard.writeText(url)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 2000)
  }

  return (
    <InfoLayout title="RSS Feeds">
      <p className="lead text-xl mb-8">
        Subscribe to BBN NEWS via RSS to get real-time updates delivered straight to your favorite news reader.
      </p>

      <h2>What is RSS?</h2>
      <p>
        RSS (Really Simple Syndication) is a web standard that allows you to easily subscribe to news updates. Instead of visiting multiple websites to see if there is new content, an RSS reader aggregates all your favorite sites in one place, automatically fetching the latest articles as soon as they are published.
      </p>

      <h2>How to Subscribe</h2>
      <ol>
        <li>Download an RSS reader app (like Feedly, Inoreader, or NewsBlur).</li>
        <li>Find the category you want to follow below.</li>
        <li>Click the "Copy URL" button next to it.</li>
        <li>Paste the URL into your RSS reader to subscribe.</li>
      </ol>

      <h2 className="mt-12 mb-6 flex items-center gap-2">
        <Rss className="text-orange-500 w-6 h-6" /> Available Feeds
      </h2>
      
      <div className="not-prose grid gap-4 max-w-3xl">
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
          <div>
            <h3 className="font-bold text-lg">Top Stories (All News)</h3>
            <p className="text-sm text-muted-foreground">The latest breaking news across all categories.</p>
          </div>
          <button 
            onClick={() => copyToClipboard('all')}
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md font-semibold transition-colors"
          >
            {copiedSlug === 'all' ? <><Check className="w-4 h-4"/> Copied!</> : <><Copy className="w-4 h-4"/> Copy URL</>}
          </button>
        </div>

        {categories.map((cat) => (
          <div key={cat.slug} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <div className="mb-4 sm:mb-0">
              <h3 className="font-bold text-lg">{cat.name} News</h3>
              <p className="text-sm text-muted-foreground">Latest articles in {cat.name.toLowerCase()}.</p>
            </div>
            <button 
              onClick={() => copyToClipboard(cat.slug)}
              className="flex items-center justify-center gap-2 border hover:bg-muted px-4 py-2 rounded-md font-medium transition-colors"
            >
              {copiedSlug === cat.slug ? <><Check className="w-4 h-4 text-green-500"/> Copied!</> : <><Copy className="w-4 h-4 text-muted-foreground"/> Copy URL</>}
            </button>
          </div>
        ))}
      </div>
    </InfoLayout>
  )
}
