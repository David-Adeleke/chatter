import { useState, useRef, useEffect } from 'react'
import { useNotifications } from '@/hooks/useNotifications'
import NotificationItem from './NotificationItem'

export default function NotificationBell() {
    const [open, setOpen] = useState(false)
    const { notifications = [], unreadCount, loading, readOne, readAll } = useNotifications()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
          if (e.key === 'Escape') setOpen(false)
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
      }, [])

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <button onClick={() => setOpen(prev => !prev)}>
                🔔
                {unreadCount > 0 && (
                    <span>{unreadCount > 99 ? '99+' : unreadCount}</span>
                )}
            </button>

            {open && (
                <div>
                    <div>
                        <span>Notifications</span>
                        {unreadCount > 0 && (
                            <button onClick={readAll}>Mark all read</button>
                        )}
                    </div>

                    {loading && <p>Loading...</p>}

                    {!loading && notifications.length === 0 && (
                        <p>No notifications yet.</p>
                    )}

                    {notifications.map(notification => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onRead={readOne}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}