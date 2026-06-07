import { useLike } from '@/hooks/useLike'

export default function LikeButton({ postId }: { postId: string }) {
  const { liked, count, toggle, loading } = useLike(postId)

  return (
    <button
      className={`post-action-btn${liked ? ' post-action-btn--active' : ''}`}
      onClick={toggle}
      disabled={loading}
      aria-label={liked ? 'Unlike post' : 'Like post'}
      aria-pressed={liked}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      <span className="post-action-count">{count}</span>
    </button>
  )
}