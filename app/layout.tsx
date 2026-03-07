import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'One Thousand Drones, LLC',
  description: 'Non-invasive, closed-loop brain-computer interface for multi-axis robotic shared control.',
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
