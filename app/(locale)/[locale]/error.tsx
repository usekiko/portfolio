'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mt-24 pb-20">
      <h1 className="mb-4 text-xl font-medium">Something went wrong</h1>
      <p className="mb-8 text-zinc-400">
        An unexpected error occurred while rendering this page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-100"
      >
        Try again
      </button>
    </main>
  )
}
