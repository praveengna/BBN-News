import { Quote, Info } from "lucide-react"

export function PullQuote({ quote, author }: { quote: string, author?: string }) {
  return (
    <div className="my-10 relative">
      <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/20 rotate-180" />
      <blockquote className="border-l-4 border-primary pl-6 py-2">
        <p className="font-heading text-2xl md:text-3xl font-bold leading-tight text-foreground/90 italic">
          &quot;{quote}&quot;
        </p>
        {author && (
          <footer className="mt-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">
            — {author}
          </footer>
        )}
      </blockquote>
    </div>
  )
}

export function FactBox({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="my-8 bg-muted/50 p-6 rounded-lg border-l-4 border-black dark:border-white">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-primary" />
        <h4 className="font-heading font-bold text-xl">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm md:text-base">
            <span className="text-primary font-bold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function InlineRelated({ title, url }: { category?: string, title: string, url: string }) {
  return (
    <div className="my-8 p-4 border-y border-dashed">
      <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">Read More</span>
      <a href={url} className="font-heading text-lg font-bold hover:text-primary transition-colors hover:underline">
        {title}
      </a>
    </div>
  )
}
