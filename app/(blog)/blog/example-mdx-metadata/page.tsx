import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Export Metadata from MDX for Next.js SEO',
  description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
  alternates: {
    canonical: '/blog/example-mdx-metadata',
  },
}

export default function MdxMetadata() {
  return (
    <>
      <h1 className="text-xl font-medium mb-8">How to Export Metadata from MDX for Next.js SEO</h1>

      <p className="mb-4">
        Next.js supports exporting a <code>metadata</code> object from your MDX files, which can be used to enhance SEO and social sharing features. This is especially useful for blog posts and documentation pages.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">Example: Exporting Metadata</h2>

      <p className="mb-4">
        You can export a <code>metadata</code> object at the top of your MDX file like this:
      </p>

      <pre className="bg-zinc-900 p-4 rounded-xl overflow-x-auto text-sm mb-4">
        <code>{`export const metadata = {
  title: 'How to Export Metadata from MDX for Next.js SEO',
  description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
  authors: [{ name: 'Jane Doe', url: 'https://janedoe.com' }],
  openGraph: {
    images: [
      'https://cdn.cosmos.so/example-image.jpg',
    ],
  },
}`}</code>
      </pre>

      <p className="mb-4">
        This metadata will be picked up by Next.js and can be used for SEO, Open Graph, and other meta tags.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">Why Use Metadata in MDX?</h2>

      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>SEO</strong>: Improve your page's search engine ranking with relevant titles and descriptions.</li>
        <li><strong>Social Sharing</strong>: Enhance how your content appears when shared on social media platforms.</li>
        <li><strong>Consistency</strong>: Keep your metadata close to your content for easier management.</li>
      </ul>

      <h2 className="text-lg font-medium mt-12 mb-4">Further Reading</h2>
      
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><a href="https://nextjs.org/docs/app/building-your-application/optimizing/metadata" className="underline text-zinc-300">Next.js Documentation: Metadata</a></li>
        <li><a href="https://mdxjs.com/" className="underline text-zinc-300">MDX Documentation</a></li>
      </ul>

      <hr className="my-8 border-zinc-800" />

      <p className="italic text-zinc-400 text-sm">
        This post demonstrates how to export metadata from MDX files for use with Next.js SEO features.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Export Metadata from MDX for Next.js SEO",
            "description": "A guide on exporting metadata from MDX files to leverage Next.js SEO features.",
            "author": {
              "@type": "Person",
              "name": "Kiko",
              "url": "https://usekiko.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Kiko",
              "logo": {
                "@type": "ImageObject",
                "url": "https://r2.hypastack.com/cdn/7xcy45wytecb/kiko.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://usekiko.com/blog/example-mdx-metadata"
            }
          })
        }}
      />
    </>
  )
}
