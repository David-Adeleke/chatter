import { Link } from 'react-router-dom'
import { useHomeLink } from '@/hooks/useHomeLink'
import type { ComponentProps } from 'react'

type HomeLinkProps = Omit<ComponentProps<typeof Link>, 'to'>

export default function HomeLink({ children, ...props }: HomeLinkProps) {
  const to = useHomeLink()
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  )
}