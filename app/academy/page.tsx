import type { Metadata } from 'next'
import { Section } from '../components/ui/Section'

const ACADEMY_URL = 'https://academy.onethousanddrones.com'

export const metadata: Metadata = {
  title: 'Academy',
  description:
    'Build the BioScale BCI yourself, board by board — from your first ESP32 board to an EEG brain–computer interface that commands your own swarm. 22 projects, free start.',
  openGraph: {
    title: 'Academy · One Thousand Drones',
    description:
      'From a first ESP32 board to an EEG BCI that commands your own swarm — 22 projects, free start.',
    url: 'https://onethousanddrones.com/academy',
    siteName: 'One Thousand Drones, LLC',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Academy() {
  return (
    <Section id="academy" kicker="Academy · For makers & engineers" title="BUILD IT YOURSELF">
      <p className="tease-lead">
        The same closed-loop stack we field is taught <b>board by board</b>. Start with your{' '}
        <b>first ESP32 board</b> and build up — through sensing, signal, and edge-autonomy — to an{' '}
        <b>EEG brain–computer interface that commands your own swarm</b>.
      </p>
      <p className="tease-hook">
        22 projects, a free start, and a real bench at the end of it — not a toy.
      </p>
      <div className="tease-cta">
        <a className="glass-button glass-button-cta" href={ACADEMY_URL} rel="noopener">
          Start free with L1.01 →
        </a>
      </div>
    </Section>
  )
}
