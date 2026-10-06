// Google Analytics 4 (gtag.js), behind c15t's `measurement` consent. Ported from
// the academy's src/lib/ga-client.ts; the two sites share ONE GA property and
// web stream (same measurement ID), and the subdomains share the `_ga` cookie,
// so an apex → academy visit is one journey with no cross-domain config.
//
// GOOGLE CONSENT MODE, "BASIC" (owner decision, 2026-10-06). gtag.js is never
// requested until measurement is granted, so a visitor in an opt-in region who
// has not decided sends Google nothing at all. Once loaded: analytics granted,
// every ads signal denied, Google signals and ad personalisation off, which is
// what keeps the shared privacy policy's "no advertising cookies, no tracking
// across other sites" true.
//
// Pageviews come from GA4 enhanced measurement (first load + history changes),
// so none are sent from here. Events fired before consent resolves wait in a
// small in-memory queue and flush when GA boots; a revoke drops them.
//
// Unset NEXT_PUBLIC_GA_MEASUREMENT_ID (local, preview) → nothing loads.
import { analyticsConsentGranted } from './consent-signal'

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    [optOut: `ga-disable-${string}`]: boolean | undefined
  }
}

const RAW_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
// A malformed id would load a dead tag; treat it as unset instead.
const GA_ID = RAW_ID && /^G-[A-Z0-9]+$/.test(RAW_ID) ? RAW_ID : undefined

const QUEUE_LIMIT = 20
const pending: [string, Record<string, unknown> | undefined][] = []
let booted = false

/** Boot GA if configured and consented. Idempotent. Returns whether GA is live. */
export function loadGa(): boolean {
  if (!GA_ID || typeof window === 'undefined') return false
  if (!analyticsConsentGranted()) return false

  if (booted) {
    // A re-grant after a revoke in the same page: lift the denial.
    window[`ga-disable-${GA_ID}`] = false
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
  } else {
    booted = true
    window.dataLayer = window.dataLayer ?? []
    // gtag.js reads ARGUMENTS objects off the dataLayer, not arrays. A
    // rest-param version, `(...a) => dataLayer.push(a)`, is silently ignored
    // and GA records nothing. This is Google's own snippet, typed.
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments)
    }
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    })
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
    document.head.appendChild(script)
  }

  for (const [name, params] of pending.splice(0)) {
    window.gtag?.('event', name, params)
  }
  return true
}

/** Send a GA4 event; queued in memory until consent resolves. Never throws. */
export function gaEvent(name: string, params?: Record<string, unknown>): void {
  if (!GA_ID || typeof window === 'undefined') return
  try {
    if (loadGa()) window.gtag?.('event', name, params)
    else if (pending.length < QUEUE_LIMIT) pending.push([name, params])
  } catch {
    /* telemetry must never break the UI */
  }
}

/** The visitor DECIDED against measurement: stop GA and delete its cookies.
 *  Only for an explicit "no" (see ConsentBridge). A consent update alone leaves
 *  a loaded gtag.js sending cookieless pings, so `ga-disable-<id>`, Google's own
 *  opt-out switch, is set as well. */
export function revokeGa(): void {
  pending.length = 0
  if (typeof window === 'undefined') return
  if (booted && GA_ID) {
    window[`ga-disable-${GA_ID}`] = true
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  }
  clearGaCookies()
}

// `_ga` and `_ga_<stream>`, deleted on every domain they could have been set on
// (gtag's cookie_domain "auto" picks the widest the browser accepts, here
// `.onethousanddrones.com`; a cookie can only be deleted with the domain it was
// written under). The bare TLD is skipped.
function clearGaCookies(): void {
  const names = document.cookie
    .split(';')
    .map((c) => c.trim().split('=')[0])
    .filter((n) => n === '_ga' || n.startsWith('_ga_'))
  if (names.length === 0) return
  const labels = window.location.hostname.split('.')
  const domains: (string | null)[] = [null]
  for (let i = 0; i < labels.length - 1; i++) domains.push(`.${labels.slice(i).join('.')}`)
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}
