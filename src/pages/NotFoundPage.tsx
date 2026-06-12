import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import HomeLink from '@/components/HomeLink'
// import '@/components.css'

export default function NotFoundPage() {
  return (
    <main aria-labelledby="not-found-heading" className="empty-state" style={{ minHeight: '100vh' }}>
      <SEO
        title="404 · Page Not Found · Chatter"
        description="The page you are looking for does not exist."
        url="/404"
      />
      <h1 id="not-found-heading" className="empty-state-title">
        404 — Page Not Found
      </h1>
      <p className="empty-state-text">The page you're looking for doesn't exist or has been moved.</p>
      <HomeLink className="btn btn-ghost btn-sm">Go back home</HomeLink>
    </main>
  )
}