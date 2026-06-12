import { useState, useEffect, useCallback } from 'react'
import {
  getLatestFeed,
  getFollowingFeed,
  getTrendingFeed,
  searchPosts,
} from '@/services/feed.service'
import { useAuth } from '@/features/auth/AuthContext'
import type { PostWithAuthor } from '@/types/post'
import type { FeedType } from '@/types/feed'

const PAGE_SIZE = 10

interface UseFeedOptions {
  type: FeedType
  tag?: string
  searchQuery?: string
}

export function useFeed({ type, tag, searchQuery }: UseFeedOptions) {
  const { user } = useAuth()
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)

  const fetchPage = useCallback(
    async (pageNum: number, replace: boolean) => {
      setLoading(true)

      const options = { page: pageNum, pageSize: PAGE_SIZE, tag, searchQuery }
      let result

      if (searchQuery) {
        result = await searchPosts(searchQuery, options)
      } else if (type === 'following') {
        if (!user) {
          // Not authenticated — show empty, not latest
          result = { posts: [], hasMore: false, total: 0 }
        } else {
          result = await getFollowingFeed(user.id, options)
        }
      } else if (type === 'trending') {
        result = await getTrendingFeed(options)
      } else {
        result = await getLatestFeed(options)
      }

      setPosts(prev => replace ? result.posts : [...prev, ...result.posts])
      setHasMore(result.hasMore)
      setLoading(false)
      setInitialLoad(false)
    },
    [type, tag, searchQuery, user]
  )

  useEffect(() => {
    setPosts([])
    setPage(0)
    setHasMore(true)
    setInitialLoad(true)
    fetchPage(0, true)
  }, [type, tag, searchQuery, user])

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return
    const nextPage = page + 1
    setPage(nextPage)
    fetchPage(nextPage, false)
  }, [loading, hasMore, page, fetchPage])

  return { posts, loading, initialLoad, hasMore, loadMore }
}