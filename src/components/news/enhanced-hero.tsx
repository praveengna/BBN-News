import Image from "next/image"
import Link from "next/link"
import { PlayCircle, TrendingUp, Clock, ChevronRight } from "lucide-react"
import { getLatestArticles } from "@/lib/api/articles"
import { ArticleMeta } from "./article-card"

export async function EnhancedHero() {
  const articles = await getLatestArticles(4)
  if (!articles || articles.length === 0) return null
  
  const mainArticle = articles[0]
  const sideArticles = articles.slice(1, 4)

  return (
    <section className="py-6 border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Hero Story */}
          <div className="lg:col-span-8 lg:border-r lg:pr-8">
            <Link href={mainArticle.url} className="group flex flex-col h-full">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted mb-4">
                <Image
                  src={mainArticle.image}
                  alt={mainArticle.headline}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <ArticleMeta article={mainArticle} className="mb-3 text-sm" />
              <h1 className="font-heading text-4xl md:text-5xl font-bold leading-[1.1] mb-4 group-hover:text-primary transition-colors">
                {mainArticle.headline}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-serif leading-relaxed mb-6">
                {mainArticle.summary}
              </p>
            </Link>
          </div>

          {/* Latest Updates Sidebar */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-4 w-4 rounded-full bg-red-600 animate-pulse" />
              <h2 className="font-heading text-xl font-bold uppercase tracking-tight">Latest Updates</h2>
            </div>
            
            <div className="flex flex-col gap-6">
              {sideArticles.map((article) => (
                <div key={article.id} className="group pb-6 border-b last:border-0 last:pb-0">
                  <ArticleMeta article={article} className="mb-2 text-[10px]" showAuthor={false} />
                  <Link href={article.url} className="block">
                    <h3 className="font-heading text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                      {article.headline}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 font-serif">
                      {article.summary}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
