/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

const ACADEMY = 'https://academy.onethousanddrones.com'

// Server component — a technical "colophon" footer: brand spine, two nav
// columns, and an engineering title-block plate carrying the official record
// (entity, CAGE/UEI, SAM, origin, ©). Uses the site type system (Bebas wordmark
// / Lora tagline / Space Mono chrome) with gold rationed to labels only.
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

      <div className="foot-plate">
        <div className="title-block">
          <div className="tb-cell">
            <span className="tb-label">Entity</span>
            <span className="tb-value">One Thousand Drones, LLC</span>
          </div>
          <div className="tb-cell">
            <span className="tb-label">CAGE</span>
            <span className="tb-value">1ZYS4</span>
          </div>
          <div className="tb-cell">
            <span className="tb-label">UEI</span>
            <span className="tb-value">WDQXD9L9UFH3</span>
          </div>
          <div className="tb-cell">
            <span className="tb-label">SAM.gov</span>
            <span className="tb-value">Registered</span>
          </div>
          <div className="tb-cell">
            <span className="tb-label">Origin</span>
            <span className="tb-value">Broken Arrow, OK · USA</span>
          </div>
          <div className="tb-cell">
            <span className="tb-label">Copyright</span>
            <span className="tb-value">© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
