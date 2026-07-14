import { renderOgImage } from '../../og-image'
import { SUPPORTED_LOCALES } from '../../i18n'

export { size, contentType, alt } from '../../og-image'

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export default function Image() {
  return renderOgImage()
}
