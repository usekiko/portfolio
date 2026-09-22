import { ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Tag } from './tag'

export type LinkListItem = {
  id: string
  title: string
  description: string
  href: string
  tag?: string
}

/** Title + one-line description rows, used for projects and posts. */
export function LinkList({
  items,
  icon,
  external = true,
  divided = false,
}: {
  items: LinkListItem[]
  icon?: React.ReactNode
  external?: boolean
  /** hairlines between rows instead of plain spacing */
  divided?: boolean
}) {
  return (
    <div className={divided ? 'divide-foreground/10 divide-y [&>*]:py-5 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0' : 'space-y-6'}>
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
          className="group flex items-start gap-4"
        >
          {icon && (
            <div className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg]:size-5">
              {icon}
            </div>
          )}

          <div className={icon ? 'flex-1 space-y-1 pt-1' : 'flex-1 space-y-1'}>
            <h3 className="text-foreground flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
              <span className="flex items-center gap-1 group-hover:underline">
                {item.title}
                <ArrowUpRightIcon className="size-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </span>
              {item.tag && <Tag>{item.tag}</Tag>}
            </h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
