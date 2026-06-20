import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import NotificationBell from './NotificationBell'
import HomeLink from '@/components/HomeLinks'
import Avatar from '@/components/Avatar'
import { useHomeLink } from '@/hooks/useHomeLink'
import '@/styles/layout.css'

export default function Navbar() {
  const { user, profile, signOut } = useAuth()
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
                to={`/@${profile?.username}`}
                className="navbar-avatar-btn"
                aria-label="Your profile"
              >
                <Avatar
                  src={user.user_metadata.avatar_url ?? '/default-avatar.png'}
                  username={user.user_metadata.username}
                  size={96}
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