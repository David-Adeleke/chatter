import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@/features/auth/AuthContext'
import { followUser, unfollowUser, isFollowing } from '@/services/profile.service'
import type { PostWithAuthor } from '@/types/post'
import Avatar from '@/components/Avatar'
import { useEffect } from 'react'

interface PostCardProps {
  post: PostWithAuthor
}

export default function PostCard({ post }: PostCardProps) {
  const author = post.profiles
  const { user } = useAuth()
  const [following, setFollowing] = useState(false)
  const [loadingFollow, setLoadingFollow] = useState(false)

  const isOwnPost = user?.id === author.id

  useEffect(() => {
    if (!user || isOwnPost) return
    isFollowing(user.id, author.id).then(setFollowing)
  }, [user, author.id, isOwnPost])

  const handleFollow = async () => {
    if (!user) return
    setLoadingFollow(true)
    if (following) {
      await unfollowUser(user.id, author.id)
      setFollowing(false)
    } else {
      await followUser(user.id, author.id)
      setFollowing(true)
    }
    setLoadingFollow(false)
  }

  return (
    <article className="post-card">

      <div className="post-card-author">
        <Avatar
          src={author.avatar_url ?? '/default-avatar.png'}
          className="post-card-avatar"
          username={author.username}
          size={96}
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
        {user && !isOwnPost && (
          <button
            type="button"
            className={`post-card-follow-btn${following ? ' post-card-follow-btn--following' : ''}`}
            onClick={handleFollow}
            disabled={loadingFollow}
          >
            {following ? 'Following' : '+ Follow'}
          </button>
        )}
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