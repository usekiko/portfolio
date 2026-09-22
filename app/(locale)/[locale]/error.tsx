'use client'

import { Section } from '../../components/section'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Section>
      <h1 className="mb-4 text-2xl font-semibold">Something went wrong</h1>
      <p className="mb-8 leading-relaxed text-foreground/70">
        An unexpected error occurred while rendering this page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
      >
        Try again
      </button>
    </Section>
  )
}
