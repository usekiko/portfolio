import { cn } from './cn'

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

function CornerMark({ position }: { position: Corner }) {
  const isTop = position.includes('top')
  const isLeft = position.includes('left')

  return (
    <div
      className={cn(
        'border-foreground/30 absolute h-1.5 w-1.5 bg-transparent',
        isTop ? 'top-0 border-t' : 'bottom-0 border-b',
        isLeft ? 'left-0 border-l' : 'right-0 border-r',
      )}
    />
  )
}

/** Content block framed by corner marks and faint side rails. */
export function Section({
  children,
  className,
  id,
  flush = false,
}: {
  children: React.ReactNode
  className?: string
  id?: string
  /** no inner padding, content runs edge to edge */
  flush?: boolean
}) {
  return (
    <section id={id} className="scroll-mt-16">
      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className={cn('relative', !flush && 'px-3 py-3 md:py-4', className)}>
          <CornerMark position="top-left" />
          <CornerMark position="top-right" />
          <CornerMark position="bottom-left" />
          <CornerMark position="bottom-right" />
          <div className="bg-foreground/10 absolute top-1.5 bottom-1.5 left-0 w-px" />
          <div className="bg-foreground/10 absolute top-1.5 right-0 bottom-1.5 w-px" />
          {children}
        </div>
      </div>
    </section>
  )
}

export function Separator() {
  return (
    <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
      <div className="bg-dashed ring-foreground/10 h-8 ring-[0.65px]" />
    </div>
  )
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
      {children}
    </h2>
  )
}
