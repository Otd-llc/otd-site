import Link from 'next/link'
import { BioScaleEmbed } from './components/BioScaleEmbed'
import { MetaStrip } from './components/ui/MetaStrip'
import { Section } from './components/ui/Section'
import { ModeBand } from './components/ui/ModeBand'
import { ProductCard } from './components/ui/ProductCard'
import { Door } from './components/ui/Door'

export default function Home() {
  return (
    <>
      {/* hero: copy left, live viz right */}
      <section className="hero">
        <div data-rv>
          <MetaStrip />
          <div className="title-rule" aria-hidden="true" />
          <h1 className="bench-hero">
            <span className="ord">Neuro-Robotic Command</span>
            <span className="hero-line">
              <span>
                One <span className="accent">mind</span>
                <span className="tdot">.</span>
              </span>
            </span>
            <span className="hero-line hero-line-2">
              <span>
                Many <span className="accent">machines</span>
                <span className="tdot">.</span>
              </span>
            </span>
          </h1>
          <p className="subhead">
            A non-invasive EEG brain–computer interface that turns trained motor imagery into
            supervisory command of a swarm, built in a defense-registered lab, and teachable
            board-by-board in the Academy.
          </p>
          <div className="cta-row">
            <Link className="glass-button glass-button-cta" href="/contact">
              Request a briefing →
            </Link>
            <Link className="glass-button" href="/academy">
              Enter the Academy →
            </Link>
          </div>
        </div>
        <BioScaleEmbed />
      </section>

      {/* 01 · BioScale-BCI — command the swarm */}
      <Section id="bioscale" kicker="01 · BioScale-BCI" title="COMMAND THE SWARM">
        <p className="lead">
          <b>BioScale-BCI</b> turns trained motor imagery into command of a swarm. A skilled
          operator recalls deeply-grooved procedural movements (<b>Embodied Motor Imagery</b>),
          which the system classifies into <b>vectorial intent</b>: high-level directional
          commands, not raw actuator signals. Each platform’s edge-autonomy flies itself, so one
          operator’s motor cortex can command <b>N platforms at once.</b>
        </p>
        <ModeBand eyebrow="Why it scales">
          The operator broadcasts <em>intent</em>; the edge handles <em>flight</em>. That
          decoupling is the known fix for control-loop oscillation, and it’s what turns a
          one-to-one link into 1:N supervisory swarm command.
        </ModeBand>
        <div className="cards">
          <ProductCard
            chip="8-Channel"
            title="BioScale-8"
            sub="Single-operator multi-axis command."
            rows={[
              { ref: 'Sensing', value: '8-ch EEG · ADS1299 + HRV' },
              { ref: 'Input', value: 'Embodied Motor Imagery' },
              { ref: 'Output', value: 'vectorial intent' },
              { ref: 'Command', value: '1 : N supervisory' },
              { ref: 'Autonomy gate', value: 'Bayesian · hover / abort' },
              { ref: 'Form factor', value: 'non-invasive · scalp EEG' },
            ]}
          />
          <ProductCard
            chip="16-Channel"
            chipBlue
            title="BioScale-16"
            sub="Extended montage, higher-confidence classification."
            rows={[
              { ref: 'Sensing', value: '16-ch EEG · 2× ADS1299 + HRV' },
              { ref: 'Input', value: 'Embodied Motor Imagery' },
              { ref: 'Output', value: 'vectorial intent' },
              { ref: 'Command', value: '1 : N supervisory' },
              { ref: 'Autonomy gate', value: 'Bayesian · hover / abort' },
              { ref: 'Adds', value: 'extended montage · confidence' },
            ]}
          />
        </div>
      </Section>

      {/* 02 · OIDAT — first commercial system (safety derivative) */}
      <Section
        id="oidat"
        kicker="02 · OIDAT"
        title="OPERATOR SAFETY & AUTHORITY TRANSFER"
      >
        <p className="lead">
          <b>OIDAT</b> is BioScale’s first commercial system, an operator-safety layer,{' '}
          <b>not a medical device</b>. It continuously assesses whether an operator is still{' '}
          <b>responsive and in command</b>, and the instant that engagement collapses it
          transfers control authority to a safe state in seconds.
        </p>
        <ModeBand eyebrow="Why read operator state">
          A grip-pressure dead-man switch only knows your hand let go. OIDAT reads operator
          engagement directly, so it can hand authority to a safe state within seconds of a loss
          of responsiveness, before the platform does anything unsafe.
        </ModeBand>
        <div className="cards">
          <ProductCard
            chip="8-Channel"
            title="OIDAT-8"
            sub="The fielded operator-safety baseline."
            rows={[
              { ref: 'Sensing', value: '8-ch EEG · ADS1299' },
              { ref: 'Montage', value: 'Fz F3 F4 F7 F8 Cz T7 T8' },
              { ref: 'Function', value: 'responsiveness · authority gating' },
              { ref: 'Hand-off', value: '< 5 s' },
              { ref: 'Class', value: 'operator-safety · non-diagnostic' },
            ]}
          />
          <ProductCard
            chip="16-Channel"
            chipBlue
            title="OIDAT-16"
            sub="Full montage: extended state coverage."
            rows={[
              { ref: 'Sensing', value: '16-ch EEG · 2× ADS1299' },
              { ref: 'Adds', value: 'Fp1 Fp2 O1 O2 + FCz/temporal' },
              { ref: 'Function', value: 'extended coverage · higher-confidence gating' },
              { ref: 'Hand-off', value: '< 5 s' },
              { ref: 'Class', value: 'operator-safety · non-diagnostic' },
            ]}
          />
        </div>
        <p className="disclaimer">
          OIDAT is an operator-safety system. It is not a medical device and does not diagnose,
          treat, or monitor any medical condition.
        </p>
      </Section>

      {/* 03 · Hex Cluster — the open hardware release.
          A SECTION, NOT AN APEX /hex PAGE. next.config.js already redirects
          /academy to the academy with the reason written into it: "don't
          duplicate its landing here". The academy's /hex is a harder case of
          the same rule. It is the CC BY attribution target, and that URL is
          baked immutably into the LICENSE.txt inside every published
          .3mf/.stl/.step of every release, so it cannot move and must not have
          a rival. Its own header says a maker must never find two different
          numbers for the same dimension across the page and the build sheet in
          their hand, and a second spec table here is how that happens. So this
          band states no dimensions at all and sends every spec and file
          question to the canonical page. */}
      <section className="sec" id="hex" data-reveal>
        <div className="hx-band">
          <video
            src="/hex/cluster-loop.mp4"
            poster="/hex/cluster-loop-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Three hex tiles: a carrier tray opens, two neighbouring tiles engage, and edge caps go on."
          />
          {/* Shown instead of the clip when the visitor asks for reduced motion.
              It is a sibling rather than a CSS background so it inherits the
              same sizing and the same sideways shift; a centred background put
              the cluster back behind the headline. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hx-band-still"
            src="/hex/cluster-loop-poster.jpg"
            alt="Three hex tiles engaged, with a carrier tray open above them."
          />
          {/* Legibility only. It carries no colour and states nothing. */}
          <div className="hx-band-scrim" aria-hidden="true" />
          <div className="hx-band-copy">
            <div>
              <p className="sec-kicker">03 · The download</p>
              <h2 className="sec-h2">ONE ZIP, NO ACCOUNT</h2>
              <p className="lead">
                The configurator runs in your browser and asks for nothing. Lay out the cluster,
                export the parts it needs, and the zip lands with 3MF, STL and STEP plus a build
                sheet for the plate.
              </p>
              <div className="cta-row">
                <a
                  className="glass-button glass-button-cta"
                  href="https://academy.onethousanddrones.com/hex"
                >
                  Get the files →
                </a>
                <a className="glass-button" href="https://demo.onethousanddrones.com/hex">
                  Open the configurator →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* two ways in */}
      <Section id="academy" kicker="Two ways in" title="One ecosystem">
        <div className="doors">
          <Door
            kicker="For partners & programs"
            title="BioScale & OIDAT"
            body="The closed-loop BCI platform and its first operator-safety system: read the brain, gate authority, command platforms. Built by a SAM.gov-registered lab."
            cta="Explore the technology"
            href="/contact"
          />
          <Door
            kicker="For makers & engineers"
            title="Build It Yourself"
            body="First ESP32 board to an EEG BCI that commands your own swarm. 22 projects, free start."
            cta="Start free with L1.01"
            href="/academy"
          />
        </div>
      </Section>
    </>
  )
}
