import { useEffect, useState } from 'react'
import { getProfileByUsername, getFollowCounts, isFollowing } from '@/services/profile.service'
import { useAuth } from '@/features/auth/AuthContext'
import type { Database } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

export function useProfile(username: string) {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [followCounts, setFollowCounts] = useState({ followers: 0, following: 0 })
  const [following, setFollowing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await getProfileByUsername(username)
      if (!data) { setLoading(false); return }

      setProfile(data)

      const [counts, followStatus] = await Promise.all([
        getFollowCounts(data.id),
        user ? isFollowing(user.id, data.id) : Promise.resolve(false),
      ])

      setFollowCounts(counts)
      setFollowing(followStatus)
      setLoading(false)
    }

    load()
  }, [username, user])

  return { profile, followCounts, following, setFollowing, loading }
}