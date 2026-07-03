import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHeader } from '../components/PageHeader'
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://onethousanddrones.com/#org',
        name: 'One Thousand Drones, LLC',
        url: 'https://onethousanddrones.com',
        founder: { '@id': 'https://onethousanddrones.com/#josh' },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Broken Arrow',
          addressRegion: 'OK',
          addressCountry: 'US',
        },
        sameAs: [
          'https://academy.onethousanddrones.com',
          'https://github.com/Otd-llc',
        ],
        identifier: [
          { '@type': 'PropertyValue', propertyID: 'CAGE', value: '1ZYS4' },
          { '@type': 'PropertyValue', propertyID: 'UEI', value: 'WDQXD9L9UFH3' },
        ],
      },
      {
        '@type': 'Person',
        '@id': 'https://onethousanddrones.com/#josh',
        name: 'Joshua Tollette',
        jobTitle: 'Founder and Principal Investigator',
        worksFor: { '@id': 'https://onethousanddrones.com/#org' },
        sameAs: [
          'https://www.linkedin.com/in/joshuatollette/',
          'https://github.com/joshtol',
        ],
      },
    ],
  }

  return (
    <section className="sec" id="about" data-reveal>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader eyebrow="About" title="Built in a defense-registered lab" />

      <div className="about-intro">
        <figure className="about-portrait">
          <div className="about-frame">
            <Image
              className="about-photo"
              src="/josh2.jpg"
              width={800}
              height={1000}
              alt="Joshua Tollette, founder and principal investigator of One Thousand Drones"
              priority
            />
          </div>
          <figcaption className="about-plate">
            <span className="ap-name">Joshua Tollette</span>
            <span className="ap-role">Founder · Principal Investigator</span>
            <span className="ap-links">
              <a
                href="https://www.linkedin.com/in/joshuatollette/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span className="ext">↗</span>
              </a>
              <a
                href="https://github.com/joshtol"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span className="ext">↗</span>
              </a>
            </span>
          </figcaption>
        </figure>

        <div className="about-lead">
          <p>
            <b>One Thousand Drones, LLC</b> is a SAM.gov-registered research lab in Broken
            Arrow, Oklahoma, founded by <b>Joshua Tollette</b>, who leads the program as
            founder and principal investigator.
          </p>
          <p className="about-thesis">
            Its thesis is <b>Brain-to-Swarm</b>: read a trained operator’s intent
            non-invasively, and use it to supervise a swarm that flies itself.
          </p>
          <div className="about-creds">
            <MetaStrip />
          </div>
        </div>
      </div>

      <div className="about-system">
        <p className="asys-cap">The system</p>
        <div className="asys-grid">
          <div className="asys">
            <span className="asys-h">BioScale-BCI</span>
            <p>
              classifies <b>Embodied Motor Imagery</b> into vectorial intent (high-level
              directional commands) while each platform’s edge-autonomy handles flight. That
              decoupling is what lets one operator command many platforms at once.
            </p>
          </div>
          <div className="asys">
            <span className="asys-h">OIDAT</span>
            <p>
              the first commercial system: an operator-safety layer that reads operator
              engagement and hands control authority to a safe state the instant
              responsiveness collapses. An operator-safety system, not a medical device.
            </p>
          </div>
          <div className="asys">
            <span className="asys-h">Academy</span>
            <p>
              the same closed-loop stack, taught board-by-board, so makers and engineers can
              build the platform from a first ESP32 board up to an EEG BCI.
            </p>
          </div>
        </div>
      </div>

      <div className="cta-row">
        <Link className="glass-button glass-button-cta" href="/contact">
          Request a briefing →
        </Link>
      </div>
    </section>
  )
}
