import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { getComments, addComment, deleteComment, updateComment } from '@/services/comment.service'
import type { CommentWithAuthor } from '@/services/comment.service'
import { useAuth } from '@/features/auth/AuthContext'

export interface CommentThread extends CommentWithAuthor {
    replies: CommentWithAuthor[]
}

function buildThreads(comments: CommentWithAuthor[]): CommentThread[] {
    const topLevel = comments.filter(c => !c.parent_id)
    return topLevel.map(comment => ({
        ...comment,
        replies: comments.filter(c => c.parent_id === comment.id),
    }))
}

export function useComments(postId: string) {
    const { user } = useAuth()
    const [threads, setThreads] = useState<CommentThread[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!postId) return

        getComments(postId).then(({ comments }) => {
            setThreads(buildThreads(comments))
            setLoading(false)
        })

        const channel = supabase
            .channel(`comments:${postId}`)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'comments', filter: `post_id=eq.${postId}` },
                () => {
                    getComments(postId).then(({ comments }) => {
                        setThreads(buildThreads(comments))
                    })
                }
            )
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [postId])

    const submit = async (content: string, parentId?: string) => {
        if (!user) return
        await addComment(postId, user.id, content, parentId)
    }

    const remove = async (commentId: string) => {
        await deleteComment(commentId)
    }

    const edit = async (commentId: string, content: string) => {
        await updateComment(commentId, content)
    }

    return { threads, loading, submit, remove, edit }
}