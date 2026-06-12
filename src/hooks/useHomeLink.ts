import { useAuth } from '@/features/auth/AuthContext'

export function useHomeLink(): string {
  const { user, loading } = useAuth()
  if (loading) return '/'
  return user ? '/feed' : '/'
}