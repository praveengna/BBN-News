import { ArrowRight, Newspaper } from "lucide-react"
import Link from "next/link"
import { getLatestArticles } from "@/lib/api/articles"
import { StandardCard, TextOnlyCard } from "./article-card"

export async function LocalNews() {
  // Fetch up to 5 articles for each to maintain a consistent height (1 Standard + 4 TextOnly)
  const localArticles = await getLatestArticles(5, "madhya-pradesh")
  const nationalArticles = await getLatestArticles(5, "india")

  return (
    <section className="py-10 border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-primary">
            Local & National
          </h2>
          <div className="h-1 flex-1 bg-muted rounded-full" />
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Local Section */}
          <div className="flex flex-col h-full">
            <h3 className="font-heading font-bold text-xl uppercase mb-6 flex items-center justify-between border-b pb-3">
              Local News
              <Link href="/category/madhya-pradesh" className="text-sm font-semibold text-primary hover:underline flex items-center">
                All Local <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </h3>
            
            <div className="flex-1 flex flex-col">
              {localArticles.length > 0 ? (
                <>
                  {/* Featured Card */}
                  <StandardCard article={localArticles[0]} className="mb-6" />
                  
                  {/* Text List */}
                  <div className="flex flex-col gap-0 flex-1">
                    {localArticles.slice(1, 5).map(article => (
                      <TextOnlyCard key={article.id} article={article} className="py-3" />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 min-h-[300px] border-2 border-dashed rounded-lg bg-muted/20 text-muted-foreground p-6 text-center">
                  <Newspaper className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-bold uppercase tracking-wider text-sm">No Local News Available</p>
                  <p className="text-xs mt-2 max-w-xs">Check back later for the latest updates from your area.</p>
                </div>
              )}
            </div>
          </div>

          {/* National Section */}
          <div className="flex flex-col h-full">
            <h3 className="font-heading font-bold text-xl uppercase mb-6 flex items-center justify-between border-b pb-3">
              National News
              <Link href="/category/india" className="text-sm font-semibold text-primary hover:underline flex items-center">
                All National <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </h3>
            
            <div className="flex-1 flex flex-col">
              {nationalArticles.length > 0 ? (
                <>
                  {/* Featured Card */}
                  <StandardCard article={nationalArticles[0]} className="mb-6" />
                  
                  {/* Text List */}
                  <div className="flex flex-col gap-0 flex-1">
                    {nationalArticles.slice(1, 5).map(article => (
                      <TextOnlyCard key={article.id} article={article} className="py-3" />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 min-h-[300px] border-2 border-dashed rounded-lg bg-muted/20 text-muted-foreground p-6 text-center">
                  <Newspaper className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-bold uppercase tracking-wider text-sm">No National News Available</p>
                  <p className="text-xs mt-2 max-w-xs">Check back later for the latest breaking national news.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
