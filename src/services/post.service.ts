import { supabase } from '@/lib/supabase'
import type { CreatePostInput, PostStatus } from '@/types/post'
import { estimateReadingTime } from '@/lib/readingTime'

// Create a post
export async function createPost(authorId: string, input: CreatePostInput) {
    const { tags, ...postData } = input

    const { data: post, error } = await supabase
        .from('posts')
        .insert({
            ...postData,
            author_id: authorId,
            published_at: input.status === 'published' ? new Date().toISOString() : null,
        })
        .select()
        .single()

    if (error || !post) return { post: null, error }

    if (tags && tags.length > 0) {
        await attachTags(post.id, tags)
    }

    return { post, error: null }
}

// Update a post
export async function updatePost(postId: string, updates: Partial<CreatePostInput>) {
    const { tags, content, ...rest } = updates

    const reading_time_minutes = content
        ? estimateReadingTime(content.replace(/<[^>]*>/g, ''))
        : undefined

    const { data: post, error } = await supabase
        .from('posts')
        .update({
            ...rest,
            ...(content !== undefined && { content }),
            ...(reading_time_minutes !== undefined && { reading_time_minutes }),
            ...(rest.status === 'published' && { published_at: new Date().toISOString() }),
            updated_at: new Date().toISOString(),
        })
        .eq('id', postId)
        .select()
        .single()

    if (error || !post) return { post: null, error }

    if (tags !== undefined) {
        await replaceTags(post.id, tags)
    }

    return { post, error: null }
}

// Get a single post by slug
export async function getPostBySlug(slug: string) {
    return supabase
        .from('posts')
        .select(`*, profiles(username, full_name, avatar_url)`)
        .eq('slug', slug)
        .eq('status', 'published')
        .single()
}

// Get posts for a user 
export async function getUserPosts(authorId: string, status?: PostStatus) {
    let query = supabase
        .from('posts')
        .select('*')
        .eq('author_id', authorId)
        .order('updated_at', { ascending: false })

    if (status) query = query.eq('status', status)

    return query
}

//   Tag helpers
async function attachTags(postId: string, tagNames: string[]) {
    for (const name of tagNames) {
        const slug = name.toLowerCase().replace(/\s+/g, '-')

        const { data: tag } = await supabase
            .from('tags')
            .upsert({ name, slug }, { onConflict: 'slug' })
            .select()
            .single()

        if (tag) {
            await supabase
                .from('post_tags')
                .upsert({ post_id: postId, tag_id: tag.id })
        }
    }
}

async function replaceTags(postId: string, tagNames: string[]) {
    await supabase.from('post_tags').delete().eq('post_id', postId)
    if (tagNames.length > 0) await attachTags(postId, tagNames)
}
