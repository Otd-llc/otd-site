// Live YouTube-thumbnail template — the academy-heading treatment (V1): gold
// title-rule, a gold Bebas eyebrow (the tag), a big title with ivory→gold word
// alternation + hollow .tdot periods, over a giant faint Saira episode number and
// an EEG trace. Brand mark top-left, LESSON tag top-right. Swap tag / num / title
// per video. Same component that renders the media-kit preview + export PNGs.
import { Fragment } from 'react'
import { BrandMark } from './BrandMark'

const GOLD = '#c8963e', GOLDL = '#e8b865', BG = '#08090d', INK = '#f1ece0', MUT = '#aaaaaa', HAIR = '#3a3f50'
const WORD = 'ONE THOUSAND DRONES'
const FILL = { position: 'absolute', inset: 0, width: '100%', height: '100%' } as const
const FUNC = new Set(['a', 'an', 'the', 'to', 'of', 'and', 'or', 'for', 'in', 'on', 'at', 'by', 'as', 'it', 'is', 'with', 'from', 'into'])

function wavePath() {
  const amp = 15, base = 50, freq = 0.2, N = 180
  let d = ''
  for (let i = 0; i <= N; i++) { const x = (i * 100) / N, t = i * freq; let y = base + amp * Math.sin(t) * (0.5 + 0.5 * Math.sin(t * 0.11)) + amp * 0.3 * Math.sin(t * 2.7); if (i % 23 === 0) y -= amp * 0.65; d += `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)} ` }
  return d
}
// content words alternate ivory→gold; periods rendered hollow (.tdot)
function renderTitle(title: string, px: number) {
  let c = 0
  const dot: React.CSSProperties = { WebkitTextFillColor: 'transparent', WebkitTextStrokeWidth: `${px * 0.04}px`, WebkitTextStrokeColor: 'currentColor' }
  const wrapDots = (s: string) => s.split(/(\.)/).map((p, j) => (p === '.' ? <span key={j} style={dot}>.</span> : <Fragment key={j}>{p}</Fragment>))
  return title.split(/(\s+)/).map((tok, i) => {
    if (tok.trim() === '') return <Fragment key={i}>{tok}</Fragment>
    const m = tok.match(/^([^A-Za-z0-9]*)([A-Za-z0-9](?:.*[A-Za-z0-9])?)?([^A-Za-z0-9]*)$/)
    const pre = m?.[1] ?? '', core = m?.[2] ?? '', post = m?.[3] ?? ''
    const isFunc = FUNC.has(core.toLowerCase().replace(/[^a-z0-9]/g, ''))
    const gold = core && !isFunc && ++c % 2 === 0
    return <Fragment key={i}>{wrapDots(pre)}{core ? (gold ? <span style={{ color: GOLD }}>{core}</span> : core) : null}{wrapDots(post)}</Fragment>
  })
}

export type ThumbnailProps = { w?: number; h?: number; tag: string; num: string; title: string }

/** The V1 thumbnail template at 16:9 (default 1280×720). Swap tag / num / title. */
export function ThumbnailArt({ w = 1280, h = 720, tag, num, title }: ThumbnailProps) {
  const titlePx = h * 0.15, ordPx = titlePx * 0.34, blockW = w * 0.56
  return (
    <div style={{ position: 'relative', width: w, height: h, background: BG, overflow: 'hidden' }}>
      {/* giant number backdrop */}
      <span aria-hidden style={{ position: 'absolute', right: w * 0.03, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-numeral)', fontWeight: 800, fontSize: h * 1.15, color: GOLD, opacity: 0.22, lineHeight: 0.72, fontVariantNumeric: 'tabular-nums' }}>{num}</span>
      {/* EEG bottom */}
      <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%', WebkitMaskImage: 'linear-gradient(to right,#000 55%,transparent 100%)', maskImage: 'linear-gradient(to right,#000 55%,transparent 100%)' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={FILL}><path d={wavePath()} fill="none" stroke={GOLDL} strokeWidth={0.8} opacity={0.6} vectorEffect="non-scaling-stroke" strokeLinejoin="round" /></svg>
      </div>
      {/* brand top-left */}
      <div style={{ position: 'absolute', top: h * 0.08, left: w * 0.05, display: 'flex', alignItems: 'center', gap: h * 0.02 }}>
        <div className="mk" style={{ width: h * 0.09, height: h * 0.09, color: GOLD }}><BrandMark /></div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: h * 0.05, letterSpacing: '0.05em', color: INK }}>{WORD}</span>
      </div>
      {/* lesson tag top-right */}
      <span style={{ position: 'absolute', top: h * 0.1, right: w * 0.05, fontFamily: 'var(--font-mono)', fontSize: h * 0.05, letterSpacing: '0.2em', color: MUT }}>LESSON {num}</span>
      {/* academy-heading lockup */}
      <div style={{ position: 'absolute', left: w * 0.05, top: '52%', transform: 'translateY(-42%)', width: blockW, display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', width: blockW, height: 1, background: HAIR, marginBottom: titlePx * 0.22 }}><div style={{ position: 'absolute', top: -1, left: 0, height: 2, width: '60%', background: `linear-gradient(90deg,${GOLD},transparent)` }} /></div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: ordPx, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: titlePx * 0.14 }}>{tag}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: titlePx, color: INK, lineHeight: 0.85, letterSpacing: '-0.01em', textTransform: 'uppercase', WebkitTextStroke: `${titlePx * 0.02}px currentColor`, textAlign: 'left' }}>{renderTitle(title, titlePx)}</span>
      </div>
    </div>
  )
}
