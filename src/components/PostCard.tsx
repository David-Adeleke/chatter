import { Link } from 'react-router-dom'
import type { PostWithAuthor } from '@/types/post'

interface PostCardProps {
  post: PostWithAuthor
}

export default function PostCard({ post }: PostCardProps) {
  const author = post.profiles

  return (
    <article className="post-card">

      <div className="post-card-author">
        <img
          src={author.avatar_url ?? '/default-avatar.png'}
          alt={author.username}
          className="post-card-avatar"
        />
        <Link to={`/@${author.username}`} className="post-card-author-name">
          {author.full_name ?? author.username}
        </Link>
        <span className="post-card-sep" aria-hidden="true">·</span>
        <time
          className="post-card-date"
          dateTime={post.published_at ?? undefined}
        >
          {new Date(post.published_at!).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </time>
      </div>

      <div className="post-card-body">
        <div className="post-card-text">
          <Link to={`/posts/${post.slug}`} className="post-card-link">
            <h2 className="post-card-title">{post.title}</h2>
            {post.excerpt && (
              <p className="post-card-excerpt">{post.excerpt}</p>
            )}
          </Link>
        </div>

        {post.cover_image_url && (
          <Link
            to={`/posts/${post.slug}`}
            className="post-card-thumb-link"
            tabIndex={-1}
            aria-hidden="true"
          >
            <img
              src={post.cover_image_url}
              alt=""
              className="post-card-thumb"
            />
          </Link>
        )}
      </div>

      <div className="post-card-meta">
        <span className="post-card-read-time">
          {post.reading_time_minutes} min read
        </span>
      </div>

    </article>
  )
}