import type { PeriodComparison } from '@/types/analytics'

export default function MetricCard({ data }: { data: PeriodComparison }) {
    const isPositive = data.change >= 0

    return (
        <div>
            <p>{data.metric}</p>
            <p>{data.current.toLocaleString()}</p>
            <p style={{ color: isPositive ? 'green' : 'red' }}>
                {isPositive ? '↑' : '↓'} {Math.abs(data.changePercent)}% vs last 7 days
            </p>
            <p>Previous: {data.previous.toLocaleString()}</p>
        </div>
    )
}