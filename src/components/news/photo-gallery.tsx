import { Camera, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getLatestArticles } from "@/lib/api/articles"
import { Article } from "@/lib/data"

export async function PhotoGallery() {
  const photos = await getLatestArticles(5, "photo")

  if (!photos || photos.length === 0) return null

  return (
    <section className="py-12 border-b bg-zinc-950 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Camera className="w-8 h-8 text-primary" />
            <h2 className="font-heading text-3xl font-bold uppercase tracking-tight">
              In Pictures
            </h2>
          </div>
          <Link href="/gallery" className="text-sm font-bold uppercase tracking-wider text-primary hover:underline">
            View All Galleries
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {/* Main Large Photo */}
          <Link href={photos[0].url} className="group relative col-span-1 md:col-span-2 md:row-span-2 overflow-hidden rounded-md aspect-[4/3] md:aspect-auto">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${photos[0].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block bg-primary text-white text-[10px] font-bold uppercase px-2 py-1 mb-3">Gallery</span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                {photos[0].headline}
              </h3>
            </div>
          </Link>

          {/* Secondary Photos */}
          {photos.slice(1).map((photo) => (
            <Link key={photo.id} href={photo.url} className="group relative col-span-1 row-span-1 overflow-hidden rounded-md aspect-[4/3] md:aspect-auto">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${photo.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-heading text-sm md:text-base font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {photo.headline}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
