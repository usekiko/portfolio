import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why I Build for the Web',
  description:
    'My journey into web development — what drives me to build products, and why privacy and performance matter.',
  alternates: {
    canonical: '/blog/aboutme',
  },
}

export default function AboutMe() {
  return (
    <>
      <h1 className="text-xl font-medium mb-8">Why I Build for the Web</h1>

      <p className="mb-4">
        The web is the most accessible platform ever created. Anyone with a browser can use what you build. That's what pulled me in — the idea that code becomes something real, something people actually use.
      </p>

      <hr className="my-8 border-zinc-800" />

      <h2 className="text-lg font-medium mt-12 mb-4">How It Started</h2>

      <p className="mb-4">
        I started building websites because I wanted to solve my own problems. Every tool I use, I think about how it could be better — faster, simpler, more private. That curiosity turned into actual projects.
      </p>

      <p className="mb-4">
        What began as experimenting with HTML and CSS evolved into full-stack applications. React, Next.js, TypeScript, Node.js — each tool I picked up opened new doors.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">What I Care About</h2>

      <h3 className="text-base font-medium mt-8 mb-2">Privacy</h3>

      <p className="mb-4">
        Privacy isn't a feature — it's a default. When I build something, I start from the assumption that user data is not mine. That's why <a href="https://hypastack.com" className="underline text-zinc-300">Hypastack</a> is built on a true zero-knowledge architecture. No emails, no passwords, no IP address logging.
      </p>

      <h3 className="text-base font-medium mt-8 mb-2">Performance</h3>

      <p className="mb-4">
        Slow software is broken software. I obsess over load times, bundle sizes, and perceived performance. If a page takes more than a second to feel ready, something's wrong.
      </p>

      <h3 className="text-base font-medium mt-8 mb-2">Simplicity</h3>

      <p className="mb-4">
        The best products don't need an instruction manual. I aim for interfaces that feel obvious — where the user knows what to do without thinking.
      </p>

      <hr className="my-8 border-zinc-800" />

      <h2 className="text-lg font-medium mt-12 mb-4">What I'm Working On</h2>

      <p className="mb-4">
        Right now, most of my time goes into <strong>Hypastack</strong> — a file sharing platform with a built-in CDN. The goal is simple: make it easy to share files without sacrificing privacy or speed.
      </p>

      <p className="mb-4">
        We do not use Google Analytics or tracking cookies. Files are stored under random UUIDs with AES-256-GCM encrypted filenames. Nicknames are stored as a SHA-256 hash. If an account is inactive for 7 days, the access keys, files, and profile are permanently purged. No backups, no recovery. That is the standard for privacy.
      </p>

      <hr className="my-8 border-zinc-800" />

      <h2 className="text-lg font-medium mt-12 mb-4">The Stack I Use</h2>

      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Framework</strong>: Next.js (App Router)</li>
        <li><strong>Language</strong>: TypeScript, always</li>
        <li><strong>Styling</strong>: Tailwind CSS v4</li>
        <li><strong>Infrastructure</strong>: Cloudflare, Shared Hosting</li>
        <li><strong>Database</strong>: Whatever fits the problem — Mostly PostgresSQL ("pg" npm package)</li>
      </ul>

      <hr className="my-8 border-zinc-800" />

      <blockquote className="border-l-4 border-zinc-700 pl-4 italic text-zinc-400 my-8">
        "Make it work, make it right, make it fast." — Kent Beck
      </blockquote>

      <p className="mb-4">
        That's the loop. Ship something real, improve it relentlessly, and never stop learning.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Why I Build for the Web",
            "description": "My journey into web development — what drives me to build products, and why privacy and performance matter.",
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
              "@id": "https://usekiko.com/blog/aboutme"
            }
          })
        }}
      />
    </>
  )
}
