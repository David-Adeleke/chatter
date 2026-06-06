import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPostBySlug } from '@/services/post.service'
import { useComments } from '@/hooks/useComments'
import { useAuth } from '@/features/auth/AuthContext'
import LikeButton from '@/components/LikeButton'
import BookmarkButton from '@/components/BookmarkButton'
import CommentThread from '@/components/CommentThread'
import type { PostWithAuthor } from '@/types/post'

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
        })
    }, [slug, navigate])

    const handleComment = async () => {
        if (!newComment.trim()) return
        await submit(newComment.trim())
        setNewComment('')
    }

    if (loading) return <p>Loading...</p>
    if (!post) return null

    return (
        <main>
            <article>
                {post.cover_image_url && (
                    <img src={post.cover_image_url} alt={post.title} />
                )}

                <header>
                    <h1>{post.title}</h1>

                    <div>
                        <Link to={`/@${post.profiles.username}`}>
                            <img src={post.profiles.avatar_url ?? '/default-avatar.png'} alt={post.profiles.username} />
                            <span>{post.profiles.full_name ?? post.profiles.username}</span>
                        </Link>
                        <span>{post.reading_time_minutes} min read</span>
                        <span>{new Date(post.published_at!).toLocaleDateString()}</span>
                    </div>
                </header>

                <div dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />

                <footer>
                    <LikeButton postId={post.id} />
                    <BookmarkButton postId={post.id} />
                    {user?.id === post.author_id && (
                        <Link to={`/edit/${post.id}`}>Edit post</Link>
                    )}
                </footer>
            </article>

            <section>
                <h2>Comments</h2>

                {user ? (
                    <div>
                        <textarea
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            placeholder="Share your thoughts..."
                        />
                        <button onClick={handleComment}>Post comment</button>
                    </div>
                ) : (
                    <p><Link to="/login">Log in</Link> to comment.</p>
                )}

                {threads.map(thread => (
                    <CommentThread
                        key={thread.id}
                        thread={thread}
                        onReply={submit}
                        onDelete={remove}
                        onEdit={edit}
                    />
                ))}
            </section>
        </main>
    )
}