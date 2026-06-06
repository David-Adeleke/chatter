import { useState, useCallback } from 'react'
import { useAuth } from '@/features/auth/AuthContext'
import { useFeed } from '@/hooks/useFeed'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import PostCard from '@/components/PostCard'
import SearchBar from '@/components/SearchBar'
import type { FeedType } from '@/types/feed'

export function FeedPage() {
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
        <main>
            <SearchBar onSearch={handleSearch} />

            {!searchQuery && (
                <nav>
                    <button onClick={() => setFeedType('latest')}>Latest</button>
                    <button onClick={() => setFeedType('trending')}>Trending</button>
                    {user && (
                        <button onClick={() => setFeedType('following')}>Following</button>
                    )}
                </nav>
            )}

            {initialLoad && <p>Loading...</p>}

            {!initialLoad && posts.length === 0 && (
                <p>
                    {searchQuery
                        ? `No results for "${searchQuery}"`
                        : feedType === 'following'
                            ? 'Follow some authors to see their posts here.'
                            : 'No posts yet.'}
                </p>
            )}

            <div>
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            <div ref={sentinelRef} style={{ height: 1 }} />

            {loading && !initialLoad && <p>Loading more...</p>}
        </main>
    )
}