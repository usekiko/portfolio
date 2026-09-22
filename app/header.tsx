import Link from 'next/link'
import { AVATAR_IMAGE } from './data'

export function Header() {
  return (
    <header className="mb-12">
      <div className="relative h-40 rounded-t-3xl bg-zinc-900">
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-40% to-black" />
        <img
          src={AVATAR_IMAGE}
          alt="Kiko"
          className="absolute bottom-0 left-4 h-16 w-16 translate-y-1/2 mask-squircle object-cover"
          loading="eager"
          decoding="sync"
        />
      </div>
      <div className="mt-2 pl-24">
        <Link href="/" className="text-xl font-normal text-white">
          Kiko
        </Link>
        <p className="text-lg font-normal text-zinc-400">Developer & Builder</p>
      </div>
    </header>
  )
}
