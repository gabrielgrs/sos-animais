'use client'

import { Skeleton } from '~/components/ui/skeleton'
import { useAuth } from '~/hooks'
import { Link } from '../link'
import { Logo } from '../logo'
import { buttonVariants } from '../ui/button'
import { UserInfo } from './user-info'

const styles = 'flex justify-between h-20 items-center px-8'

export function Navbar({ logoHref = '/' }) {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isAuthenticated && user) {
    return (
      <nav className={styles}>
        <Logo href={logoHref} />
        <div>
          <UserInfo user={user} />
        </div>
      </nav>
    )
  }

  if (isLoading) {
    return (
      <nav className={styles}>
        <Logo href={logoHref} />
        <Skeleton className="h-10 w-10" />
      </nav>
    )
  }

  return (
    <nav className={styles}>
      <Logo href={logoHref} />
      <Link href="/auth" className={buttonVariants({ variant: 'link' })}>
        Login
      </Link>
    </nav>
  )
}
