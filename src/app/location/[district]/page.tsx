import { searchArticles } from "@/lib/api/articles"
import { StandardCard } from "@/components/news/article-card"
import { MapPin } from "lucide-react"

export default async function DistrictPage({ params }: { params: Promise<{ district: string }> }) {
  const resolvedParams = await params
  const districtName = resolvedParams.district.charAt(0).toUpperCase() + resolvedParams.district.slice(1).replace("-", " ")
  
  // Search for the district name in live articles
  const articles = await searchArticles(districtName, 20)

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="bg-muted/50 p-8 rounded-xl border flex flex-col items-center justify-center text-center">
        <MapPin className="w-12 h-12 text-red-600 mb-4" />
        <h1 className="text-4xl font-heading font-bold mb-2">{districtName} News</h1>
        <p className="text-muted-foreground max-w-2xl">
          Get the latest local updates, politics, crime reports, and community news from {districtName} district.
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article) => (
            <StandardCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-xl text-muted-foreground font-serif">No articles found for {districtName} recently.</p>
        </div>
      )}
    </div>
  )
}
