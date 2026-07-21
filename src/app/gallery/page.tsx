import Link from "next/link"
import { Camera, Maximize2 } from "lucide-react"
import { getLatestArticles } from "@/lib/api/articles"
import { Article } from "@/lib/data"

function GallerySection({ title, articles }: { title: string, articles: Article[] }) {
  if (!articles || articles.length === 0) return null;
  return (
    <div className="my-12">
      <div className="flex items-center justify-between border-b pb-2 mb-6">
        <h3 className="font-heading text-2xl font-bold uppercase tracking-wider flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" /> {title}
        </h3>
        <Link href={`/category/${articles[0].category.toLowerCase()}`} className="text-sm font-bold text-primary uppercase hover:underline">
          View Category
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {articles.map((article) => (
          <Link href={article.url} key={article.id} className="group cursor-pointer block">
            <div className="aspect-[4/3] bg-muted rounded-lg relative overflow-hidden mb-3">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${article.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-3 right-3 bg-black/60 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4">
                <h4 className="font-bold text-lg md:text-xl text-white leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {article.headline}
                </h4>
                <div className="flex items-center justify-between mt-2 text-xs text-zinc-300 font-medium">
                  <span className="uppercase">{article.category}</span>
                  <span>{article.timestamp}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default async function GalleryHomepage() {
  const worldGalleries = await getLatestArticles(6, "world")
  const sportsGalleries = await getLatestArticles(6, "sports")
  const entertainmentGalleries = await getLatestArticles(6, "entertainment")
  
  const featured = worldGalleries.length > 0 ? worldGalleries[0] : null
  const remainingWorld = worldGalleries.length > 1 ? worldGalleries.slice(1) : []

  return (
    <div className="bg-zinc-950 text-white min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
          <h1 className="font-heading text-4xl font-black uppercase tracking-widest text-primary flex items-center gap-3">
            <Camera className="w-8 h-8" />
            BBN Galleries
          </h1>
          <p className="hidden md:block text-zinc-400 font-serif italic text-lg">Stories told through a lens</p>
        </div>

        {/* Hero Featured Gallery */}
        {featured && (
          <div className="mb-12">
            <Link href={featured.url} className="group relative block overflow-hidden rounded-xl aspect-[21/9] md:aspect-[21/7] bg-zinc-900 border border-zinc-800 shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${featured.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col justify-end">
                <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 mb-4 rounded-sm w-fit">
                  Featured Gallery
                </span>
                <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-white leading-tight group-hover:text-primary transition-colors max-w-4xl">
                  {featured.headline}
                </h2>
                <p className="text-zinc-300 text-base md:text-xl max-w-3xl line-clamp-2 font-serif">
                  {featured.summary}
                </p>
              </div>
            </Link>
          </div>
        )}

        {/* Gallery Sections */}
        <GallerySection title="World in Pictures" articles={remainingWorld} />
        <GallerySection title="Sports Highlights" articles={sportsGalleries} />
        <GallerySection title="Entertainment & Culture" articles={entertainmentGalleries} />

        {(!worldGalleries.length && !sportsGalleries.length && !entertainmentGalleries.length) && (
          <div className="py-20 text-center">
            <p className="text-xl text-zinc-500 font-serif">No galleries available at the moment. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  )
}
