import { NextRequest, NextResponse } from 'next/server'
import { differenceInSeconds } from 'date-fns'
import { authMiddleware } from './utils/middlewares/auth'
import { logoutMiddleware } from './utils/middlewares/logout'
import { sharedMiddleware } from './utils/middlewares/shared'

type RateLimit = {
  ip?: string
  date: Date
}

const rateLimit: RateLimit[] = []
const REQUESTS_PER_SECOND = 10

export async function middleware(request: NextRequest) {
  const currentIp = request.headers.get('x-forwarded-for') || request.ip

  const requests = rateLimit.filter((x) => x.ip === currentIp && Math.abs(differenceInSeconds(new Date(), x.date)) < 1)
  if (requests.length >= REQUESTS_PER_SECOND) {
    return NextResponse.redirect(new URL('/blocked-ip', request.url))
  } else {
    rateLimit.push({ ip: currentIp, date: new Date() })
  }

  if (request.url.includes('/logout')) {
    return logoutMiddleware(request)
  }

  if (request.url.includes('/auth')) {
    return authMiddleware(request)
  }

  return sharedMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|manifest.json|assets|icons).*)'],
}
