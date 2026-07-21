import { MetadataRoute } from 'next'
import { getLatestArticles } from '@/lib/api/articles'
import { getCategories } from '@/lib/api/taxonomies'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bbn-news.example.com'

  // Fetch dynamic content
  const articles = await getLatestArticles(50)
  const categories = await getCategories()

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/video',
    '/search'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const dynamicArticles = articles.map((article) => ({
    url: `${baseUrl}/article/${article.url.replace('/article/', '')}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  }))

  const dynamicCategories = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...dynamicArticles, ...dynamicCategories]
}
