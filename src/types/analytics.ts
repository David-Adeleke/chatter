export interface DailyMetric {
    date: string
    views: number
    likes: number
    comments: number
}

export interface PostAnalytics {
    post_id: string
    title: string
    slug: string
    total_views: number
    total_likes: number
    total_comments: number
    total_bookmarks: number
    last_7_days: DailyMetric[]
    prev_7_days: DailyMetric[]
}

export interface PeriodComparison {
    metric: string
    current: number
    previous: number
    change: number
    changePercent: number
}