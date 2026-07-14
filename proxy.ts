import { NextResponse, type NextRequest } from 'next/server'
import { SUPPORTED_LOCALES, isSupportedLocale, type Locale } from './app/i18n'

const DEFAULT_LOCALE: Locale = 'en'

/** Blog posts are authored in English only and live outside the locale tree. */
const LOCALE_EXEMPT_PREFIXES = ['/blog']

/**
 * Picks the best supported locale from Accept-Language, honouring quality
 * values. Replaces the old client-side `navigator.language` redirect, which
 * left `/` blank for anyone without JavaScript (crawlers included).
 */
function detectLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      const quality = q ? Number.parseFloat(q.split('=')[1]) : 1
      return { tag: tag.trim().toLowerCase(), q: Number.isNaN(quality) ? 0 : quality }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    const base = tag.split('-')[0]
    if (isSupportedLocale(base)) return base
  }

  return DEFAULT_LOCALE
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (LOCALE_EXEMPT_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next()
  }

  const hasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return NextResponse.next()

  const locale = detectLocale(request.headers.get('accept-language'))
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`

  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals and anything that looks like a file (robots.txt,
  // sitemap.xml, llms.txt, images).
  matcher: ['/((?!_next/|.*\\.).*)'],
}
