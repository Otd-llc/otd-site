import type { Metadata } from 'next'
import { Section } from '../components/ui/Section'
import { MetaStrip } from '../components/ui/MetaStrip'
import { BriefingForm } from '../components/BriefingForm'

export const metadata: Metadata = {
  title: 'Request a Briefing',
  description:
    'Request a briefing with One Thousand Drones — a SAM.gov-registered lab building the BioScale BCI and OIDAT operator-safety system for defense and program partners.',
  openGraph: {
    title: 'Request a Briefing · One Thousand Drones',
    description: 'For defense and program partners — request a briefing.',
    url: 'https://onethousanddrones.com/contact',
    siteName: 'One Thousand Drones, LLC',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Contact() {
  return (
    <Section id="contact" kicker="05 · Contact" title="REQUEST A BRIEFING">
      <p className="brief-lead">
        For defense and program partners evaluating BioScale-BCI or OIDAT: tell us about your
        program and we’ll set up a briefing. Everything goes straight to the founder.
      </p>
      <BriefingForm />
      <p className="brief-fallback">
        Prefer email? <a href="mailto:josh@onethousanddrones.com">josh@onethousanddrones.com</a>
      </p>
      <div style={{ marginTop: '2rem' }}>
        <MetaStrip />
      </div>
    </Section>
  )
}
