import { useLike } from '@/hooks/useLike'

export default function LikeButton({ postId }: { postId: string }) {
    const { liked, count, toggle, loading } = useLike(postId)

    return (
        <button onClick={toggle} disabled={loading}>
            {liked ? '♥' : '♡'} {count}
        </button>
    )
}