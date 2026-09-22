import type { Viewport } from 'next'
import { Instrument_Sans } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { AVATAR_IMAGE } from './data'
import { serializeJsonLd, siteJsonLd } from './site-config'

const instrumentSans = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-instrument-sans',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
  colorScheme: 'dark',
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
    <html lang={lang} className={`dark ${instrumentSans.variable}`}>
      <head>
        {/* Header avatar, rendered on every page. Card images are preloaded
            by the locale page, which is the only place they appear. */}
        <link rel="preload" as="image" href={AVATAR_IMAGE} />
        <link rel="dns-prefetch" href="https://r2.hypastack.com" />
        <link rel="dns-prefetch" href="https://s1.hetaku.dev" />
        <link rel="dns-prefetch" href="https://hypastack.com" />
      </head>
      <body className="bg-black text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteJsonLd) }}
        />

        <Navbar lang={lang} />

        <div className="flex min-h-screen w-full flex-col">
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
