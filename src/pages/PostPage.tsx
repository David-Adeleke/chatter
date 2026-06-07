import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPostBySlug } from '@/services/post.service'
import { useComments } from '@/hooks/useComments'
import { useAuth } from '@/features/auth/AuthContext'
import LikeButton from '@/components/LikeButton'
import BookmarkButton from '@/components/BookmarkButton'
import CommentThread from '@/components/CommentThread'
import SEO from '@/components/SEO'
import type { PostWithAuthor } from '@/types/post'
import '@/styles/post.css'

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
    getPostBySlug(slug).then(({ data, error: fetchError }) => {
      console.log('data:', data)
      console.log('error:', fetchError)
      if (!data) {
        setLoading(false)
        return
      }
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

  if (loading) {
    return (
      <div className="post-loading">
        <div className="post-skeleton-title" />
        <div className="post-skeleton-meta" />
        <div className="post-skeleton-body" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="post-not-found">
        <SEO title="Post not found" />
        <h1 className="post-not-found-title">Story not found</h1>
        <p className="post-not-found-text">
          This story may have been removed or never existed.
        </p>
        <Link to="/" className="post-not-found-link">
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt ?? undefined}
        image={post.cover_image_url ?? undefined}
        url={`/posts/${post.slug}`}
        type="article"
        publishedAt={post.published_at ?? undefined}
        author={post.profiles.full_name ?? post.profiles.username}
      />

      <div className="post-page">

        {/* Floating action bar */}
        <aside className="post-action-bar" aria-label="Post actions">
          <LikeButton postId={post.id} />
          <BookmarkButton postId={post.id} />
          {user?.id === post.author_id && (
            <Link
              to={`/edit/${post.id}`}
              className="post-action-edit"
              aria-label="Edit post"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </Link>
          )}
        </aside>

        <article className="post-article">

          {/* Header */}
          <header className="post-header">
            <h1 className="post-title">{post.title}</h1>

            {post.excerpt && (
              <p className="post-excerpt">{post.excerpt}</p>
            )}

            <div className="post-byline">
              <Link
                to={`/@${post.profiles.username}`}
                className="post-byline-author"
              >
                <img
                  src={post.profiles.avatar_url ?? '/default-avatar.png'}
                  alt={post.profiles.username}
                  className="post-byline-avatar"
                />
                <span className="post-byline-name">
                  {post.profiles.full_name ?? post.profiles.username}
                </span>
              </Link>

              <div className="post-byline-meta">
                <span className="post-byline-sep" aria-hidden="true">·</span>
                <span className="post-byline-read-time">
                  {post.reading_time_minutes} min read
                </span>
                <span className="post-byline-sep" aria-hidden="true">·</span>
                <time
                  className="post-byline-date"
                  dateTime={post.published_at ?? undefined}
                >
                  {new Date(post.published_at!).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </header>

          {/* Cover image */}
          {post.cover_image_url && (
            <figure className="post-cover">
              <img
                src={post.cover_image_url}
                alt={`Cover image for ${post.title}`}
                className="post-cover-img"
              />
            </figure>
          )}

          {/* Body */}
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
          />

          {/* Footer actions */}
          <footer className="post-footer">
            <div className="post-footer-actions">
              <LikeButton postId={post.id} />
              <BookmarkButton postId={post.id} />
            </div>

            <div className="post-footer-author">
              <img
                src={post.profiles.avatar_url ?? '/default-avatar.png'}
                alt={post.profiles.username}
                className="post-footer-avatar"
              />
              <div>
                <p className="post-footer-written">Written by</p>
                <Link
                  to={`/@${post.profiles.username}`}
                  className="post-footer-name"
                >
                  {post.profiles.full_name ?? post.profiles.username}
                </Link>
              </div>
            </div>
          </footer>

        </article>

        {/* Comments */}
        <section className="post-comments" aria-label="Comments">
          <h2 className="post-comments-title">
            Responses ({threads.length})
          </h2>

          {user ? (
            <div className="post-comment-compose">
              <img
                src={user.user_metadata.avatar_url ?? '/default-avatar.png'}
                alt="Your avatar"
                className="post-comment-compose-avatar"
              />
              <div className="post-comment-compose-field">
                <textarea
                  className="post-comment-textarea"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="What are your thoughts?"
                  rows={3}
                  aria-label="Write a comment"
                />
                <div className="post-comment-compose-actions">
                  <button
                    className="post-comment-submit"
                    onClick={handleComment}
                    disabled={!newComment.trim()}
                  >
                    Respond
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="post-comments-login">
              <p>
                <Link to="/login" className="post-comments-login-link">
                  Sign in
                </Link>{' '}
                to leave a response.
              </p>
            </div>
          )}

          <div className="post-comments-list">
            {threads.map(thread => (
              <CommentThread
                key={thread.id}
                thread={thread}
                onReply={submit}
                onDelete={remove}
                onEdit={edit}
              />
            ))}
          </div>
        </section>

      </div>
    </>
  )
}