'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const FADE_IN = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}
const TEXT =
  'fixed z-50 font-x text-xs tracking-wider text-gray-600 dark:text-gray-300'

/** Clock, viewport size and llms.txt in the screen corners, wide screens only. */
export function CornerInfo() {
  const [state, setState] = useState<{
    time: string
    w: number
    h: number
  } | null>(null)

  useEffect(() => {
    const update = () =>
      setState({
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        w: window.innerWidth,
        h: window.innerHeight,
      })
    update()
    const id = setInterval(update, 1000)
    window.addEventListener('resize', update)
    return () => {
      clearInterval(id)
      window.removeEventListener('resize', update)
    }
  }, [])

  if (!state || state.w < 1000) return null

  return (
    <>
      <motion.div {...FADE_IN} className={`${TEXT} top-4 left-4`}>
        {state.time}
      </motion.div>
      <motion.div {...FADE_IN} className={`${TEXT} bottom-4 left-4`}>
        {state.w} x {state.h}
      </motion.div>
      <motion.a
        {...FADE_IN}
        href="/llms.txt"
        target="_blank"
        className={`${TEXT} right-4 bottom-4`}
      >
        llms.txt
      </motion.a>
    </>
  )
}
