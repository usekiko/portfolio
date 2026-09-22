'use client'

import { CheckIcon, LinkIcon } from 'lucide-react'
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
      // Clipboard access denied (insecure context or permission), leave the
      // label alone rather than claiming a copy that didn't happen.
    }
  }

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      type="button"
    >
      {copied ? <CheckIcon className="size-3.5" /> : <LinkIcon className="size-3.5" />}
      <span>{copied ? 'Copied' : 'Copy URL'}</span>
    </button>
  )
}
