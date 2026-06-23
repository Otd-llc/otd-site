'use client'
import { useState } from 'react'

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

type Errors = Partial<Record<'name' | 'email' | 'org' | 'message', string>>

export function BriefingForm() {
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '', website: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'pending' | 'ok' | 'err'>('idle')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = (): Errors => {
    const er: Errors = {}
    if (!form.name.trim()) er.name = 'Required'
    if (!isEmail(form.email)) er.email = 'Enter a valid email'
    if (!form.org.trim()) er.org = 'Required'
    if (form.message.trim().length < 5) er.message = 'Tell us a little more'
    return er
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length > 0) return // never calls the API on invalid input
    setStatus('pending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('bad status')
      setStatus('ok')
      setForm({ name: '', email: '', org: '', message: '', website: '' })
    } catch {
      setStatus('err')
    }
  }

  // Prominent confirmation — replaces the form so the send is unmistakable.
  if (status === 'ok') {
    return (
      <div className="brief-success glass-card" role="status" aria-live="polite">
        <span className="brief-check" aria-hidden="true">
          ✓
        </span>
        <div className="brief-success-body">
          <p className="brief-success-h">Request received.</p>
          <p className="brief-success-p">
            Thanks. Your briefing request is in, and it goes straight to the founder. We’ll be in
            touch shortly. Prefer email?{' '}
            <a href="mailto:josh@onethousanddrones.com">josh@onethousanddrones.com</a>
          </p>
          <button
            type="button"
            className="brief-again"
            onClick={() => {
              setErrors({})
              setStatus('idle')
            }}
          >
            Send another →
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="brief-form" onSubmit={onSubmit} noValidate>
      {/* honeypot — hidden from humans; bots fill it and get silently dropped */}
      <div className="brief-hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={set('website')}
        />
      </div>

      <div className="brief-field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={form.name}
          onChange={set('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'err-name' : undefined}
        />
        {errors.name && <span className="brief-error" id="err-name">{errors.name}</span>}
      </div>

      <div className="brief-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={set('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'err-email' : undefined}
        />
        {errors.email && <span className="brief-error" id="err-email">{errors.email}</span>}
      </div>

      <div className="brief-field">
        <label htmlFor="org">Organization</label>
        <input
          id="org"
          value={form.org}
          onChange={set('org')}
          aria-invalid={!!errors.org}
          aria-describedby={errors.org ? 'err-org' : undefined}
        />
        {errors.org && <span className="brief-error" id="err-org">{errors.org}</span>}
      </div>

      <div className="brief-field">
        <label htmlFor="message">What would you like to discuss?</label>
        <textarea
          id="message"
          value={form.message}
          onChange={set('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'err-message' : undefined}
        />
        {errors.message && <span className="brief-error" id="err-message">{errors.message}</span>}
      </div>

      <div className="brief-submit-row">
        <button className="glass-button glass-button-cta" type="submit" disabled={status === 'pending'}>
          {status === 'pending' ? 'Sending…' : 'Request a briefing →'}
        </button>
        {status === 'err' && (
          <span className="brief-status err" role="status">
            Something went wrong. Email us directly below.
          </span>
        )}
      </div>
    </form>
  )
}
