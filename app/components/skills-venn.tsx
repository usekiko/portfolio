import { cn } from './cn'

const LABEL = 'absolute text-[10px] text-foreground/50 sm:text-xs md:text-sm'
const CIRCLE =
  'absolute h-[55%] w-[55%] rounded-full border border-foreground/10'

export function SkillsVenn({
  profileImage,
  skills,
  className,
}: {
  profileImage: string
  skills: { top: string; left: string; right: string; bottom: string }
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg',
        className,
      )}
    >
      <div className="relative aspect-square w-full">
        <div className={cn(CIRCLE, 'top-0 left-1/2 -translate-x-1/2')} />
        <div className={cn(CIRCLE, 'top-[22%] left-[2%]')} />
        <div className={cn(CIRCLE, 'top-[22%] right-[2%]')} />
        <div className={cn(CIRCLE, 'bottom-0 left-1/2 -translate-x-1/2')} />

        <span
          className={cn(
            LABEL,
            'top-[14%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap',
          )}
        >
          {skills.top}
        </span>
        <span
          className={cn(
            LABEL,
            'top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2',
          )}
        >
          {skills.left}
        </span>
        <span
          className={cn(
            LABEL,
            'top-1/2 right-[15%] translate-x-1/2 -translate-y-1/2',
          )}
        >
          {skills.right}
        </span>
        <span
          className={cn(
            LABEL,
            'bottom-[14%] left-1/2 -translate-x-1/2 translate-y-1/2 text-center leading-tight whitespace-pre-wrap',
          )}
        >
          {skills.bottom}
        </span>

        <div className="border-background absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 shadow-md sm:h-16 sm:w-16 sm:border-4 md:h-20 md:w-20">
          <img
            src={profileImage}
            alt="Kiko"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="sync"
          />
        </div>
      </div>
    </div>
  )
}
