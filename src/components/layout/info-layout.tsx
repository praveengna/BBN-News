import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface InfoLayoutProps {
  title: string
  lastUpdated?: string
  children: React.ReactNode
}

export function InfoLayout({ title, lastUpdated, children }: InfoLayoutProps) {
  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header Area */}
      <div className="bg-muted py-12 border-b">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="flex items-center text-xs uppercase tracking-wider font-bold text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-primary">{title}</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black mb-4">{title}</h1>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground">Last Updated: {lastUpdated}</p>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 md:px-6 max-w-4xl pt-12">
        <div className="prose prose-lg dark:prose-invert max-w-none font-serif leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}
