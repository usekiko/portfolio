import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-12 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src="https://r2.hypastack.com/cdn/95p6jl50f3fj/kiko.jpg"
          alt="Kiko"
          className="h-16 w-16 mask-squircle object-cover grayscale"
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
