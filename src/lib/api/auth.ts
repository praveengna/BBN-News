import { createClient } from '@/lib/supabase/server'

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  // Fetch the role from the profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name, avatar_url')
    .eq('id', user.id)
    .single()

  return {
    ...user,
    role: profile?.role || 'reader',
    full_name: profile?.full_name,
    avatar_url: profile?.avatar_url,
  }
}

export async function requireAdmin() {
  const user = await getUser()
  if (!user || user.role !== 'admin') {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireEditor() {
  const user = await getUser()
  if (!user || !['admin', 'editor'].includes(user.role)) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireReporter() {
  const user = await getUser()
  if (!user || !['admin', 'editor', 'reporter'].includes(user.role)) {
    throw new Error('Unauthorized')
  }
  return user
}
