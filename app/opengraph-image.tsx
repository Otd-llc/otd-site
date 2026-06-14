import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'One Thousand Drones — From Mind to Swarm'
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
          backgroundColor: '#08090d',
          padding: '80px 100px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: 60,
            height: 4,
            backgroundColor: '#c8963e',
            marginBottom: 32,
          }}
        />

        {/* Label */}
        <div
          style={{
            fontSize: 20,
            letterSpacing: '0.15em',
            color: '#4a8fff',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Neuro-Robotic Command
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.0,
            marginBottom: 24,
          }}
        >
          FROM MIND TO <span style={{ color: '#c8963e' }}>SWARM</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#e2e8f0',
            opacity: 0.7,
            lineHeight: 1.5,
            maxWidth: 760,
          }}
        >
          A non-invasive EEG brain–computer interface that turns trained motor
          imagery into supervisory command of a swarm.
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
              color: '#e2e8f0',
              opacity: 0.4,
              textTransform: 'uppercase',
            }}
          >
            One Thousand Drones · SAM.gov Registered · CAGE 1ZYS4
          </div>
        </div>

        {/* Accent dot cluster — decorative */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 100,
            display: 'flex',
            gap: 8,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4a8fff', opacity: 0.3 }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4a8fff', opacity: 0.5 }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4a8fff', opacity: 0.7 }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
