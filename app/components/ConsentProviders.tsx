'use client'

// The c15t consent stack, ported from the academy (src/components/chrome/
// ConsentProviders.tsx) so the two sites ask the same question the same way.
// The root layout is a server component and c15t's provider is React context,
// so the whole stack lives behind this one 'use client' boundary.
//
// Offline mode: consent lives in this origin's storage, no backend. The
// visitor's country (set by proxy.ts from Vercel's geolocation) picks the
// policy pack: opt-in where the law asks for it, no banner elsewhere. See
// app/lib/consent-geo.ts. Consent is per site: a visitor in an opt-in region
// answers once here and once on the academy.
import { ConsentManagerProvider, ConsentBanner, ConsentDialog } from '@c15t/nextjs'
// Without the stylesheet the banner renders unstyled (academy #344). The
// site's global reset in globals.css skips the banner's subtree; see there.
import '@c15t/nextjs/styles.css'
import { ConsentBridge } from './ConsentBridge'
import { AnalyticsTracker } from './AnalyticsTracker'
import { CONSENT_POLICY_PACKS, parseGeoCookie } from '../lib/consent-geo'

// LOAD BEARING: c15t grants only categories it has been told are active. With
// none declared, "Accept all" stored measurement=false and analytics never ran
// (found on the academy, 2026-08-03). Google Analytics is the only
// non-essential thing on this site, and it is measurement.
const CONSENT_CATEGORIES = ['necessary', 'measurement'] as const

// The academy's banner theme, colour for colour. Every colour is a site CSS
// variable, so there is one palette. `textOnPrimary` must stay explicit: c15t
// cannot derive a readable foreground from a var() string. The apex has no
// Tailwind, so the academy's utility-class slots become the `.consent-*`
// classes in globals.css, carrying the same values. The apex is dark-only, so
// the academy's light-theme fill rule has nothing to apply to.
const CONSENT_THEME = {
  colors: {
    primary: 'var(--color-command-gold)',
    primaryHover: 'var(--color-gold-light)',
    surface: 'var(--color-deep-space)',
    surfaceHover: 'color-mix(in srgb, var(--color-command-gold) 6%, transparent)',
    border: 'color-mix(in srgb, var(--color-command-gold) 25%, transparent)',
    borderHover: 'var(--color-command-gold)',
    text: 'var(--color-title)',
    textMuted: 'var(--color-muted)',
    textOnPrimary: 'var(--color-deep-space)',
    overlay: 'color-mix(in srgb, var(--color-deep-space) 72%, transparent)',
    switchTrack: 'var(--color-panel-border)',
    switchTrackActive: 'var(--color-command-gold)',
    switchThumb: 'var(--color-deep-space)',
  },
  typography: { fontFamily: 'var(--font-serif)' },
  radius: { sm: '4px', md: '6px', lg: '8px', full: '9999px' },
  shadows: { sm: 'var(--elev-raise)', md: 'var(--elev-raise)', lg: 'var(--elev-card)' },
  slots: {
    consentBannerCard: 'consent-card',
    consentBannerTitle: 'consent-title',
    consentBannerDescription: 'consent-desc',
    consentBannerFooter: 'consent-footer',
    buttonPrimary: 'consent-btn',
    buttonSecondary: 'consent-btn consent-btn-secondary',
    consentBannerTag: 'consent-tag',
  },
  // Owner decision (academy, 2026-08-18): Accept takes the gold fill, Reject
  // keeps the same face and size, Customize drops to a ghost.
  consentActions: {
    default: { mode: 'stroke' },
    accept: { variant: 'primary', mode: 'filled' },
    customize: { variant: 'neutral', mode: 'ghost' },
  },
} as const

// OWNER-APPROVED 2026-09-28, verbatim. The academy and the configurator carry
// the same two strings; all three sites make one statement. Change none of them
// without the owner, and change all of them together.
const CONSENT_COPY = {
  title: 'Cookies and analytics',
  description:
    "We use strictly necessary cookies to run the site. With your permission we also measure how the site is used, to improve it. We don't sell data or show ads.",
} as const

const CONSENT_I18N = {
  locale: 'en',
  detectBrowserLanguage: false,
  messages: { en: { cookieBanner: CONSENT_COPY } },
}

export function ConsentProviders({ children }: { children: React.ReactNode }) {
  // Absent on the server render, in local dev, or for a request Vercel could
  // not place → no override → c15t's GB default → the opt-in banner.
  const geo = typeof document === 'undefined' ? null : parseGeoCookie(document.cookie)
  return (
    <ConsentManagerProvider
      options={{
        mode: 'offline',
        consentCategories: [...CONSENT_CATEGORIES],
        theme: CONSENT_THEME,
        i18n: CONSENT_I18N,
        offlinePolicy: { policyPacks: CONSENT_POLICY_PACKS },
        ...(geo && { overrides: geo }),
      }}
    >
      <ConsentBridge />
      <AnalyticsTracker />
      <ConsentBanner primaryButton="accept" />
      <ConsentDialog />
      {children}
    </ConsentManagerProvider>
  )
}
