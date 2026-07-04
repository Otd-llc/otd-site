// Live YouTube-thumbnail template (the C8 layout): giant Saira episode number as
// a bold backdrop, an EEG trace along the bottom, the ONE THOUSAND DRONES mark
// top-left, a LESSON tag top-right, and the tag + two-line title lower-left. Swap
// tag / num / title per video; the layout stays fixed so the channel reads as a
// series. Same component that renders the media-kit preview and the export PNGs.
import { BrandMark } from './BrandMark'

const WORD = 'ONE THOUSAND DRONES'
type Pal = { bg: string; ink: string; gold: string; goldD: string; muted: string }
const DARK: Pal = { bg: '#08090d', ink: '#f1ece0', gold: '#c8963e', goldD: '#e8b865', muted: '#aaaaaa' }
const IVORY: Pal = { bg: '#faf7f0', ink: '#14181f', gold: '#b5882e', goldD: '#8a6212', muted: '#6b7280' }
const FILL = { position: 'absolute', inset: 0, width: '100%', height: '100%' } as const

function wavePath() {
  const amp = 15, base = 50, freq = 0.2, N = 180
  let d = ''
  for (let i = 0; i <= N; i++) { const x = (i * 100) / N, t = i * freq; let y = base + amp * Math.sin(t) * (0.5 + 0.5 * Math.sin(t * 0.11)) + amp * 0.3 * Math.sin(t * 2.7); if (i % 23 === 0) y -= amp * 0.65; d += `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)} ` }
  return d
}

export type ThumbnailProps = {
  w?: number; h?: number; theme?: 'dark' | 'ivory'
  tag: string; num: string; titleTop: string; titleAccent: string
}

/** The C8 thumbnail template at 16:9. `w`/`h` drive all sizing (default 1280×720). */
export function ThumbnailArt({ w = 1280, h = 720, theme = 'dark', tag, num, titleTop, titleAccent }: ThumbnailProps) {
  const p = theme === 'ivory' ? IVORY : DARK
  return (
    <div style={{ position: 'relative', width: w, height: h, background: p.bg, overflow: 'hidden' }}>
      {/* giant number backdrop */}
      <div style={{ position: 'absolute', right: w * 0.05, top: '48%', transform: 'translateY(-50%)' }}>
        <span style={{ fontFamily: 'var(--font-numeral)', fontWeight: 800, fontSize: h * 1.15, lineHeight: 0.72, color: p.gold, opacity: 0.22, fontVariantNumeric: 'tabular-nums' }}>{num}</span>
      </div>
      {/* EEG trace along the bottom */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '32%', WebkitMaskImage: 'linear-gradient(to right,#000 55%,transparent 100%)', maskImage: 'linear-gradient(to right,#000 55%,transparent 100%)' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={FILL}><path d={wavePath()} fill="none" stroke={p.gold} strokeWidth={0.7} opacity={0.6} vectorEffect="non-scaling-stroke" strokeLinejoin="round" /></svg>
      </div>
      {/* wordmark top-left */}
      <div style={{ position: 'absolute', top: h * 0.08, left: w * 0.05, display: 'flex', alignItems: 'center', gap: h * 0.02 }}>
        <div className="mk" style={{ width: h * 0.09, height: h * 0.09, color: p.gold }}><BrandMark /></div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: h * 0.05, letterSpacing: '0.05em', color: p.ink }}>{WORD}</span>
      </div>
      {/* lesson tag top-right */}
      <div style={{ position: 'absolute', top: h * 0.1, right: w * 0.05 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: h * 0.05, letterSpacing: '0.2em', color: p.muted }}>LESSON {num}</span>
      </div>
      {/* tag + title lower-left */}
      <div style={{ position: 'absolute', left: w * 0.05, bottom: h * 0.15, display: 'flex', flexDirection: 'column', gap: h * 0.04 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: h * 0.055, letterSpacing: '0.22em', textTransform: 'uppercase', color: theme === 'ivory' ? p.goldD : p.gold }}>{tag}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: h * 0.19, lineHeight: 0.9, letterSpacing: '0.01em', color: p.ink, WebkitTextStroke: `${h * 0.19 * 0.014}px ${p.ink}` }}>
          {titleTop}<br /><span style={{ color: p.gold, WebkitTextStroke: `${h * 0.19 * 0.014}px ${p.gold}` }}>{titleAccent}</span>
        </span>
      </div>
    </div>
  )
}
