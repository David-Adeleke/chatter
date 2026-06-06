import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '@/components/SEO'
import { signInWithEmail, signInWithGoogle, signInWithGitHub } from '@/services/auth.service'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signInWithEmail(email, password)
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    navigate('/')
  }

  return (
    <main aria-labelledby="login-heading">
      <SEO
        title="Log in · Chatter"
        description="Log in to your Chatter account to read, write, and connect."
        url="/login"
      />

      <h1 id="login-heading">Log in to your account</h1>

      {error && (
        <p role="alert" aria-live="polite">{error}</p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          required
        />

        <button type="submit" disabled={loading} aria-busy={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <div role="group" aria-label="Social login options">
        <button type="button" onClick={signInWithGoogle}>Continue with Google</button>
        <button type="button" onClick={signInWithGitHub}>Continue with GitHub</button>
      </div>

      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </main>
  )
}