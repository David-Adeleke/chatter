import { useState, useEffect } from 'react'
import { useAuth } from '@/features/auth/AuthContext'
import { updateProfile } from '@/services/profile.service'
// import { getProfileByUsername, updateProfile } from '@/services/profile.service'
import { uploadAvatar } from '@/services/storage.service'
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
    <main>
      <h1>Edit Profile</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSave}>
        <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full name" />
        <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" />
        <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="Website" />
        <input type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files?.[0] ?? null)} />
        <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
      </form>
    </main>
  )
}