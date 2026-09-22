import type { Metadata } from 'next'
import { Section } from '../../components/section'
import { buildSiteMetadata } from '../../site-config'
import { SiteShell } from '../../site-shell'
import { CopyButton } from './copy-button'

export { viewport } from '../../site-shell'

export const metadata: Metadata = buildSiteMetadata('en')

export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SiteShell lang="en">
      <Section className="pb-12 md:pb-16">
        <div className="mb-8 flex justify-end">
          <CopyButton />
        </div>
        <main className="prose max-w-none prose-zinc dark:prose-invert prose-h1:text-2xl prose-h1:font-semibold prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:prose-base prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-p:text-foreground/70 prose-p:leading-relaxed prose-a:text-foreground prose-a:underline-offset-4 prose-strong:font-medium prose-strong:text-foreground prose-code:font-normal prose-li:text-foreground/70">
          {children}
        </main>
      </Section>
    </SiteShell>
  )
}
