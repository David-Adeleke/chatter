import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from '@/components/Editor'
import { usePost } from '@/hooks/usePost'

const AUTOSAVE_INTERVAL = 30_000

export function WritePage() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const { save, saving } = usePost()
    // const { save, saving, postId } = usePost()
    const autosaveRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        autosaveRef.current = setInterval(async () => {
            if (!title.trim()) return
            await save({ title, content, excerpt, tags, cover_image_url: '' }, 'draft')
            setLastSaved(new Date())
        }, AUTOSAVE_INTERVAL)

        return () => {
            if (autosaveRef.current) clearInterval(autosaveRef.current)
        }
    }, [title, content, excerpt, tags, save])

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key !== 'Enter' && e.key !== ',') return
        e.preventDefault()
        const tag = tagInput.trim().toLowerCase()
        if (!tag || tags.length >= 5 || tags.includes(tag)) return
        setTags(prev => [...prev, tag])
        setTagInput('')
    }

    const handlePublish = async () => {
        if (!title.trim()) return
        // const { post, error } = await save(
        //     { title, content, excerpt, tags, cover_image_url: '' },
        //     'published'
        // )
        // if (post && !error) navigate(`/posts/${post.slug}`)
        const result = await save(
            { title, content, excerpt, tags, cover_image_url: '' },
            'published'
        )
        if ('post' in result && result.post) navigate(`/posts/${result.post.slug}`)
    }

    return (
        <main>
            <div>
                <button onClick={() => save({ title, content, excerpt, tags, cover_image_url: '' }, 'draft')}>
                    Save draft
                </button>
                <button onClick={handlePublish} disabled={saving || !title.trim()}>
                    Publish
                </button>
                {lastSaved && <span>Saved {lastSaved.toLocaleTimeString()}</span>}
            </div>

            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Post title"
            />

            <input
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="Short description (shows in feed)"
            />

            <Editor content={content} onChange={setContent} />

            <div>
                <input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tags (press Enter, max 5)"
                    disabled={tags.length >= 5}
                />
                <div>
                    {tags.map(tag => (
                        <span key={tag}>
                            {tag}
                            <button onClick={() => setTags(prev => prev.filter(t => t !== tag))}>×</button>
                        </span>
                    ))}
                </div>
            </div>
        </main>
    )
}