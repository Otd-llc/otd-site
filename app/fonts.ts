import { Bebas_Neue, Space_Mono, Lora } from 'next/font/google'

// Self-hosted at build time by next/font. Each exports a CSS variable that
// globals.css recipes consume via var(--font-display/mono/serif).
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
