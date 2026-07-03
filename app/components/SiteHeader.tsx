'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { BrandMark } from './BrandMark'

const NAV = [
  { href: '/#bioscale', label: 'BioScale' },
  { href: '/#oidat', label: 'OIDAT' },
  { href: '/academy', label: 'Academy' },
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
        {NAV.map((n) => (
          <Link key={n.href} href={n.href}>
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="hright">
        <Link className="glass-button glass-button-cta" href="/academy">
          Enter the Academy →
        </Link>
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
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
