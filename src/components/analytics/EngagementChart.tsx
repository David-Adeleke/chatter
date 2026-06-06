import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import type { DailyMetric } from '@/types/analytics'

export default function EngagementChart({ data }: { data: DailyMetric[] }) {
    const chartData = data.map(day => ({
        date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        Likes: day.likes,
        Comments: day.comments,
    }))

    return (
        <div>
            <h3>Engagement — last 7 days</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Likes" fill="#c9993a" />
                    <Bar dataKey="Comments" fill="#111111" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}