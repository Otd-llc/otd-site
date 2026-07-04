// Live brand-banner art (the F3 lockup: EEG trace · wordmark · bee watermark).
// Rendered from the same component that produced public/brand/social/*.png, so
// the media-kit preview never drifts from the downloadable asset. Composition is
// width-fitting + aspect-aware: the bee stays fully in frame and flush-right, the
// wordmark auto-fits every ratio. Deterministic (no Date/Math.random).
import { BrandMark } from './BrandMark'

const WORD = 'ONE THOUSAND DRONES'
type Pal = { bg: string; ink: string; gold: string; muted: string; blue: string }
const DARK: Pal = { bg: '#08090d', ink: '#f1ece0', gold: '#c8963e', muted: '#aaaaaa', blue: '#4a8fff' }
const IVORY: Pal = { bg: '#faf7f0', ink: '#14181f', gold: '#b5882e', muted: '#6b7280', blue: '#3f6dd0' }

function wavePath() {
  const amp = 15, base = 50, freq = 0.2, N = 180
  let d = ''
  for (let i = 0; i <= N; i++) {
    const x = (i * 100) / N, t = i * freq
    let y = base + amp * Math.sin(t) * (0.5 + 0.5 * Math.sin(t * 0.11)) + amp * 0.3 * Math.sin(t * 2.7)
    if (i % 23 === 0) y -= amp * 0.65
    d += `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)} `
  }
  return d
}
const FILL = { position: 'absolute', inset: 0, width: '100%', height: '100%' } as const

/** The F3 banner composition at an arbitrary pixel size. `w`/`h` drive everything. */
export function BannerArt({ w, h, theme = 'dark', blue }: { w: number; h: number; theme?: 'dark' | 'ivory'; blue?: boolean }) {
  const pal = theme === 'ivory' ? IVORY : DARK
  const op = theme === 'ivory' ? 0.13 : 0.1
  const beeH = Math.min(h * 1.0, w * 0.34)
  const beeRight = w * 0.01
  const beeZone = beeH + beeRight + w * 0.02
  const traceZone = w * 0.13
  const avail = Math.max(60, w - traceZone - beeZone)
  const wordPx = Math.min(h * 0.3, avail / 10)
  const eyePx = wordPx * 0.26
  const mask = 'linear-gradient(to right,#000 10%,transparent 22%,transparent 100%)'
  return (
    <div style={{ position: 'relative', width: w, height: h, background: pal.bg, overflow: 'hidden' }}>
      <div aria-hidden className="mk" style={{ position: 'absolute', right: beeRight, top: '50%', transform: 'translateY(-50%)', width: beeH, height: beeH, color: pal.gold, opacity: op, zIndex: 0 }}><BrandMark /></div>
      <div style={{ ...FILL, WebkitMaskImage: mask, maskImage: mask, zIndex: 1 }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={FILL}><path d={wavePath()} fill="none" stroke={blue ? pal.blue : pal.gold} strokeWidth={0.6} opacity={0.75} vectorEffect="non-scaling-stroke" strokeLinejoin="round" /></svg>
      </div>
      <div style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: h * 0.05, paddingLeft: traceZone, paddingRight: beeZone }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: wordPx, letterSpacing: '0.05em', color: pal.ink, lineHeight: 0.92, WebkitTextStroke: `${wordPx * 0.018}px ${pal.ink}`, whiteSpace: 'nowrap' }}>{WORD}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: eyePx, letterSpacing: '0.24em', textTransform: 'uppercase', color: pal.muted, whiteSpace: 'nowrap' }}>Biometrically scaled</span>
      </div>
    </div>
  )
}
