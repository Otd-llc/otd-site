// Analytics-consent signal: the c15t-agnostic bridge between the consent UI (a
// React provider/hook) and the non-React GA loader (ga-client.ts), which cannot
// call a hook. Ported from the academy's src/lib/consent-signal.ts.
//
// c15t (offline mode) owns the source of truth; the ConsentBridge mirrors
// "measurement granted?" into a module flag and a localStorage key, so a cold
// gaEvent() on the next page load, before the bridge mounts, reads the last
// decision instead of guessing. Default is DENIED until an explicit grant.
const MIRROR_KEY = 'otd:analytics-consent'

let granted = false
let hydrated = false

/** True iff the visitor has consented to measurement. */
export function analyticsConsentGranted(): boolean {
  if (!hydrated && typeof window !== 'undefined') {
    try {
      granted = window.localStorage.getItem(MIRROR_KEY) === '1'
    } catch {
      /* private mode → stay denied */
    }
    hydrated = true
  }
  return granted
}

/** Called by ConsentBridge whenever c15t's measurement decision changes. */
export function setAnalyticsConsent(next: boolean): void {
  granted = next
  hydrated = true
  if (typeof window !== 'undefined') {
    try {
      if (next) window.localStorage.setItem(MIRROR_KEY, '1')
      else window.localStorage.removeItem(MIRROR_KEY)
    } catch {
      /* best-effort */
    }
  }
}
