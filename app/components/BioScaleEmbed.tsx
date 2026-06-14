'use client'
import { useEffect, useState } from 'react'

const DEMO = 'https://demo.onethousanddrones.com'
const SCN = [
  { key: '1', label: 'Baseline' },
  { key: '2', label: 'MI-Left' },
  { key: '3', label: 'MI-Right' },
  { key: '4', label: 'Null' },
  { key: '5', label: 'Panic' },
  { key: '6', label: 'OIDAT' },
]

export function BioScaleEmbed() {
  const [active, setActive] = useState('1')

  const go = (key: string) => {
    const f = document.getElementById('viz') as HTMLIFrameElement | null
    // Cross-origin can't inject real keystrokes, so postMessage the key → the
    // demo re-fires the keydown internally (origin-restricted listener in
    // bioscale-viz/src/main.ts).
    f?.contentWindow?.postMessage({ type: 'otd-scenario', key }, DEMO)
    setActive(key)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore typing in form fields (matters once the contact form exists).
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return
      if (e.key >= '1' && e.key <= '6') go(e.key)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <figure className="glass-card figure" data-rv>
      <figcaption className="figcap">
        <span>Fig.01 — BioScale-Viz</span>
        <span className="live">● Live BCI drone control</span>
      </figcaption>
      <iframe
        id="viz"
        className="viz"
        src={DEMO}
        title="BioScale-Viz — real-time BCI drone control"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <div className="tryit">
        <span className="tryit-label">
          Try it <span className="hint">— press 1–6 or tap</span>
        </span>
        <div className="scn-grid">
          {SCN.map((s) => (
            <button
              key={s.key}
              className={active === s.key ? 'scn active' : 'scn'}
              aria-pressed={active === s.key}
              onClick={() => go(s.key)}
            >
              <span className="cap">{s.key}</span>
              <span className="nm">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </figure>
  )
}
