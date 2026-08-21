import { ImageResponse } from 'next/og'
import { SITE_NAME, TAGLINE } from './site-config'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${SITE_NAME}, ${TAGLINE}`

/**
 * Generated at build time so the OG/Twitter cards always resolve. The previous
 * metadata pointed at /og.png, which was never committed to public/.
 */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 600 }}>
          {SITE_NAME}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 44,
            color: '#a1a1aa',
          }}
        >
          {TAGLINE}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            fontSize: 32,
            color: '#52525b',
          }}
        >
          usekiko.com
        </div>
      </div>
    ),
    size,
  )
}
