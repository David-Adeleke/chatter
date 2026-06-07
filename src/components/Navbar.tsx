import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import NotificationBell from './NotificationBell'
import '@/styles/layout.css'

export default function Navbar() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <Link to="/" className="navbar-logo">
          Chatter
        </Link>

        <nav className="navbar-right" aria-label="Main navigation">
          {user ? (
            <>
              <Link to="/write" className="navbar-link">
                Write
              </Link>
              <NotificationBell />
              <Link
                to={`/profile/${profile?.username}`}
                className="navbar-avatar-btn"
                aria-label="Your profile"
              >
                <img
                  src={profile?.avatar_url ?? '/default-avatar.png'}
                  alt={profile?.username ?? 'Profile'}
                  className="navbar-avatar"
                />
              </Link>
              <button
                type="button"
                className="navbar-link"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Sign in
              </Link>
              <Link to="/signup" className="navbar-cta">
                Get started
              </Link>
            </>
          )}
        </nav>

      </div>
    </header>
  )
}