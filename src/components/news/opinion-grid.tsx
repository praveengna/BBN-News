import { ArrowRight, Quote } from "lucide-react"
import Link from "next/link"
import { getLatestArticles } from "@/lib/api/articles"
import { Article } from "@/lib/data"
import { ArticleActions } from "./article-card"

export async function OpinionGrid() {
  // Use offset to grab older articles for opinion instead of invalid category
  const opinions = await getLatestArticles(4, undefined, 20)

  return (
    <section className="py-12 border-b bg-muted/10">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-center mb-10">
          Opinion & Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {opinions.map((article) => (
            <div key={article.id} className="group flex flex-col items-center text-center">
              <Link href={article.url} className="block w-24 h-24 rounded-full overflow-hidden mb-4 relative bg-muted shrink-0 shadow-md">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url('${article.image}')` }}
                />
              </Link>
              <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{article.author}</span>
              <Link href={article.url} className="block group-hover:text-primary transition-colors mb-3">
                <h3 className="font-heading text-lg font-bold leading-tight line-clamp-3">
                  {article.headline}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-2 font-serif mb-4 flex-1">
                {article.summary}
              </p>
              <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-dashed">
                <span className="text-xs text-muted-foreground">{article.timestamp}</span>
                <ArticleActions />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
