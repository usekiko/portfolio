'use client'

import { useEffect, useState } from 'react'

export function CopyButton() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
    } catch {
      // Clipboard access denied (insecure context or permission) — leave the
      // label alone rather than claiming a copy that didn't happen.
    }
  }

  return (
    <button
      onClick={copy}
      className="font-base flex items-center gap-1 text-center text-sm text-zinc-400"
      type="button"
    >
      <span>{copied ? 'Copied' : 'Copy'}</span>
      <span>URL</span>
    </button>
  )
}
