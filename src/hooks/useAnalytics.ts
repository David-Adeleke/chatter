import { useState, useEffect } from 'react'
import { getPostAnalytics, computeComparisons } from '@/services/analytics.service'
import type { PostAnalytics, PeriodComparison } from '@/types/analytics'

export function useAnalytics(postId: string) {
    const [analytics, setAnalytics] = useState<PostAnalytics | null>(null)
    const [comparisons, setComparisons] = useState<PeriodComparison[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!postId) return
        getPostAnalytics(postId).then(data => {
            if (data) {
                setAnalytics(data)
                setComparisons(computeComparisons(data))
            }
            setLoading(false)
        })
    }, [postId])

    return { analytics, comparisons, loading }
}