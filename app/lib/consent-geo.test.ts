// The proxy → c15t geography hand-off. Its failure direction matters more than
// its success path: anything unparseable must come back null, because null is
// what leaves c15t on its GB default and keeps the opt-in banner up.
import { describe, expect, it } from 'vitest'
import { CONSENT_POLICY_PACKS, GEO_COOKIE, geoCookieValue, parseGeoCookie } from './consent-geo'

const h = (init: Record<string, string>) => new Headers(init)

describe('geoCookieValue', () => {
  it('is null when Vercel did not place the request (local dev)', () => {
    expect(geoCookieValue(h({}))).toBeNull()
  })

  it('carries the country, and the region when Vercel has one', () => {
    expect(geoCookieValue(h({ 'x-vercel-ip-country': 'US' }))).toBe('US')
    expect(
      geoCookieValue(h({ 'x-vercel-ip-country': 'ca', 'x-vercel-ip-country-region': 'qc' })),
    ).toBe('CA-QC')
  })

  it('drops a malformed country or region rather than passing it through', () => {
    expect(geoCookieValue(h({ 'x-vercel-ip-country': 'USA' }))).toBeNull()
    expect(
      geoCookieValue(h({ 'x-vercel-ip-country': 'DE', 'x-vercel-ip-country-region': 'B;x=1' })),
    ).toBe('DE')
  })
})

describe('parseGeoCookie', () => {
  it('reads the cookie out of a full document.cookie string', () => {
    expect(parseGeoCookie(`theme=dark; ${GEO_COOKIE}=US-CA; _ga=GA1.1.1`)).toEqual({
      country: 'US',
      region: 'CA',
    })
    expect(parseGeoCookie(`${GEO_COOKIE}=FR`)).toEqual({ country: 'FR' })
  })

  it('round-trips what geoCookieValue writes', () => {
    const v = geoCookieValue(h({ 'x-vercel-ip-country': 'CA', 'x-vercel-ip-country-region': 'QC' }))
    expect(parseGeoCookie(`${GEO_COOKIE}=${v}`)).toEqual({ country: 'CA', region: 'QC' })
  })

  it('FAILS CLOSED: absent or garbled is null, never a guessed country', () => {
    expect(parseGeoCookie('')).toBeNull()
    expect(parseGeoCookie('theme=dark')).toBeNull()
    expect(parseGeoCookie(`${GEO_COOKIE}=us`)).toBeNull()
    expect(parseGeoCookie(`${GEO_COOKIE}=`)).toBeNull()
    expect(parseGeoCookie(`x${GEO_COOKIE}=US`)).toBeNull()
  })
})

describe('CONSENT_POLICY_PACKS', () => {
  const [optIn, quebec, world] = CONSENT_POLICY_PACKS

  it('the opt-in pack also catches a visitor with no country (fail closed)', () => {
    expect(optIn.match).toMatchObject({ fallback: true })
    expect(optIn.consent?.model).toBe('opt-in')
  })

  it('covers the whole EEA plus the UK, and not the US', () => {
    const c = optIn.match?.countries ?? []
    expect(c).toHaveLength(35) // EU 27 + IS LI NO + GB + CH BR JP KR
    expect(new Set(c).size).toBe(c.length)
    for (const cc of ['DE', 'FR', 'IE', 'NO', 'GB', 'CH', 'KR']) expect(c).toContain(cc)
    expect(c).not.toContain('US')
    expect(c).not.toContain('CA')
  })

  it('Quebec is opt-in by region; everyone else gets no banner', () => {
    expect(quebec.match).toEqual({ regions: [{ country: 'CA', region: 'QC' }] })
    expect(quebec.consent?.model).toBe('opt-in')
    expect(world.match).toEqual({ isDefault: true })
    expect(world.consent?.model).toBe('none')
  })
})
