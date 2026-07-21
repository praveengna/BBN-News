import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getLatestArticles } from "@/lib/api/articles"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const articles = await getLatestArticles(24, slug)
  
  // Format the slug for display (e.g. "madhya-pradesh" -> "Madhya Pradesh")
  const displayName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 min-h-screen">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-primary">
          {displayName}
        </h1>
        <div className="h-1 flex-1 bg-muted rounded-full" />
      </div>
      
      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Link key={article.id} href={article.url} className="group h-full">
              <Card className="h-full border-0 shadow-none bg-transparent flex flex-col">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4 relative shrink-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${article.image}')` }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-heading font-bold text-xl leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.headline}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-3 flex-1">
                      {article.summary}
                    </p>
                    <p className="text-xs text-primary uppercase font-semibold mt-auto">
                      {article.timestamp}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-xl text-muted-foreground font-serif">No articles found in this category yet.</p>
          <Link href="/" className="mt-6 text-primary hover:underline font-bold uppercase tracking-wider text-sm">Return Home</Link>
        </div>
      )}
    </div>
  )
}

