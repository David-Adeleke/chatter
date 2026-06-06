import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 | Page Not Found</title>
      </Helmet>
      <main aria-labelledby="not-found-heading">
        <SEO
          title="404 · Page Not Found · Chatter"
          description="The page you are looking for does not exist."
          url="/404"
        />

        <h1 id="not-found-heading">404 — Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/feed">Go back home</Link>
      </main>
    </>
  )
}