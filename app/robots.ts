import type { MetadataRoute } from 'next'

const WEBSITE_URL = 'https://usekiko.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/'],
      },
    ],
    sitemap: `${WEBSITE_URL}/sitemap.xml`,
    host: WEBSITE_URL,
  }
}
