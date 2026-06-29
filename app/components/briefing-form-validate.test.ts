import { describe, it, expect } from 'vitest'
import { isEmail, validateBriefing, type BriefingValues } from './briefing-form-validate'

describe('isEmail', () => {
  it('accepts a normal address', () => {
    expect(isEmail('jo@onethousanddrones.com')).toBe(true)
    expect(isEmail('a.b+tag@sub.example.co.uk')).toBe(true)
  })
  it('rejects malformed addresses', () => {
    for (const bad of ['', 'nope', 'a@b', '@b.com', 'a@.com', 'a b@c.com', 'a@b c.com']) {
      expect(isEmail(bad)).toBe(false)
    }
  })
})

describe('validateBriefing', () => {
  const valid: BriefingValues = {
    name: 'Jo',
    email: 'jo@onethousanddrones.com',
    org: 'OTD',
    message: 'We are evaluating BioScale for a program.',
  }

  it('returns no errors for a complete, valid form', () => {
    expect(validateBriefing(valid)).toEqual({})
  })

  it('flags every field when all are missing/invalid', () => {
    expect(validateBriefing({ name: ' ', email: 'bad', org: '', message: 'hi' })).toEqual({
      name: 'Required',
      email: 'Enter a valid email',
      org: 'Required',
      message: 'Tell us a little more',
    })
  })

  it('treats whitespace-only name and org as missing', () => {
    const er = validateBriefing({ ...valid, name: '   ', org: '\t' })
    expect(er.name).toBe('Required')
    expect(er.org).toBe('Required')
  })

  it('requires a message of at least 5 trimmed characters', () => {
    expect(validateBriefing({ ...valid, message: 'hi' }).message).toBeDefined()
    expect(validateBriefing({ ...valid, message: '   hi   ' }).message).toBeDefined()
    expect(validateBriefing({ ...valid, message: 'hello' }).message).toBeUndefined()
  })

  it('only flags the invalid field, leaving valid ones clean', () => {
    const er = validateBriefing({ ...valid, email: 'nope' })
    expect(er).toEqual({ email: 'Enter a valid email' })
  })
})
