import type { ReactNode } from 'react'

// The signal-blue "why" banner — academy .mode-band (v4 177–180).
// The reticle SVG is the ORIENT glyph.
export function ModeBand({
  eyebrow,
  children,
}: {
  eyebrow: string
  children: ReactNode
}) {
  return (
    <div className="mode-band" style={{ ['--mode' as string]: '#4a8fff' }}>
      <span className="mode-eyebrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        </svg>
        {eyebrow}
      </span>
      <p className="mode-body">{children}</p>
    </div>
  )
}
