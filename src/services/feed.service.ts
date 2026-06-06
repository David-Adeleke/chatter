import { supabase } from '@/lib/supabase'
import type { FeedOptions, FeedResult } from '@/types/feed'
import type { PostWithAuthor } from '@/types/post'

// Latest posts
export async function getLatestFeed(options: FeedOptions): Promise<FeedResult> {
    const { page, pageSize, tag } = options
    const from = page * pageSize
    const to = from + pageSize - 1

    let query = supabase
        .from('posts')
        .select(`*, profiles(username, full_name, avatar_url)`, { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .range(from, to)

    if (tag) {
        const { data: tagData } = await supabase
            .from('tags')
            .select('id')
            .eq('slug', tag)
            .single()

        if (tagData) {
            const { data: postIds } = await supabase
                .from('post_tags')
                .select('post_id')
                .eq('tag_id', tagData.id)

            const ids = postIds?.map(p => p.post_id) ?? []
            query = query.in('id', ids)
        }
    }

    const { data, count, error } = await query

    if (error) return { posts: [], hasMore: false, total: 0 }

    return {
        posts: (data as PostWithAuthor[]) ?? [],
        hasMore: (count ?? 0) > to + 1,
        total: count ?? 0,
    }
}

// Following feed
export async function getFollowingFeed(
    userId: string,
    options: FeedOptions
): Promise<FeedResult> {
    const { page, pageSize } = options
    const from = page * pageSize
    const to = from + pageSize - 1

    const { data: followed } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', userId)

    if (!followed || followed.length === 0) {
        return { posts: [], hasMore: false, total: 0 }
    }

    const authorIds = followed.map(f => f.following_id)

    const { data, count, error } = await supabase
        .from('posts')
        .select(`*, profiles(username, full_name, avatar_url)`, { count: 'exact' })
        .eq('status', 'published')
        .in('author_id', authorIds)
        .order('published_at', { ascending: false })
        .range(from, to)

    if (error) return { posts: [], hasMore: false, total: 0 }

    return {
        posts: (data as PostWithAuthor[]) ?? [],
        hasMore: (count ?? 0) > to + 1,
        total: count ?? 0,
    }
}

// Trending feed (last 24 hours by view count)
export async function getTrendingFeed(options: FeedOptions): Promise<FeedResult> {
    const { page, pageSize } = options
    const from = page * pageSize
    const to = from + pageSize - 1
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

    const { data: viewCounts } = await supabase
        .from('post_views')
        .select('post_id')
        .gte('viewed_at', since)

    if (!viewCounts || viewCounts.length === 0) {
        return getLatestFeed(options)
    }

    const countMap = viewCounts.reduce<Record<string, number>>((acc, { post_id }) => {
        acc[post_id] = (acc[post_id] ?? 0) + 1
        return acc
    }, {})

    const sortedIds = Object.entries(countMap)
        .sort(([, a], [, b]) => b - a)
        .map(([id]) => id)
        .slice(from, to + 1)

    if (sortedIds.length === 0) return { posts: [], hasMore: false, total: 0 }

    const { data, error } = await supabase
        .from('posts')
        .select(`*, profiles(username, full_name, avatar_url)`)
        .eq('status', 'published')
        .in('id', sortedIds)

    if (error) return { posts: [], hasMore: false, total: 0 }

    const ordered = sortedIds
        .map(id => (data as PostWithAuthor[]).find(p => p.id === id))
        .filter(Boolean) as PostWithAuthor[]

    return {
        posts: ordered,
        hasMore: Object.keys(countMap).length > to + 1,
        total: Object.keys(countMap).length,
    }
}

// Search
export async function searchPosts(
    query: string,
    options: FeedOptions
): Promise<FeedResult> {
    const { page, pageSize } = options
    const from = page * pageSize
    const to = from + pageSize - 1

    const { data, count, error } = await supabase
        .from('posts')
        .select(`*, profiles(username, full_name, avatar_url)`, { count: 'exact' })
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
        .order('published_at', { ascending: false })
        .range(from, to)

    if (error) return { posts: [], hasMore: false, total: 0 }

    return {
        posts: (data as PostWithAuthor[]) ?? [],
        hasMore: (count ?? 0) > to + 1,
        total: count ?? 0,
    }
}
