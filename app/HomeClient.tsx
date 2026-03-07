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
            <div className="hero-label">Neuro-Robotic Shared Control</div>
            <h1 className="hero-title font-impact">
              EMBODIED<br />MOTOR<br />IMAGERY
            </h1>
            <p className="hero-sub font-body">
              Non-invasive, closed-loop brain-computer interface for multi-axis robotic shared control.
              Real bodies. Real biosignals. Real-time authority gating.
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
        <h2 className="section-title">BEYOND ABSTRACT<br />VISUALIZATION</h2>
        <div className="mission-grid">
          <div className="mission-text">
            <p>
              Current BCIs ask operators to visualize abstract geometric forms&mdash;producing
              weak, highly variable signal separation that collapses outside the lab.
              <strong>BioScale-BCI</strong> introduces Embodied Motor Imagery (EMI): task-anchored
              procedural motor imagery drawn from deeply trained motor programs, where
              high-repetition practice has forged stable sensorimotor cortex activation patterns.
            </p>
            <p>
              Three biological limitations block existing systems: <em>abstract input mapping</em> that
              yields inadequate signal separation, <em>biological session drift</em> as electrode-skin
              impedance fluctuation degrades static classifiers over time, and <em>physiological
              blindness</em>&mdash;open-loop architectures that execute commands regardless of the
              operator&apos;s cognitive capacity, directly inducing
              pilot-induced oscillation. BioScale addresses all three with a <strong>hardware-first
              architecture</strong> that fuses 8-channel EEG with real-time HRV and SpO&#8322;
              telemetry into a single closed-loop pipeline.
            </p>
            <p>
              We are targeting DARPA SBIR funding through the BTO office-wide BAA to bring this
              capability from concept to validated prototype.
            </p>
          </div>
          <div className="mission-stats">
            <div className="stat-item">
              <div className="stat-num">8</div>
              <div className="stat-label">EEG Channels (ADS1299)</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">12</div>
              <div className="stat-label">Subjects / 3 Cohorts</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">48+</div>
              <div className="stat-label">Operator-Sessions Planned</div>
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
              Three tightly integrated subsystems transform raw biosignals into vectorial
              intent signals with &lt;150&thinsp;ms classification latency and continuous operator adaptation.
            </p>
          </div>
          <div className="subsystems">
            <div className="subsystem">
              <div className="sub-index">01</div>
              <div className="sub-label">Subsystem A</div>
              <div className="sub-title">ZERO-TIME IMPEDANCE CALIBRATION</div>
              <div className="sub-body">
                8-channel ADS1299 EEG with continuous 31.2&thinsp;Hz out-of-band AC injection
                feeds live impedance as a conditioning variable into the PyTorch CNN input
                layer&mdash;rendering the classifier continuously invariant to session drift
                without manual recalibration downtime.
              </div>
            </div>
            <div className="subsystem">
              <div className="sub-index">02</div>
              <div className="sub-label">Subsystem B</div>
              <div className="sub-title">DYNAMIC BIOMETRIC SCALING</div>
              <div className="sub-body">
                MAX30102 pulse oximetry derives HRV and SpO&#8322; in real time. A bounded derivative
                function dampens command sensitivity during acute adrenaline-driven &Delta;HR spikes and
                amplifies fading signal amplitude during cognitive fatigue&mdash;closing the loop
                between body state and platform behavior.
              </div>
            </div>
            <div className="subsystem">
              <div className="sub-index">03</div>
              <div className="sub-label">Subsystem C</div>
              <div className="sub-title">PROBABILISTIC AUTONOMY GATING</div>
              <div className="sub-body">
                A 3-second sliding-window &ldquo;leaky bucket&rdquo; integrates ERN event counts
                alongside acute &Delta;HR spikes and SpO&#8322; floor breaches. The combined Bayesian
                posterior&mdash;not any single indicator&mdash;governs authority transfer, invoking
                edge-safety protocols only when the joint posterior exceeds a pre-calibrated threshold.
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
                <strong>EMI Class Separability</strong>
                Operators with &ge;50 hours of documented bilateral industrial training
                demonstrate &ge;85% class separability on continuous multi-axis EMI tasks
                with &lt;150&thinsp;ms latency
                and without manual recalibration over continuous 60-minute sessions.
              </div>
            </div>
            <div className="hyp-card">
              <div className="hyp-id">H2</div>
              <div className="hyp-text">
                <strong>PIO Reduction</strong>
                Dynamic biometric scaling reduces simulated PIO events
                by &ge;40% under dual-task cognitive load versus unscaled BCI baselines.
              </div>
            </div>
            <div className="hyp-card">
              <div className="hyp-id">H3</div>
              <div className="hyp-text">
                <strong>Gating Reliability</strong>
                Autonomy gate maintains &lt;5% false-positive and &lt;10% false-negative rates
                across &ge;200 gating events in a controlled stress-induction protocol.
              </div>
            </div>
            <div className="hyp-card">
              <div className="hyp-id">H4</div>
              <div className="hyp-text">
                <strong>Cross-Cohort EMI Equivalence</strong>
                EMI class separability does not differ significantly (p&nbsp;&gt;&nbsp;0.05)
                across three cohorts&mdash;industrial operators, expert gamers, and
                musicians&mdash;demonstrating that high-repetition bilateral motor training,
                regardless of domain, produces cortical activation patterns of sufficient
                quality for BCI classification.
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
                Joshua&apos;s background spans <strong>embedded signal processing, EEG hardware
                integration, and applied machine learning</strong>. He founded One Thousand Drones
                to close the gap between BCI research and real-world operator environments.
              </p>
              <p>
                One Thousand Drones, LLC is incorporated in Oklahoma and registered for
                federal contracting through SAM.gov, with CAGE code pending.
              </p>
            </div>
            <div className="expertise-list">
              <div className="exp-item">EEG Analog Front-End &amp; Impedance Calibration</div>
              <div className="exp-item">PyTorch CNN / Embodied Motor Imagery</div>
              <div className="exp-item">HRV &amp; SpO&#8322; Biometric Fusion</div>
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
