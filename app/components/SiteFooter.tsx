import Link from 'next/link'
import { BrandMark } from './BrandMark'

const ACADEMY = 'https://academy.onethousanddrones.com'

// Server component — an airy colophon footer: brand spine, scalable themed
// nav groups (auto-fit grid, add a group and it reflows), and a registry group
// carrying the defense record. Gold rationed to the bee. Bebas wordmark /
// Space Mono chrome.
export function SiteFooter() {
  return (
    <footer className="app-footer">
      <div className="foot-inner">
        <Link className="foot-brand" href="/" aria-label="One Thousand Drones home">
          <BrandMark className="foot-bee" />
          <span className="foot-wm">ONE THOUSAND DRONES</span>
        </Link>
        <p className="foot-tag">One mind, many machines.</p>

        <div className="foot-cols">
          <nav className="foot-group" aria-label="Platform">
            <span className="foot-gh">Platform</span>
            <Link href="/#bioscale">BioScale</Link>
            <Link href="/#oidat">OIDAT</Link>
            <a href={ACADEMY} rel="noopener">
              Academy <span className="ext">↗</span>
            </a>
          </nav>

          <nav className="foot-group" aria-label="Company">
            <span className="foot-gh">Company</span>
            <Link href="/about">About</Link>
            <Link href="/contact">Request a briefing</Link>
            <a href="mailto:josh@onethousanddrones.com">josh@onethousanddrones.com</a>
          </nav>

          <div className="foot-group">
            <span className="foot-gh">Registry</span>
            <p className="foot-reg">
              Broken Arrow, OK · USA
              <br />
              SAM.gov Registered · CAGE 1ZYS4
              <br />
              UEI WDQXD9L9UFH3
            </p>
          </div>
        </div>

        <div className="foot-end">
          <p className="foot-copy">© 2026 One Thousand Drones, LLC</p>
        </div>
      </div>
    </footer>
  )
}
