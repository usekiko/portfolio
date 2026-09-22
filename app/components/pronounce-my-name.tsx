'use client'

import { Volume2Icon } from 'lucide-react'

export function PronounceMyName({ name }: { name: string }) {
  const speak = () => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(name)
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }

  return (
    <button
      type="button"
      className="text-muted-foreground hover:text-foreground relative transition-all after:absolute after:-inset-1 active:scale-[0.9]"
      onClick={speak}
    >
      <Volume2Icon className="size-4" />
      <span className="sr-only">Pronounce my name</span>
    </button>
  )
}
