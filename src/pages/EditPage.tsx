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
        // const { post: updated, error } = await save(
        //     { title, content, excerpt, tags: [], cover_image_url: post?.cover_image_url ?? '' },
        //     status
        // )
        // if (updated && !error) navigate(`/posts/${updated.slug}`)
        const result = await save(
            { title, content, excerpt, tags: [], cover_image_url: post?.cover_image_url ?? '' },
            status
        )
        if ('post' in result && result.post) navigate(`/posts/${result.post.slug}`)
    }

    if (!post) return <p>Loading...</p>

    return (
        <main aria-labelledby="edit-heading">
            <h1 id="edit-heading" className="sr-only">Edit post</h1>

            <div role="toolbar" aria-label="Post actions">
                <button
                    type="button"
                    onClick={() => handleSave('draft')}
                    disabled={saving}
                >
                    Save draft
                </button>
                <button
                    type="button"
                    onClick={() => handleSave('published')}
                    disabled={saving}
                    aria-busy={saving}
                >
                    {saving ? 'Saving...' : 'Update'}
                </button>
            </div>

            <form noValidate aria-label="Edit post form">
                <label htmlFor="edit-title">Title</label>
                <input
                    id="edit-title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Post title"
                    autoComplete="off"
                    required
                />

                <label htmlFor="edit-excerpt">Excerpt</label>
                <input
                    id="edit-excerpt"
                    type="text"
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    placeholder="Short description"
                    autoComplete="off"
                />

                <div role="region" aria-label="Post content editor">
                    <Editor content={content} onChange={setContent} />
                </div>
            </form>
        </main>
    )
}