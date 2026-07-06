// Live brand-banner art — the academy PageHeader "bench-hero" recipe applied to a
// banner. Gold title-rule on top, a gold Bebas eyebrow (the wordmark), a big
// LEFT-ALIGNED Bebas title (the tagline) with ivory→gold word alternation and
// hollow .tdot periods, an EEG trace fading in from the left, and the bee
// watermark on the right. Text sits right of the X avatar zone; sized to read
// small. Same component that produces public/brand/social/*.png (no drift).
import { BrandMark } from './BrandMark'

type Pal = { bg: string; ink: string; gold: string; goldEye: string; eeg: string; hair: string; beeOp: number }
const DARK: Pal = { bg: '#08090d', ink: '#f1ece0', gold: '#c8963e', goldEye: '#c8963e', eeg: '#e8b865', hair: '#3a3f50', beeOp: 0.22 }
const IVORY: Pal = { bg: '#faf7f0', ink: '#14181f', gold: '#b5882e', goldEye: '#8a6212', eeg: '#b5882e', hair: '#d8d2c4', beeOp: 0.18 }
const FILL = { position: 'absolute', inset: 0, width: '100%', height: '100%' } as const

function wavePath() {
  const amp = 15, base = 50, freq = 0.2, N = 180
  let d = ''
  for (let i = 0; i <= N; i++) { const x = (i * 100) / N, t = i * freq; let y = base + amp * Math.sin(t) * (0.5 + 0.5 * Math.sin(t * 0.11)) + amp * 0.3 * Math.sin(t * 2.7); if (i % 23 === 0) y -= amp * 0.65; d += `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)} ` }
  return d
}

/** The brand banner at an arbitrary pixel size. `w`/`h` drive everything. */
export function BannerArt({ w, h, theme = 'dark', blue }: { w: number; h: number; theme?: 'dark' | 'ivory'; blue?: boolean }) {
  const p = theme === 'ivory' ? IVORY : DARK
  const eegColor = blue ? (theme === 'ivory' ? '#3f6dd0' : '#4a8fff') : p.eeg
  const beeH = Math.min(h, w * 0.26), beeRight = w * 0.02
  const beeZone = beeH + beeRight + w * 0.02
  const left = w * 0.3, blockW = Math.max(120, w - left - beeZone)
  const heroPx = Math.min(h * 0.4, blockW / 6.1)
  const ordPx = heroPx * 0.34
  const mask = 'linear-gradient(to right,#000 18%,transparent 27%,transparent 100%)'
  const titleBase: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: heroPx, color: p.ink, lineHeight: 0.82, letterSpacing: '-0.01em', display: 'block', WebkitTextStroke: `${heroPx * 0.02}px currentColor`, textAlign: 'left', textTransform: 'uppercase' }
  const gold: React.CSSProperties = { color: p.gold }
  const dot: React.CSSProperties = { WebkitTextFillColor: 'transparent', WebkitTextStrokeWidth: `${heroPx * 0.04}px`, WebkitTextStrokeColor: 'currentColor' }
  return (
    <div style={{ position: 'relative', width: w, height: h, background: p.bg, overflow: 'hidden' }}>
      <div aria-hidden className="mk" style={{ position: 'absolute', right: beeRight, top: '50%', transform: 'translateY(-50%)', width: beeH, height: beeH, color: p.gold, opacity: p.beeOp, zIndex: 0 }}><BrandMark /></div>
      <div style={{ ...FILL, WebkitMaskImage: mask, maskImage: mask, zIndex: 1 }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={FILL}><path d={wavePath()} fill="none" stroke={eegColor} strokeWidth={1.8} opacity={theme === 'ivory' ? 0.85 : 1} vectorEffect="non-scaling-stroke" strokeLinejoin="round" /></svg>
      </div>
      <div style={{ position: 'absolute', left, top: 0, bottom: 0, width: blockW, zIndex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: blockW, height: 1, background: p.hair, marginBottom: heroPx * 0.22 }}>
          <div style={{ position: 'absolute', top: -1, left: 0, height: 2, width: '60%', background: `linear-gradient(90deg, ${p.gold}, transparent)` }} />
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: ordPx, letterSpacing: '0.3em', textTransform: 'uppercase', color: p.goldEye, marginBottom: heroPx * 0.14 }}>ONE THOUSAND DRONES</span>
        <span style={titleBase}>ONE <span style={gold}>MIND</span><span style={dot}>.</span><br />MANY <span style={gold}>MACHINES</span><span style={dot}>.</span></span>
      </div>
    </div>
  )
}
