import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { BrandMark } from '../components/BrandMark'
import { PageHeader } from '../components/PageHeader'

export const metadata: Metadata = {
  title: 'Brand',
  description:
    'The One Thousand Drones brand identity system: palette, the four type faces, the logo system, usage, the honeycomb signature, and the full set of print + digital application templates. Mirrors the live Academy design.',
}

// ── shared bits ───────────────────────────────────────────────────────────
function Kicker({ n, children }: { n: string; children: ReactNode }) {
  return <p className="sec-kicker">{n} &nbsp;—&nbsp; {children}</p>
}
function SpecTable({ cols, rows }: { cols: [string, string]; rows: [ReactNode, ReactNode][] }) {
  return (
    <table className="table-tech" style={{ marginTop: '1.2rem' }}>
      <thead>
        <tr><th>{cols[0]}</th><th>{cols[1]}</th></tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}><td><span className="ref">{r[0]}</span></td><td>{r[1]}</td></tr>
        ))}
      </tbody>
    </table>
  )
}

const COLORS: { nm: string; hex: string; rgb: string; role: string; dark?: boolean }[] = [
  { nm: 'Deep Space', hex: '#08090D', rgb: 'RGB 8, 9, 13', role: 'Primary background. Page base, dark sections.', dark: true },
  { nm: 'Navy Dark', hex: '#1A1A2E', rgb: 'RGB 26, 26, 46', role: 'Secondary background. Cards, panels, headers.' },
  { nm: 'Command Gold', hex: '#C8963E', rgb: 'RGB 200, 150, 62', role: 'Primary accent. Logo, headlines, CTAs, borders.' },
  { nm: 'Gold Light', hex: '#E8B865', rgb: 'RGB 232, 184, 101', role: 'Hover states, highlighted text, emphasis.' },
  { nm: 'Signal Blue', hex: '#4A8FFF', rgb: 'RGB 74, 143, 255', role: 'Neural nodes, data viz, links, drone particles.' },
  { nm: 'White', hex: '#FFFFFF', rgb: 'RGB 255, 255, 255', role: 'Primary headlines on dark backgrounds.' },
  { nm: 'Muted Gray', hex: '#AAAAAA', rgb: 'RGB 170, 170, 170', role: 'Body text on dark. Secondary information.' },
  { nm: 'Alert Red', hex: '#C62828', rgb: 'RGB 198, 40, 40', role: 'Gate indicator. Error states. Critical alerts only.' },
]
const PRINT: [string, string, string, string][] = [
  ['Command Gold', '#C8963E', '0 / 25 / 69 / 22', '7563 C'],
  ['Deep Space', '#08090D', '0 / 0 / 0 / 97', 'Black 6 C'],
  ['Navy Dark', '#1A1A2E', '41 / 41 / 0 / 82', '2767 C'],
  ['Signal Blue', '#4A8FFF', '71 / 44 / 0 / 0', '2727 C'],
]

function Hex({ n, label, on }: { n: string; label: string; on?: boolean }) {
  return (
    <div className={`bhex${on ? ' on' : ''}`}>
      <svg className="hx" viewBox="0 0 100 115.47" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="50,0 100,28.87 100,86.6 50,115.47 0,86.6 0,28.87" />
      </svg>
      <span className="bn" aria-hidden="true">{n}</span>
      <span className="bl">{label}</span>
    </div>
  )
}

