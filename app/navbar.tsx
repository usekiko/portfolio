'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Navbar({ lang }: { lang: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <nav
      className={`fixed top-4 left-1/2 z-20 flex -translate-x-1/2 items-center rounded bg-zinc-900 p-1.5 transition-[width,max-width] duration-300 ease-out ${
        scrolled
          ? 'w-[calc((100%-2rem)/2)] max-w-[calc((48rem-2rem)/2)]'
          : 'w-[calc(100%-2rem)] max-w-[calc(48rem-2rem)]'
      }`}
    >
      <Link href={`/${lang}`} aria-label="Home">
        <img src="/icon.png" alt="" className="h-10 w-10 rounded-[2px]" />
      </Link>
    </nav>
  )
}
