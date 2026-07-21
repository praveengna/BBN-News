import { Metadata } from 'next'
import Link from "next/link"
import { Calendar, Clock, MessageCircle, Share2, Printer, Sparkles, RefreshCw } from "lucide-react"

import { ArticleReadingBar } from "@/components/article/reading-bar"
import { StickyTableOfContents } from "@/components/article/sticky-toc"
import { ArticleTags, NextPrevArticles } from "@/components/article/article-footer"
import { getArticleBySlug, mapDatabaseArticleToFrontend, getAdjacentArticles } from "@/lib/api/articles"

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  
  if (!article) {
    return { title: 'Article Not Found | BBN NEWS' }
  }

  const title = article.seo_title || article.title
  const description = article.seo_description || article.summary || ''
  const image = article.featured_image || "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop"

  return {
    title: `${title} | BBN NEWS`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.published_at || article.created_at,
      authors: [article.authors?.name || article.profiles?.full_name || 'BBN Staff'],
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    }
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const rawArticle = await getArticleBySlug(slug)

  if (!rawArticle) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-heading font-black mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">We couldn&apos;t find the article you were looking for.</p>
        <Link href="/" className="bg-primary text-primary-foreground px-6 py-2 rounded-sm font-bold uppercase tracking-wider">
          Return Home
        </Link>
      </div>
    )
  }

  const article = mapDatabaseArticleToFrontend(rawArticle)
  const adjacentArticles = await getAdjacentArticles(rawArticle.published_at || rawArticle.created_at)

  // Extract tags from junction table
  const tags = rawArticle.article_tags?.map((at: { tags: { name: string } }) => at.tags?.name).filter(Boolean) || []

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.headline,
    "image": [article.image],
    "datePublished": rawArticle.published_at || rawArticle.created_at,
    "dateModified": rawArticle.updated_at || rawArticle.created_at,
    "author": [{
      "@type": "Person",
      "name": article.author,
      "url": "https://bbnnews.com/author/" + encodeURIComponent(article.author)
    }]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="pb-16 bg-background">
        {/* Top Fold Hero */}
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-5xl">
          <div className="space-y-6 mb-8 text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
              <Link href="/">Home</Link>
              <span className="text-muted-foreground">/</span>
              <Link href={`/category/${rawArticle.categories?.slug || 'news'}`}>{article.category}</Link>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              {article.headline}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-serif leading-snug mx-auto max-w-3xl">
              {article.summary}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center pt-6 gap-6 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted overflow-hidden relative">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${rawArticle.authors?.avatar_url || rawArticle.profiles?.avatar_url || '/placeholder.jpg'}')` }} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-foreground">{article.author}</p>
                  <p className="text-xs text-muted-foreground">BBN NEWS</p>
                </div>
              </div>
              
              <div className="hidden sm:block text-muted-foreground/30 h-8 border-l" />
              
              <div className="flex items-center gap-4 text-muted-foreground font-medium uppercase tracking-wider text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Published: {article.timestamp}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readingTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-6 print:hidden">
              <button className="p-2 rounded-full bg-muted hover:bg-red-100 hover:text-red-600 transition-colors" title="Share on Twitter"><Share2 className="w-4 h-4" /></button>
              <button className="p-2 rounded-full bg-muted hover:bg-gray-200 transition-colors" title="Print Article"><Printer className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 mb-12">
          <div className="aspect-[21/9] w-full rounded-none md:rounded-xl overflow-hidden bg-muted relative shadow-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${article.image}')` }}
            />
            {rawArticle.source_url && (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-[10px] px-2 py-1 rounded backdrop-blur">
                Source: {new URL(rawArticle.source_url).hostname.replace('www.', '')}
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar (TOC) */}
            <div className="hidden lg:block lg:col-span-3">
              <StickyTableOfContents />
            </div>

            {/* Main Article Body */}
            <div className="lg:col-span-7 prose prose-lg dark:prose-invert max-w-none font-serif text-lg leading-relaxed article-content" style={{ fontSize: 'var(--article-font-size, 18px)' }}>
              
              <ArticleReadingBar />

              {/* AI Summary Block - Only show if it's auto-generated */}
              {rawArticle.is_auto_generated && rawArticle.summary && (
                <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl p-6 mb-10 not-prose print:hidden">
                  <h4 className="flex items-center gap-2 font-heading font-bold text-blue-800 dark:text-blue-300 mb-3">
                    <Sparkles className="w-5 h-5" /> AI Key Takeaways
                  </h4>
                  <p className="text-sm text-blue-900/80 dark:text-blue-200/80 leading-relaxed">
                    {rawArticle.summary}
                  </p>
                  <p className="text-[10px] text-blue-500 mt-4 uppercase tracking-wider font-bold">Auto-generated by BBN AI</p>
                </div>
              )}

              {/* Real Content */}
              {rawArticle.is_auto_generated ? (
                // For RSS content, we safely inject the HTML. We assume the RSS parser sanitizes it, but we should be careful.
                <div dangerouslySetInnerHTML={{ __html: rawArticle.content }} />
              ) : (
                // If it's a rich-text editor article
                <div dangerouslySetInnerHTML={{ __html: rawArticle.content }} />
              )}

              {/* Source Link */}
              {rawArticle.source_url && (
                <div className="mt-8 pt-6 border-t">
                  <a href={rawArticle.source_url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline">
                    Read original article on {new URL(rawArticle.source_url).hostname} →
                  </a>
                </div>
              )}

              <ArticleTags tags={tags} />
              
              {/* Fetch adjacent articles for NextPrevArticles */}
              <NextPrevArticles prev={adjacentArticles.prev} next={adjacentArticles.next} />

              {/* Comments Placeholder */}
              <div className="mt-12 pt-8 border-t print:hidden">
                <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" /> Comments
                </h3>
                <div className="bg-muted/30 p-8 rounded-lg text-center border border-dashed">
                  <p className="text-muted-foreground mb-4">Join the conversation. Please keep comments respectful and relevant.</p>
                  <button className="bg-primary text-primary-foreground px-6 py-2 rounded font-bold uppercase tracking-wider text-sm hover:bg-primary/90">
                    Sign in to Comment
                  </button>
                </div>
              </div>

            </div>
            
            {/* Right Gutter (Empty or secondary ads) */}
            <div className="hidden lg:block lg:col-span-2">
               <div className="sticky top-32 w-full h-[600px] bg-muted/50 rounded-lg border border-dashed flex flex-col items-center justify-center text-center">
                  <span className="text-xs uppercase text-muted-foreground font-bold tracking-wider mb-2">Advertisement</span>
                  <span className="text-muted-foreground/50 font-bold">160 x 600</span>
               </div>
            </div>

          </div>
        </div>
      </article>
    </>
  )
}
