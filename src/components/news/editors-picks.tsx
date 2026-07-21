import { getLatestArticles } from "@/lib/api/articles"
import { StandardCard, CompactCard } from "./article-card"

export async function EditorsPicks() {
  // Use offset 4 so we don't duplicate the 4 articles shown in the EnhancedHero
  const articles = await getLatestArticles(5, undefined, 4)

  if (!articles || articles.length === 0) return null

  const mainArticle = articles[0]
  const subArticles = articles.slice(1, 5)

  return (
    <section className="py-12 border-b bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight">
            Editor&apos;s Picks
          </h2>
          <div className="h-1 flex-1 bg-primary/20 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <StandardCard article={mainArticle} className="h-full [&_h3]:text-3xl [&_p]:text-base [&_.image-wrapper]:aspect-[16/9]" />
          </div>
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {subArticles.map((article) => (
              <CompactCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
