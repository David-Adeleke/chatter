import { Link } from 'react-router-dom'
import { getNotificationText } from '@/lib/notificationText'
import type { Notification } from '@/types/notification'
import '@/styles/notifications.css'
import Avatar from '@/components/Avatar'

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
            className={`notif-item${notification.read ? ' notif-item--read' : ''}`}
            aria-label={`${getNotificationText(notification.type, actorName)}${notification.read ? ', read' : ', unread'}`}
        >
            <div className="notif-avatar-wrap">
                {actor?.avatar_url ? (
                    <Avatar
                        src={actor.avatar_url}
                        className="notif-avatar"
                        username={actor.username}
                        size={96}
                    />
                ) : (
                    <div className="notif-avatar-fallback" aria-hidden="true">
                        {actorName.charAt(0).toUpperCase()}
                    </div>
                )}
                {!notification.read && (
                    <span className="notif-unread-dot" aria-hidden="true" />
                )}
            </div>

            <div className="notif-body">
                <p className="notif-text">
                    {getNotificationText(notification.type, actorName)}
                </p>

                {notification.posts && (
                    <p className="notif-post-title">
                        {notification.posts.title}
                    </p>
                )}

                <time className="notif-date">
                    {new Date(notification.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    })}
                </time>
            </div>
        </Link>
    )
}