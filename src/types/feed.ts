import type { PostWithAuthor } from './post'

export interface FeedOptions {
    page: number
    pageSize: number
    tag?: string
    searchQuery?: string
}

export interface FeedResult {
    posts: PostWithAuthor[]
    hasMore: boolean
    total: number
}

export type FeedType = 'latest' | 'following' | 'trending'