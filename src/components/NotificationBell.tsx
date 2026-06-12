import { useState, useRef, useEffect } from 'react'
import { useNotifications } from '@/hooks/useNotifications'
import NotificationItem from './NotificationItem'
import '@/styles/notifications.css'

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
    <div ref={ref} className="notif-bell-wrap">
      <button
        className="notif-bell-btn"
        onClick={() => setOpen(prev => !prev)}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {unreadCount > 0 && (
          <span className="notif-bell-badge" aria-hidden="true">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="notif-dropdown"
          role="dialog"
          aria-label="Notifications"
        >
          <div className="notif-dropdown-header">
            <span className="notif-dropdown-title">Notifications</span>
            {unreadCount > 0 && (
              <button
                className="notif-mark-all-btn"
                onClick={readAll}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="notif-dropdown-list">
            {loading && (
              <p className="notif-loading" role="status" aria-live="polite">
                Loading...
              </p>
            )}

            {!loading && notifications.length === 0 && (
              <p className="notif-empty" role="status">
                No notifications yet.
              </p>
            )}

            {notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={readOne}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}