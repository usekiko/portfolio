import Link from 'next/link'
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
    <main className="mt-24 pb-20">
      <h1 className="text-xl font-medium mb-8">Technical Writing</h1>
      <p className="text-zinc-400 mb-12">
        Thoughts on web development, building high-performance systems, and prioritizing user privacy.
      </p>

      <div className="flex flex-col space-y-4">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.uid}
            className="group block rounded-xl p-4 ring-1 ring-zinc-800/50 transition-colors hover:bg-zinc-900/50"
            href={post.link}
          >
            <div className="flex flex-col space-y-2">
              <h2 className="font-medium text-zinc-100 group-hover:underline decoration-zinc-600 underline-offset-4">
                {post.title}
              </h2>
              <p className="text-zinc-400">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
