import type { Viewport } from 'next'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { serializeJsonLd, siteJsonLd } from './site-config'

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
    <html lang={lang} className="dark">
      <head>
        <link
          rel="preload"
          href="https://r2.hypastack.com/cdn/a07t77fqwj6a/CodecPro-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="https://r2.hypastack.com/cdn/jxvmdjwe4dnu/hellbound.png"
        />
        <link
          rel="preload"
          as="image"
          href="https://r2.hypastack.com/cdn/uwxyc1tcnru9/usekiko.webp"
        />
        <link
          rel="preload"
          as="image"
          href="https://r2.hypastack.com/cdn/95p6jl50f3fj/kiko.jpg"
        />
        <link rel="dns-prefetch" href="https://r2.hypastack.com" />
        <link rel="dns-prefetch" href="https://hypastack.com" />
      </head>
      <body className="bg-black tracking-tight text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteJsonLd) }}
        />

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
