'use client'

import { motion } from 'motion/react'

export function RevealOnLoad({
  children,
  delay = 0,
  duration = 0.6,
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
