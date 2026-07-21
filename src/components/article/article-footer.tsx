import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight } from "lucide-react"

export function ArticleTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 py-6 border-y">
      <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground mr-2">Tags:</span>
      {tags.map(tag => (
        <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
          <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  )
}

export function NextPrevArticles({ 
  prev, 
  next 
}: { 
  prev?: { title: string, slug: string } | null, 
  next?: { title: string, slug: string } | null 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
      {prev ? (
        <Link href={`/article/${prev.slug}`} className="group p-6 border rounded-lg hover:border-primary transition-colors flex flex-col items-start text-left">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 group-hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Previous
          </span>
          <h4 className="font-heading font-bold text-lg line-clamp-2">
            {prev.title}
          </h4>
        </Link>
      ) : (
        <div className="p-6 border rounded-lg border-dashed bg-muted/20 flex items-center justify-center text-muted-foreground text-sm uppercase font-bold tracking-wider">
          End of Articles
        </div>
      )}

      {next ? (
        <Link href={`/article/${next.slug}`} className="group p-6 border rounded-lg hover:border-primary transition-colors flex flex-col items-end text-right">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 group-hover:text-primary transition-colors">
            Next <ArrowRight className="w-4 h-4" />
          </span>
          <h4 className="font-heading font-bold text-lg line-clamp-2">
            {next.title}
          </h4>
        </Link>
      ) : (
        <div className="p-6 border rounded-lg border-dashed bg-muted/20 flex items-center justify-center text-muted-foreground text-sm uppercase font-bold tracking-wider">
          Latest Article
        </div>
      )}
    </div>
  )
}