export default function BrandPage() {
  return (
    <>
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="bhoney" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#eab94d" /><stop offset="1" stopColor="#b07f31" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Hero ── (the standard apex PageHeader; matches about/contact) */}
      <PageHeader
        eyebrow="Brand identity"
        title="The brand system"
        lead="One palette, four faces, one signature, and the full set of application templates. The Academy's live design at academy.onethousanddrones.com is the source of truth, so the apex, the Academy, and every document speak one voice."
      />

      {/* ── 01 Color ── */}
      <section className="sec">
        <Kicker n="01">Color system</Kicker>
        <h2 className="sec-h2">Gold on deep space</h2>
        <p className="lead">A near-black field, command gold for everything that matters, signal blue for data and the brain-to-swarm link. Red earns its place only for alerts.</p>
        <div className="swatch-grid">
          {COLORS.map((c) => (
            <div className="swatch" key={c.nm}>
              <span className="blk" style={{ background: c.hex, boxShadow: c.dark ? 'inset 0 0 0 1px rgba(255,255,255,.06)' : undefined }} />
              <div className="meta">
                <p className="nm">{c.nm}</p>
                <p className="hx">{c.hex} &nbsp;·&nbsp; {c.rgb}</p>
                <p className="role">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="asys-cap" style={{ marginTop: '2.4rem' }}>Print equivalents</h3>
        <table className="table-tech">
          <thead><tr><th>Color</th><th>Hex</th><th>CMYK (approx)</th><th>Pantone (approx)</th></tr></thead>
          <tbody>{PRINT.map(([nm, hex, cmyk, pms]) => (
            <tr key={nm}><td><span className="ref">{nm}</span></td><td>{hex}</td><td>{cmyk}</td><td>{pms}</td></tr>
          ))}</tbody>
        </table>
      </section>

      {/* ── 02 Typography ── */}
      <section className="sec">
        <Kicker n="02">Typography</Kicker>
        <h2 className="sec-h2">Four faces, one job each</h2>
        <p className="lead">Display for the shout, a dedicated numeral face for figures, mono for the instrument chrome, serif for the reading voice. Never mix the jobs.</p>
        <div className="type-list">
          <div className="type-row">
            <div className="type-meta"><p className="face">Bebas Neue · Display</p><p className="use">Headlines, hero, section titles, the wordmark. All caps, thickened with a glyph stroke.</p></div>
            <div className="type-spec"><p className="spec-display">Embodied <span className="accent">motor imagery</span></p></div>
          </div>
          <div className="type-row">
            <div className="type-meta"><p className="face">Saira Condensed · Numerals<span className="new">NEW</span></p><p className="use">The fourth face. Big hero numerals, hex and stage numbers, prices, stats — heavy condensed digits Bebas can&apos;t carry. Weight 800.</p></div>
            <div className="type-spec"><p className="spec-numeral">01&nbsp; 02&nbsp; 03&nbsp;&nbsp; 600mA&nbsp; 3.3V</p></div>
          </div>
          <div className="type-row">
            <div className="type-meta"><p className="face">Space Mono · Data</p><p className="use">Labels, eyebrows, code, data tables, the console chrome. Uppercase, wide-tracked.</p></div>
            <div className="type-spec"><p className="spec-mono">Requirements · 01 / 08 · status: powered</p></div>
          </div>
          <div className="type-row">
            <div className="type-meta"><p className="face">Lora · Serif</p><p className="use">The reading voice — body, leads, blurbs, formal correspondence.</p></div>
            <div className="type-spec"><p className="spec-serif">Build it for real, one subsystem at a time. <i>Schematic, layout, fabrication, and bring-up.</i></p></div>
          </div>
        </div>
        <div className="callout" style={{ marginTop: '1.6rem' }}>
          <span className="callout-label">Fonts import</span>
          <code style={{ color: 'var(--color-gold-light)', fontSize: 12 }}>Bebas Neue · Space Mono wght 400;700 · Lora ital wght 0,400;0,500;1,400 · Saira Condensed wght 700;800</code>
        </div>
      </section>

      {/* ── 03 Logo system ── */}
      <section className="sec">
        <Kicker n="03">Logo system</Kicker>
        <h2 className="sec-h2">The queen bee</h2>
        <p className="lead">The crowned bee with the Bebas wordmark — the queen commands the drones (military UAS + entomology, a double meaning). Three lockups cover every background.</p>
        <div className="logo-spec">
          <div className="logo-plate"><BrandMark className="bee" /><span className="pn">1kd-icon.svg</span></div>
          <div className="logo-build">
            <p className="lw">ONE THOUSAND<br />DRONES, LLC</p>
            <p className="ann"><b>Bebas Neue</b> · stroke .045em · tracking .06em · gold mark, ivory type</p>
          </div>
          <div className="logo-strip">
            <div className="seg"><span className="grnd l"><BrandMark className="bee" /></span><span className="cap">On light · ink on paper</span></div>
            <div className="seg"><span className="grnd d"><BrandMark className="bee" /></span><span className="cap gold">On deep space · gold mark</span></div>
            <div className="seg"><span className="grnd m"><BrandMark className="bee" /></span><span className="cap">Monochrome · single value</span></div>
          </div>
        </div>
        <h3 className="asys-cap" style={{ marginTop: '2rem' }}>Sub-brand · the Academy</h3>
        <div className="wm-spec">
          <div className="wm-card">
            <div className="wm-lockup"><BrandMark className="bee" /><span className="wm-text">ONE THOUSAND DRONES</span></div>
            <p className="wm-note">Apex / corporate · onethousanddrones.com</p>
          </div>
          <div className="wm-card">
            <div className="wm-lockup"><BrandMark className="bee" /><span className="wm-text">OTD <span className="ac">ACADEMY</span></span></div>
            <p className="wm-note">Academy / product · academy.onethousanddrones.com</p>
          </div>
        </div>
        <div className="callout" style={{ marginTop: '1.6rem' }}>
          <span className="callout-label">Treatment</span>
          Both wordmarks are Bebas, thickened with a <code style={{ color: 'var(--color-gold-light)' }}>-webkit-text-stroke</code> so they read bold without a heavier weight. Bee gold, type ivory; the Academy&apos;s second word is gold. Assets: <code style={{ color: 'var(--color-gold-light)' }}>1kd-icon.svg</code> (mark) · <code style={{ color: 'var(--color-gold-light)' }}>1kd-logotype.svg</code> (mark + wordmark).
        </div>
      </section>

      {/* ── 04 Signature ── */}
      <section className="sec">
        <Kicker n="04">Signature</Kicker>
        <h2 className="sec-h2">The honeycomb</h2>
        <p className="lead">The system&apos;s one bold element, new from the Academy: number-hero hexes, gold on deep space. Stages, courses, and the skill tree all tessellate from this unit — a big outline numeral, a short code, honey-gold when it&apos;s done.</p>
        <div className="brand-comb">
          <Hex n="01" label="REQ" on /><Hex n="02" label="BOM" /><Hex n="03" label="SCH" /><Hex n="04" label="LAY" />
        </div>
        <div className="callout info" style={{ marginTop: '1.8rem' }}>
          <span className="callout-label">Console, not corporate</span>
          Everything reads like an instrument: mono eyebrows, gold hairlines, gate tags, glass panels on the engineering-paper field. Evidence over adjectives, sentence case, no em-dashes.
        </div>
      </section>

      {/* ── 05 Usage ── */}
      <section className="sec">
        <Kicker n="05">Usage guidelines</Kicker>
        <h2 className="sec-h2">Do and don&apos;t</h2>
        <div className="usage-grid">
          <div className="glass-card usage-card do">
            <p className="usage-h">Do</p>
            <ul className="usage-list">
              <li>Use Command Gold as the primary accent on dark backgrounds</li>
              <li>Use Bebas Neue for all display and headline text</li>
              <li>Use Saira Condensed for prominent numerals and stats</li>
              <li>Use Space Mono for labels, metadata, and technical data</li>
              <li>Use Lora for all body copy and formal correspondence</li>
              <li>Keep the wordmark as &ldquo;ONE THOUSAND DRONES, LLC&rdquo; — all caps, full legal name</li>
              <li>Maintain minimum clear space around the logo at all times</li>
              <li>Use the templates below for all formal correspondence</li>
            </ul>
          </div>
          <div className="glass-card usage-card dont">
            <p className="usage-h">Don&apos;t</p>
            <ul className="usage-list">
              <li>Don&apos;t use the logo on busy or photographic backgrounds</li>
              <li>Don&apos;t stretch, skew, or rotate the wordmark</li>
              <li>Don&apos;t use Command Gold on white without the dark background present</li>
              <li>Don&apos;t substitute Arial, Inter, or system fonts for any brand typeface</li>
              <li>Don&apos;t use the bee mark without the wordmark in formal documents</li>
              <li>Don&apos;t abbreviate the company name to &ldquo;OTD&rdquo; in external communications</li>
              <li>Don&apos;t use Signal Blue as a primary color — it is always secondary to gold</li>
              <li>Don&apos;t use Alert Red for anything other than critical system states</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 06 Letterhead ── */}
      <section className="sec">
        <Kicker n="06">Letterhead</Kicker>
        <h2 className="sec-h2">Formal correspondence</h2>
        <div className="doc-grid one">
          <div>
            <div className="doc no-accent" style={{ borderTop: 0 }}>
              <div className="lh-mast">
                <p className="wm">ONE THOUSAND<br />DRONES, LLC</p>
                <div className="row"><BrandMark className="bee" /><span className="sub">Broken Arrow, OK · onethousanddrones.com</span></div>
              </div>
              <div className="dbody">
                <p className="mono ph">[Date]</p>
                <p style={{ marginTop: '1rem' }}>Dear [Recipient],</p>
                <p style={{ marginTop: '.7rem' }}>Body text in Lora 11–12pt. Formal correspondence appears on letterhead with a minimal header, just the mark and wordmark, so the reader&apos;s attention goes straight to the content.</p>
                <p style={{ marginTop: '.7rem' }}>Respectfully,</p>
                <p style={{ marginTop: '1.4rem' }} className="mono ph">[Full Name] · [Title]<br />One Thousand Drones, LLC</p>
              </div>
              <div className="dfoot"><span>One Thousand Drones, LLC · Broken Arrow, Oklahoma</span><span>onethousanddrones.com</span></div>
            </div>
            <p className="doc-cap">US Letter · 8.5 × 11 in</p>
          </div>
        </div>
      </section>

      {/* ── 07 Email signature ── */}
      <section className="sec">
        <Kicker n="07">Email signature</Kicker>
        <h2 className="sec-h2">One block, every send</h2>
        <div className="doc-grid one">
          <div className="doc no-accent" style={{ borderTop: 0 }}>
            <div className="dbody">
              <div className="sig">
                <BrandMark className="bee" />
                <span className="bar" />
                <div>
                  <p className="nm2">[Full Name]</p>
                  <p className="ln">[Title / Role]</p>
                  <p className="ln" style={{ fontWeight: 700 }}>One Thousand Drones, LLC</p>
                  <p className="ln">Broken Arrow, OK</p>
                  <p className="ln">E: <span className="lnk">[name]@onethousanddrones.com</span> · P: [phone]</p>
                  <p className="tag">Biometrically Scaled Neuro-Robotic Shared Control</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SpecTable cols={['Element', 'Spec']} rows={[
          ['Logo', '1kd-icon.svg, base64-encoded inline, 65 × 62 px'],
          ['Divider', '2px solid #D3D3D3, left border'],
          ['Name', 'Arial 11pt bold, #000000'],
          ['Title / Company', 'Arial 10pt, #333333'],
          ['Tagline', 'Arial 10pt italic, #666666'],
        ]} />
      </section>

      {/* ── 08 Business card ── */}
      <section className="sec">
        <Kicker n="08">Business card</Kicker>
        <h2 className="sec-h2">3.5 × 2 inches</h2>
        <div className="doc-grid">
          <div>
            <div className="bcard">
              <div className="iso" aria-hidden="true" />
              <div className="pad">
                <div className="lk"><BrandMark className="bee" /><span className="wm">ONE THOUSAND DRONES, LLC</span></div>
                <p className="nm">[FULL NAME]</p>
                <p className="ti">[Title / Role]</p>
                <p className="ct">[name]@onethousanddrones.com · [phone] · Broken Arrow, OK</p>
              </div>
            </div>
            <p className="doc-cap">Front</p>
          </div>
          <div>
            <div className="bcard back">
              <div className="iso" aria-hidden="true" />
              <div className="pad">
                <BrandMark className="bee" />
                <p className="tg">Biometrically Scaled Neuro-Robotic<br />Shared Control</p>
                <p className="u">onethousanddrones.com</p>
              </div>
            </div>
            <p className="doc-cap">Back</p>
          </div>
        </div>
        <SpecTable cols={['Spec', 'Value']} rows={[
          ['Size', '3.5 × 2 in (standard US)'],
          ['Stock', 'Warm drafting paper, engineering grid printed top-right'],
          ['Lockup', 'Bee + Bebas wordmark, top-left'],
          ['Name', 'Bebas Neue, stroke-thickened, Navy Dark'],
          ['Contact', 'Space Mono 8px, gold-dim labels'],
          ['Back', 'Drafting paper, centered mark, tagline, URL'],
        ]} />
      </section>

      {/* ── 09 Proposal cover ── */}
      <section className="sec">
        <Kicker n="09">Proposal / report cover</Kicker>
        <h2 className="sec-h2">Federal-ready</h2>
        <div className="doc-grid one">
          <div className="pcover">
            <div className="field">
              <div className="lk"><BrandMark className="bee" /><span className="wm">ONE THOUSAND DRONES, LLC</span></div>
              <p className="ptitle">[PROPOSAL TITLE]</p>
              <p className="pprog">[Program Name] · [Solicitation No.]<br />[Topic / Area of Interest]</p>
            </div>
            <div className="tb">
              <div className="c w2"><p className="k">Principal Investigator</p><p className="v">[Name]</p></div>
              <div className="c"><p className="k">Date</p><p className="v">[Date]</p></div>
              <div className="c"><p className="k">NAICS</p><p className="v">541715</p></div>
              <div className="c w2"><p className="k">Period of Performance</p><p className="v">[Start] – [End]</p></div>
              <div className="c"><p className="k">CAGE</p><p className="v">1ZYS4</p></div>
              <div className="c"><p className="k">UEI</p><p className="v">WDQXD9L9UFH3</p></div>
            </div>
          </div>
        </div>
        <SpecTable cols={['Element', 'Spec']} rows={[
          ['Page size', '8.5 × 11 in (US Letter)'],
          ['Title', 'Bebas Neue, stroke-thickened, Navy Dark'],
          ['Program / Topic', 'Space Mono 11px uppercase, Gold Dim'],
          ['Titleblock', 'Engineering drawing-sheet block, boxed fields'],
          ['Fields', 'PI · Date · NAICS · Period of Performance · CAGE · UEI'],
        ]} />
      </section>

      {/* ── 10 Slide title ── */}
      <section className="sec">
        <Kicker n="10">Slide deck title</Kicker>
        <h2 className="sec-h2">16:9 widescreen</h2>
        <div className="doc-grid one">
          <div className="slidecard">
            <div className="lk"><BrandMark className="bee" /><span className="wm">ONE THOUSAND DRONES, LLC</span></div>
            <p className="stitle">[PRESENTATION TITLE]</p>
            <div className="hcomb">
              <span className="hx honey" />
              <span className="hx honey" style={{ opacity: 0.82 }} />
              <span className="hx honey" style={{ opacity: 0.6 }} />
              <span className="hx ring" style={{ opacity: 0.7 }} />
              <span className="hx ring" style={{ opacity: 0.45 }} />
              <span className="hx ring" style={{ opacity: 0.25 }} />
              <span className="lab">Capability brief · [Date]</span>
            </div>
            <p className="ssub">[Subtitle or Event Name]</p>
          </div>
        </div>
        <SpecTable cols={['Element', 'Spec']} rows={[
          ['Aspect ratio', '16:9 (widescreen)'],
          ['Background', 'Deep Space #08090D'],
          ['Title', 'Bebas Neue, white'],
          ['Signature', 'Honeycomb strip, honey cells dissolving into outline rings'],
          ['Subtitle', 'Space Mono uppercase, Signal Blue'],
        ]} />
      </section>

      {/* ── 11 Document header & footer ── */}
      <section className="sec">
        <Kicker n="11">Document header &amp; footer</Kicker>
        <h2 className="sec-h2">Multi-page strips</h2>
        <p className="lead">Reusable header and footer for multi-page proposals, white papers, and technical reports. Applied to every page after the cover.</p>
        <div className="doc-grid one">
          <div className="hfpage">
            <div className="hd"><BrandMark className="bee" /><span className="dt">[Document Title]</span></div>
            <div className="body">[Page content area]</div>
            <div className="tb">
              <div className="c"><p className="k">Document</p><p className="v">One Thousand Drones, LLC</p></div>
              <div className="c"><p className="k">Doc No.</p><p className="v">[No.]</p></div>
              <div className="c"><p className="k">Rev</p><p className="v">[A]</p></div>
              <div className="c"><p className="k">Page</p><p className="v">[#] / [##]</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12 Envelope ── */}
      <section className="sec">
        <Kicker n="12">Envelope</Kicker>
        <h2 className="sec-h2">#10 standard</h2>
        <div className="doc-grid one">
          <div className="envelope">
            <p className="wm">ONE THOUSAND<br />DRONES, LLC</p>
            <p className="ret">[Street Address] · BROKEN ARROW, OK [ZIP]</p>
            <p className="rcpt">[Recipient Name]<br />[Organization]<br />[Street Address]<br />[City, State ZIP]</p>
          </div>
        </div>
        <SpecTable cols={['Spec', 'Value']} rows={[
          ['Size', '#10 standard, 9.5 × 4.125 in'],
          ['Return masthead', 'Bebas Neue, stroke-thickened, top-left'],
          ['Return address', 'Space Mono 9px, gold-dim'],
          ['Recipient', 'Lora italic, centered'],
        ]} />
      </section>

      {/* ── 13 Social / favicon ── */}
      <section className="sec">
        <Kicker n="13">Social media &amp; favicon</Kicker>
        <h2 className="sec-h2">The mark as avatar</h2>
        <p className="lead">The queen bee mark is the avatar across every platform. Provide both dark and light variants. Never use the full logotype as an avatar.</p>
        <p className="av-sub">Dark variant — deep space</p>
        <div className="av-row">
          <div className="av-cell"><span className="av dark circle" style={{ width: 86, height: 86 }}><BrandMark className="bee" /></span><span className="av-cap">LinkedIn<br />96 × 96</span></div>
          <div className="av-cell"><span className="av dark circle" style={{ width: 60, height: 60 }}><BrandMark className="bee" /></span><span className="av-cap">Social<br />64 × 64</span></div>
          <div className="av-cell"><span className="av dark square" style={{ width: 38, height: 38 }}><BrandMark className="bee" /></span><span className="av-cap">Favicon<br />32 × 32</span></div>
        </div>
        <p className="av-sub">Light variant — white</p>
        <div className="av-row">
          <div className="av-cell"><span className="av light circle" style={{ width: 86, height: 86 }}><BrandMark className="bee" /></span><span className="av-cap">LinkedIn<br />96 × 96</span></div>
          <div className="av-cell"><span className="av light circle" style={{ width: 60, height: 60 }}><BrandMark className="bee" /></span><span className="av-cap">Social<br />64 × 64</span></div>
          <div className="av-cell"><span className="av light square" style={{ width: 38, height: 38 }}><BrandMark className="bee" /></span><span className="av-cap">Favicon<br />32 × 32</span></div>
        </div>
        <SpecTable cols={['Platform', 'Spec']} rows={[
          ['LinkedIn / SAM.gov', '400 × 400 px · circle · gold on deep space, or navy on white'],
          ['Twitter / X', '400 × 400 px · circle'],
          ['Favicon', '32 / 16 px · square · .ico or .svg'],
          ['Apple Touch', '180 × 180 px · rounded square, 20% padding'],
          ['Open Graph', '1200 × 630 px · logotype centered'],
        ]} />
      </section>

      {/* ── 14 Internal memo ── */}
      <section className="sec">
        <Kicker n="14">Internal memo</Kicker>
        <h2 className="sec-h2">One page, concise</h2>
        <div className="doc-grid one">
          <div className="memodoc">
            <div className="top">
              <span className="memoword">MEMO</span>
              <span className="lk"><BrandMark className="bee" /><span className="wm">ONE THOUSAND DRONES, LLC</span></span>
            </div>
            <p className="kv"><span className="k">TO</span> [Recipient / Team]<br /><span className="k">FROM</span> [Sender Name]<br /><span className="k">DATE</span> [Date]<br /><span className="k">RE</span> [Subject]</p>
            <p className="body">Body text in Lora. Internal memos use a light, print-friendly layout. The word MEMO does the identifying, so keep the note concise, one page maximum.</p>
          </div>
        </div>
      </section>

      {/* ── 15 Invoice ── */}
      <section className="sec">
        <Kicker n="15">Invoice</Kicker>
        <h2 className="sec-h2">Billing</h2>
        <div className="doc-grid one">
          <div className="invdoc">
            <div className="top">
              <span className="wm">ONE THOUSAND<br />DRONES, LLC</span>
              <span className="invno">INVOICE [#]</span>
            </div>
            <div className="cols">
              <p className="bl"><span className="k">BILL TO</span>[Client / Agency Name]<br />[Address]<br />[City, State ZIP]</p>
              <p className="bl r"><span className="k">DETAILS</span>Date: [Date]<br />Due: [Due Date]<br />Terms: Net 30</p>
            </div>
            <table>
              <thead><tr><th>DESCRIPTION</th><th className="r">QTY</th><th className="r">RATE</th><th className="r">AMOUNT</th></tr></thead>
              <tbody>
                <tr><td>[Line item]</td><td className="r">[qty]</td><td className="r">[$x.xx]</td><td className="r">[$x.xx]</td></tr>
                <tr><td>[Line item]</td><td className="r">[qty]</td><td className="r">[$x.xx]</td><td className="r">[$x.xx]</td></tr>
              </tbody>
            </table>
            <div className="total"><span className="lab">Total due</span><span className="num">[$X,XXX.XX]</span></div>
          </div>
        </div>
      </section>

      {/* ── 16 Quick reference ── */}
      <section className="sec qref">
        <Kicker n="16">Quick reference</Kicker>
        <h2 className="sec-h2">The whole system on one card</h2>
        <table className="table-tech" style={{ marginTop: '1.2rem' }}>
          <thead><tr><th>Asset</th><th>Value</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><span className="ref">Primary background</span></td><td><span className="val">#08090D</span></td><td>Deep Space — page base</td></tr>
            <tr><td><span className="ref">Primary accent</span></td><td><span className="val">#C8963E</span></td><td>Command Gold — logo, headlines, CTAs</td></tr>
            <tr><td><span className="ref">Secondary accent</span></td><td><span className="val">#4A8FFF</span></td><td>Signal Blue — data, nodes, links</td></tr>
            <tr><td><span className="ref">Display font</span></td><td><span className="val">Bebas Neue</span></td><td>All caps, letter-spacing 2–4px</td></tr>
            <tr><td><span className="ref">Numeral font</span></td><td><span className="val">Saira Condensed</span></td><td>Heavy condensed digits, weight 800</td></tr>
            <tr><td><span className="ref">Label font</span></td><td><span className="val">Space Mono</span></td><td>Uppercase, letter-spacing 2–4px</td></tr>
            <tr><td><span className="ref">Body font</span></td><td><span className="val">Lora</span></td><td>Serif, regular + italic</td></tr>
            <tr><td><span className="ref">Logo icon</span></td><td><span className="val">1kd-icon.svg</span></td><td>Queen bee mark — SVG, scalable</td></tr>
            <tr><td><span className="ref">Logo logotype</span></td><td><span className="val">1kd-logotype.svg</span></td><td>Bee + wordmark — SVG, scalable</td></tr>
            <tr><td><span className="ref">Concept</span></td><td><span className="val">Queen → drones</span></td><td>Military UAS + entomology double meaning</td></tr>
          </tbody>
        </table>
      </section>
    </>
  )
}
