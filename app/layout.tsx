import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://onethousanddrones.com'),
  title: 'One Thousand Drones, LLC',
  description: 'Non-invasive, closed-loop brain-computer interface for multi-axis robotic shared control.',
  openGraph: {
    title: 'One Thousand Drones, LLC',
    description: 'BioScale-BCI: Embodied Motor Imagery for physiology-aware robotic shared control.',
    url: 'https://onethousanddrones.com',
    siteName: 'One Thousand Drones, LLC',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One Thousand Drones, LLC',
    description: 'BioScale-BCI: Embodied Motor Imagery for physiology-aware robotic shared control.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
