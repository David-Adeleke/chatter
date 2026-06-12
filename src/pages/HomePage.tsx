import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthContext'
import HomeLink from '@/components/HomeLink'
import type { PostWithAuthor } from '@/types/post'
import '@/styles/home.css'

const TOPICS = [
  'Technology', 'Design', 'Programming', 'Startups', 'Science',
  'Culture', 'Writing', 'Finance', 'Health', 'Africa',
  'Philosophy', 'Psychology', 'Books', 'Music', 'Sports',
]

export default function HomePage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<PostWithAuthor[]>([])

  // Redirect logged-in users straight to their feed
  useEffect(() => {
    if (!loading && user) {
      navigate('/feed', { replace: true })
    }
  }, [user, loading, navigate])

  useEffect(() => {
    supabase
      .from('posts')
      .select('*, profiles(username, full_name, avatar_url)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(5)
      .then(({ data }) => {
        if (data) setPosts(data as PostWithAuthor[])
      })
  }, [])

  // Don't flash marketing page while auth resolves
  if (loading) return null

  const heroPost     = posts[0] ?? null
  const sidePost1    = posts[1] ?? null
  const sidePost2    = posts[2] ?? null
  const featuredLarge = posts[1] ?? null
  const featuredSmall = posts.slice(2, 5)

  return (
    <>
      <Helmet>
        <title>Chatter — Where ideas find their voice</title>
        <meta
          name="description"
          content="Chatter is a long-form publishing platform for writers and readers who care about ideas."
        />
      </Helmet>

      <div className="home-page">

        <header className="home-nav">
          <div className="home-nav-inner">
            <HomeLink className="home-nav-logo">Chatter</HomeLink>
            <nav className="home-nav-links" aria-label="Main navigation">
              <Link to="/login" className="home-nav-link">Sign in</Link>
              <Link to="/signup" className="home-nav-cta">Get started</Link>
            </nav>
          </div>
        </header>

        <section className="home-hero" aria-labelledby="hero-heading">
          <div className="home-hero-inner">

            <div className="home-hero-left">
              <span className="home-hero-eyebrow">Long-form publishing</span>

              <h1 className="home-hero-title" id="hero-heading">
                <span className="home-hero-title-thin">Stories that</span>
                <span className="home-hero-title-bold">actually matter.</span>
              </h1>

              <p className="home-hero-sub">
                A publishing platform for writers with something real to say.
                No noise. No algorithm. Just ideas worth reading.
              </p>

              <div className="home-hero-actions">
                <Link to="/signup" className="home-btn-primary">Start writing free</Link>
                <Link to="/feed" className="home-btn-ghost">Explore stories</Link>
              </div>

              <div className="home-hero-stats">
                <div className="home-stat">
                  <span className="home-stat-number">2.4k+</span>
                  <span className="home-stat-label">Stories published</span>
                </div>
                <div className="home-stat-sep" aria-hidden="true" />
                <div className="home-stat">
                  <span className="home-stat-number">12k+</span>
                  <span className="home-stat-label">Monthly readers</span>
                </div>
                <div className="home-stat-sep" aria-hidden="true" />
                <div className="home-stat">
                  <span className="home-stat-number">800+</span>
                  <span className="home-stat-label">Active writers</span>
                </div>
              </div>
            </div>

            <div className="home-hero-right" aria-label="Latest stories">
              {heroPost && (
                <Link to={`/posts/${heroPost.slug}`} className="home-hero-card-main">
                  {heroPost.cover_image_url ? (
                    <img
                      src={heroPost.cover_image_url}
                      alt=""
                      className="home-hero-card-img"
                    />
                  ) : (
                    <div className="home-hero-card-img-placeholder" />
                  )}
                  <div className="home-hero-card-body">
                    <div className="home-hero-card-author">
                      <img
                        src={heroPost.profiles.avatar_url ?? '/default-avatar.png'}
                        alt=""
                        className="home-hero-card-avatar"
                      />
                      <span>{heroPost.profiles.full_name ?? heroPost.profiles.username}</span>
                    </div>
                    <h2 className="home-hero-card-title">{heroPost.title}</h2>
                    {heroPost.excerpt && (
                      <p className="home-hero-card-excerpt">{heroPost.excerpt}</p>
                    )}
                    <span className="home-hero-card-cta">
                      Read story <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              )}

              <div className="home-hero-side-cards">
                {sidePost1 && (
                  <Link to={`/posts/${sidePost1.slug}`} className="home-hero-side-card">
                    <div className="home-hero-side-text">
                      <span className="home-hero-side-author">
                        {sidePost1.profiles.full_name ?? sidePost1.profiles.username}
                      </span>
                      <h3 className="home-hero-side-title">{sidePost1.title}</h3>
                      <span className="home-hero-side-meta">
                        {sidePost1.reading_time_minutes} min read
                      </span>
                    </div>
                    {sidePost1.cover_image_url && (
                      <img
                        src={sidePost1.cover_image_url}
                        alt=""
                        className="home-hero-side-thumb"
                      />
                    )}
                  </Link>
                )}

                {sidePost2 && (
                  <Link to={`/posts/${sidePost2.slug}`} className="home-hero-side-card">
                    <div className="home-hero-side-text">
                      <span className="home-hero-side-author">
                        {sidePost2.profiles.full_name ?? sidePost2.profiles.username}
                      </span>
                      <h3 className="home-hero-side-title">{sidePost2.title}</h3>
                      <span className="home-hero-side-meta">
                        {sidePost2.reading_time_minutes} min read
                      </span>
                    </div>
                    {sidePost2.cover_image_url && (
                      <img
                        src={sidePost2.cover_image_url}
                        alt=""
                        className="home-hero-side-thumb"
                      />
                    )}
                  </Link>
                )}
              </div>
            </div>

          </div>
        </section>

        <div className="home-marquee-wrap" aria-hidden="true">
          <div className="home-marquee">
            <div className="home-marquee-track">
              {[...TOPICS, ...TOPICS].map((topic, i) => (
                <span key={i} className="home-marquee-pill">{topic}</span>
              ))}
            </div>
          </div>
        </div>

        {posts.length > 1 && (
          <section className="home-featured" aria-labelledby="featured-heading">
            <div className="home-featured-inner">

              <div className="home-section-header">
                <div>
                  <span className="home-section-eyebrow">Featured stories</span>
                  <h2 className="home-section-title" id="featured-heading">
                    What people are reading
                  </h2>
                </div>
                <Link to="/feed" className="home-section-link">
                  Browse all stories <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="home-featured-grid">
                {featuredLarge && (
                  <Link to={`/posts/${featuredLarge.slug}`} className="home-card-large">
                    <div className="home-card-large-img-wrap">
                      {featuredLarge.cover_image_url ? (
                        <img
                          src={featuredLarge.cover_image_url}
                          alt=""
                          className="home-card-large-img"
                        />
                      ) : (
                        <div className="home-card-img-placeholder" />
                      )}
                    </div>
                    <div className="home-card-large-body">
                      <div className="home-card-author-row">
                        <img
                          src={featuredLarge.profiles.avatar_url ?? '/default-avatar.png'}
                          alt=""
                          className="home-card-avatar"
                        />
                        <span className="home-card-author-name">
                          {featuredLarge.profiles.full_name ?? featuredLarge.profiles.username}
                        </span>
                      </div>
                      <h3 className="home-card-large-title">{featuredLarge.title}</h3>
                      {featuredLarge.excerpt && (
                        <p className="home-card-large-excerpt">{featuredLarge.excerpt}</p>
                      )}
                      <div className="home-card-meta">
                        <span>{featuredLarge.reading_time_minutes} min read</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={featuredLarge.published_at ?? undefined}>
                          {new Date(featuredLarge.published_at!).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    </div>
                  </Link>
                )}

                <div className="home-cards-small">
                  {featuredSmall.map(post => (
                    <Link key={post.id} to={`/posts/${post.slug}`} className="home-card-small">
                      <div className="home-card-small-text">
                        <div className="home-card-author-row">
                          <img
                            src={post.profiles.avatar_url ?? '/default-avatar.png'}
                            alt=""
                            className="home-card-avatar"
                          />
                          <span className="home-card-author-name">
                            {post.profiles.full_name ?? post.profiles.username}
                          </span>
                        </div>
                        <h3 className="home-card-small-title">{post.title}</h3>
                        <div className="home-card-meta">
                          <span>{post.reading_time_minutes} min read</span>
                          <span aria-hidden="true">·</span>
                          <time dateTime={post.published_at ?? undefined}>
                            {new Date(post.published_at!).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                        </div>
                      </div>
                      {post.cover_image_url ? (
                        <img
                          src={post.cover_image_url}
                          alt=""
                          className="home-card-small-thumb"
                        />
                      ) : (
                        <div className="home-card-small-thumb-placeholder" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        <section className="home-pillars" aria-labelledby="pillars-heading">
          <div className="home-pillars-inner">
            <h2 className="home-pillars-title" id="pillars-heading">
              Built for ideas.<br />Not impressions.
            </h2>
            <div className="home-pillars-grid">
              <div className="home-pillar">
                <span className="home-pillar-glyph" aria-hidden="true">✦</span>
                <h3 className="home-pillar-heading">Read deeply</h3>
                <p className="home-pillar-text">
                  Long-form essays, research, and commentary from writers
                  who take ideas seriously. No 280-character summaries.
                </p>
              </div>
              <div className="home-pillar">
                <span className="home-pillar-glyph" aria-hidden="true">✎</span>
                <h3 className="home-pillar-heading">Write freely</h3>
                <p className="home-pillar-text">
                  A distraction-free editor with autosave, image uploads,
                  and a readership that is here for the ideas.
                </p>
              </div>
              <div className="home-pillar">
                <span className="home-pillar-glyph" aria-hidden="true">◎</span>
                <h3 className="home-pillar-heading">Connect genuinely</h3>
                <p className="home-pillar-text">
                  Follow writers, not feeds. Comment on ideas.
                  Build an audience that actually reads.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="home-cta" aria-labelledby="cta-heading">
          <div className="home-cta-inner">
            <span className="home-cta-eyebrow">Ready?</span>
            <h2 className="home-cta-title" id="cta-heading">
              Your next great essay<br />starts here.
            </h2>
            <p className="home-cta-sub">Free to read. Free to write. Always.</p>
            <div className="home-cta-actions">
              <Link to="/signup" className="home-cta-btn-primary">
                Create your account
              </Link>
              <Link to="/feed" className="home-cta-btn-ghost">
                Browse first
              </Link>
            </div>
          </div>
        </section>

        <footer className="home-footer">
          <div className="home-footer-inner">
            <span className="home-footer-logo">Chatter</span>
            <nav className="home-footer-nav" aria-label="Footer links">
              <a href="#" className="home-footer-link">About</a>
              <a href="#" className="home-footer-link">Help</a>
              <a href="#" className="home-footer-link">Terms</a>
              <a href="#" className="home-footer-link">Privacy</a>
            </nav>
            <p className="home-footer-copy">© 2026 Chatter. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  )
}