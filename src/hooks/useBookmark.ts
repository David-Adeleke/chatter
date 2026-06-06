import { useState, useEffect } from 'react'
import { toggleBookmark, isBookmarked } from '@/services/social.service'
import { useAuth } from '@/features/auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export function useBookmark(postId: string) {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [bookmarked, setBookmarked] = useState(false)

    useEffect(() => {
        if (user) isBookmarked(user.id, postId).then(setBookmarked)
    }, [postId, user])

    const toggle = async () => {
        if (!user) { navigate('/login'); return }
        const wasBookmarked = bookmarked
        setBookmarked(!wasBookmarked)
        await toggleBookmark(user.id, postId)
    }

    return { bookmarked, toggle }
}