import type { NotificationType } from '@/types/notification'

export function getNotificationText(type: NotificationType, actorName: string): string {
    switch (type) {
        case 'new_like':
            return `${actorName} liked your post`
        case 'new_comment':
            return `${actorName} commented on your post`
        case 'comment_reply':
            return `${actorName} replied to your comment`
        case 'new_follower':
            return `${actorName} started following you`
    }
}