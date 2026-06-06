import { Link } from 'react-router-dom'
import { getNotificationText } from '@/lib/notificationText'
import type { Notification } from '@/types/notification'

interface NotificationItemProps {
    notification: Notification
    onRead: (id: string) => void
}

export default function NotificationItem({ notification, onRead }: NotificationItemProps) {
    const actor = notification.profiles
    const actorName = actor?.full_name ?? actor?.username ?? 'Someone'

    const href = notification.posts
        ? `/posts/${notification.posts.slug}`
        : actor
            ? `/@${actor.username}`
            : '#'

    const handleClick = () => {
        if (!notification.read) onRead(notification.id)
    }

    return (
        <Link
            to={href}
            onClick={handleClick}
            style={{ opacity: notification.read ? 0.5 : 1 }}
        >
            {actor?.avatar_url && (
                <img src={actor.avatar_url} alt={actorName} />
            )}
            <div>
                <p>{getNotificationText(notification.type, actorName)}</p>
                {notification.posts && (
                    <p>{notification.posts.title}</p>
                )}
                <span>{new Date(notification.created_at).toLocaleDateString()}</span>
            </div>
            {!notification.read && <span>●</span>}
        </Link>
    )
}