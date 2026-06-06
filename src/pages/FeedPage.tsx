import { useState, useCallback } from 'react'
import { useAuth } from '@/features/auth/AuthContext'
import { useFeed } from '@/hooks/useFeed'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import SEO from '@/components/SEO'
import PostCard from '@/components/PostCard'
import SearchBar from '@/components/SearchBar'
import type { FeedType } from '@/types/feed'

export default function FeedPage() {
    const { user } = useAuth()
    const [feedType, setFeedType] = useState<FeedType>('latest')
    const [searchQuery, setSearchQuery] = useState('')

    const { posts, loading, initialLoad, hasMore, loadMore } = useFeed({
        type: searchQuery ? 'latest' : feedType,
        searchQuery: searchQuery || undefined,
    })

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query)
    }, [])

    const sentinelRef = useInfiniteScroll(loadMore, hasMore && !loading)

    return (
        <main aria-labelledby="feed-heading">
            <SEO title="Home · Chatter" description="Discover stories from writers on Chatter." url="/" />

            <h1 id="feed-heading" className="sr-only">Feed</h1>

            <SearchBar onSearch={handleSearch} />

            {!searchQuery && (
                <nav aria-label="Feed filter">
                    <button
                        type="button"
                        onClick={() => setFeedType('latest')}
                        aria-pressed={feedType === 'latest'}
                        aria-current={feedType === 'latest' ? 'true' : undefined}
                    >
                        Latest
                    </button>
                    <button
                        type="button"
                        onClick={() => setFeedType('trending')}
                        aria-pressed={feedType === 'trending'}
                        aria-current={feedType === 'trending' ? 'true' : undefined}
                    >
                        Trending
                    </button>
                    {user && (
                        <button
                            type="button"
                            onClick={() => setFeedType('following')}
                            aria-pressed={feedType === 'following'}
                            aria-current={feedType === 'following' ? 'true' : undefined}
                        >
                            Following
                        </button>
                    )}
                </nav>
            )}

            {initialLoad && (
                <p role="status" aria-live="polite" aria-busy="true">Loading...</p>
            )}

            {!initialLoad && posts.length === 0 && (
                <p role="status" aria-live="polite">
                    {searchQuery
                        ? `No results for "${searchQuery}"`
                        : feedType === 'following'
                            ? 'Follow some authors to see their posts here.'
                            : 'No posts yet.'}
                </p>
            )}

            <ul role="list" aria-label="Posts" aria-live="polite">
                {posts.map(post => (
                    <li key={post.id}>
                        <PostCard post={post} />
                    </li>
                ))}
            </ul>

            <div
                ref={sentinelRef}
                style={{ height: 1 }}
                aria-hidden="true"
            />

            {loading && !initialLoad && (
                <p role="status" aria-live="polite" aria-busy="true">Loading more...</p>
            )}
        </main>
    )
}