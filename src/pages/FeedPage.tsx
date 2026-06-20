import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import { useFeed } from '@/hooks/useFeed'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import SEO from '@/components/SEO'
import PostCard from '@/components/PostCard'
import SearchBar from '@/components/SearchBar'
import type { FeedType } from '@/types/feed'
import '@/styles/feed.css'

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

  useEffect(() => {
    if (user) setFeedType('following')
  }, [user])

  return (
    <main className="feed-page" aria-labelledby="feed-heading">
      <SEO title="Home · Chatter" description="Discover stories from writers on Chatter." url="/" />
      <h1 id="feed-heading" className="sr-only">Feed</h1>

      <div className="feed-layout">

        <section className="feed-main">
          <div className="feed-mobile-search" aria-label="Search stories">
            <SearchBar onSearch={handleSearch} placeholder="Search Chatter" />
          </div>
          {!searchQuery ? (
            <div className="feed-tabs-bar">
              <nav className="feed-tabs" aria-label="Feed filter">
                <button
                  className={`feed-tab${feedType === 'latest' ? ' feed-tab--active' : ''}`}
                  type="button"
                  onClick={() => setFeedType('latest')}
                  aria-pressed={feedType === 'latest'}
                >
                  For you
                </button>
                <button
                  className={`feed-tab${feedType === 'trending' ? ' feed-tab--active' : ''}`}
                  type="button"
                  onClick={() => setFeedType('trending')}
                  aria-pressed={feedType === 'trending'}
                >
                  Trending
                </button>
                {user && (
                  <button
                    className={`feed-tab${feedType === 'following' ? ' feed-tab--active' : ''}`}
                    type="button"
                    onClick={() => setFeedType('following')}
                    aria-pressed={feedType === 'following'}
                  >
                    Following
                  </button>
                )}
              </nav>
            </div>
          ) : (
            <div className="feed-search-header">
              <p className="feed-search-label">Search results for</p>
              <h2 className="feed-search-title">"{searchQuery}"</h2>
            </div>
          )}

          {initialLoad && (
            <div className="feed-skeletons" role="status" aria-label="Loading posts">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="feed-skeleton" />
              ))}
            </div>
          )}

          {!initialLoad && posts.length === 0 && (
            <div className="feed-empty" role="status" aria-live="polite">
              <p className="feed-empty-text">
                {searchQuery
                  ? 'No stories matched your search.'
                  : feedType === 'following'
                    ? "You're not following anyone yet."
                    : 'No stories yet.'}
              </p>
              {feedType === 'following' && !searchQuery && (
                <>
                  <p className="feed-empty-sub">
                    Follow some writers to see their stories here.
                  </p>
                  <Link to="/onboarding?from=discover" className="feed-empty-cta">
                    Discover writers →
                  </Link>
                </>
              )}
            </div>
          )}

          <ul
            className="feed-list"
            role="list"
            aria-label="Posts"
            aria-live="polite"
            aria-atomic="false"
          >
            {posts.map(post => (
              <li key={post.id} className="feed-item">
                <PostCard post={post} />
              </li>
            ))}
          </ul>

          <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />

          {loading && !initialLoad && (
            <div className="feed-loading-more" role="status" aria-live="polite">
              <span className="feed-loading-dots">
                <span /><span /><span />
              </span>
            </div>
          )}
        </section>

        <aside className="feed-sidebar" aria-label="Discover">
          <div className="feed-sidebar-search">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="feed-sidebar-section">
            <h2 className="feed-sidebar-heading">Recommended topics</h2>
            <div className="feed-topics">
              {['Technology', 'Design', 'Programming', 'Startups', 'Science', 'Writing', 'Culture'].map(topic => (
                <Link
                  key={topic}
                  to={`/tag/${topic.toLowerCase()}`}
                  className="feed-topic-pill"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>

          <div className="feed-sidebar-section">
            <p className="feed-sidebar-footer">
              <a href="#">Help</a> · <a href="#">Terms</a> · <a href="#">Privacy</a>
            </p>
          </div>
        </aside>

      </div>
    </main>
  )
}