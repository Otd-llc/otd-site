/* eslint-disable @next/next/no-img-element */

// The bee mark + wordmark. Matches v4 .hbrand (lines 130–134).
// Plain <img> (not next/image) — the SVG is tiny and decorative.
export function BrandMark() {
  return (
    <>
      <img src="/icon.svg" alt="" width={24} height={24} />
      <span className="wm">
        ONE THOUSAND <span className="wm-ac">DRONES</span>
      </span>
    </>
  )
}
