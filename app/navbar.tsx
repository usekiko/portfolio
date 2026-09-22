import Link from 'next/link'
import { getTranslations } from './i18n'

export function Navbar({ lang }: { lang: string }) {
  const t = getTranslations(lang)
  const links = [
    { label: t.navHome, href: `/${lang}` },
    { label: t.navProjects, href: `/${lang}#privacy` },
    { label: t.navBlog, href: '/blog' },
    { label: t.navContact, href: `/${lang}#connect` },
  ]

  return (
    <nav className="fixed top-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded border border-zinc-900 bg-black/70 p-1 backdrop-blur-xl">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-[2px] px-3 py-1 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
