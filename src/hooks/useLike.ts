import { useState, useEffect } from 'react'
import { toggleLike, getLikeCount, isLiked } from '@/services/social.service'
import { useAuth } from '@/features/auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export function useLike(postId: string) {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [liked, setLiked] = useState(false)
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getLikeCount(postId).then(setCount)
        if (user) isLiked(user.id, postId).then(setLiked)
    }, [postId, user])

    const toggle = async () => {
        if (!user) { navigate('/login'); return }
        setLoading(true)
        const wasLiked = liked
        setLiked(!wasLiked)
        setCount(prev => wasLiked ? prev - 1 : prev + 1)
        await toggleLike(user.id, postId)
        setLoading(false)
    }

    return { liked, count, toggle, loading }
}