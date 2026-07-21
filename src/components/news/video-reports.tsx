import { PlayCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getLatestArticles } from "@/lib/api/articles"

export async function VideoReports() {
  const videos = await getLatestArticles(4, "video")

  if (!videos || videos.length === 0) {
    return null
  }

  return (
    <section className="py-12 border-b bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
            Video Reports
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="group flex flex-col h-full">
              <Link href={video.url} className="block overflow-hidden rounded-md aspect-video mb-3 relative bg-zinc-900 shrink-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  style={{ backgroundImage: `url('${video.image}')` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white opacity-90 group-hover:scale-110 transition-transform drop-shadow-lg" strokeWidth={1.5} />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded">
                  {video.readingTime.replace('min read', 'min')}
                </div>
              </Link>
              <div className="flex flex-col flex-1">
                <span className="text-primary text-[10px] font-bold uppercase tracking-wider mb-1">{video.category}</span>
                <Link href={video.url} className="block group-hover:text-primary transition-colors mb-2">
                  <h3 className="font-heading text-lg font-bold leading-tight line-clamp-3">
                    {video.headline}
                  </h3>
                </Link>
                <span className="text-[10px] text-muted-foreground mt-auto uppercase font-semibold">{video.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
