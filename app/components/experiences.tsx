'use client'

import { ArrowUpRightIcon, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from './cn'

export type ExperienceEntry = {
  id: string
  title: string
  description: string
  start: string
  end: string
  link?: string
  current?: boolean
}

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  const [open, setOpen] = useState(entry.current ?? false)
  const period =
    entry.start === entry.end ? entry.start : `${entry.start} — ${entry.end}`

  return (
    <div data-state={open ? 'open' : 'closed'}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-start gap-4 text-left"
      >
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h3 className="text-foreground font-medium">{entry.title}</h3>
              {entry.link && (
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center justify-center rounded-md p-1 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowUpRightIcon className="size-4" />
                </a>
              )}
            </div>
            <ChevronDownIcon
              className={cn(
                'text-muted-foreground size-4 shrink-0 transition-transform duration-200',
                open && 'rotate-180',
              )}
            />
          </div>
          <p className="text-foreground/60 text-sm leading-relaxed">{period}</p>
        </div>
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="border-muted mt-3 border-l-2 pl-4">
            <p className="text-foreground/60 text-sm leading-relaxed">
              {entry.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Experiences({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <ExperienceItem key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
