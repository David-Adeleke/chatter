export type NotificationType = 'new_like' | 'new_comment' | 'new_follower' | 'comment_reply'

export interface Notification {
    id: string
    recipient_id: string
    actor_id: string | null
    type: NotificationType
    post_id: string | null
    comment_id: string | null
    read: boolean
    created_at: string
    profiles: {
        username: string
        full_name: string | null
        avatar_url: string | null
    } | null
    posts: {
        title: string
        slug: string
    } | null
}