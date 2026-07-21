"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// ----------------------------------------------------------------------------
// Categories
// ----------------------------------------------------------------------------
export async function addCategory(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string

  if (!name || !slug) return

  const { error } = await supabase.from('categories').insert([{ name, slug, description }])
  if (error) {
    console.error('Error adding category:', error)
    return
  }

  revalidatePath('/admin/categories')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  await supabase.from('categories').delete().eq('id', id)
  revalidatePath('/admin/categories')
}

// ----------------------------------------------------------------------------
// Tags
// ----------------------------------------------------------------------------
export async function addTag(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string

  if (!name || !slug) return

  const { error } = await supabase.from('tags').insert([{ name, slug }])
  if (error) {
    console.error('Error adding tag:', error)
    return
  }

  revalidatePath('/admin/tags')
}

export async function deleteTag(id: string) {
  const supabase = await createClient()
  await supabase.from('tags').delete().eq('id', id)
  revalidatePath('/admin/tags')
}

// ----------------------------------------------------------------------------
// Authors
// ----------------------------------------------------------------------------
export async function addAuthor(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const bio = formData.get('bio') as string
  const avatar_url = formData.get('avatar_url') as string
  const twitter_handle = formData.get('twitter_handle') as string

  if (!name) return

  const { error } = await supabase.from('authors').insert([{ name, bio, avatar_url, twitter_handle }])
  if (error) {
    console.error('Error adding author:', error)
    return
  }

  revalidatePath('/admin/authors')
}

export async function deleteAuthor(id: string) {
  const supabase = await createClient()
  await supabase.from('authors').delete().eq('id', id)
  revalidatePath('/admin/authors')
}

// ----------------------------------------------------------------------------
// Settings
// ----------------------------------------------------------------------------
export async function updateSettings(formData: FormData) {
  const supabase = await createClient()
  
  const site_name = formData.get('site_name') as string
  const site_description = formData.get('site_description') as string
  const contact_email = formData.get('contact_email') as string
  const rss_refresh_interval = parseInt(formData.get('rss_refresh_interval') as string) || 15
  const retention_days = parseInt(formData.get('retention_days') as string) || 30

  // The true logic prevents multiple rows in the unique index
  const { error } = await supabase.from('settings').upsert({
    id: (await supabase.from('settings').select('id').single()).data?.id || undefined, // Keep existing ID if exists
    site_name,
    site_description,
    contact_email,
    rss_refresh_interval,
    retention_days,
    updated_at: new Date().toISOString()
  })

  if (error) {
    console.error('Error updating settings:', error)
    return
  }

  revalidatePath('/admin/settings')
}
