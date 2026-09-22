import Link from 'next/link'
import { Section } from '../../components/section'

export default function NotFound() {
  return (
    <Section>
      <h1 className="mb-4 text-2xl font-semibold">404, Page not found</h1>
      <p className="mb-8 leading-relaxed text-foreground/70">
        That page doesn&apos;t exist. It may have moved, or the link may be
        broken.
      </p>
      <Link href="/en" className="link">
        Back to the homepage
      </Link>
    </Section>
  )
}
