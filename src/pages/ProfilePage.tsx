import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import { useProfile } from '@/hooks/useProfile'
import { useHomeLink } from '@/hooks/useHomeLink'
import SEO from '@/components/SEO'
import Avatar from '@/components/Avatar'
import { followUser, unfollowUser } from '@/services/profile.service'
import '@/styles/profile.css'

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const homeLink = useHomeLink()

  const { profile, followCounts, following, setFollowing, loading } = useProfile(username!)

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="profile-skeleton-avatar" />
        <div className="profile-skeleton-name" />
        <div className="profile-skeleton-bio" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="profile-not-found">
        <h1 className="profile-not-found-title">Profile not found</h1>
        <p className="profile-not-found-text">
          This writer doesn't exist or may have been removed.
        </p>
        <button
          className="profile-not-found-link"
          type="button"
          onClick={() => navigate(homeLink)}
        >
          Back to home
        </button>
      </div>
    )
  }

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
    <main className="profile-page" aria-labelledby="profile-heading">
      <SEO
        title={profile.full_name ?? profile.username}
        description={profile.bio ?? `Read stories by ${profile.username} on Chatter.`}
        image={profile.avatar_url ?? undefined}
        url={`/@${profile.username}`}
      />

      <div className="profile-inner">

        <header className="profile-header">
          <div className="profile-header-top">
            <div className="profile-header-info">
              <h1 className="profile-name" id="profile-heading">
                {profile.full_name ?? profile.username}
              </h1>

              <p className="profile-handle" aria-label="Username">
                @{profile.username}
              </p>

              {profile.bio && (
                <p className="profile-bio" aria-label="Bio">
                  {profile.bio}
                </p>
              )}

              <dl className="profile-stats" aria-label="Follow counts">
                <div className="profile-stat">
                  <dd className="profile-stat-number">
                    {followCounts.followers.toLocaleString()}
                  </dd>
                  <dt className="profile-stat-label">Followers</dt>
                </div>
                <div className="profile-stat-sep" aria-hidden="true" />
                <div className="profile-stat">
                  <dd className="profile-stat-number">
                    {followCounts.following.toLocaleString()}
                  </dd>
                  <dt className="profile-stat-label">Following</dt>
                </div>
              </dl>

              <div className="profile-actions">
                {isOwner ? (
                  <button
                    className="profile-btn-edit"
                    type="button"
                    onClick={() => navigate('/settings')}
                    aria-label="Edit your profile"
                  >
                    Edit profile
                  </button>
                ) : (
                  <button
                    className={`profile-btn-follow${following ? ' profile-btn-follow--active' : ''}`}
                    type="button"
                    onClick={handleFollow}
                    aria-pressed={following}
                    aria-label={following
                      ? `Unfollow ${profile.username}`
                      : `Follow ${profile.username}`
                    }
                  >
                    {following ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>
            </div>

            <Avatar
              src={profile.avatar_url ?? '/default-avatar.png'}
              username={ profile.username }
              className="profile-avatar"
              size={96}
            />
          </div>
        </header>

        <div className="profile-divider" role="separator" />

      </div>
    </main>
  )
}