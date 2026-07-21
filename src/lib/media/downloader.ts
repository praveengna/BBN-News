import { createClient } from '@supabase/supabase-js'
import slugify from 'slugify'

export async function downloadAndHostImage(imageUrl: string, articleTitle: string): Promise<string | null> {
  if (!imageUrl) return null

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  const bucketName = 'article-images'

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials for image downloader')
    return null
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.statusText}`)
      return null
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate a unique, SEO-friendly filename
    const ext = contentType.split('/')[1] || 'jpg'
    const cleanTitle = slugify(articleTitle, { lower: true, strict: true }).substring(0, 50)
    const fileName = `${cleanTitle}-${Date.now()}.${ext}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType,
        upsert: false
      })

    if (error) {
      console.error('Failed to upload image to Supabase:', error)
      return null
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    return publicUrlData.publicUrl

  } catch (error) {
    console.error('Error downloading/hosting image:', error)
    return null
  }
}
