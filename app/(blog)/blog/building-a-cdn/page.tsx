import { Metadata } from 'next'
import { ArticleJsonLd } from '../article-jsonld'

const title = 'Building a High-Performance CDN with Cloudflare R2'
const description =
  'How Hypastack stores and serves files: browser-side AES-256-GCM, presigned direct-to-R2 uploads, resumable multipart, and an edge worker that blocks everything by default.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/blog/building-a-cdn',
  },
}

export default function BuildingACdn() {
  return (
    <>
      <h1 className="text-xl font-medium mb-8">{title}</h1>

      <p className="mb-4">
        When I started building Hypastack, the hard problem was not storing files. It was serving them globally without going bankrupt on egress, while never being able to read them myself. Those two constraints shaped everything else.
      </p>

      <hr className="my-8 border-zinc-800" />

      <h2 className="text-lg font-medium mt-12 mb-4">Zero egress fees</h2>

      <p className="mb-4">
        Cloudflare R2 is S3-compatible object storage that charges <strong>$0 for egress</strong>. That single fact is what makes a free tier possible at all. On a traditional provider, one popular file can generate a bandwidth bill that dwarfs the cost of storing it; on R2, serving a file a million times costs the same as serving it once.
      </p>

      <p className="mb-4">
        The bucket is in the <strong>EU jurisdiction</strong>, which is a deliberate choice rather than a default, it keeps object data inside a legal regime I can reason about.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">The server never sees your file</h2>

      <p className="mb-4">
        Files are encrypted <strong>in the browser</strong> with AES-256-GCM via the Web Crypto API, before a single byte crosses the network. The key is generated client-side and lives in the <strong>URL fragment</strong>, the part after the <code>#</code>, which browsers never send to the server.
      </p>

      <p className="mb-4">
        That is the whole trick, and it is worth being precise about what it buys: when you share a Hypastack link, the key travels in the half of the URL my server cannot see. I hold ciphertext and nothing else. Lose the link and the file is unrecoverable, by you, and by me, which is the point.
      </p>

      <p className="mb-4">
        Filenames get the same treatment. They are encrypted at rest under a separate key, because a filename is metadata that leaks the contents it names.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">Uploads bypass my server entirely</h2>

      <p className="mb-4">
        The API issues a <strong>presigned URL</strong> and the browser uploads straight to R2. My server authorizes the upload; it does not carry it. That keeps a 5 GB transfer off a VPS that has no business proxying 5 GB.
      </p>

      <p className="mb-4">
        Anything over <strong>50 MB is split into 10 MB chunks</strong> and the parts upload in parallel, with resumption if the connection drops. An early version presigned each part one at a time, which meant a 500-part upload waited on 500 sequential round-trips before it could start moving bytes. Presigning the parts concurrently turned a visible stall into no stall at all.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">The edge worker blocks by default</h2>

      <p className="mb-4">
        Public traffic to <code>r2.hypastack.com</code> goes through a Cloudflare Worker that treats the bucket as hostile. It is a deny-by-default router:
      </p>

      <pre className="bg-zinc-900 p-4 rounded-xl overflow-x-auto text-sm mb-4">
        <code>{`/cdn/*       → public, immutable cache
/profiles/*  → presigned only (HMAC-SHA256 + expiry)
/uploads/*   → BLOCK (must go through the API)
/pastes/*    → BLOCK
/*           → BLOCK`}</code>
      </pre>

      <p className="mb-4">
        Only <code>GET</code> and <code>HEAD</code> are allowed, path traversal is rejected before anything else runs, and profile assets require an HMAC-SHA256 signature with an expiry rather than being world-readable.
      </p>

      <p className="mb-4">
        Everything served from that host also carries <code>X-Content-Type-Options: nosniff</code> and a <code>sandbox</code> CSP, because a CDN that serves user-uploaded bytes is one content-type guess away from executing user-uploaded JavaScript on your own domain. I <a href="/blog/bugs-that-bit-me" className="underline text-zinc-300">wrote about getting that wrong</a>.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">Cache rules everything around me</h2>

      <p className="mb-4">
        Files on Hypastack are immutable, created once, never updated, eventually deleted. Immutability means the cache headers can be as aggressive as they get:
      </p>

      <pre className="bg-zinc-900 p-4 rounded-xl overflow-x-auto text-sm mb-4">
        <code>{`Cache-Control: public, max-age=31536000, immutable`}</code>
      </pre>

      <p className="mb-4">
        Once a file is at an edge node it stays there, and a second download never leaves the user's own browser cache. There is no invalidation strategy because there is nothing to invalidate: a changed file is a different file with a different key.
      </p>

      <hr className="my-8 border-zinc-800" />

      <p className="italic text-zinc-400 text-sm">
        Building a global CDN used to need a large team and a large budget. Today it needs an object store with sane egress pricing, about sixty lines of edge worker, and the discipline to block everything you did not explicitly allow.
      </p>

      <ArticleJsonLd
        headline={title}
        description={description}
        slug="building-a-cdn"
        datePublished="2026-07-14"
      />
    </>
  )
}
