import { useState, useEffect } from 'react'
import { useAuth } from '@/features/auth/AuthContext'
import { updateProfile } from '@/services/profile.service'
// import { getProfileByUsername, updateProfile } from '@/services/profile.service'
import { uploadAvatar } from '@/services/storage.service'
import SEO from '@/components/SEO'
import { supabase } from '@/lib/supabase'

export default function SettingsPage() {
  const { user } = useAuth()
  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!user) return
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (!data) return
        setFullName(data.full_name ?? '')
        setBio(data.bio ?? '')
        setWebsite(data.website ?? '')
      })
  }, [user])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setSaving(true)

    let avatarUrl: string | undefined

    if (avatarFile) {
      const { url, error } = await uploadAvatar(user.id, avatarFile)
      if (error) { setMessage('Avatar upload failed'); setSaving(false); return }
      avatarUrl = url ?? undefined
    }

    const { error } = await updateProfile(user.id, {
      full_name: fullName,
      bio,
      website,
      ...(avatarUrl && { avatar_url: avatarUrl }),
    })

    setMessage(error ? error.message : 'Profile updated.')
    setSaving(false)
  }

  return (
    <main aria-labelledby="settings-heading">
      <SEO
        title="Edit Profile · Chatter"
        description="Update your Chatter profile information."
        url="/settings"
      />

      <h1 id="settings-heading">Edit Profile</h1>

      {message && (
        <p role="status" aria-live="polite">{message}</p>
      )}

      <form onSubmit={handleSave} noValidate aria-label="Edit profile form">

        <label htmlFor="full-name">Full name</label>
        <input
          id="full-name"
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="Full name"
          autoComplete="name"
        />

        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
          placeholder="Tell readers about yourself"
        />

        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website}
          onChange={e => setWebsite(e.target.value)}
          placeholder="https://yourwebsite.com"
          autoComplete="url"
        />

        <label htmlFor="avatar">Profile photo</label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          aria-describedby="avatar-hint"
          onChange={e => setAvatarFile(e.target.files?.[0] ?? null)}
        />
        <small id="avatar-hint">Accepted formats: JPG, PNG, GIF. Max 2MB.</small>

        <button
          type="submit"
          disabled={saving}
          aria-busy={saving}
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </main>
  )
}