import { FULL_NAME, SITE_NAME, SITE_URL, serializeJsonLd } from '../../site-config'

/**
 * Article structured data. Every post used to inline its own copy, all four
 * pointing at a publisher logo URL that 404s; this keeps one source of truth.
 */
export function ArticleJsonLd({
  headline,
  description,
  slug,
  datePublished,
}: {
  headline: string
  description: string
  slug: string
  datePublished: string
}) {
  const url = `${SITE_URL}/blog/${slug}`

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline,
          description,
          datePublished,
          dateModified: datePublished,
          author: {
            '@type': 'Person',
            name: FULL_NAME,
            url: SITE_URL,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/icon.png`,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
          },
          url,
        }),
      }}
    />
  )
}
