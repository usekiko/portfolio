import Link from 'next/link'
import { AVATAR_IMAGE } from './data'

export function Header() {
  return (
    <header className="mb-12 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={AVATAR_IMAGE}
          alt="Kiko"
          className="h-16 w-16 mask-squircle object-cover"
          loading="eager"
          decoding="sync"
        />
        <div>
          <Link href="/" className="text-xl font-normal text-white">
            Kiko
          </Link>
          <p className="text-lg font-normal text-zinc-400">
            Developer & Builder
          </p>
        </div>
      </div>
    </header>
  )
}
