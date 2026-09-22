import Link from 'next/link'

export function Navbar({ lang }: { lang: string }) {
  return (
    <nav className="fixed top-4 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-[calc(48rem-2rem)] -translate-x-1/2 items-center rounded bg-zinc-900 p-1.5">
      <Link href={`/${lang}`} aria-label="Home">
        <img src="/icon.png" alt="" className="h-8 w-8 rounded-[2px]" />
      </Link>
    </nav>
  )
}
