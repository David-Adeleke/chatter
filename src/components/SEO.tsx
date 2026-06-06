import { Helmet } from 'react-helmet-async'

interface SEOProps {
    title?: string
    description?: string
    image?: string
    url?: string
    type?: 'website' | 'article'
    publishedAt?: string
    author?: string
}

const SITE_NAME = 'Chatter'
const DEFAULT_DESCRIPTION = 'Long-form publishing for thinkers and makers.'
const DEFAULT_IMAGE = '/og-default.png'
const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://chatter.vercel.app'

export default function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    url,
    type = 'website',
    publishedAt,
    author,
}: SEOProps) {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME
    const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`
    const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* OpenGraph */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={type} />
            {publishedAt && <meta property="article:published_time" content={publishedAt} />}
            {author && <meta property="article:author" content={author} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
        </Helmet>
    )
}