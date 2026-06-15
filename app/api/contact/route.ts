import { Resend } from 'resend'

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export async function POST(req: Request) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'bad json' }, { status: 400 })
  }
  const { name, email, org, message, website } = body ?? {}

  // Honeypot — bots fill the hidden `website` field; humans never see it.
  if (website) return Response.json({ ok: true })

  if (
    !name ||
    !org ||
    !message ||
    String(message).trim().length < 5 ||
    !isEmail(String(email || ''))
  ) {
    return Response.json({ error: 'invalid' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: String(email),
    subject: `Briefing request — ${name} (${org})`,
    text: `From: ${name} <${email}>\nOrg: ${org}\n\n${message}`,
  })
  if (error) return Response.json({ error: 'send failed' }, { status: 502 })
  return Response.json({ ok: true })
}
