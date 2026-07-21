import { NextResponse } from 'next/server'
import { getLatestArticles } from '@/lib/api/articles'

export async function GET() {
  const baseUrl = 'https://bbn-news.example.com'

  const articles = await getLatestArticles(20)

  const rssItemsXml = articles.map(article => `
    <item>
      <title><![CDATA[${article.headline}]]></title>
      <link>${baseUrl}/article/${article.url.replace('/article/', '')}</link>
      <guid isPermaLink="true">${baseUrl}/article/${article.url.replace('/article/', '')}</guid>
      <description><![CDATA[${article.summary}]]></description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <author>${article.author}</author>
    </item>
  `).join('')

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>BBN NEWS</title>
      <link>${baseUrl}</link>
      <description>The latest breaking news, videos, and analysis from around the world.</description>
      <language>en</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
      ${rssItemsXml}
    </channel>
  </rss>`

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 's-maxage=36000, stale-while-revalidate=86400',
    }
  })
}
