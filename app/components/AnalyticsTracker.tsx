'use client'

// GA4 page views and the apex → academy handoff. Renders nothing; mounted once
// inside ConsentProviders.
//
// PAGE VIEWS. The shared GA stream no longer infers page views from browser
// history (see app/lib/ga-client.ts), so every route change here sends one. The
// <title> can land just after the commit, so it is read a beat later. The apex
// has no person-identifying routes, so nothing needs scrubbing; the in-app
// referrer is the previous page, and the first one is the browser's own (a
// cross-site referrer is already origin-only).
//
// THE ACADEMY CLICK. The academy is a subdomain in the same GA stream, so GA does
// not count a link to it as an outbound click, and consent is asked per site, so
// the academy side may never record the arrival. The click is reported here, as
// the academy's own `cta_clicked` with `cta: 'academy'`, plus where on the page
// it was. One listener covers every link (header, footer, hero, doors), and the
// same-origin `/academy` redirect too.
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { gaEvent, gaPageView } from '../lib/ga-client'

const ACADEMY_HOST = 'academy.onethousanddrones.com'
const TITLE_SETTLE_MS = 150

function placementOf(a: Element): string {
  if (a.closest('header')) return 'header'
  if (a.closest('footer')) return 'footer'
  return a.closest('section[id]')?.id || 'page'
}

export function AnalyticsTracker() {
  const pathname = usePathname()
  const last = useRef<string | null>(null)

  useEffect(() => {
    const t = window.setTimeout(() => {
      const location = window.location.origin + pathname
      const referrer = last.current ?? (document.referrer || undefined)
      last.current = location
      gaPageView({ location, title: document.title, referrer })
    }, TITLE_SETTLE_MS)
    return () => window.clearTimeout(t)
  }, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      let url: URL
      try {
        url = new URL(a.href, window.location.href)
      } catch {
        return
      }
      const toAcademy =
        url.host === ACADEMY_HOST ||
        (url.origin === window.location.origin && url.pathname === '/academy')
      if (!toAcademy) return
      gaEvent('cta_clicked', {
        cta: 'academy',
        placement: placementOf(a),
        target_path: url.host === ACADEMY_HOST ? url.pathname : '/',
      })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
