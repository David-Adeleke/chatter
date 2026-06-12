import { supabase } from '@/lib/supabase'

export async function getProfileByUsername(username: string) {
  return supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()
}

export async function updateProfile(userId: string, updates: {
  full_name?: string
  bio?: string
  website?: string
  twitter?: string
  avatar_url?: string
}) {
  return supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
}

export async function getFollowCounts(profileId: string) {
  const [followers, following] = await Promise.all([
    supabase.from('follows').select('*', { count: 'exact', head: true }).eq('following_id', profileId),
    supabase.from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', profileId),
  ])
  return {
    followers: followers.count ?? 0,
    following: following.count ?? 0,
  }
}

export async function isFollowing(followerId: string, followingId: string) {
  const { data } = await supabase
    .from('follows')
    .select('follower_id')
    .eq('follower_id', followerId)
    .eq('following_id', followingId)
    .maybeSingle()
  return !!data
}

export async function followUser(followerId: string, followingId: string) {
  return supabase
    .from('follows')
    .upsert(
      { follower_id: followerId, following_id: followingId },
      { onConflict: 'follower_id,following_id' }
    )
}

export async function unfollowUser(followerId: string, followingId: string) {
  return supabase
    .from('follows')
    .delete()
    .eq('follower_id', followerId)
    .eq('following_id', followingId)
}