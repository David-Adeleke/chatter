import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthContext'
import { followUser } from '@/services/profile.service'
import HomeLink from '@/components/HomeLink'
import SEO from '@/components/SEO'
import '@/styles/onboarding.css'

interface SuggestedProfile {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  follower_count: number
  post_count: number
}

export default function OnboardingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [profiles, setProfiles] = useState<SuggestedProfile[]>([])
  const [followed, setFollowed] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      if (!user) return

      const { data: profileData } = await supabase
        .from('profiles')
        .select('id, username, full_name, avatar_url, bio')
        .neq('id', user.id)
        .limit(12)

      if (!profileData) { setLoading(false); return }

      const enriched: SuggestedProfile[] = await Promise.all(
        profileData.map(async p => {
          const [{ count: followerCount }, { count: postCount }] = await Promise.all([
            supabase
              .from('follows')
              .select('*', { count: 'exact', head: true })
              .eq('following_id', p.id),
            supabase
              .from('posts')
              .select('*', { count: 'exact', head: true })
              .eq('author_id', p.id)
              .eq('status', 'published'),
          ])
          return {
            ...p,
            follower_count: followerCount ?? 0,
            post_count: postCount ?? 0,
          }
        })
      )

      // Sort by follower count descending
      enriched.sort((a, b) => b.follower_count - a.follower_count)
      setProfiles(enriched)
      setLoading(false)
    }

    load()
  }, [user])

  const toggleFollow = (profileId: string) => {
    setFollowed(prev => {
      const next = new Set(prev)
      if (next.has(profileId)) {
        next.delete(profileId)
      } else {
        next.add(profileId)
      }
      return next
    })
  }

  const handleDone = async () => {
    if (!user) return
    setSaving(true)

    await Promise.all(
      [...followed].map(id => followUser(user.id, id))
    )

    // Mark onboarding complete so we don't redirect here again
    localStorage.setItem(`chatter_onboarded_${user.id}`, 'true')
    navigate('/feed')
  }

  const handleSkip = () => {
    if (user) localStorage.setItem(`chatter_onboarded_${user.id}`, 'true')
    navigate('/feed')
  }

  return (
    <>
      <SEO title="Who to follow" />
      <div className="onboarding-page">

        <div className="onboarding-header">
          <HomeLink className="onboarding-logo">Chatter</HomeLink>
          <div className="onboarding-progress">
            <div className="onboarding-progress-bar" />
          </div>
        </div>

        <div className="onboarding-content">
          <div className="onboarding-title-block">
            <h1 className="onboarding-title">Who do you want to hear from?</h1>
            <p className="onboarding-subtitle">
              Follow a few writers to personalise your feed. You can always change this later.
            </p>
          </div>

          {loading ? (
            <div className="onboarding-skeletons">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="onboarding-skeleton" />
              ))}
            </div>
          ) : (
            <ul className="onboarding-grid" role="list">
              {profiles.map(profile => {
                const isFollowing = followed.has(profile.id)
                return (
                  <li key={profile.id} className="onboarding-card">
                    <div className="onboarding-card-top">
                      <img
                        src={profile.avatar_url ?? '/default-avatar.png'}
                        alt={profile.username}
                        className="onboarding-avatar"
                      />
                      <button
                        className={`onboarding-follow-btn${isFollowing ? ' onboarding-follow-btn--active' : ''}`}
                        onClick={() => toggleFollow(profile.id)}
                        aria-pressed={isFollowing}
                        aria-label={isFollowing ? `Unfollow ${profile.username}` : `Follow ${profile.username}`}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </button>
                    </div>

                    <div className="onboarding-card-info">
                      <p className="onboarding-card-name">
                        {profile.full_name ?? profile.username}
                      </p>
                      <p className="onboarding-card-handle">@{profile.username}</p>
                      {profile.bio && (
                        <p className="onboarding-card-bio">{profile.bio}</p>
                      )}
                      <div className="onboarding-card-stats">
                        <span>{profile.follower_count.toLocaleString()} followers</span>
                        <span aria-hidden="true">·</span>
                        <span>{profile.post_count} {profile.post_count === 1 ? 'story' : 'stories'}</span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          <div className="onboarding-actions">
            <button
              className="onboarding-done-btn"
              onClick={handleDone}
              disabled={saving}
            >
              {saving
                ? 'Saving...'
                : followed.size > 0
                ? `Follow ${followed.size} writer${followed.size !== 1 ? 's' : ''} and continue`
                : 'Continue'}
            </button>
            <button className="onboarding-skip-btn" onClick={handleSkip}>
              Skip for now
            </button>
          </div>
        </div>

      </div>
    </>
  )
}