// Live YouTube channel art (2560×1440) using the full canvas. The academy-heading
// lockup sits in the safe band (1546×423); the main gold EEG channel + big bee
// span the desktop band; two signal-blue aux EEG channels fill the TV-only bands
// above/below (multi-channel readout, TV view only). All channels fade like the
// main. Same component that produces the exported PNG (no drift).
import { BrandMark } from './BrandMark'

const GOLD = '#c8963e', GOLDL = '#e8b865', BLUE = '#4a8fff', BG = '#08090d', INK = '#f1ece0', HAIR = '#3a3f50'
const FILL = { position: 'absolute', inset: 0, width: '100%', height: '100%' } as const

function wavePath(phase: number) {
  const amp = 15, base = 50, freq = 0.2, N = 220
  let d = ''
  for (let i = 0; i <= N; i++) { const x = (i * 100) / N, t = i * freq + phase; let y = base + amp * Math.sin(t) * (0.5 + 0.5 * Math.sin(t * 0.11)) + amp * 0.3 * Math.sin(t * 2.7); if (i % 23 === 0) y -= amp * 0.65; d += `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)} ` }
  return d
}
function Channel({ color, op, phase, wpx }: { color: string; op: number; phase: number; wpx: number }) {
  return <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={FILL}><path d={wavePath(phase)} fill="none" stroke={color} strokeWidth={wpx} opacity={op} vectorEffect="non-scaling-stroke" strokeLinejoin="round" /></svg>
}

export function YouTubeArt({ w = 2560, h = 1440 }: { w?: number; h?: number }) {
  const bandH = (h * 423) / 1440, bandTop = (h - bandH) / 2
  const safeW = (w * 1546) / 2560
  const blockW = safeW * 0.62
  const blockLeft = (w - blockW) / 2 - safeW * 0.02
  const heroPx = Math.min(bandH * 0.4, blockW / 6.1)
  const ordPx = heroPx * 0.34
  const beeH = h * 0.92, beeCx = w * 0.72
  const eegRight = blockLeft
  const auxPad = bandTop * 0.16
  const auxFade = { WebkitMaskImage: 'linear-gradient(to right,#000 45%,transparent 72%)', maskImage: 'linear-gradient(to right,#000 45%,transparent 72%)' } as const
  const mainFade = { WebkitMaskImage: `linear-gradient(to right,#000 ${(eegRight / w) * 100 - 10}%,transparent ${(eegRight / w) * 100}%)`, maskImage: `linear-gradient(to right,#000 ${(eegRight / w) * 100 - 10}%,transparent ${(eegRight / w) * 100}%)` } as const
  const dot: React.CSSProperties = { WebkitTextFillColor: 'transparent', WebkitTextStrokeWidth: `${heroPx * 0.04}px`, WebkitTextStrokeColor: 'currentColor' }
  return (
    <div style={{ position: 'relative', width: w, height: h, background: BG, overflow: 'hidden' }}>
      {/* aux EEG channels — TV-only bands */}
      <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, top: auxPad, height: bandTop - auxPad * 1.6, zIndex: 1, ...auxFade }}><Channel color={BLUE} op={0.4} phase={2.1} wpx={1.3} /></div>
      <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, top: bandTop + bandH + auxPad * 0.6, height: bandTop - auxPad * 1.6, zIndex: 1, ...auxFade }}><Channel color={BLUE} op={0.4} phase={4.3} wpx={1.3} /></div>
      {/* big bee */}
      <div aria-hidden className="mk" style={{ position: 'absolute', left: beeCx - beeH / 2, top: '50%', transform: 'translateY(-50%)', width: beeH, height: beeH, color: GOLD, opacity: 0.22, zIndex: 1 }}><BrandMark /></div>
      {/* main channel */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: bandTop, height: bandH, zIndex: 2, ...mainFade }}><Channel color={GOLDL} op={1} phase={0} wpx={1.6} /></div>
      {/* lockup */}
      <div style={{ position: 'absolute', left: blockLeft, top: bandTop, height: bandH, width: blockW, zIndex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: blockW, height: 1, background: HAIR, marginBottom: heroPx * 0.22 }}><div style={{ position: 'absolute', top: -1, left: 0, height: 2, width: '60%', background: `linear-gradient(90deg,${GOLD},transparent)` }} /></div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: ordPx, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: heroPx * 0.14 }}>ONE THOUSAND DRONES</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: heroPx, color: INK, lineHeight: 0.82, letterSpacing: '-0.01em', textTransform: 'uppercase', WebkitTextStroke: `${heroPx * 0.02}px currentColor` }}>ONE <span style={{ color: GOLD }}>MIND</span><span style={dot}>.</span><br />MANY <span style={{ color: GOLD }}>MACHINES</span><span style={dot}>.</span></span>
      </div>
    </div>
  )
}
