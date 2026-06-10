import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from '@/components/Editor'
import SEO from '@/components/SEO'
import { usePost } from '@/hooks/usePost'
import '@/styles/editor.css'

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
        <main className="write-page" aria-labelledby="write-heading">
            <SEO
                title="Write a story"
                description="Write and publish your story on Chatter."
                url="/write"
            />

            <h1 id="write-heading" className="sr-only">Write a story</h1>

            {/* ── Toolbar ── */}
            <div className="write-toolbar" role="toolbar" aria-label="Post actions">
                <div className="write-toolbar-left">
                    <span className="write-toolbar-logo">Chatter</span>
                    {lastSaved && (
                        <span
                            className="write-toolbar-saved"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    )}
                </div>
                <div className="write-toolbar-right">
                    <button
                        className="write-btn-draft"
                        type="button"
                        onClick={handleSaveDraft}
                        disabled={draftSaving || saving || !title.trim()}
                        aria-busy={draftSaving}
                    >
                        {draftSaving ? 'Saving...' : 'Save draft'}
                    </button>
                    <button
                        className="write-btn-publish"
                        type="button"
                        onClick={handlePublish}
                        disabled={saving || draftSaving || !title.trim()}
                        aria-busy={saving}
                    >
                        {saving ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </div>

            {/* ── Form ── */}
            <div className="write-body">
                <form className="write-form" noValidate aria-label="Write post form">

                    <div className="write-field">
                        <label htmlFor="post-title" className="sr-only">Title</label>
                        <input
                            id="post-title"
                            className="write-title-input"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Title"
                            autoComplete="off"
                            required
                            aria-required="true"
                        />
                    </div>

                    <div className="write-field">
                        <label htmlFor="post-excerpt" className="sr-only">Excerpt</label>
                        <input
                            id="post-excerpt"
                            className="write-excerpt-input"
                            type="text"
                            value={excerpt}
                            onChange={e => setExcerpt(e.target.value)}
                            placeholder="Write a short description (shows in feed)..."
                            autoComplete="off"
                        />
                    </div>

                    <div
                        className="write-editor-wrap"
                        role="region"
                        aria-label="Post content editor"
                    >
                        <Editor content={content} onChange={setContent} />
                    </div>

                    <fieldset className="write-tags-fieldset">
                        <legend className="write-tags-legend">Tags</legend>

                        <div className="write-tags-input-row">
                            <label htmlFor="tag-input" className="sr-only">Add a tag</label>
                            <input
                                id="tag-input"
                                className="write-tag-input"
                                type="text"
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="Add a tag and press Enter (max 5)"
                                disabled={tags.length >= 5}
                                aria-describedby="tag-hint"
                            />
                            <small id="tag-hint" className="write-tag-hint">
                                {tags.length >= 5
                                    ? 'Maximum of 5 tags reached'
                                    : `${5 - tags.length} tag${5 - tags.length === 1 ? '' : 's'} remaining`}
                            </small>
                        </div>

                        {tags.length > 0 && (
                            <ul className="write-tags-list" role="list" aria-label="Added tags">
                                {tags.map(tag => (
                                    <li key={tag} className="write-tag-item">
                                        <span className="write-tag-label">{tag}</span>
                                        <button
                                            className="write-tag-remove"
                                            type="button"
                                            onClick={() => setTags(prev => prev.filter(t => t !== tag))}
                                            aria-label={`Remove tag: ${tag}`}
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </fieldset>

                </form>
            </div>
        </main>
    )
}