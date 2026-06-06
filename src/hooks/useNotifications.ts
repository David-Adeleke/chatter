import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { getNotifications, markAsRead, markAllAsRead, getUnreadCount } from '@/services/notification.service'
import { useAuth } from '@/features/auth/AuthContext'
import type { Notification } from '@/types/notification'

export function useNotifications() {
    const { user } = useAuth()
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return

        async function load() {
            const [{ data }, count] = await Promise.all([
                getNotifications(user!.id),
                getUnreadCount(user!.id),
            ])
            setNotifications((data as Notification[]) ?? [])
            setUnreadCount(count)
            setLoading(false)
        }

        load()

        const channel = supabase
            .channel(`notifications:${user.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notifications',
                    filter: `recipient_id=eq.${user.id}`,
                },
                () => { load() }
            )
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [user])

    const readOne = async (id: string) => {
        await markAsRead(id)
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
    }

    const readAll = async () => {
        if (!user) return
        await markAllAsRead(user.id)
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
        setUnreadCount(0)
    }

    return { notifications, unreadCount, loading, readOne, readAll }
}