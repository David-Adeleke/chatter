import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import { useProfile } from '@/hooks/useProfile'
import SEO from '@/components/SEO'
import { followUser, unfollowUser } from '@/services/profile.service'

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  // const username = rawUsername?.startsWith('@') ? rawUsername.slice(1) : rawUsername
  const { user } = useAuth()
  const navigate = useNavigate()
  console.log('username from params:', username)

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
    <main aria-labelledby="profile-heading">
      <SEO
        title={`${profile.full_name ?? profile.username} · Chatter`}
        description={profile.bio ?? `Read stories by ${profile.username} on Chatter.`}
        image={profile.avatar_url ?? undefined}
        url={`/profile/${profile.username}`}
      />

      <header>
        <img
          src={profile.avatar_url ?? '/default-avatar.png'}
          alt={`Avatar of ${profile.full_name ?? profile.username}`}
        />

        <h1 id="profile-heading">
          {profile.full_name ?? profile.username}
        </h1>

        <p aria-label="Username">@{profile.username}</p>

        {profile.bio && (
          <p aria-label="Bio">{profile.bio}</p>
        )}

        <dl aria-label="Follow counts">
          <div>
            <dt>Followers</dt>
            <dd>{followCounts.followers}</dd>
          </div>
          <div>
            <dt>Following</dt>
            <dd>{followCounts.following}</dd>
          </div>
        </dl>

        {isOwner ? (
          <button
            type="button"
            onClick={() => navigate('/settings')}
            aria-label="Edit your profile"
          >
            Edit profile
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFollow}
            aria-pressed={following}
            aria-label={following
              ? `Unfollow ${profile.username}`
              : `Follow ${profile.username}`
            }
          >
            {following ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </header>
    </main>
  )
}