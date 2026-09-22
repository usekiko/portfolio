import Link from 'next/link'
import { AVATAR_IMAGE, BANNER_IMAGE, BANNER_VIDEO } from './data'

export function Header() {
  return (
    <header className="mb-12 overflow-hidden rounded-3xl border border-zinc-800 bg-black">
      <div className="relative h-40 bg-zinc-900">
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
      </div>
      <div className="relative -mt-[71px] flex items-center gap-4 px-4 pb-4">
        <div className="mask-squircle bg-black p-[15px]">
          <img
            src={AVATAR_IMAGE}
            alt="Kiko"
            className="h-28 w-28 mask-squircle object-cover"
            loading="eager"
            decoding="sync"
          />
        </div>
        <div>
          <Link href="/" className="text-xl font-normal text-white">
            Kiko
          </Link>
          <p className="text-lg font-normal text-zinc-400">Developer & Builder</p>
        </div>
      </div>
    </header>
  )
}
