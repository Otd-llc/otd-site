/* eslint-disable @next/next/no-img-element */

// Server component. Ports v4 footer (lines 281–290).
export function SiteFooter() {
  return (
    <footer className="app-footer">
      <div className="inner">
        <div className="left">
          <img src="/icon.svg" alt="" width={16} height={16} />
          <span>© 2026 One Thousand Drones, LLC · Broken Arrow, OK</span>
          <a href="mailto:josh@onethousanddrones.com">josh@onethousanddrones.com</a>
        </div>
        <span className="right">SAM.gov Registered · CAGE 1ZYS4 · UEI WDQXD9L9UFH3</span>
      </div>
    </footer>
  )
}
