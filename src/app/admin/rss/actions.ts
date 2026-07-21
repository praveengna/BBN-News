'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addFeed(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const url = formData.get('url') as string
  const publisher = formData.get('publisher') as string
  const country = formData.get('country') as string
  const state = formData.get('state') as string
  const district = formData.get('district') as string
  const category_name = formData.get('category_name') as string
  
  const { error } = await supabase.from('rss_feeds').insert({
    name,
    url,
    publisher,
    country,
    state,
    district,
    category_name,
    is_active: true,
    refresh_interval: 10,
    priority: 0
  })

  if (error) {
    console.error('Add Feed Error:', error)
    return
  }

  revalidatePath('/admin/rss')
}

export async function toggleFeedStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient()
  
  await supabase.from('rss_feeds').update({ is_active: !currentStatus }).eq('id', id)
  
  revalidatePath('/admin/rss')
}

export async function deleteFeed(id: string) {
  const supabase = await createClient()
  
  await supabase.from('rss_feeds').delete().eq('id', id)
  
  revalidatePath('/admin/rss')
}

export async function triggerManualSync(): Promise<void> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/cron/aggregate`, {
      method: 'GET'
    })
    await res.json()
    revalidatePath('/admin/rss')
  } catch (error: any) {
    console.error('Manual sync error:', error.message)
  }
}
