import { Bebas_Neue, Space_Mono, Lora, Saira_Condensed } from 'next/font/google'

// Self-hosted at build time by next/font. Each exports a CSS variable that
// globals.css recipes consume via var(--font-display/mono/serif/numeral).
export const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const spaceMono = Space_Mono({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const lora = Lora({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

// The display-NUMERAL face (the Academy's 4th brand font). Heavy condensed digits
// for the big hero numerals / hex-stage numbers / stats that Bebas can't carry.
export const saira = Saira_Condensed({
  weight: ['700', '800'],
  subsets: ['latin'],
  variable: '--font-numeral',
  display: 'swap',
})
