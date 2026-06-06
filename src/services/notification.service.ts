import { supabase } from '@/lib/supabase'

export async function getNotifications(userId: string) {
    return supabase
        .from('notifications')
        .select(`
      *,
      profiles:actor_id(username, full_name, avatar_url),
      posts:post_id(title, slug)
    `)
        .eq('recipient_id', userId)
        .order('created_at', { ascending: false })
        .limit(30)
}

export async function markAsRead(notificationId: string) {
    return supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
}

export async function markAllAsRead(userId: string) {
    return supabase
        .from('notifications')
        .update({ read: true })
        .eq('recipient_id', userId)
        .eq('read', false)
}

export async function getUnreadCount(userId: string) {
    const { count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_id', userId)
        .eq('read', false)
    return count ?? 0
}