import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import Editor from '@/components/Editor'
import { usePost } from '@/hooks/usePost'
import type { Post } from '@/types/post'

export default function EditPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [post, setPost] = useState<Post | null>(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const { save, saving } = usePost(id)

    useEffect(() => {
        if (!id) return
        supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single()
            .then(({ data }) => {
                if (!data) return
                setPost(data)
                setTitle(data.title)
                setContent(data.content ?? '')
                setExcerpt(data.excerpt ?? '')
            })
    }, [id])

    const handleSave = async (status: 'draft' | 'published') => {
        const { post: updated, error } = await save(
            { title, content, excerpt, tags: [], cover_image_url: post?.cover_image_url ?? '' },
            status
        )
        if (updated && !error) navigate(`/posts/${updated.slug}`)
    }

    if (!post) return <p>Loading...</p>

    return (
        <main>
            <button onClick={() => handleSave('draft')}>Save draft</button>
            <button onClick={() => handleSave('published')} disabled={saving}>Update</button>

            <input value={title} onChange={e => setTitle(e.target.value)} />
            <input value={excerpt} onChange={e => setExcerpt(e.target.value)} />
            <Editor content={content} onChange={setContent} />
        </main>
    )
}