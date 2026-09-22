import type { Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { CornerInfo } from './components/corner-info'
import { ScrollTop } from './components/scroll-top'
import { Section, Separator } from './components/section'
import { themeScript } from './components/theme'
import { WordmarkFooter } from './components/wordmark-footer'
import { AVATAR_IMAGE } from './data'
import { serializeJsonLd, siteJsonLd } from './site-config'

const fontX = localFont({
  src: [
    { path: './fonts/X-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/X-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-x',
})

const fontMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jetbrains-mono',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  colorScheme: 'light dark',
}

/**
 * The `<html>`/`<body>` shell. Lives in a component rather than a single root
 * layout so that each root layout can declare its own `lang`.
 */
export function SiteShell({
  lang,
  children,
}: {
  lang: string
  children: React.ReactNode
}) {
  return (
    <html
      lang={lang}
      className={`${fontX.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Hero avatar, rendered on the home page above the fold. */}
        <link rel="preload" as="image" href={AVATAR_IMAGE} />
        <link rel="dns-prefetch" href="https://s1.hetaku.dev" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteJsonLd) }}
        />

        <CornerInfo />
        <ScrollTop />

        <div className="relative min-h-screen w-full bg-background">
          <Separator />
          {children}
          <Separator />
          <Section flush>
            <WordmarkFooter brandName="Kiko" />
          </Section>
          <Separator />
          <div className="h-16 shrink-0" />
        </div>
      </body>
    </html>
  )
}
