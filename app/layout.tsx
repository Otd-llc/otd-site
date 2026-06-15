import type { Metadata } from 'next'
import { bebas, spaceMono, lora } from './fonts'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import './globals.css'

const DESCRIPTION =
  'A non-invasive EEG brain–computer interface that turns trained motor imagery into supervisory command of a swarm — built in a defense-registered lab (SAM.gov / CAGE 1ZYS4), and teachable board-by-board in the Academy.'

export const metadata: Metadata = {
  metadataBase: new URL('https://onethousanddrones.com'),
  title: {
    default: 'One Thousand Drones — One Mind, Many Machines',
    template: '%s · One Thousand Drones',
  },
  description: DESCRIPTION,
  openGraph: {
    title: 'One Thousand Drones — One Mind, Many Machines',
    description: DESCRIPTION,
    url: 'https://onethousanddrones.com',
    siteName: 'One Thousand Drones, LLC',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One Thousand Drones — One Mind, Many Machines',
    description: DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${spaceMono.variable} ${lora.variable}`}>
      <body>
        <SiteHeader />
        <main className="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
