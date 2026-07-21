import { ArrowRight, TrendingUp, BarChart2, Briefcase, Zap, Cpu, Smartphone } from "lucide-react"
import Link from "next/link"
import { getLatestArticles } from "@/lib/api/articles"
import { StandardCard, TextOnlyCard } from "./article-card"

export async function SpecialtyGrid() {
  const businessArticles = await getLatestArticles(4, "business")
  const techArticles = await getLatestArticles(4, "technology")

  return (
    <section className="py-12 border-b bg-zinc-950 text-zinc-50 dark:bg-background dark:text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Business Section */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white dark:text-primary">
                Business
              </h2>
              <div className="h-px flex-1 bg-zinc-800 dark:bg-muted" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StandardCard article={businessArticles[0]} className="sm:col-span-2 [&_.text-muted-foreground]:text-zinc-400 [&_h3]:text-white dark:[&_h3]:text-foreground [&_h3:hover]:text-primary" />
              {businessArticles.slice(1).map(article => (
                <TextOnlyCard key={article.id} article={article} className="border-zinc-800 dark:border-border [&_h3]:text-zinc-200 dark:[&_h3]:text-foreground [&_h3:hover]:text-primary" />
              ))}
            </div>
          </div>

          {/* Technology Section */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white dark:text-primary">
                Technology
              </h2>
              <div className="h-px flex-1 bg-zinc-800 dark:bg-muted" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StandardCard article={techArticles[0]} className="sm:col-span-2 [&_.text-muted-foreground]:text-zinc-400 [&_h3]:text-white dark:[&_h3]:text-foreground [&_h3:hover]:text-primary" />
              {techArticles.slice(1).map(article => (
                <TextOnlyCard key={article.id} article={article} className="border-zinc-800 dark:border-border [&_h3]:text-zinc-200 dark:[&_h3]:text-foreground [&_h3:hover]:text-primary" />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
