import { useState, useCallback } from 'react'
import { createPost, updatePost } from '@/services/post.service'
import { generateUniqueSlug } from '@/lib/slug'
import { useAuth } from '@/features/auth/AuthContext'
import type { PostStatus } from '@/types/post'

interface PostDraft {
    title: string
    content: string
    excerpt: string
    tags: string[]
    cover_image_url: string
}

export function usePost(existingPostId?: string) {
    const { user } = useAuth()
    const [saving, setSaving] = useState(false)
    const [postId, setPostId] = useState<string | undefined>(existingPostId)

    const save = useCallback(async (draft: PostDraft, status: PostStatus) => {
        if (!user) return { error: 'Not authenticated' }
        setSaving(true)

        const result = postId
            ? await updatePost(postId, { ...draft, status })
            : await createPost(user.id, {
                ...draft,
                slug: generateUniqueSlug(draft.title),
                status,
            })

        if (result.post && !postId) setPostId(result.post.id)

        setSaving(false)
        return result
    }, [user, postId])

    return { save, saving, postId }
}