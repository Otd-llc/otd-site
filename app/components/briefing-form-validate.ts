// Pure validation for the briefing form — extracted so the client-side gate
// (which decides whether `/api/contact` is even called) is unit-testable without
// a DOM. The server route re-validates independently; this is the UX gate.

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export type BriefingErrors = Partial<Record<'name' | 'email' | 'org' | 'message', string>>

export type BriefingValues = {
  name: string
  email: string
  org: string
  message: string
}

export function validateBriefing(form: BriefingValues): BriefingErrors {
  const er: BriefingErrors = {}
  if (!form.name.trim()) er.name = 'Required'
  if (!isEmail(form.email)) er.email = 'Enter a valid email'
  if (!form.org.trim()) er.org = 'Required'
  if (form.message.trim().length < 5) er.message = 'Tell us a little more'
  return er
}
