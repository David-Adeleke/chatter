import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()

    if (loading) return (
        <div className="empty-state">
            <p className="loading-text">Loading...</p>
        </div>
    )

    if (!user) return <Navigate to='/login' replace />
    return <>{children}</>
}