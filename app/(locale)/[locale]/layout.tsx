import type { Metadata } from 'next'
import { SUPPORTED_LOCALES, isSupportedLocale, type Locale } from '../../i18n'
import { buildSiteMetadata } from '../../site-config'
import { SiteShell } from '../../site-shell'

export { viewport } from '../../site-shell'

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

/** Any segment that isn't a known locale 404s instead of rendering English. */
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildSiteMetadata(isSupportedLocale(locale) ? locale : 'en')
}

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const lang: Locale = isSupportedLocale(locale) ? locale : 'en'

  return <SiteShell lang={lang}>{children}</SiteShell>
}
