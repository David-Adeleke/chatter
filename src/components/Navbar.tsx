import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import NotificationBell from './NotificationBell'
import HomeLink from '@/components/HomeLink'
import { useHomeLink } from '@/hooks/useHomeLinks'
import '@/styles/layout.css'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const homeLink = useHomeLink()

  const handleSignOut = async () => {
    await signOut()
    navigate(homeLink)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <HomeLink className="navbar-logo">
          Chatter
        </HomeLink>

        <nav className="navbar-right" aria-label="Main navigation">
          {user ? (
            <>
              <Link to="/write" className="navbar-link">
                Write
              </Link>
              <NotificationBell />
              <Link
                to={`/@${user.user_metadata.username}`}
                className="navbar-avatar-btn"
                aria-label="Your profile"
              >
                <img
                  src={user.user_metadata.avatar_url ?? '/default-avatar.png'}
                  alt={user.user_metadata.username ?? 'Profile'}
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