/** @type {import('next').NextConfig} */

// Assets (font, images) are served from the R2 CDN; JSON-LD is emitted as an
// inline <script>, and Next injects inline bootstrap styles/scripts, hence the
// 'unsafe-inline' allowances. No third-party scripts are loaded.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://r2.hypastack.com",
  "font-src 'self' https://r2.hypastack.com",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    unoptimized: true,
  },

  // Disable source maps in production
  productionBrowserSourceMaps: false,

  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
