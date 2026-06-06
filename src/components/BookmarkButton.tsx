import { useBookmark } from '@/hooks/useBookmark'

export default function BookmarkButton({ postId }: { postId: string }) {
    const { bookmarked, toggle } = useBookmark(postId)

    return (
        <button onClick={toggle}>
            {bookmarked ? '🔖 Saved' : '🔖 Save'}
        </button>
    )
}