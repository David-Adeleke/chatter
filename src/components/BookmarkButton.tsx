import { useBookmark } from '@/hooks/useBookmark'

export default function BookmarkButton({ postId }: { postId: string }) {
  const { bookmarked, toggle } = useBookmark(postId)

  return (
    <button
      className={`post-action-btn${bookmarked ? ' post-action-btn--active' : ''}`}
      onClick={toggle}
      aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark post'}
      aria-pressed={bookmarked}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={bookmarked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      </svg>
    </button>
  )
}