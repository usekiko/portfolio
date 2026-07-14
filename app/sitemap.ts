import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from './data'
import { SUPPORTED_LOCALES } from './i18n'
import { SITE_URL } from './site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const localeRoutes: MetadataRoute.Sitemap = SUPPORTED_LOCALES.map(
    (locale) => ({
      url: `${SITE_URL}/${locale}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          SUPPORTED_LOCALES.map((l) => [l, `${SITE_URL}/${l}`]),
        ),
      },
    }),
  )

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}${post.link}`,
    lastModified,
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [
    ...localeRoutes,
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...blogRoutes,
  ]
}
