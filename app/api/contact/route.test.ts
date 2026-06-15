import { describe, it, expect, vi, beforeEach } from 'vitest'

const send = vi.fn()
// Resend is `new`-ed in the route, so the mock must be constructable (Vitest 4
// rejects an arrow vi.fn() as a constructor). A class exposes the shared spy.
vi.mock('resend', () => ({ Resend: class { emails = { send } } }))

import { POST } from './route'

const req = (body: unknown) =>
  new Request('http://x/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
  })

describe('POST /api/contact', () => {
  beforeEach(() => {
    send.mockReset()
    send.mockResolvedValue({ data: { id: 'x' }, error: null })
  })

  it('400s on missing fields', async () => {
    const res = await POST(req({ email: '' }))
    expect(res.status).toBe(400)
    expect(send).not.toHaveBeenCalled()
  })

  it('400s on invalid email', async () => {
    const res = await POST(req({ name: 'A', email: 'nope', org: 'O', message: 'hello there team' }))
    expect(res.status).toBe(400)
  })

  it('sends and 200s on valid input, reply-to = submitter', async () => {
    const res = await POST(req({ name: 'A', email: 'a@b.com', org: 'O', message: 'hello there team' }))
    expect(res.status).toBe(200)
    expect(send).toHaveBeenCalledOnce()
    expect(send.mock.calls[0][0]).toMatchObject({ replyTo: 'a@b.com' })
  })
})
