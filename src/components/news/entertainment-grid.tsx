import { ArrowRight, Trophy, Film } from "lucide-react"
import Link from "next/link"
import { getLatestArticles } from "@/lib/api/articles"
import { StandardCard, CompactCard } from "./article-card"

export async function EntertainmentGrid() {
  const sportsArticles = await getLatestArticles(4, "sports")
  const entArticles = await getLatestArticles(4, "entertainment")

  return (
    <section className="py-10 border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Sports Section */}
          <div>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-6 flex items-center">
              <span className="text-primary mr-2">■</span> Sports
            </h2>
            <div className="flex flex-col gap-6">
              <StandardCard article={sportsArticles[0]} />
              <div className="grid grid-cols-1 gap-4 border-t pt-4">
                {sportsArticles.slice(1).map(article => (
                  <CompactCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </div>

          {/* Entertainment Section */}
          <div>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight mb-6 flex items-center">
              <span className="text-primary mr-2">■</span> Entertainment
            </h2>
            <div className="flex flex-col gap-6">
              <StandardCard article={entArticles[0]} />
              <div className="grid grid-cols-1 gap-4 border-t pt-4">
                {entArticles.slice(1).map(article => (
                  <CompactCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
