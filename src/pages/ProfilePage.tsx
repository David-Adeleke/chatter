import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import { useProfile } from '@/hooks/useProfile'
import { followUser, unfollowUser } from '@/services/profile.service'

export function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { profile, followCounts, following, setFollowing, loading } = useProfile(username!)

  if (loading) return <p>Loading...</p>
  if (!profile) return <p>Profile not found.</p>

  const isOwner = user?.id === profile.id

  const handleFollow = async () => {
    if (!user) { navigate('/login'); return }
    if (following) {
      await unfollowUser(user.id, profile.id)
      setFollowing(false)
    } else {
      await followUser(user.id, profile.id)
      setFollowing(true)
    }
  }

  return (
    <main>
      <img src={profile.avatar_url ?? '/default-avatar.png'} alt={profile.username} />
      <h1>{profile.full_name ?? profile.username}</h1>
      <p>@{profile.username}</p>
      {profile.bio && <p>{profile.bio}</p>}
      <p>{followCounts.followers} followers · {followCounts.following} following</p>

      {isOwner ? (
        <button onClick={() => navigate('/settings')}>Edit profile</button>
      ) : (
        <button onClick={handleFollow}>
          {following ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </main>
  )
}