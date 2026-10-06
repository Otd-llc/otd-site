import { NextResponse, type NextRequest } from 'next/server'
import { GEO_COOKIE, geoCookieValue } from './app/lib/consent-geo'

// The visitor's country, for the consent banner (app/lib/consent-geo.ts). This
// is the only code that sees Vercel's geolocation headers; c15t runs in the
// browser. Only written when it changes, so a steady visitor's responses carry
// no Set-Cookie. Not HttpOnly on purpose: c15t reads it client-side.
export function proxy(req: NextRequest) {
  const res = NextResponse.next()
  const geo = geoCookieValue(req.headers)
  if (geo && req.cookies.get(GEO_COOKIE)?.value !== geo) {
    res.cookies.set(GEO_COOKIE, geo, {
      path: '/',
      sameSite: 'lax',
      secure: req.nextUrl.protocol === 'https:',
    })
  }
  return res
}

// Pages only: not the contact API, Next's assets, or files with an extension.
export const config = {
  matcher: ['/((?!api/|_next/|.*\\.[A-Za-z0-9]+$).*)'],
}
