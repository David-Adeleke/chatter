import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from '@/components/Editor'
import SEO from '@/components/SEO'
import { usePost } from '@/hooks/usePost'

const AUTOSAVE_INTERVAL = 30_000

export default function WritePage() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const [draftSaving, setDraftSaving] = useState(false)
    const { save, saving } = usePost()
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

    const handleSaveDraft = async () => {
        if (!title.trim()) return
        setDraftSaving(true)
        await save({ title, content, excerpt, tags, cover_image_url: '' }, 'draft')
        setLastSaved(new Date())
        setDraftSaving(false)
    }

    const handlePublish = async () => {
        if (!title.trim()) return
        const result = await save(
            { title, content, excerpt, tags, cover_image_url: '' },
            'published'
        )
        if ('post' in result && result.post) navigate(`/posts/${result.post.slug}`)
    }

    return (
        <main aria-labelledby="write-heading">
            <SEO
                title="Write a post · Chatter"
                description="Write and publish your story on Chatter."
                url="/write"
            />

            <h1 id="write-heading" className="sr-only">Write a post</h1>

            <div role="toolbar" aria-label="Post actions">
                <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={draftSaving || saving || !title.trim()}
                    aria-busy={draftSaving}
                >
                    {draftSaving ? 'Saving...' : 'Save draft'}
                </button>
                <button
                    type="button"
                    onClick={handlePublish}
                    disabled={saving || draftSaving || !title.trim()}
                    aria-busy={saving}
                >
                    {saving ? 'Publishing...' : 'Publish'}
                </button>
                {lastSaved && (
                    <span aria-live="polite" aria-atomic="true">
                        Saved at {lastSaved.toLocaleTimeString()}
                    </span>
                )}
            </div>

            <form noValidate aria-label="Write post form">
                <label htmlFor="post-title">Title</label>
                <input
                    id="post-title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Post title"
                    autoComplete="off"
                    required
                    aria-required="true"
                />

                <label htmlFor="post-excerpt">Excerpt</label>
                <input
                    id="post-excerpt"
                    type="text"
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    placeholder="Short description (shows in feed)"
                    autoComplete="off"
                />

                <div role="region" aria-label="Post content editor">
                    <Editor content={content} onChange={setContent} />
                </div>

                <fieldset>
                    <legend>Tags</legend>
                    <label htmlFor="tag-input" className="sr-only">
                        Add a tag
                    </label>
                    <input
                        id="tag-input"
                        type="text"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Add tags (press Enter, max 5)"
                        disabled={tags.length >= 5}
                        aria-describedby="tag-hint"
                    />
                    <small id="tag-hint">
                        {tags.length >= 5
                            ? 'Maximum of 5 tags reached'
                            : `${5 - tags.length} tag${5 - tags.length === 1 ? '' : 's'} remaining`}
                    </small>

                    <ul role="list" aria-label="Added tags">
                        {tags.map(tag => (
                            <li key={tag}>
                                <span>{tag}</span>
                                <button
                                    type="button"
                                    onClick={() => setTags(prev => prev.filter(t => t !== tag))}
                                    aria-label={`Remove tag: ${tag}`}
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                </fieldset>
            </form>
        </main>
    )
}