import { Metadata } from 'next'
import { ArticleJsonLd } from '../article-jsonld'

const title = 'Why I Build for the Web'
const description =
  'My journey into web development, what drives me to build products, and why privacy and performance matter.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/blog/aboutme',
  },
}

export default function AboutMe() {
  return (
    <>
      <h1 className="text-xl font-medium mb-8">{title}</h1>

      <p className="mb-4">
        The web is the most accessible platform ever created. Anyone with a browser can use what you build. That's what pulled me in, the idea that code becomes something real, something people actually use.
      </p>

      <hr className="my-8 border-zinc-800" />

      <h2 className="text-lg font-medium mt-12 mb-4">How It Started</h2>

      <p className="mb-4">
        I started building websites because I wanted to solve my own problems. Every tool I use, I think about how it could be better, faster, simpler, more private. That curiosity turned into actual projects.
      </p>

      <p className="mb-4">
        What began as experimenting with HTML and CSS evolved into full-stack applications. React, Next.js, TypeScript, Node.js, each tool I picked up opened new doors. Eventually the problems stopped fitting inside one language, and that opened a few more.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">What I Care About</h2>

      <h3 className="text-base font-medium mt-8 mb-2">Privacy</h3>

      <p className="mb-4">
        Privacy isn't a feature, it's a default. When I build something, I start from the assumption that user data is not mine. That's why <a href="https://hypastack.com" className="underline text-zinc-300">Hypastack</a> encrypts files in the browser before they ever touch the network. No email, no ads, no tracking.
      </p>

      <h3 className="text-base font-medium mt-8 mb-2">Performance</h3>

      <p className="mb-4">
        Slow software is broken software. I obsess over load times, bundle sizes, and perceived performance. If a page takes more than a second to feel ready, something's wrong.
      </p>

      <h3 className="text-base font-medium mt-8 mb-2">Simplicity</h3>

      <p className="mb-4">
        The best products don't need an instruction manual. I aim for interfaces that feel obvious, where the user knows what to do without thinking.
      </p>

      <hr className="my-8 border-zinc-800" />

      <h2 className="text-lg font-medium mt-12 mb-4">What I'm Working On</h2>

      <p className="mb-4">
        Right now, most of my time goes into <strong>Hypastack</strong>, a private file sharing platform with a built-in CDN. The goal is simple: make it easy to share files without sacrificing privacy or speed.
      </p>

      <p className="mb-4">
        Files are encrypted client-side with AES-256-GCM via the Web Crypto API. The key is generated in your browser and carried in the URL fragment, which browsers never send to the server, so I hold ciphertext and nothing else. Filenames are encrypted at rest under a separate key. Access keys are derived with PBKDF2-HMAC-SHA512 at 100,000 iterations. IP addresses are never stored raw; they're hashed and dropped, and rate limiting keys off an HMAC of the address rather than the address itself.
      </p>

      <p className="mb-4">
        Uploads go straight from the browser to storage through presigned URLs, so my server authorizes transfers without carrying them. Files expire, and some burn after a single read. Everything runs on self-managed infrastructure, and the whole thing is <a href="https://github.com/HypaStack/Hypastack-Open-Source" target="_blank" rel="noopener noreferrer" className="underline text-zinc-300">open source under AGPL-3.0</a>, front-end included. A privacy claim you cannot audit is a marketing claim.
      </p>

      <hr className="my-8 border-zinc-800" />

      <h2 className="text-lg font-medium mt-12 mb-4">The Stack I Use</h2>

      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Framework</strong>: Next.js 16 (App Router, Turbopack), React 19</li>
        <li><strong>Language</strong>: TypeScript, always, plus Go and Erlang where Node is the wrong tool</li>
        <li><strong>Styling</strong>: Tailwind CSS v4</li>
        <li><strong>Data</strong>: PostgreSQL via the <code>pg</code> driver, with Redis as an optional cache that the system falls back gracefully without</li>
        <li><strong>Storage</strong>: Cloudflare R2 (EU jurisdiction), fronted by an edge worker that blocks everything not explicitly allowed</li>
        <li><strong>Sidecars</strong>: two Go services (key derivation, input sanitization) and one Erlang/OTP service (file expiry and burn-on-read), all over Unix sockets</li>
        <li><strong>Desktop</strong>: Tauri v2, with a system tray and right-click uploads from the file explorer</li>
        <li><strong>Infrastructure</strong>: Self-managed VPS, rootless Podman containers behind Caddy, Cloudflare proxy, CI/CD via GitHub Actions</li>
      </ul>

      <p className="mb-4">
        The polyglot part is not for show. Expensive password hashing does not belong on an event loop, and per-file expiry timers are something Erlang does better than anything else I know of. I <a href="/blog/polyglot-backend" className="underline text-zinc-300">wrote about why</a>.
      </p>

      <hr className="my-8 border-zinc-800" />

      <blockquote className="border-l-4 border-zinc-700 pl-4 italic text-zinc-400 my-8">
        "Make it work, make it right, make it fast.", Kent Beck
      </blockquote>

      <p className="mb-4">
        That's the loop. Ship something real, improve it relentlessly, and never stop learning.
      </p>

      <ArticleJsonLd
        headline={title}
        description={description}
        slug="aboutme"
        datePublished="2026-07-14"
      />
    </>
  )
}
