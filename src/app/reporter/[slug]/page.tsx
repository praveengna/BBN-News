/* eslint-disable @next/next/no-img-element */
import { getArticles } from "@/lib/api/articles"
import { getAuthors } from "@/lib/api/taxonomies"
import { StandardCard } from "@/components/news/article-card"
import { User, MessageCircle, Mail, Award } from "lucide-react"
import { notFound } from "next/navigation"

export default async function ReporterProfilePage({ params }: { params: { slug: string } }) {
  const authors = await getAuthors()
  // Mock finding author by slug (we'd need a slug field in authors, for now we map ID or name)
  const author = authors.find(a => a.name.toLowerCase().replace(/ /g, '-') === params.slug) || authors[0]

  if (!author) {
    notFound()
  }

  const articles = await getArticles()
  const authorArticles = articles.filter(a => a.author === author.name)

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-card border rounded-2xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-muted flex items-center justify-center shrink-0 border-4 border-background shadow-lg overflow-hidden">
          {author.avatar_url ? (
            <img src={author.avatar_url} alt={author.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-16 h-16 text-muted-foreground" />
          )}
        </div>
        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
            <h1 className="text-4xl font-heading font-bold">{author.name}</h1>
            <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3" /> Senior Reporter
            </span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Award-winning political correspondent covering Madhya Pradesh state politics and policy decisions. With over a decade of experience, {author.name} brings incisive analysis to regional news.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <a href="#" className="text-muted-foreground hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-red-600 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div>
        <h2 className="text-2xl font-bold font-heading mb-6 border-b pb-2">Latest from {author.name}</h2>
        {authorArticles.length === 0 ? (
          <p className="text-muted-foreground">No articles published recently.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {authorArticles.map((article) => (
              <StandardCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
