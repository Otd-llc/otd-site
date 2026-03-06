'use client'

import { useEffect, useRef } from 'react'
import { initNeuralSwarm } from './background'

/* ── component ── */
export default function HomeClient() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const cleanup = initNeuralSwarm(containerRef.current)
    return cleanup
  }, [])

  return (
    <>
      {/* Nav */}
      <nav>
        <a href="#" className="nav-brand">
          <img src="/1kd-icon.svg" alt="" className="nav-logo" />
          One Thousand Drones, LLC
        </a>
        <ul className="nav-links">
          <li><a href="#mission">Mission</a></li>
          <li><a href="#technology">Technology</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div ref={containerRef} id="canvas-container" />
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-label">Defense Technology</div>
            <h1 className="hero-title font-impact">
              AUTONOMY &amp;<br />NEURAL<br />ARCHITECTURE
            </h1>
            <p className="hero-sub font-body">
              Strategic advisory for DARPA initiatives and BioScale-BCI integration.
            </p>
          </div>
          <div className="hero-card">
            <div className="hero-card-title font-technical">Let&apos;s Talk</div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="hero-card-field">
                <label className="font-technical">Name</label>
                <input type="text" className="font-body" placeholder="Your name" />
              </div>
              <div className="hero-card-field">
                <label className="font-technical">Email</label>
                <input type="email" className="font-body" placeholder="you@example.com" />
              </div>
              <div className="hero-card-field">
                <label className="font-technical">Message</label>
                <textarea className="font-body" placeholder="How can we help?" />
              </div>
              <button type="submit" className="hero-card-submit font-technical">
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="divider" />

      {/* Mission */}
      <section id="mission">
        <div className="section-label">Our Mission</div>
        <h2 className="section-title">BRIDGING MIND<br />AND MACHINE</h2>
        <div className="mission-grid">
          <div className="mission-text">
            <p>
              One Thousand Drones, LLC is building <strong>BioScale-BCI</strong>, a non-invasive brain-computer
              interface that translates neural intent into autonomous platform commands in real time.
            </p>
            <p>
              Our system fuses EEG-derived cognitive state with physiological telemetry to create a
              <strong> closed-loop control architecture</strong> that adapts to operator workload, fatigue,
              and stress&mdash;keeping humans in the loop without bottlenecking the mission.
            </p>
            <p>
              We are targeting DARPA SBIR funding through the BTO office-wide BAA to bring this
              capability from concept to prototype.
            </p>
          </div>
          <div className="mission-stats">
            <div className="stat-item">
              <div className="stat-num">6</div>
              <div className="stat-label">Sensor Modalities</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">40</div>
              <div className="stat-label">Phase I BOM Line Items</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">$150K</div>
              <div className="stat-label">Phase I Budget</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="tech-section full-bleed" id="technology">
        <div className="tech-inner">
          <div className="section-label">Technology</div>
          <h2 className="section-title">THE BIOSCALE-BCI<br />STACK</h2>
          <div className="tech-intro">
            <p>
              Three tightly integrated subsystems transform raw biosignals into platform-level
              autonomy commands with sub-second latency and continuous operator adaptation.
            </p>
          </div>
          <div className="subsystems">
            <div className="subsystem">
              <div className="sub-index">01</div>
              <div className="sub-label">Subsystem A</div>
              <div className="sub-title">NEURAL ACQUISITION</div>
              <div className="sub-body">
                High-density dry-electrode EEG array with real-time artifact rejection,
                capturing motor imagery, SSVEP, and P300 signals at clinical-grade fidelity
                without gel preparation.
              </div>
            </div>
            <div className="subsystem">
              <div className="sub-index">02</div>
              <div className="sub-label">Subsystem B</div>
              <div className="sub-title">PHYSIOLOGICAL FUSION</div>
              <div className="sub-body">
                Multi-modal sensor suite&mdash;EMG, EOG, GSR, PPG, respiration&mdash;fused with neural
                data to estimate operator cognitive load, fatigue index, and stress state in real time.
              </div>
            </div>
            <div className="subsystem">
              <div className="sub-index">03</div>
              <div className="sub-label">Subsystem C</div>
              <div className="sub-title">ADAPTIVE COMMAND LAYER</div>
              <div className="sub-body">
                Edge-deployed inference pipeline that translates fused biosignals into
                platform-agnostic autonomy commands, dynamically adjusting authority allocation
                based on operator state.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hypotheses */}
      <section className="hyp-strip full-bleed">
        <div className="hyp-inner">
          <div className="section-label">Phase I Hypotheses</div>
          <h2 className="section-title">WHAT WE WILL<br />PROVE</h2>
          <div className="hyp-grid">
            <div className="hyp-card">
              <div className="hyp-id">H1</div>
              <div className="hyp-text">
                <strong>Neural Decode Accuracy</strong>
                Non-invasive EEG can achieve &ge;85% classification accuracy for 4-class motor
                imagery within 500ms decode windows.
              </div>
            </div>
            <div className="hyp-card">
              <div className="hyp-id">H2</div>
              <div className="hyp-text">
                <strong>Physiological Prediction</strong>
                Fused biosignals predict operator cognitive overload &ge;30 seconds before
                task performance degrades.
              </div>
            </div>
            <div className="hyp-card">
              <div className="hyp-id">H3</div>
              <div className="hyp-text">
                <strong>Adaptive Authority</strong>
                Dynamic authority reallocation based on operator state reduces mission-critical
                errors by &ge;40% vs. static allocation.
              </div>
            </div>
            <div className="hyp-card">
              <div className="hyp-id">H4</div>
              <div className="hyp-text">
                <strong>Edge Latency</strong>
                End-to-end pipeline from neural acquisition to platform command executes
                in &le;200ms on edge compute hardware.
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* About */}
      <section id="about">
        <div className="section-label">About</div>
        <h2 className="section-title">THE FOUNDER</h2>
        <div className="about-grid">
          <div className="about-photo">
            <div className="photo-frame">
              <img src="/josh1.png" alt="Joshua Tollette" className="photo-img" />
            </div>
            <div className="photo-accent" />
          </div>
          <div className="about-content">
            <div className="about-name">JOSHUA TOLLETTE</div>
            <div className="about-role">Founder &amp; Principal Investigator</div>
            <div className="about-bio">
              <p>
                Joshua brings deep expertise in <strong>digital signal processing</strong> and
                real-time embedded systems to the BioScale-BCI program. His background spans
                defense-adjacent engineering and neurotechnology research.
              </p>
              <p>
                One Thousand Drones, LLC is incorporated in Oklahoma and registered for
                federal contracting through SAM.gov, with CAGE code pending.
              </p>
            </div>
            <div className="expertise-list">
              <div className="exp-item">Digital Signal Processing &amp; Real-Time DSP</div>
              <div className="exp-item">EEG / BCI System Architecture</div>
              <div className="exp-item">Embedded Systems &amp; Edge Compute</div>
              <div className="exp-item">DARPA SBIR / Federal Acquisition</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section full-bleed" id="contact">
        <div className="contact-inner">
          <div className="contact-text">
            <div className="section-label">Contact</div>
            <h2 className="section-title">LET&apos;S TALK</h2>
            <p>
              Interested in BioScale-BCI, DARPA collaboration, or advisory roles?
              We&apos;d like to hear from you.
            </p>
            <div className="contact-channels">
              <div className="channel">
                <span className="channel-label">Email</span>
                <a href="mailto:josh@onethousanddrones.com" className="channel-value">
                  josh@onethousanddrones.com
                </a>
              </div>
              <div className="channel">
                <span className="channel-label">Location</span>
                <span className="channel-value">Tulsa, Oklahoma</span>
              </div>
            </div>
          </div>
          <div className="contact-form-area">
            <div className="form-title">Send a Message</div>
            <div className="form-field">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>
            <div className="form-field">
              <label>Message</label>
              <textarea placeholder="How can we help?" />
            </div>
            <button className="form-submit">Send Message</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-brand">
          <img src="/1kd-logotype.svg" alt="One Thousand Drones, LLC" className="footer-logo" />
        </div>
        <div className="footer-legal">&copy; 2026 One Thousand Drones, LLC. All rights reserved.</div>
      </footer>
    </>
  )
}
