/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { MetaStrip } from './ui/MetaStrip'

const ACADEMY = 'https://academy.onethousanddrones.com'

// Server component — a technical "colophon" footer: brand spine, two nav
// columns, and a defense-registration strip. Uses the site type system
// (Bebas wordmark / Lora tagline / Space Mono chrome) with gold rationed
// to labels only.
export function SiteFooter() {
  return (
    <footer className="app-footer">
      <div className="foot-inner">
        <div className="foot-brand">
          <Link className="foot-mark" href="/" aria-label="One Thousand Drones home">
            <img src="/icon.svg" alt="" width={30} height={30} />
            <span className="foot-wm">ONE THOUSAND DRONES</span>
          </Link>
          <p className="foot-tag">One mind, many machines.</p>
          <p className="foot-loc">Broken Arrow, Oklahoma · USA</p>
        </div>

        <nav className="foot-col" aria-label="Platform">
          <span className="foot-h">Platform</span>
          <Link href="/#bioscale">BioScale</Link>
          <Link href="/#oidat">OIDAT</Link>
          <a href={ACADEMY} rel="noopener">
            Academy <span className="ext">↗</span>
          </a>
        </nav>

        <nav className="foot-col" aria-label="Company">
          <span className="foot-h">Company</span>
          <Link href="/about">About</Link>
          <Link href="/contact">Request a briefing</Link>
          <a href="mailto:josh@onethousanddrones.com">josh@onethousanddrones.com</a>
        </nav>
      </div>

      <div className="foot-strip">
        <MetaStrip />
        <p className="foot-copy">© 2026 One Thousand Drones, LLC</p>
      </div>
    </footer>
  )
}
