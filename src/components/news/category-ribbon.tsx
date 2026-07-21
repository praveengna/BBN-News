import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryRibbonProps {
  title: string
  categorySlug: string
}

const dummyArticles = [
  {
    id: 1,
    title: "Breakthrough in Renewable Energy Storage",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
    time: "2h ago",
  },
  {
    id: 2,
    title: "Global Supply Chain Rebounds as Shipping Normalizes",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop",
    time: "4h ago",
  },
  {
    id: 3,
    title: "New Electric Vehicle Breaks Range Records",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938cb?q=80&w=2072&auto=format&fit=crop",
    time: "6h ago",
  },
  {
    id: 4,
    title: "Stock Markets Hit New Highs Amidst Tech Rally",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    time: "8h ago",
  },
]

export function CategoryRibbon({ title, categorySlug }: CategoryRibbonProps) {
  return (
    <section className="py-8 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight">
              {title}
            </h2>
            <div className="h-4 w-1 bg-primary" />
          </div>
          <Link
            href={`/category/${categorySlug}`}
            className="flex items-center text-sm font-semibold text-primary hover:underline"
          >
            See All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyArticles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`} className="group">
              <Card className="h-full border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-3 relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${article.image}')` }}
                    />
                  </div>
                  <h3 className="font-heading font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    {article.time}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
