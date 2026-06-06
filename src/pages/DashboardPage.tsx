import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import { getUserPosts } from '@/services/post.service'
import { useAnalytics } from '@/hooks/useAnalytics'
import SEO from '@/components/SEO'
import MetricCard from '@/components/analytics/MetricCard'
import ViewsChart from '@/components/analytics/ViewsChart'
import EngagementChart from '@/components/analytics/EngagementChart'
import type { Post } from '@/types/post'

function PostAnalyticsPanel({ post }: { post: Post }) {
  const { analytics, comparisons, loading } = useAnalytics(post.id)

  if (loading) return <p>Loading analytics...</p>
  if (!analytics) return null

  return (
    <div>
      <SEO title="Dashboard" />
      <div>
        {comparisons.map(c => (
          <MetricCard key={c.metric} data={c} />
        ))}
        <div>
          <p>Bookmarks</p>
          <p>{analytics.total_bookmarks.toLocaleString()}</p>
        </div>
      </div>
      <ViewsChart current={analytics.last_7_days} previous={analytics.prev_7_days} />
      <EngagementChart data={analytics.last_7_days} />
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getUserPosts(user.id).then(({ data }) => {
      const list = (data as Post[]) ?? []
      setPosts(list)
      if (list.length > 0) setSelectedPost(list[0])
      setLoading(false)
    })
  }, [user])

  if (loading) return <p>Loading...</p>

  if (posts.length === 0) {
    return (
      <main>
        <h1>Dashboard</h1>
        <p>You haven't written anything yet.</p>
        <Link to="/write">Write your first post</Link>
      </main>
    )
  }

  return (
    <main aria-labelledby="dashboard-heading">
      <h1 id="dashboard-heading">Dashboard</h1>

      <div style={{ display: 'flex' }}>
        <nav aria-label="Your posts">
          <h2>Your posts</h2>
          <ul role="list">
            {posts.map(post => (
              <li key={post.id}>
                <button
                  onClick={() => setSelectedPost(post)}
                  aria-pressed={selectedPost?.id === post.id}
                  aria-current={selectedPost?.id === post.id ? 'true' : undefined}
                  style={{ fontWeight: selectedPost?.id === post.id ? 'bold' : 'normal' }}
                >
                  <span>{post.title}</span>
                  <span aria-label={`Status: ${post.status}`}>{post.status}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-label="Post analytics">
          {selectedPost ? (
            <>
              <header>
                <h2>{selectedPost.title}</h2>
                <nav aria-label="Post actions">
                  <Link to={`/posts/${selectedPost.slug}`}>View post</Link>
                  <Link to={`/edit/${selectedPost.id}`}>Edit</Link>
                </nav>
              </header>
              <PostAnalyticsPanel post={selectedPost} />
            </>
          ) : (
            <p>Select a post to view its analytics.</p>
          )}
        </section>
      </div>
    </main>
  )
}