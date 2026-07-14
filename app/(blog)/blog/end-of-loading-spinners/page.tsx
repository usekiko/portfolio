import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The End of the Loading Spinner',
  description: 'Aggressive caching, eager loading, and how to make the web feel instantaneous.',
  alternates: {
    canonical: '/blog/end-of-loading-spinners',
  },
}

export default function EndOfLoadingSpinners() {
  return (
    <>
      <h1 className="text-xl font-medium mb-8">The End of the Loading Spinner</h1>

      <p className="mb-4">
        We've accepted a web where clicking a link means staring at a spinning circle for three seconds. The modern web stack has given us incredible power, but it has also given us an excuse to be lazy about performance.
      </p>

      <p className="mb-4">
        It doesn't have to be this way. The browser is capable of rendering pages instantaneously if we stop getting in its way.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">The Problem with Lazy Loading</h2>

      <p className="mb-4">
        <code>loading="lazy"</code> was a fantastic addition to the HTML spec. It saves bandwidth and speeds up initial page loads by deferring offscreen images. But developers have started applying it blindly to <em>everything</em> — including images that are clearly visible "above the fold."
      </p>

      <p className="mb-4">
        The result? The page loads, the text renders, and then half a second later, the hero image aggressively pops into existence, shifting the layout and jarring the user.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">Eager Loading & Preloading</h2>

      <p className="mb-4">
        If an asset is critical to the initial view of your page, you need to tell the browser about it immediately.
      </p>

      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Preload Links</strong>: Add <code>&lt;link rel="preload" as="image" href="..." fetchpriority="high"&gt;</code> to your document head. This forces the browser to start downloading the image before it even begins parsing the body.</li>
        <li><strong>Eager Attributes</strong>: Use <code>loading="eager"</code> and <code>fetchpriority="high"</code> on the <code>&lt;img&gt;</code> tag itself.</li>
        <li><strong>Sync Decoding</strong>: Add <code>decoding="sync"</code> to force the browser to wait until the image is fully decoded before painting the page, eliminating the "pop-in" effect entirely.</li>
      </ul>

      <h2 className="text-lg font-medium mt-12 mb-4">Aggressive Caching</h2>

      <p className="mb-4">
        The fastest network request is the one that never happens. If an asset isn't going to change, cache it forever.
      </p>

      <p className="mb-4">
        Set your <code>Cache-Control</code> headers to <code>public, max-age=31536000, immutable</code>. This tells the browser to store the file for a year and <em>never</em> bother checking the server to see if it changed. On the second visit, the page will load in exactly 0 milliseconds.
      </p>

      <hr className="my-8 border-zinc-800" />

      <p className="italic text-zinc-400 text-sm">
        Performance isn't just about Lighthouse scores. It's about respecting the user's time and creating an experience that feels robust and native.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The End of the Loading Spinner",
            "description": "Aggressive caching, eager loading, and how to make the web feel instantaneous.",
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
              "@id": "https://usekiko.com/blog/end-of-loading-spinners"
            }
          })
        }}
      />
    </>
  )
}
