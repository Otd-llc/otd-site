import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'One Thousand Drones, LLC — BioScale-BCI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: '#0D1117',
          padding: '80px 100px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: 60,
            height: 4,
            backgroundColor: '#E5A544',
            marginBottom: 32,
          }}
        />

        {/* Label */}
        <div
          style={{
            fontSize: 20,
            letterSpacing: '0.15em',
            color: '#4FD1C5',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Neuro-Robotic Shared Control
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#E2E8F0',
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          EMBODIED MOTOR IMAGERY
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#E2E8F0',
            opacity: 0.7,
            lineHeight: 1.5,
            maxWidth: 700,
          }}
        >
          Non-invasive, closed-loop brain-computer interface for
          multi-axis robotic shared control.
        </div>

        {/* Company name */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 100,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: '0.2em',
              color: '#E2E8F0',
              opacity: 0.4,
              textTransform: 'uppercase',
            }}
          >
            One Thousand Drones, LLC
          </div>
        </div>

        {/* Teal accent dot cluster — decorative */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 100,
            display: 'flex',
            gap: 8,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4FD1C5', opacity: 0.3 }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4FD1C5', opacity: 0.5 }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4FD1C5', opacity: 0.7 }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
