const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const feedsToInsert = [
  // Hindustan Times
  { name: 'Hindustan Times - Latest', url: 'https://www.hindustantimes.com/feeds/rss/latest/rssfeed.xml', publisher: 'Hindustan Times', country: 'India', category_name: 'Latest' },
  { name: 'Hindustan Times - India', url: 'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml', publisher: 'Hindustan Times', country: 'India', category_name: 'India' },
  { name: 'Hindustan Times - Business', url: 'https://www.hindustantimes.com/feeds/rss/business/rssfeed.xml', publisher: 'Hindustan Times', country: 'India', category_name: 'Business' },
  { name: 'Hindustan Times - Technology', url: 'https://www.hindustantimes.com/feeds/rss/tech/rssfeed.xml', publisher: 'Hindustan Times', country: 'India', category_name: 'Technology' },
  { name: 'Hindustan Times - Sports', url: 'https://www.hindustantimes.com/feeds/rss/sports/rssfeed.xml', publisher: 'Hindustan Times', country: 'India', category_name: 'Sports' },
  { name: 'Hindustan Times - Cricket', url: 'https://www.hindustantimes.com/feeds/rss/cricket/rssfeed.xml', publisher: 'Hindustan Times', country: 'India', category_name: 'Cricket' },
  { name: 'Hindustan Times - Entertainment', url: 'https://www.hindustantimes.com/feeds/rss/entertainment/rssfeed.xml', publisher: 'Hindustan Times', country: 'India', category_name: 'Entertainment' },
  { name: 'Hindustan Times - Lifestyle', url: 'https://www.hindustantimes.com/feeds/rss/lifestyle/rssfeed.xml', publisher: 'Hindustan Times', country: 'India', category_name: 'Lifestyle' },
  { name: 'Hindustan Times - Education', url: 'https://www.hindustantimes.com/feeds/rss/education/rssfeed.xml', publisher: 'Hindustan Times', country: 'India', category_name: 'Education' },
  
  // Indian Express
  { name: 'Indian Express - Politics', url: 'https://indianexpress.com/section/politics/feed/', publisher: 'Indian Express', country: 'India', category_name: 'Politics' },
  { name: 'Indian Express - India', url: 'https://indianexpress.com/section/india/feed/', publisher: 'Indian Express', country: 'India', category_name: 'India' },
  { name: 'Indian Express - World', url: 'https://indianexpress.com/section/world/feed/', publisher: 'Indian Express', country: 'India', category_name: 'World' },
  { name: 'Indian Express - Science', url: 'https://indianexpress.com/section/technology/science/feed/', publisher: 'Indian Express', country: 'India', category_name: 'Science' },
  { name: 'Indian Express - Health', url: 'https://indianexpress.com/section/lifestyle/health/feed/', publisher: 'Indian Express', country: 'India', category_name: 'Health' },
  { name: 'Indian Express - Opinion', url: 'https://indianexpress.com/section/opinion/feed/', publisher: 'Indian Express', country: 'India', category_name: 'Opinion' },
  { name: 'Indian Express - Explained', url: 'https://indianexpress.com/section/explained/feed/', publisher: 'Indian Express', country: 'India', category_name: 'Explained' },

  // LiveMint
  { name: 'LiveMint - Markets', url: 'https://www.livemint.com/rss/markets', publisher: 'LiveMint', country: 'India', category_name: 'Markets' },
  { name: 'LiveMint - Economy', url: 'https://www.livemint.com/rss/economy', publisher: 'LiveMint', country: 'India', category_name: 'Economy' }
]

async function seed() {
  console.log("Seeding new RSS feeds without deleting existing ones...")
  let added = 0
  
  for (const feed of feedsToInsert) {
    // Check if exists
    const { data: existing } = await supabase
      .from('rss_feeds')
      .select('id')
      .eq('url', feed.url)
      .single()
      
    if (existing) {
      console.log(`Skipping existing feed: ${feed.name}`)
      continue
    }

    const { data, error } = await supabase
      .from('rss_feeds')
      .insert({
        name: feed.name,
        url: feed.url,
        publisher: feed.publisher,
        country: feed.country,
        category_name: feed.category_name,
        is_active: true,
        refresh_interval: 10,
        priority: 10 // higher priority
      })
      
    if (error) {
      console.error(`Error inserting ${feed.name}:`, error.message)
    } else {
      console.log(`Inserted: ${feed.name}`)
      added++
    }
  }
  
  console.log(`Successfully added ${added} new RSS feeds!`)
}

seed()
