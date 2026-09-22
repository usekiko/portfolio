'use client'

import { ArrowUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ScrollTop() {
  const [visible, setVisible] = useState(false)
  const [direction, setDirection] = useState<'up' | 'down'>('down')

  useEffect(() => {
    let last = 0
    const update = () => {
      const y = window.scrollY
      setVisible(y >= 400)
      setDirection(y - last > 0 ? 'down' : 'up')
      last = y
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <button
      type="button"
      data-visible={visible}
      data-scroll-direction={direction}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="bg-secondary text-secondary-foreground hover:bg-secondary/80 fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-100 flex size-9 items-center justify-center rounded-full transition-all duration-300 data-[scroll-direction=down]:opacity-80 data-[scroll-direction=up]:opacity-100 data-[visible=false]:pointer-events-none data-[visible=false]:opacity-0 lg:right-8 lg:bottom-[calc(2rem+env(safe-area-inset-bottom,0px))]"
    >
      <ArrowUpIcon className="size-5" />
      <span className="sr-only">Scroll to top</span>
    </button>
  )
}
