import { EnhancedHero } from "@/components/news/enhanced-hero"
import { EditorsPicks } from "@/components/news/editors-picks"
import { LocalNews } from "@/components/news/local-news"
import { StandardGrid } from "@/components/news/standard-grid"
import { SpecialtyGrid } from "@/components/news/specialty-grid"
import { EntertainmentGrid } from "@/components/news/entertainment-grid"
import { OpinionGrid } from "@/components/news/opinion-grid"
import { PhotoGallery } from "@/components/news/photo-gallery"
import { VideoReports } from "@/components/news/video-reports"
import { TrendingMostRead } from "@/components/news/trending-list"
import { AdSlot } from "@/components/widgets/ad-slot"
import { WeatherWidget, PollWidget } from "@/components/widgets/sidebar-widgets"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen space-y-12 pb-12">
      <EnhancedHero />
      <EditorsPicks />
      
      <div className="py-4 border-y">
        <AdSlot type="leaderboard" />
      </div>

      <StandardGrid title="Politics" category="Politics" />
      <StandardGrid title="World" category="World" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <TrendingMostRead />
        </div>
        <div className="space-y-6">
          <WeatherWidget />
          <PollWidget />
          <AdSlot type="mpu" />
        </div>
      </div>

      <LocalNews />
      
      <div className="py-4 border-y">
        <AdSlot type="leaderboard" />
      </div>

      <SpecialtyGrid />
      <OpinionGrid />
      <PhotoGallery />
      <EntertainmentGrid />
      <VideoReports />
    </div>
  )
}
