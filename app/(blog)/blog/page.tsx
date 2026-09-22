import { LinkList } from '../../components/link-list'
import { BLOG_POSTS } from '../../data'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical writing on web development, performance, and privacy architecture.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogIndex() {
  return (
    <div className="not-prose space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Technical Writing</h1>
        <p className="font-mono text-sm tracking-wider text-muted-foreground uppercase">Blog</p>
      </div>
      <p className="leading-relaxed text-foreground/70">
        Thoughts on web development, building high-performance systems, and prioritizing user privacy.
      </p>
      <LinkList
        divided
        external={false}
        items={BLOG_POSTS.map((post) => ({
          id: post.uid,
          title: post.title,
          description: post.description,
          href: post.link,
        }))}
      />
    </div>
  )
}
