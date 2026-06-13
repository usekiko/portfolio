'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const lang = navigator.language?.toLowerCase() || ''
    const prefersPl = lang.startsWith('pl')
    router.replace(prefersPl ? '/pl' : '/en')
  }, [router])

  return null
}
