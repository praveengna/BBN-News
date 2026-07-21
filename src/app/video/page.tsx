import Image from "next/image"
import Link from "next/link"
import { PlayCircle, Radio } from "lucide-react"

import { getLatestArticles } from "@/lib/api/articles"
import { Article } from "@/lib/data"

function VideoRibbon({ title, videos }: { title: string, videos: Article[] }) {
  if (!videos || videos.length === 0) return null;
  return (
    <div className="my-12">
      <div className="flex items-center justify-between border-b pb-2 mb-6">
        <h3 className="font-heading text-2xl font-bold uppercase tracking-wider">{title}</h3>
        <Link href="#" className="text-sm font-bold text-primary uppercase hover:underline">View All</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((v) => (
          <Link href={v.url} key={v.id} className="group cursor-pointer block">
            <div className="aspect-video bg-muted rounded-xl relative overflow-hidden mb-3">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${v.image}')` }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium backdrop-blur">
                {v.readingTime.replace('min read', 'min')}
              </div>
            </div>
            <h4 className="font-bold text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {v.headline}
            </h4>
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground font-medium">
              <span>{v.author}</span>
              <span>{v.timestamp}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default async function VideoHomepage() {
  // Fetch real articles to simulate videos
  const latestVideos = await getLatestArticles(5, "entertainment")
  const politicsVideos = await getLatestArticles(4, "politics")
  const businessVideos = await getLatestArticles(4, "business")
  const sportsVideos = await getLatestArticles(4, "sports")

  const mainVideo = latestVideos.length > 0 ? latestVideos[0] : null
  const sideVideos = latestVideos.length > 1 ? latestVideos.slice(1) : []

  return (
    <div className="bg-zinc-950 text-white min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-4xl font-black uppercase tracking-widest text-primary">
            BBN Video
          </h1>
          <div className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-wider text-zinc-400">
            <Link href="/category/politics" className="hover:text-white transition-colors">Politics</Link>
            <Link href="/category/crime" className="hover:text-white transition-colors">Crime</Link>
            <Link href="/category/sports" className="hover:text-white transition-colors">Sports</Link>
            <Link href="/category/business" className="hover:text-white transition-colors">Business</Link>
            <Link href="/category/technology" className="hover:text-white transition-colors">Technology</Link>
          </div>
        </div>

        {/* Hero Section */}
        {mainVideo && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            
            {/* Main Featured/Live Video */}
            <div className="lg:col-span-2">
              <Link href={mainVideo.url}>
                <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden relative group cursor-pointer border border-zinc-800 shadow-2xl h-full">
                  <Image
                    src={mainVideo.image}
                    alt={mainVideo.headline}
                    fill
                    priority
                    className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded flex items-center gap-2 animate-pulse">
                    <Radio className="w-3 h-3" /> Live
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-20 h-20 text-white opacity-90 group-hover:scale-110 transition-transform drop-shadow-xl" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-white leading-tight group-hover:text-primary transition-colors">
                      {mainVideo.headline}
                    </h2>
                    <p className="text-zinc-300 text-lg max-w-2xl line-clamp-2 font-serif">
                      {mainVideo.summary}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Up Next List */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col h-full">
              <h3 className="font-heading text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-zinc-800 pb-2">
                <PlayCircle className="w-5 h-5 text-primary" /> Latest Videos
              </h3>
              <div className="flex flex-col gap-5 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {sideVideos.map((v) => (
                  <Link href={v.url} key={v.id} className="flex gap-4 group cursor-pointer">
                    <div className="w-32 aspect-video bg-zinc-800 rounded-lg relative overflow-hidden shrink-0 border border-zinc-700">
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform"
                        style={{ backgroundImage: `url('${v.image}')` }}
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded font-medium">
                        {v.readingTime.replace('min read', 'min')}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors text-zinc-100">
                        {v.headline}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-2 font-medium">{v.author} • {v.timestamp}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <VideoRibbon title="Trending in Politics" videos={politicsVideos} />
        <VideoRibbon title="Business & Markets" videos={businessVideos} />
        <VideoRibbon title="Sports Highlights" videos={sportsVideos} />
        
      </div>
    </div>
  )
}
