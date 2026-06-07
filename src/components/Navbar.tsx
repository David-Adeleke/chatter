import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
// import { useProfile } from '@/hooks/useProfile'
import NotificationBell from './NotificationBell'

export default function Navbar() {
    // const { user, signOut } = useAuth()
    const { user, profile, signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }
    // console.log('profile', profile)
    // const { profile } = useProfile(user?.user_metadata.username ?? user?.email)

    return (
        <nav>
            <Link to="/">Chatter</Link>

            <div>
                {user ? (
                    <>
                        <Link to="/write">Write</Link>
                        <NotificationBell />
                        {/* <Link to={`/@${user.user_metadata.username}`}>Profile</Link> */}
                        <Link to={`/profile/${profile?.username}`}>Profile</Link>
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