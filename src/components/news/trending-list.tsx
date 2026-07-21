import { TrendingUp, Flame } from "lucide-react"
import Link from "next/link"
import { getLatestArticles } from "@/lib/api/articles"
import { Article } from "@/lib/data"

export async function TrendingMostRead() {
  // Use offset to grab older articles for trending/most-read instead of invalid categories
  const trending = await getLatestArticles(5, undefined, 10)
  const mostRead = await getLatestArticles(5, undefined, 15)

  return (
    <section className="py-10 border-b bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Trending */}
          <div>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-8 border-b border-primary-foreground/20 pb-4">
              Trending Now
            </h2>
            <div className="flex flex-col gap-6">
              {trending.map((article, index) => (
                <Link key={article.id} href={article.url} className="group flex gap-4 items-start">
                  <span className="text-4xl font-heading font-black text-primary-foreground/30 group-hover:text-primary-foreground/60 transition-colors shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold leading-tight group-hover:underline mb-1">
                      {article.headline}
                    </h3>
                    <span className="text-xs uppercase font-semibold text-primary-foreground/70">{article.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Most Read */}
          <div>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-8 border-b border-primary-foreground/20 pb-4">
              Most Read
            </h2>
            <div className="flex flex-col gap-6">
              {mostRead.map((article, index) => (
                <Link key={article.id} href={article.url} className="group flex gap-4 items-start">
                  <span className="text-4xl font-heading font-black text-primary-foreground/30 group-hover:text-primary-foreground/60 transition-colors shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold leading-tight group-hover:underline mb-1">
                      {article.headline}
                    </h3>
                    <span className="text-xs uppercase font-semibold text-primary-foreground/70">{article.timestamp}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
