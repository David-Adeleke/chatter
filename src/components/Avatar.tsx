import { getAvatarColour } from '@/lib/avatarColour'

interface AvatarProps {
  src?: string | null
  username: string
  size?: number
  className?: string
}

export default function Avatar({ src, username, size = 32, className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={username}
        className={className} style={{ width: size, height: size, borderRadius: "50%", objectFit: 'cover', display: 'block', flexShrink: 0 }} />
    )
  }

  const {bg, text} = getAvatarColour(username)
  const initial = username.charAt(0).toUpperCase()
  const fontSize = Math.round(size * 0.42)

  return (
    <span
      aria-label={username}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent:'center',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bg,
        color: text,
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSize,
        fontWeight: 600,
        letterSpacing: '0.02em',
        flexShrink: 0,
        userSelect: 'none',
        lineHeight: 1,
      }}
    >
      {initial}
    </span>
  )
}