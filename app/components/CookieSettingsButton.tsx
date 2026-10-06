'use client'

// "Cookie settings": reopens the c15t preference dialog so a visitor can
// withdraw (or give) measurement consent after the banner is gone. GDPR Art.
// 7(3): withdrawing must be as easy as giving. Same control as the academy's.
import { useConsentManager } from '@c15t/nextjs'

export function CookieSettingsButton({ className }: { className?: string }) {
  const { setActiveUI } = useConsentManager()
  return (
    <button type="button" onClick={() => setActiveUI('dialog')} className={className}>
      Cookie settings
    </button>
  )
}
