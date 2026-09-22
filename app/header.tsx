import Link from 'next/link'
import { AVATAR_IMAGE, BANNER_IMAGE, BANNER_VIDEO } from './data'

export function Header() {
  return (
    <header className="mb-12 overflow-hidden rounded-3xl border border-zinc-900 bg-black">
      <div className="relative h-56 bg-zinc-900">
        {/* pointer-events-none keeps it from being paused, hovered for controls or right-clicked */}
        <video
          src={BANNER_VIDEO}
          poster={BANNER_IMAGE}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          aria-hidden
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-b from-transparent to-black" />
      </div>
      <div className="relative -mt-16 flex flex-col items-center pb-5 text-center">
        <div className="mask-squircle bg-black p-2">
          <img
            src={AVATAR_IMAGE}
            alt="Kiko"
            className="h-28 w-28 mask-squircle object-cover"
            loading="eager"
            decoding="sync"
          />
        </div>
        <div className="mt-2">
          <Link href="/" className="text-xl font-normal text-white">
            Kiko
          </Link>
          <p className="text-lg font-normal text-zinc-400">Developer & Builder</p>
        </div>
      </div>
    </header>
  )
}
