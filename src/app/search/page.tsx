import { Search, Filter, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { searchArticles } from "@/lib/api/articles"
import Link from "next/link"

function HighlightMatch({ text, query }: { text: string, query: string }) {
  if (!query) return <>{text}</>
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/50 text-inherit rounded-sm px-1">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : ""

  const articles = await searchArticles(query)

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      
      {/* Search Header */}
      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl font-bold mb-4 font-heading">Search BBN News</h1>
        <form className="flex gap-2" action="/search" method="GET">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input 
              name="q"
              defaultValue={query} 
              className="pl-10 h-12 text-lg bg-muted/50 border-zinc-200 dark:border-zinc-800" 
              placeholder="Search for articles..." 
            />
          </div>
          <Button type="submit" size="lg" className="h-12 px-8">Search</Button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm border-b pb-2">
            <Filter className="w-4 h-4" /> Filters
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Category</h3>
            <div className="flex flex-col gap-2">
              {['All', 'Politics', 'Business', 'Technology', 'Sports', 'Crime'].map(cat => (
                <label key={cat} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                  <input type="checkbox" className="rounded border-zinc-300" defaultChecked={cat === 'All'} /> {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Location</h3>
            <div className="flex flex-col gap-2 relative">
              <MapPin className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input placeholder="City or District..." className="pl-8" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Date Range</h3>
            <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors">
              <option>Any Time</option>
              <option>Past 24 Hours</option>
              <option>Past Week</option>
              <option>Past Month</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">Showing results for <span className="font-bold text-foreground">&quot;{query}&quot;</span></p>
            <select className="text-sm bg-transparent border-none outline-none font-medium cursor-pointer">
              <option>Sort by Relevance</option>
              <option>Sort by Newest</option>
              <option>Sort by Oldest</option>
            </select>
          </div>

          <div className="flex flex-col gap-6">
            {articles.length > 0 ? articles.map((article) => (
              <Link key={article.id} href={article.url} className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl border bg-card hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="rounded-full text-xs font-bold uppercase tracking-wider text-primary">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.timestamp}</span>
                  </div>
                  <h2 className="text-xl font-bold font-heading leading-tight group-hover:text-primary transition-colors">
                    <HighlightMatch text={article.headline} query={query} />
                  </h2>
                  <p className="text-muted-foreground line-clamp-2">
                    <HighlightMatch text={article.summary} query={query} />
                  </p>
                </div>
              </Link>
            )) : (
              <div className="py-20 text-center text-muted-foreground">
                <p>No results found. Try adjusting your search query.</p>
              </div>
            )}
          </div>

          {/* Infinite Scroll trigger / Load More */}
          {articles.length >= 20 && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="w-full md:w-auto">Load More Results</Button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
