import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/cron/'],
    },
    sitemap: 'https://bbn-news.example.com/sitemap.xml',
  }
}
