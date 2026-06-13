'use client'

import { useEffect, useState, useCallback } from 'react'

type SectionConfig = {
  id: string
  label: string
}

export function ScrollIndicator({ sections }: { sections: SectionConfig[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const maxScroll = document.body.scrollHeight - window.innerHeight

    // Force first section if at very top
    if (scrollY < 50) {
      setActiveIndex(0)
      return
    }

    // Force last section if at very bottom
    if (scrollY > maxScroll - 50) {
      setActiveIndex(sections.length - 1)
      return
    }

    // Otherwise find which section is most in view
    let bestIndex = 0
    let bestRatio = 0

    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i].id)
      if (!el) continue

      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Calculate how much of the section is visible in the viewport
      const visibleTop = Math.max(0, rect.top)
      const visibleBottom = Math.min(viewportHeight, rect.bottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)

      // Weight sections closer to center of viewport more heavily
      const sectionCenter = rect.top + rect.height / 2
      const viewportCenter = viewportHeight / 2
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter)
      const centerWeight = Math.max(0, 1 - distanceFromCenter / viewportHeight)

      const ratio = visibleHeight * centerWeight

      if (ratio > bestRatio) {
        bestRatio = ratio
        bestIndex = i
      }
    }

    setActiveIndex(bestIndex)
  }, [sections])

  useEffect(() => {
    // Fade in after mount
    const fadeTimer = setTimeout(() => setIsVisible(true), 300)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      clearTimeout(fadeTimer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      // Small offset for aesthetics so the header isn't right at the edge
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-950/60 px-4 py-3 shadow-lg shadow-black/20 ring-1 ring-white/10 backdrop-blur-md"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(-50%, 0)' : 'translate(-50%, 16px)',
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label="Section navigation"
    >
      <div className="flex items-center gap-2">
        {sections.map((section, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center justify-center p-1 outline-none"
              aria-label={section.label}
              aria-current={isActive ? 'true' : undefined}
              type="button"
            >
              {/* Section label — fades in above active dot */}
              <span
                className="pointer-events-none absolute -top-12 left-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2.5 py-1.5 text-xs font-medium tracking-wide text-zinc-200 shadow-xl ring-1 ring-white/10"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? 'translateX(-50%) translateY(0px) scale(1)'
                    : 'translateX(-50%) translateY(8px) scale(0.95)',
                  transition:
                    'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {section.label}
              </span>

              {/* Dot — expands to pill when active */}
              <span
                className="block rounded-full"
                style={{
                  width: isActive ? '32px' : '8px',
                  height: '8px',
                  backgroundColor: isActive
                    ? 'rgba(255, 255, 255, 1)'
                    : 'rgba(255, 255, 255, 0.3)',
                  transition:
                    'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease',
                }}
              />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
