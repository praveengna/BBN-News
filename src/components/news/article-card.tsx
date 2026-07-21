import Link from "next/link"
import { Bookmark, Share2, Clock, User } from "lucide-react"
import { Article } from "@/lib/data"
import { cn } from "@/lib/utils"

export function ArticleActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button className="text-muted-foreground hover:text-primary transition-colors p-1" title="Bookmark">
        <Bookmark className="w-4 h-4" />
        <span className="sr-only">Bookmark</span>
      </button>
      <button className="text-muted-foreground hover:text-primary transition-colors p-1" title="Share">
        <Share2 className="w-4 h-4" />
        <span className="sr-only">Share</span>
      </button>
    </div>
  )
}

export function ArticleMeta({ article, className, showAuthor = true, showTime = true, showCategory = true }: { article: Article, className?: string, showAuthor?: boolean, showTime?: boolean, showCategory?: boolean }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium uppercase tracking-wider", className)}>
      {showCategory && <span className="text-primary font-bold">{article.category}</span>}
      {showAuthor && (
        <div className="flex items-center gap-1">
          <User className="w-3 h-3" />
          <span>{article.author}</span>
        </div>
      )}
      {showTime && (
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{article.timestamp}</span>
        </div>
      )}
    </div>
  )
}

export function StandardCard({ article, className }: { article: Article, className?: string }) {
  if (!article) return null
  return (
    <div className={cn("group flex flex-col h-full", className)}>
      <Link href={article.url} className="image-wrapper block overflow-hidden rounded-sm aspect-[3/2] mb-3 relative bg-muted shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${article.image}')` }}
        />
      </Link>
      <div className="flex flex-col flex-1">
        <ArticleMeta article={article} className="mb-2" showAuthor={false} />
        <Link href={article.url} className="block group-hover:text-primary transition-colors">
          <h3 className="font-heading text-lg font-bold leading-tight mb-2 line-clamp-3">
            {article.headline}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1 font-serif">
          {article.summary}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t">
          <span className="text-xs text-muted-foreground">{article.readingTime}</span>
          <ArticleActions />
        </div>
      </div>
    </div>
  )
}

export function CompactCard({ article, className }: { article: Article, className?: string }) {
  if (!article) return null
  return (
    <div className={cn("group grid grid-cols-[100px_1fr] gap-4 items-center", className)}>
      <Link href={article.url} className="block overflow-hidden rounded-sm aspect-square relative bg-muted shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${article.image}')` }}
        />
      </Link>
      <div className="flex flex-col">
        <span className="text-primary text-[10px] font-bold uppercase tracking-wider mb-1">{article.category}</span>
        <Link href={article.url} className="block group-hover:text-primary transition-colors">
          <h3 className="font-heading text-sm font-bold leading-tight mb-1 line-clamp-2">
            {article.headline}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span>{article.timestamp}</span>
            <span>•</span>
            <span>{article.readingTime}</span>
          </span>
          <ArticleActions />
        </div>
      </div>
    </div>
  )
}

export function TextOnlyCard({ article, className }: { article: Article, className?: string }) {
  if (!article) return null
  return (
    <div className={cn("group py-3 border-b last:border-0", className)}>
      <Link href={article.url} className="block group-hover:text-primary transition-colors">
        <h3 className="font-heading text-base font-bold leading-tight mb-1 line-clamp-2">
          {article.headline}
        </h3>
      </Link>
      <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground uppercase font-semibold">
        <span className="flex items-center gap-2">
          <span>{article.timestamp}</span>
          <span>•</span>
          <span>{article.readingTime}</span>
        </span>
        <ArticleActions />
      </div>
    </div>
  )
}
