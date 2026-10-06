// GA4 under Google Consent Mode "basic", apex copy. Mirrors the academy's
// src/lib/ga-client.test.ts: nothing requested before a grant, held events
// flushed on grant, ARGUMENTS objects on the dataLayer, and a revoke that both
// opts the tag out and deletes the shared `_ga` cookies.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const consent = vi.hoisted(() => ({ granted: false }))
vi.mock('./consent-signal', () => ({ analyticsConsentGranted: () => consent.granted }))

type Win = Record<string, unknown> & { dataLayer?: unknown[]; location: { hostname: string } }
let win: Win
let appended: { src: string; async: boolean }[]
let cookieWrites: string[]
let cookieJar: string

// ga-client reads the measurement id at import, so each test imports it fresh.
// An empty string stands for "unset" (Vercel's unset var reads as undefined,
// and both are falsy to the module).
async function load(id = 'G-TEST123') {
  vi.resetModules()
  vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', id)
  return import('./ga-client')
}

beforeEach(() => {
  consent.granted = false
  appended = []
  cookieWrites = []
  cookieJar = ''
  win = { location: { hostname: 'onethousanddrones.com' } }
  vi.stubGlobal('window', win)
  vi.stubGlobal('document', {
    createElement: () => ({ src: '', async: false }),
    head: { appendChild: (el: { src: string; async: boolean }) => appended.push(el) },
    get cookie() {
      return cookieJar
    },
    set cookie(v: string) {
      cookieWrites.push(v)
    },
  })
})
afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

const calls = () => (win.dataLayer ?? []).map((a) => Array.from(a as ArrayLike<unknown>))

describe('ga-client (apex)', () => {
  it('requests NOTHING before consent', async () => {
    const ga = await load()
    expect(ga.loadGa()).toBe(false)
    ga.gaEvent('generate_lead')
    expect(appended).toHaveLength(0)
    expect(win.dataLayer).toBeUndefined()
  })

  it('requests NOTHING when the id is unset or malformed', async () => {
    consent.granted = true
    expect((await load('')).loadGa()).toBe(false)
    expect((await load('UA-123-1')).loadGa()).toBe(false)
    expect(appended).toHaveLength(0)
  })

  it('on grant: one gtag.js, ads signals denied, Google signals off, ARGUMENTS on the dataLayer', async () => {
    consent.granted = true
    const ga = await load()
    expect(ga.loadGa()).toBe(true)
    expect(ga.loadGa()).toBe(true)
    expect(appended).toHaveLength(1)
    expect(appended[0].src).toBe('https://www.googletagmanager.com/gtag/js?id=G-TEST123')
    expect(Object.prototype.toString.call(win.dataLayer![0])).toBe('[object Arguments]')
    const [def, , config] = calls()
    expect(def).toEqual([
      'consent',
      'default',
      { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' },
    ])
    expect(config).toEqual(['config', 'G-TEST123', { allow_google_signals: false, allow_ad_personalization_signals: false }])
  })

  it('holds pre-consent events and flushes them on grant', async () => {
    const ga = await load()
    ga.gaEvent('generate_lead', { lead_source: 'briefing' })
    consent.granted = true
    ga.loadGa()
    expect(calls().filter((c) => c[0] === 'event')).toEqual([['event', 'generate_lead', { lead_source: 'briefing' }]])
  })

  it('a revoke opts the tag out and deletes _ga cookies on every domain', async () => {
    consent.granted = true
    const ga = await load()
    ga.loadGa()
    cookieJar = '_ga=GA1.1.42; _ga_TEST123=GS2.1.s1'
    consent.granted = false
    ga.revokeGa()
    expect(win['ga-disable-G-TEST123']).toBe(true)
    expect(calls().at(-1)).toEqual(['consent', 'update', { analytics_storage: 'denied' }])
    for (const name of ['_ga', '_ga_TEST123']) {
      expect(cookieWrites).toContain(`${name}=; Max-Age=0; path=/`)
      expect(cookieWrites).toContain(`${name}=; Max-Age=0; path=/; domain=.onethousanddrones.com`)
    }
    expect(cookieWrites.some((w) => w.includes('domain=.com'))).toBe(false)
  })
})
