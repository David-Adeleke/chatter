import { Link } from 'react-router-dom'
import type { PostWithAuthor } from '@/types/post'

interface PostCardProps {
    post: PostWithAuthor
}

export default function PostCard({ post }: PostCardProps) {
    const author = post.profiles

    return (
        <article>
            <div>
                <Link to={`/@${author.username}`}>
                    <img
                        src={author.avatar_url ?? '/default-avatar.png'}
                        alt={author.username}
                    />
                    <span>{author.full_name ?? author.username}</span>
                </Link>
                <span>{new Date(post.published_at!).toLocaleDateString()}</span>
            </div>

            <Link to={`/posts/${post.slug}`}>
                <h2>{post.title}</h2>
                {post.excerpt && <p>{post.excerpt}</p>}
            </Link>

            <div>
                <span>{post.reading_time_minutes} min read</span>
            </div>
        </article>
    )
}