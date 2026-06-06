export type PostStatus = 'draft' | 'published' | 'archived'

export interface Post {
    id: string
    author_id: string
    title: string
    slug: string
    excerpt: string | null
    content: string | null
    cover_image_url: string | null
    status: PostStatus
    reading_time_minutes: number
    published_at: string | null
    created_at: string
    updated_at: string
}

export interface PostWithAuthor extends Post {
    profiles: {
        username: string
        full_name: string | null
        avatar_url: string | null
    }
}

export type CreatePostInput = {
    title: string
    slug: string
    excerpt?: string
    content?: string
    cover_image_url?: string
    status: PostStatus
    reading_time_minutes: number
    tags?: string[]
}