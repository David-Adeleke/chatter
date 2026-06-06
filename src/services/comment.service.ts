import { supabase } from '@/lib/supabase'

export interface CommentWithAuthor {
    id: string
    post_id: string
    author_id: string
    parent_id: string | null
    content: string
    created_at: string
    updated_at: string
    profiles: {
        username: string
        full_name: string | null
        avatar_url: string | null
    }
}

export async function getComments(postId: string) {
    const { data, error } = await supabase
        .from('comments')
        .select(`*, profiles(username, full_name, avatar_url)`)
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

    return { comments: (data as CommentWithAuthor[]) ?? [], error }
}

export async function addComment(
    postId: string,
    authorId: string,
    content: string,
    parentId?: string
) {
    return supabase
        .from('comments')
        .insert({
            post_id: postId,
            author_id: authorId,
            content,
            parent_id: parentId ?? null,
        })
        .select(`*, profiles(username, full_name, avatar_url)`)
        .single()
}

export async function deleteComment(commentId: string) {
    return supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
}

export async function updateComment(commentId: string, content: string) {
    return supabase
        .from('comments')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', commentId)
        .select(`*, profiles(username, full_name, avatar_url)`)
        .single()
}