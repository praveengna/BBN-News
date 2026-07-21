import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function HeroSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Hero Article */}
          <Link href="/article/main-story" className="md:col-span-2 group">
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-muted">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase bg-primary rounded-sm">
                  Markets
                </span>
                <h2 className="font-heading text-3xl md:text-5xl font-bold mb-3 leading-tight">
                  Global Markets Reach Unprecedented Heights Following Rate Cuts
                </h2>
                <p className="text-gray-200 md:text-lg line-clamp-2">
                  Investors react positively as central banks coordinate a global strategy to boost economic growth, leading to a record-breaking day on Wall Street.
                </p>
              </div>
            </div>
          </Link>

          {/* Side Articles */}
          <div className="flex flex-col gap-6">
            <Link href="/article/side-story-1" className="group h-full">
              <Card className="h-full border-0 bg-muted/50 hover:bg-muted transition-colors overflow-hidden rounded-xl">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="h-48 bg-muted relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')",
                      }}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-center">
                    <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2">Technology</span>
                    <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      New AI Regulation Framework Proposed in the EU
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Lawmakers draft sweeping new rules aimed at balancing innovation with consumer protection.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
