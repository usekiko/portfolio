import Link from 'next/link'
import { AVATAR_IMAGE, BANNER_IMAGE } from './data'

export function Header() {
  return (
    <header className="mb-12">
      <div className="relative h-40 rounded-t-3xl bg-zinc-900">
        <img
          src={BANNER_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full rounded-t-3xl object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-70% to-black" />
        <img
          src={AVATAR_IMAGE}
          alt="Kiko"
          className="absolute bottom-0 left-4 h-32 w-32 translate-y-1/2 mask-squircle object-cover"
          loading="eager"
          decoding="sync"
        />
      </div>
      <div className="mt-18 pl-4">
        <Link href="/" className="text-xl font-normal text-white">
          Kiko
        </Link>
        <p className="text-lg font-normal text-zinc-400">Developer & Builder</p>
      </div>
    </header>
  )
}
