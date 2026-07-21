import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'

export async function processNewsItem(title: string, content: string) {
  // If no API key is provided, we can't use the AI, return fallback
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY is not set. Skipping AI processing.')
    return null
  }

  try {
    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: z.object({
        summary: z.string().describe('A concise, professional 1-2 paragraph summary of the news article.'),
        seo_title: z.string().describe('A short, catchy SEO optimized title (max 60 chars).'),
        seo_description: z.string().describe('An SEO optimized description (max 155 chars).'),
        category_slug: z.enum(['politics', 'business', 'technology', 'sports', 'entertainment', 'world', 'india', 'city-news', 'opinion']).describe('The most appropriate category slug for this article.'),
        tags: z.array(z.string()).describe('An array of 3-5 relevant tags for the article.')
      }),
      prompt: `Analyze the following news article. Provide a professional summary, SEO metadata, determine its primary category, and extract key tags.\n\nTitle: ${title}\n\nContent: ${content}`
    })

    return object
  } catch (error) {
    console.error('Failed to process news item with AI:', error)
    return null
  }
}
