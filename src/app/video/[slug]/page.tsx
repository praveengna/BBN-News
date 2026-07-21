import Link from "next/link"
import { PlayCircle, Share2, MessageCircle, Clock, Eye, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function VideoPlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  await params
  
  // In a real app, fetch from Supabase
  const video = {
    title: "Market Analysis: What to expect this quarter in Tech",
    description: "Our chief financial analyst breaks down the upcoming earnings season for major technology companies and what it means for retail investors.",
    youtube_id: "dQw4w9WgXcQ", // Example ID
    duration: "12:34",
    views: "45,231",
    date: "Oct 24, 2026",
    category: "Technology"
  }

  return (
    <div className="bg-zinc-950 text-white min-h-screen pt-4 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Video Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Player Container */}
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800 shadow-2xl relative">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube-nocookie.com/embed/${video.youtube_id}?autoplay=1&modestbranding=1&rel=0`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>

            {/* Video Details */}
            <div>
              <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider mb-2">
                {video.category}
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-4">
                {video.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-6 text-sm text-zinc-400 font-medium">
                  <span className="flex items-center gap-2"><Eye className="w-4 h-4" /> {video.views} views</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {video.date}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-full gap-2">
                    <ThumbsUp className="w-4 h-4" /> Like
                  </Button>
                  <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-full gap-2">
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
              <p className="text-zinc-300 leading-relaxed font-serif text-lg">
                {video.description}
              </p>
              
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> Comments
                </h4>
                <div className="text-center p-8 bg-zinc-900 rounded-lg border border-zinc-800">
                  <p className="text-zinc-500 mb-4">Sign in to join the conversation.</p>
                  <Button>Sign In</Button>
                </div>
              </div>
            </div>
            
          </div>

          {/* Related Sidebar */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-xl font-bold mb-6 pb-2 border-b border-zinc-800 text-zinc-100">
              Related Videos
            </h3>
            
            <div className="flex flex-col gap-6">
              {Array.from({length: 8}).map((_, i) => (
                <Link href="#" key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-40 aspect-video bg-zinc-800 rounded-lg relative overflow-hidden shrink-0 border border-zinc-700">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074')" }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <PlayCircle className="w-8 h-8 text-white/90" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded font-medium">
                      05:30
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm leading-snug line-clamp-3 group-hover:text-primary transition-colors text-zinc-100">
                      Finance Minister announces sweeping tax reforms for the new fiscal year
                    </h4>
                    <p className="text-xs text-zinc-500 mt-2 font-medium">120K views • 5 hours ago</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
