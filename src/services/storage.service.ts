import { supabase } from '@/lib/supabase'

export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split('.').pop()
  const filePath = `${userId}/avatar.${fileExt}`

  const { error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true })

  if (error) return { url: null, error }

  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  return { url: data.publicUrl, error: null }
}