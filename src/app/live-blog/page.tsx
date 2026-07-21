import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, Users, CheckCircle2 } from "lucide-react"
import { getLatestArticles } from "@/lib/api/articles"
import Link from "next/link"

export default async function LiveBlogPage() {
  // Fetch latest 15 articles across all categories to simulate a live news feed timeline
  const liveUpdates = await getLatestArticles(15)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Live Header */}
      <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-600 p-6 rounded-r-xl shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
          <span className="text-sm font-medium text-red-600 dark:text-red-400">Updates every minute</span>
        </div>
        <h1 className="text-4xl font-heading font-bold text-foreground">BBN News Live Coverage</h1>
        <p className="mt-2 text-muted-foreground text-lg">Real-time breaking news updates, expert analysis, and major developments from around the world as they happen.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {liveUpdates.map((update, i) => (
            <Link href={update.url} key={update.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active block">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 transition-transform group-hover:scale-110">
                <Clock className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm group-hover:shadow-md transition-all group-hover:border-primary/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-sm font-bold text-red-600">{update.timestamp}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">• {update.author}</span>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">{update.headline}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{update.summary}</p>
                <div className="mt-3">
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{update.category}</Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-t-4 border-t-red-600">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-red-600" /> Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Global Markets</span>
                  <span className="font-mono font-bold text-green-600">High Activity</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-[85%]"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Tech Sector</span>
                  <span className="font-mono font-bold text-orange-600">Moderate</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full w-[65%]"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Sports & Events</span>
                  <span className="font-mono font-bold text-blue-600">Rising</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-[45%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
