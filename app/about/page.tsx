import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '../components/ui/Section'
import { MetaStrip } from '../components/ui/MetaStrip'

export const metadata: Metadata = {
  title: 'About',
  description:
    'One Thousand Drones is a SAM.gov-registered lab founded by Joshua Tollette, building BioScale-BCI, a non-invasive brain–computer interface for supervisory swarm command.',
  openGraph: {
    title: 'About · One Thousand Drones',
    description:
      'Founder-led, defense-registered lab building the Brain-to-Swarm BCI platform.',
    url: 'https://onethousanddrones.com/about',
    siteName: 'One Thousand Drones, LLC',
    locale: 'en_US',
    type: 'website',
  },
}

export default function About() {
  return (
    <Section id="about" kicker="04 · About" title="BUILT IN A DEFENSE-REGISTERED LAB">
      <div className="about-grid">
        <Image
          className="about-photo"
          src="/josh2.jpg"
          width={800}
          height={1000}
          alt="Joshua Tollette, founder and principal investigator of One Thousand Drones"
          priority
        />
        <div className="about-bio">
          <p>
            <b>One Thousand Drones, LLC</b> is a SAM.gov-registered research lab in Broken Arrow,
            Oklahoma, founded by <b>Joshua Tollette</b>, who leads the program as founder and
            principal investigator.
          </p>
          <p>
            The lab’s thesis is <b>Brain-to-Swarm</b>: read a trained operator’s intent
            non-invasively, and use it to supervise a swarm that flies itself. <b>BioScale-BCI</b>{' '}
            classifies <b>Embodied Motor Imagery</b> into vectorial intent (high-level
            directional commands) while each platform’s edge-autonomy handles flight. That
            decoupling is what lets one operator command many platforms at once.
          </p>
          <p>
            Its first commercial system, <b>OIDAT</b>, is an operator-safety layer that reads
            operator engagement and hands control authority to a safe state the instant
            responsiveness collapses. OIDAT is an operator-safety system, not a medical device.
          </p>
          <p>
            The same closed-loop stack is taught board-by-board in the <b>Academy</b>, so makers
            and engineers can build the platform from a first ESP32 board up to an EEG BCI.
          </p>
          <div className="about-meta">
            <MetaStrip />
          </div>
          <div className="cta-row">
            <Link className="glass-button glass-button-cta" href="/contact">
              Request a briefing →
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
