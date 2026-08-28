'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { BrandMark } from './BrandMark'

// The academy is a DIFFERENT ORIGIN, so it must be a plain anchor -- the same rule
// Door.tsx already states ("internal targets use next/link; external use a plain
// anchor").
//
// It used to be `<Link href="/academy">`, relying on the next.config.js redirect.
// next/link PREFETCHES, and a prefetch is an RSC request carrying an `RSC` header.
// The redirect sent that cross-origin, which made it a CORS preflight, and the
// academy does not list `rsc` in Access-Control-Allow-Headers -- so every apex page
// load fired failing preflights and logged
//   "Request header field rsc is not allowed by Access-Control-Allow-Headers"
// plus a net::ERR_FAILED, once per prefetch.
//
// Linking straight to the host fixes it at the source and also drops a redirect hop.
// The /academy redirect stays in next.config.js: it is still the right thing for a
// typed URL or an inbound link, it just must not be a client-router target.
//
// Do NOT "fix" this by widening the academy's CORS to allow the `rsc` header. That
// would invite cross-origin RSC fetches of the academy's payloads, which is a real
// exposure to buy back a prefetch nobody needs across origins.
const ACADEMY = 'https://academy.onethousanddrones.com'

const NAV: { href: string; label: string; external?: boolean }[] = [
  { href: '/#bioscale', label: 'BioScale' },
  { href: '/#oidat', label: 'OIDAT' },
  { href: ACADEMY, label: 'Academy', external: true },
  { href: '/about', label: 'About' },
  { href: '/brand', label: 'Brand' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [])
  return (
    <header className="app-header" ref={ref}>
      <Link className="hbrand" href="/" aria-label="One Thousand Drones home">
        <BrandMark className="bee" />
        <span className="wm">
          ONE <span className="wm-ac">THOUSAND</span> DRONES
        </span>
      </Link>
      <nav className="hnav" aria-label="Primary">
        {NAV.map((n) =>
          n.external ? (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ) : (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ),
        )}
      </nav>
      <div className="hright">
        <a className="glass-button glass-button-cta" href={ACADEMY}>
          Enter the Academy →
        </a>
        <button
          className="hmenu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          ≡
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="hnav-mobile" aria-label="Mobile">
          {NAV.map((n) =>
            n.external ? (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ) : (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ),
          )}
        </nav>
      )}
    </header>
  )
}
