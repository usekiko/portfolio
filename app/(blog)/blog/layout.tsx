import type { Metadata } from 'next'
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
      <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-zinc-950 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="absolute right-4 top-24">
        <CopyButton />
      </div>
      <main className="prose prose-gray mt-24 pb-20 prose-invert prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:prose-base prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium">
        {children}
      </main>
    </SiteShell>
  )
}
