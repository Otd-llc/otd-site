// Visitor geography for the consent banner: the hand-off between Vercel's edge
// geolocation (request headers, which only the proxy can see) and c15t (a
// client-side store that decides which privacy regime applies).
//
// WHY THIS EXISTS. c15t in offline mode has no backend to geolocate against, so
// it reads the country from an `x-c15t-country` header that nothing ever sets
// and falls back to "GB" (c15t dist, `offline_init_init`). Every visitor was
// therefore treated as UK GDPR: an opt-in banner for everyone, US included, and
// no measurement for anyone who ignored it. Passing the real country lets c15t
// apply its own jurisdiction table instead: opt-in where the law asks for it
// (EU/EEA/UK, CH, BR, JP, KR, Quebec), no banner elsewhere, and a Global
// Privacy Control signal still turns measurement off.
//
// FAILS CLOSED. No cookie (local dev, a route the proxy matcher skips such as
// an asset path, a request Vercel could not place) means no override, which means
// c15t's own GB default, which means the opt-in banner. A missing geo can only
// ever make the site stricter.
//
// The cookie is strictly necessary in the ePrivacy sense: its only job is to
// pick which consent rules apply. It carries the country and, where Vercel has
// one, the ISO 3166-2 subdivision (needed only to tell Quebec from the rest of
// Canada). Nothing finer. Disclosed on the shared privacy policy,
// academy.onethousanddrones.com/privacy §8.
import type { ComponentProps } from 'react'
import type { ConsentManagerProvider } from '@c15t/nextjs'

// c15t's policy shape, taken from the provider's own props: `@c15t/nextjs`
// does not re-export the `PolicyConfig` type its React package declares.
type PolicyConfig = NonNullable<
  NonNullable<ComponentProps<typeof ConsentManagerProvider>['options']['offlinePolicy']>['policyPacks']
>[number]

export const GEO_COOKIE = 'otd-geo'

// THE COUNTRY ALONE DOES NOTHING. In offline mode c15t only consults the
// visitor's location through POLICY PACKS; with none configured it applies one
// synthetic opt-in banner policy to everybody, whatever the country (c15t
// 2.2.1, `resolveFallbackPolicy`). Measured: with the cookie set to US and no
// packs, the banner still showed and nothing loaded.
//
// So these three packs are what the cookie is for:
//
//   opt-in   EU, EEA, UK, Switzerland, Brazil, Japan, South Korea (the
//            countries c15t's own jurisdiction table treats as opt-in), plus
//            `fallback` for a visitor with no country at all. Offline mode
//            substitutes GB when there is no country, so "no geo" lands here
//            twice over.
//   quebec   Law 25, matched on the region, so the rest of Canada is unaffected.
//   world    everyone else: no banner, measured by default; a Global Privacy
//            Control signal still turns measurement off (c15t auto-grant).
//
// The opt-in packs carry the SAME banner policy the site rendered before packs
// existed (c15t's `offlineOptInBanner`: compact profile, reject + accept on one
// row, customize below). c15t's own europe/quebec presets use a split-row
// layout instead, which would have silently re-laid-out a banner whose button
// emphasis and contrast were tuned and owner-approved (ConsentProviders).
//
// The list is mirrored in the shared privacy policy
// (academy.onethousanddrones.com/privacy §2) and in the academy's copy of
// this file (src/lib/consent-geo.ts). Change all three or none.
const OPT_IN_COUNTRIES = [
  // EU
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  // rest of the EEA, and the UK
  'IS', 'LI', 'NO', 'GB',
  // Switzerland, Brazil, Japan, South Korea
  'CH', 'BR', 'JP', 'KR',
]

const COMPACT_BANNER: NonNullable<PolicyConfig['ui']>['banner'] = {
  allowedActions: ['accept', 'reject', 'customize'],
  layout: [['reject', 'accept'], 'customize'],
  direction: 'row',
  primaryActions: ['customize'],
  uiProfile: 'compact',
}

const OPT_IN: Pick<PolicyConfig, 'consent' | 'ui'> = {
  consent: { model: 'opt-in', expiryDays: 365 },
  ui: { mode: 'banner', banner: COMPACT_BANNER, dialog: COMPACT_BANNER },
}

export const CONSENT_POLICY_PACKS: PolicyConfig[] = [
  { id: 'otd_opt_in', match: { countries: OPT_IN_COUNTRIES, fallback: true }, ...OPT_IN },
  { id: 'otd_quebec_opt_in', match: { regions: [{ country: 'CA', region: 'QC' }] }, ...OPT_IN },
  {
    id: 'otd_world_no_banner',
    match: { isDefault: true },
    consent: { model: 'none' },
    ui: { mode: 'none' },
  },
]

export type Geo = { country: string; region?: string }

const COUNTRY = /^[A-Z]{2}$/
const REGION = /^[A-Z0-9]{1,3}$/

/** The cookie value for a request, from Vercel's geolocation headers, or null
 *  when Vercel did not place the request (local dev, or an unknown IP). */
export function geoCookieValue(headers: Headers): string | null {
  const country = headers.get('x-vercel-ip-country')?.trim().toUpperCase()
  if (!country || !COUNTRY.test(country)) return null
  const region = headers.get('x-vercel-ip-country-region')?.trim().toUpperCase()
  return region && REGION.test(region) ? `${country}-${region}` : country
}

/** Parse the cookie back out of `document.cookie`, or null when absent/garbled. */
export function parseGeoCookie(cookieHeader: string): Geo | null {
  for (const part of cookieHeader.split(';')) {
    const [name, ...rest] = part.trim().split('=')
    if (name !== GEO_COOKIE) continue
    const [country, region] = rest.join('=').split('-')
    if (!country || !COUNTRY.test(country)) return null
    return region && REGION.test(region) ? { country, region } : { country }
  }
  return null
}
