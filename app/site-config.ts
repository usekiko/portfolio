import type { Metadata } from 'next'
import { EMAIL, GITHUB_URL } from './data'
import { SUPPORTED_LOCALES, type Locale } from './i18n'

export { GITHUB_URL }

export const SITE_URL = 'https://usekiko.com'
export const SITE_NAME = 'Kiko'
export const FULL_NAME = 'Kiko'
export const TAGLINE = 'Full-Stack Developer & Product Builder'
export const TWITTER_HANDLE = '@expertkiko'

export const DESCRIPTIONS: Record<Locale, string> = {
  en: 'Kiko is a full-stack developer building privacy-first web products. Creator of Hypastack — a secure file sharing platform with CDN hosting. Based in Europe.',
  pl: 'Kiko to full-stack developer tworzący produkty webowe stawiające prywatność na pierwszym miejscu. Twórca Hypastack — bezpiecznej platformy do udostępniania plików z hostingiem CDN.',
}

const KEYWORDS =
  'Kiko, usekiko, full-stack developer, web developer, Hypastack, file sharing, CDN hosting, privacy-focused, Next.js developer, React developer, TypeScript, portfolio, freelance developer, secure file sharing'

/**
 * JSON.stringify does not escape `<`, so a `</script>` sequence inside any
 * embedded string would close the tag early. All input here is static today,
 * but the escape keeps that true if the data ever becomes dynamic.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

/** hreflang map covering every locale plus the x-default entry point. */
function languageAlternates(path = '') {
  const languages: Record<string, string> = {}
  for (const locale of SUPPORTED_LOCALES) {
    languages[locale] = `${SITE_URL}/${locale}${path}`
  }
  languages['x-default'] = `${SITE_URL}/en${path}`
  return languages
}

export function buildSiteMetadata(locale: Locale): Metadata {
  const description = DESCRIPTIONS[locale]
  const url = `${SITE_URL}/${locale}`

  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: languageAlternates(),
    },
    title: {
      default: `${SITE_NAME} — ${TAGLINE}`,
      template: `%s — ${SITE_NAME}`,
    },
    description,
    keywords: KEYWORDS,
    authors: [{ name: FULL_NAME, url: SITE_URL }],
    creator: FULL_NAME,
    publisher: FULL_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      url,
      siteName: SITE_NAME,
      title: `${SITE_NAME} — ${TAGLINE}`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} — ${TAGLINE}`,
      description,
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
    icons: {
      icon: 'https://r2.hypastack.com/cdn/wilaqbuqe3xe/favicon.jpg',
      shortcut: 'https://r2.hypastack.com/cdn/wilaqbuqe3xe/favicon.jpg',
      apple: 'https://r2.hypastack.com/cdn/wilaqbuqe3xe/favicon.jpg',
    },
    category: 'portfolio',
    classification: 'Personal Website',
    other: {
      'msapplication-TileColor': '#000000',
    },
  }
}

export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: FULL_NAME,
      alternateName: ['Kiko', 'ExpertKiko'],
      url: SITE_URL,
      email: `mailto:${EMAIL}`,
      jobTitle: TAGLINE,
      description: DESCRIPTIONS.en,
      sameAs: [GITHUB_URL, 'https://hypastack.com', SITE_URL],
      knowsAbout: [
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
        'Web Development',
        'UI/UX Design',
        'Privacy Engineering',
        'Cloud Infrastructure',
        'Cloudflare Workers',
        'SaaS Development',
      ],
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full-Stack Web Development',
            description:
              'Custom web applications built with Next.js, React, and TypeScript.',
          },
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DESCRIPTIONS.en,
      publisher: { '@id': `${SITE_URL}/#person` },
      inLanguage: [...SUPPORTED_LOCALES],
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://hypastack.com/#app',
      name: 'Hypastack',
      url: 'https://hypastack.com',
      description:
        'Privacy-focused file sharing platform with built-in CDN hosting. Upload and share files securely with auto-expiring links.',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: { '@id': `${SITE_URL}/#person` },
      featureList: [
        'Encrypted file sharing',
        'CDN hosting',
        'Auto-expiring links',
        'Privacy-first design',
        'Zero-knowledge architecture',
      ],
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      name: `${SITE_NAME} Portfolio`,
      url: SITE_URL,
      mainEntity: { '@id': `${SITE_URL}/#person` },
      description: `${FULL_NAME}'s portfolio showcasing projects and work experience.`,
    },
  ],
}
