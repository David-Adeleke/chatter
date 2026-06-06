import { supabase } from '@/lib/supabase'
import type { PostAnalytics, DailyMetric, PeriodComparison } from '@/types/analytics'

function getDateRange(daysAgo: number, length: number) {
    const end = new Date()
    end.setDate(end.getDate() - daysAgo)
    const start = new Date(end)
    start.setDate(start.getDate() - length)
    return {
        start: start.toISOString(),
        end: end.toISOString(),
    }
}

function groupByDay(rows: { date_col: string }[], dateKey: string): Record<string, number> {
    return rows.reduce<Record<string, number>>((acc, row) => {
        const day = (row as Record<string, string>)[dateKey].split('T')[0]
        acc[day] = (acc[day] ?? 0) + 1
        return acc
    }, {})
}

function buildDailyMetrics(
    views: Record<string, number>,
    likes: Record<string, number>,
    comments: Record<string, number>,
    start: string,
    days: number
): DailyMetric[] {
    return Array.from({ length: days }, (_, i) => {
        const date = new Date(start)
        date.setDate(date.getDate() + i)
        const key = date.toISOString().split('T')[0]
        return {
            date: key,
            views: views[key] ?? 0,
            likes: likes[key] ?? 0,
            comments: comments[key] ?? 0,
        }
    })
}

export async function getPostAnalytics(postId: string): Promise<PostAnalytics | null> {
    const current = getDateRange(0, 7)
    const previous = getDateRange(7, 7)

    const [
        { data: post },
        { data: allViews },
        { data: currentLikes },
        { data: prevLikes },
        { data: currentComments },
        { data: prevComments },
        { count: totalBookmarks },
    ] = await Promise.all([
        supabase.from('posts').select('id, title, slug').eq('id', postId).single(),
        supabase.from('post_views').select('viewed_at').eq('post_id', postId),
        supabase.from('likes').select('created_at').eq('post_id', postId).gte('created_at', current.start),
        supabase.from('likes').select('created_at').eq('post_id', postId).gte('created_at', previous.start).lt('created_at', current.start),
        supabase.from('comments').select('created_at').eq('post_id', postId).gte('created_at', current.start),
        supabase.from('comments').select('created_at').eq('post_id', postId).gte('created_at', previous.start).lt('created_at', current.start),
        supabase.from('bookmarks').select('*', { count: 'exact', head: true }).eq('post_id', postId),
    ])

    if (!post) return null

    const currentViews = (allViews ?? []).filter(v => v.viewed_at >= current.start)
    const prevViews = (allViews ?? []).filter(v => v.viewed_at >= previous.start && v.viewed_at < current.start)

    const viewsByDay = groupByDay(currentViews.map(v => ({ date_col: v.viewed_at })), 'date_col')
    const prevViewsByDay = groupByDay(prevViews.map(v => ({ date_col: v.viewed_at })), 'date_col')
    const likesByDay = groupByDay((currentLikes ?? []).map(l => ({ date_col: l.created_at })), 'date_col')
    const prevLikesByDay = groupByDay((prevLikes ?? []).map(l => ({ date_col: l.created_at })), 'date_col')
    const commentsByDay = groupByDay((currentComments ?? []).map(c => ({ date_col: c.created_at })), 'date_col')
    const prevCommentsByDay = groupByDay((prevComments ?? []).map(c => ({ date_col: c.created_at })), 'date_col')

    return {
        post_id: post.id,
        title: post.title,
        slug: post.slug,
        total_views: allViews?.length ?? 0,
        total_likes: (currentLikes?.length ?? 0) + (prevLikes?.length ?? 0),
        total_comments: (currentComments?.length ?? 0) + (prevComments?.length ?? 0),
        total_bookmarks: totalBookmarks ?? 0,
        last_7_days: buildDailyMetrics(viewsByDay, likesByDay, commentsByDay, current.start, 7),
        prev_7_days: buildDailyMetrics(prevViewsByDay, prevLikesByDay, prevCommentsByDay, previous.start, 7),
    }
}

export function computeComparisons(analytics: PostAnalytics): PeriodComparison[] {
    // const _metrics: Array<{ key: keyof Pick<PostAnalytics, 'last_7_days' | 'prev_7_days'>; label: string }> = [
    //     { key: 'last_7_days', label: 'Views' },
    // ]

    const sum = (days: DailyMetric[], field: keyof DailyMetric) =>
        days.reduce((acc, d) => acc + (d[field] as number), 0)

    const fields: Array<{ field: keyof DailyMetric; label: string }> = [
        { field: 'views', label: 'Views' },
        { field: 'likes', label: 'Likes' },
        { field: 'comments', label: 'Comments' },
    ]

    return fields.map(({ field, label }) => {
        const current = sum(analytics.last_7_days, field)
        const previous = sum(analytics.prev_7_days, field)
        const change = current - previous
        const changePercent = previous === 0 ? 100 : Math.round((change / previous) * 100)
        return { metric: label, current, previous, change, changePercent }
    })
}