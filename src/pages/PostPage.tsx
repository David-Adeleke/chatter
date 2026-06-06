import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPostBySlug } from '@/services/post.service'
import { useComments } from '@/hooks/useComments'
import { useAuth } from '@/features/auth/AuthContext'
import { supabase } from '@/lib/supabase'
import SEO from '@/components/SEO'
import LikeButton from '@/components/LikeButton'
import BookmarkButton from '@/components/BookmarkButton'
import CommentThread from '@/components/CommentThread'
import type { PostWithAuthor } from '@/types/post'

const DEFAULT_DESCRIPTION = 'Read this post on Chatter'

export default function PostPage() {
    const { slug } = useParams<{ slug: string }>()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [post, setPost] = useState<PostWithAuthor | null>(null)
    const [loading, setLoading] = useState(true)
    const [newComment, setNewComment] = useState('')

    const { threads, submit, remove, edit } = useComments(post?.id ?? '')

    useEffect(() => {
        if (!slug) return
        getPostBySlug(slug).then(({ data }) => {
            if (!data) { navigate('/404'); return }
            setPost(data as PostWithAuthor)
            setLoading(false)
            supabase.functions.invoke('track-view', {
                body: { post_id: data.id, viewer_id: user?.id ?? null },
            })
        })
    }, [slug, navigate, user])

    const handleComment = async () => {
        if (!newComment.trim()) return
        await submit(newComment.trim())
        setNewComment('')
    }

    if (loading) return <p>Loading...</p>
    if (!post) return null

    return (
        <main aria-labelledby="post-heading">
            <SEO
                title={`${post.title} · Chatter`}
                description={post.excerpt ?? DEFAULT_DESCRIPTION}
                image={post.cover_image_url ?? undefined}
                url={`/posts/${post.slug}`}
                type="article"
                publishedAt={post.published_at ?? undefined}
                author={post.profiles.full_name ?? post.profiles.username}
            />

            <article aria-labelledby="post-heading">
                {post.cover_image_url && (
                    <img
                        src={post.cover_image_url}
                        alt={`Cover image for ${post.title}`}
                    />
                )}

                <header>
                    <h1 id="post-heading">{post.title}</h1>

                    <div>
                        <Link
                            to={`/@${post.profiles.username}`}
                            aria-label={`View profile of ${post.profiles.full_name ?? post.profiles.username}`}
                        >
                            <img
                                src={post.profiles.avatar_url ?? '/default-avatar.png'}
                                alt={`Avatar of ${post.profiles.full_name ?? post.profiles.username}`}
                            />
                            <span>{post.profiles.full_name ?? post.profiles.username}</span>
                        </Link>
                        <span aria-label={`${post.reading_time_minutes} minute read`}>
                            {post.reading_time_minutes} min read
                        </span>
                        <time dateTime={post.published_at!}>
                            {new Date(post.published_at!).toLocaleDateString()}
                        </time>
                    </div>
                </header>

                <div
                    dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
                    aria-label="Post content"
                />

                <footer aria-label="Post actions">
                    <LikeButton postId={post.id} />
                    <BookmarkButton postId={post.id} />
                    {user?.id === post.author_id && (
                        <Link to={`/edit/${post.id}`}>Edit post</Link>
                    )}
                </footer>
            </article>

            <section aria-labelledby="comments-heading">
                <h2 id="comments-heading">Comments</h2>

                {user ? (
                    <form
                        onSubmit={e => { e.preventDefault(); handleComment() }}
                        aria-label="Add a comment"
                    >
                        <label htmlFor="new-comment" className="sr-only">Your comment</label>
                        <textarea
                            id="new-comment"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            placeholder="Share your thoughts..."
                            aria-required="true"
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                        >
                            Post comment
                        </button>
                    </form>
                ) : (
                    <p><Link to="/login">Log in</Link> to comment.</p>
                )}

                <ul role="list" aria-label="Comments" aria-live="polite">
                    {threads.map(thread => (
                        <li key={thread.id}>
                            <CommentThread
                                thread={thread}
                                onReply={submit}
                                onDelete={remove}
                                onEdit={edit}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}