'use client'

// Mirrors c15t's measurement decision into the plain-module signal ga-client.ts
// reads, and boots or stops GA4 on change. Renders nothing. Ported from the
// academy's ConsentBridge (which also drives PostHog; the apex has no PostHog).
import { useEffect } from 'react'
import { useConsentManager } from '@c15t/nextjs'
import { setAnalyticsConsent } from '../lib/consent-signal'
import { loadGa, revokeGa } from '../lib/ga-client'

export function ConsentBridge() {
  const { consents, consentInfo } = useConsentManager()
  const granted = Boolean(consents.measurement)
  // An explicit decision, as opposed to a banner still waiting. Only a decided
  // "no" deletes GA's cookies: they live on the parent domain, and an
  // undecided visitor here never loaded GA, so there is nothing of ours to
  // remove.
  const decided = consentInfo != null

  useEffect(() => {
    setAnalyticsConsent(granted)
    if (granted) loadGa()
    else if (decided) revokeGa()
  }, [granted, decided])

  return null
}
