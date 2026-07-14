import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mt-24 pb-20">
      <h1 className="mb-4 text-xl font-medium">404 — Page not found</h1>
      <p className="mb-8 text-zinc-400">
        That page doesn&apos;t exist. It may have moved, or the link may be
        broken.
      </p>
      <Link
        href="/en"
        className="text-zinc-200 underline decoration-zinc-600 underline-offset-2"
      >
        Back to the homepage
      </Link>
    </main>
  )
}
