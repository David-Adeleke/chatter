import { supabase } from '@/lib/supabase'

export async function toggleLike(userId: string, postId: string) {
    const { data } = await supabase
        .from('likes')
        .select('user_id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .maybeSingle()

    if (data) {
        return supabase
            .from('likes')
            .delete()
            .eq('user_id', userId)
            .eq('post_id', postId)
    }
 
    return supabase
        .from('likes')
        .insert({ user_id: userId, post_id: postId })
}

export async function getLikeCount(postId: string) {
    const { count } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId)
    return count ?? 0
}

export async function isLiked(userId: string, postId: string) {
    const { data } = await supabase
        .from('likes')
        .select('user_id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .maybeSingle()
    return !!data
}

export async function toggleBookmark(userId: string, postId: string) {
    const { data } = await supabase
        .from('bookmarks')
        .select('user_id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .maybeSingle()

    if (data) {
        return supabase
            .from('bookmarks')
            .delete()
            .eq('user_id', userId)
            .eq('post_id', postId)
    }

    return supabase
        .from('bookmarks')
        .insert({ user_id: userId, post_id: postId })
}

export async function isBookmarked(userId: string, postId: string) {
    const { data } = await supabase
        .from('bookmarks')
        .select('user_id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .maybeSingle()
    return !!data
}