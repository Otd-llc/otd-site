import Link from 'next/link'
import type { ReactNode } from 'react'

// .glass-card.door call-to-action panel (v4 265–270). Internal targets use
// next/link; external (e.g. the academy host) use a plain anchor.
export function Door({
  kicker,
  title,
  body,
  cta,
  href,
  external,
}: {
  kicker: string
  title: string
  body: ReactNode
  cta: string
  href: string
  external?: boolean
}) {
  const inner = (
    <>
      <span className="dk">{kicker}</span>
      <h3>{title}</h3>
      <p>{body}</p>
      <span className="go">
        {cta} <span className="ar">→</span>
      </span>
    </>
  )
  if (external) {
    return (
      <a className="glass-card door" href={href} rel="noopener">
        {inner}
      </a>
    )
  }
  return (
    <Link className="glass-card door" href={href}>
      {inner}
    </Link>
  )
}
