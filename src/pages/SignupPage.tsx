import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '@/components/SEO'
import { signUpWithEmail, signInWithGoogle, signInWithGitHub } from '@/services/auth.service'

export default function SignupPage() {
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

    const { error } = await signUpWithEmail(email, password, username)
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    navigate('/')
  }

  return (
    <main>
      <SEO
        title="Create account · Chatter"
        description="Join Chatter to write, share, and discover ideas. Sign up with email, Google, or GitHub."
        url="/signup"
      />

      <section aria-labelledby="signup-heading">
        <h1 id="signup-heading">Create your account</h1>

        {error && (
          <p role="alert" aria-live="polite">{error}</p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            required
          />

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
            autoComplete="new-password"
            required
          />

          <button type="submit" disabled={loading} aria-busy={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <div role="group" aria-label="Social sign up options">
          <button type="button" onClick={signInWithGoogle}>Continue with Google</button>
          <button type="button" onClick={signInWithGitHub}>Continue with GitHub</button>
        </div>

        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </section>
    </main>
  )
}