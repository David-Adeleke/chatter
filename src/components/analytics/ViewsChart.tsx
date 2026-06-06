import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import type { DailyMetric } from '@/types/analytics'

interface ViewsChartProps {
    current: DailyMetric[]
    previous: DailyMetric[]
}

export default function ViewsChart({ current, previous }: ViewsChartProps) {
    const data = current.map((day, i) => ({
        date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        'This week': day.views,
        'Last week': previous[i]?.views ?? 0,
    }))

    return (
        <div>
            <h3>Views — last 7 days vs previous 7 days</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="This week" stroke="#c9993a" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Last week" stroke="#b0b0b0" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}