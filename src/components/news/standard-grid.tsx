import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { AnimatedGrid, AnimatedItem } from "@/components/animations/animated-grid"
import { getLatestArticles } from "@/lib/api/articles"
import { StandardCard } from "./article-card"

interface StandardGridProps {
  title: string
  category: string
}

export async function StandardGrid({ title, category }: StandardGridProps) {
  const articles = await getLatestArticles(4, category.toLowerCase())
  if (!articles || articles.length === 0) return null

  return (
    <section className="py-10 border-b overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight">
              {title}
            </h2>
            <div className="h-4 w-1 bg-primary" />
          </div>
          <Link
            href={`/category/${category.toLowerCase()}`}
            className="flex items-center text-sm font-semibold text-primary hover:underline"
          >
            More in {title} <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <AnimatedItem key={article.id}>
              <StandardCard article={article} />
            </AnimatedItem>
          ))}
        </AnimatedGrid>
      </div>
    </section>
  )
}
