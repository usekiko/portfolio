import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'

const siteUrl = 'https://usekiko.com'
const siteName = 'Kiko'
const fullName = 'Kiko'
const tagline = 'Full-Stack Developer & Product Builder'
const description = 'Kiko is a full-stack developer building privacy-first web products. Creator of Hypastack — a secure file sharing platform with CDN hosting. Based in Europe.'
const keywords = 'Kiko, usekiko, full-stack developer, web developer, Hypastack, file sharing, CDN hosting, privacy-focused, Next.js developer, React developer, TypeScript, portfolio, freelance developer, secure file sharing'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': siteUrl,
      'en': siteUrl,
    },
  },
  title: {
    default: `${siteName} — ${tagline}`,
    template: `%s — ${siteName}`,
  },
  description,
  keywords,
  authors: [{ name: fullName, url: siteUrl }],
  creator: fullName,
  publisher: fullName,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: `${siteName} — ${tagline}`,
    description,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${siteName} — ${tagline}`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — ${tagline}`,
    description,
    images: ['/og.png'],
    creator: '@expertkiko',
    site: '@expertkiko',
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: fullName,
        alternateName: ['Kiko', 'ExpertKiko'],
        url: siteUrl,
        jobTitle: tagline,
        description,
        sameAs: [
          'https://github.com/expertkiko',
          'https://hypastack.com',
          siteUrl,
        ],
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
              description: 'Custom web applications built with Next.js, React, and TypeScript.',
            },
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        description,
        publisher: { '@id': `${siteUrl}/#person` },
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://hypastack.com/#app',
        name: 'Hypastack',
        url: 'https://hypastack.com',
        description: 'Privacy-focused file sharing platform with built-in CDN hosting. Upload and share files securely with auto-expiring links.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        creator: { '@id': `${siteUrl}/#person` },
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
        '@id': `${siteUrl}/#profilepage`,
        name: `${siteName} Portfolio`,
        url: siteUrl,
        mainEntity: { '@id': `${siteUrl}/#person` },
        description: `${fullName}'s portfolio showcasing projects and work experience.`,
        inLanguage: 'en-US',
      },
    ],
  }

  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="preload"
          href="https://r2.hypastack.com/cdn/a07t77fqwj6a/CodecPro-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="image" href="https://r2.hypastack.com/cdn/jxvmdjwe4dnu/hellbound.png" />
        <link rel="preload" as="image" href="https://r2.hypastack.com/cdn/uwxyc1tcnru9/usekiko.webp" />
        <link rel="preload" as="image" href="https://r2.hypastack.com/cdn/95p6jl50f3fj/kiko.jpg" />
        <link rel="dns-prefetch" href="https://r2.hypastack.com" />
        <link rel="dns-prefetch" href="https://hypastack.com" />
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
      </head>
      <body
        className="bg-black tracking-tight antialiased text-white"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
          <div className="relative mx-auto w-full max-w-screen-md flex-1 px-4 pt-20">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}