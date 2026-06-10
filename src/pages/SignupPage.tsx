import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUpWithEmail, signInWithGoogle, signInWithGitHub } from '@/services/auth.service'
import SEO from '@/components/SEO'
import '@/styles/auth.css'

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
    const { data, error } = await signUpWithEmail(email, password, username)
    if (error) {
        setError(error.message)
        setLoading(false)
        return
    }
    if (data.session) {
        navigate('/onboarding')
    } else {
        navigate('/login?message=confirm-email')
    }
}

  return (
    <>
      <SEO title="Create account" />
      <div className="auth-page">

        <div className="auth-header">
          <Link to="/" className="auth-logo">Chatter</Link>
          <h1 className="auth-title">Join Chatter.</h1>
        </div>

        <div className="auth-card">

          {error && (
            <div className="auth-alert" role="alert">
              {error}
            </div>
          )}

          <div className="auth-oauth-group">
            <button
              type="button"
              className="auth-oauth-btn"
              onClick={signInWithGoogle}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>

            <button
              type="button"
              className="auth-oauth-btn"
              onClick={signInWithGitHub}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Sign up with GitHub
            </button>
          </div>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label className="auth-label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                className="auth-input"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="yourname"
                autoComplete="username"
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="auth-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="auth-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
              <p className="auth-hint">At least 8 characters</p>
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

        </div>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login" className="auth-switch-link">
            Sign in
          </Link>
        </p>

        <p className="auth-terms">
          By creating an account you agree to our{' '}
          <a href="#">Terms of Service</a>{' '}
          and{' '}
          <a href="#">Privacy Policy</a>.
        </p>

      </div>
    </>
  )
}