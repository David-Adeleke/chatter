import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import NotificationBell from './NotificationBell'

export default function Navbar() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    return (
        <nav>
            <Link to="/">Chatter</Link>

            <div>
                {user ? (
                    <>
                        <Link to="/write">Write</Link>
                        <NotificationBell />
                        <Link to={`/@${user.user_metadata.username}`}>Profile</Link>
                        <button onClick={handleSignOut}>Sign out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Log in</Link>
                        <Link to="/signup">Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    )
}