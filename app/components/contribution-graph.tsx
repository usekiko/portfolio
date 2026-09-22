type Activity = { date: string; count: number; level: number }

const BLOCK = 9
const GAP = 3
const FONT = 11
const LABEL_HEIGHT = FONT + 8
const LEVELS = [
  'fill-muted-foreground/5',
  'fill-muted-foreground/20',
  'fill-muted-foreground/40',
  'fill-muted-foreground/60',
  'fill-muted-foreground/80',
]

async function getContributions(): Promise<Activity[]> {
  try {
    const res = await fetch(
      'https://github-contributions-api.jogruber.de/v4/usekiko?y=last',
      { next: { revalidate: 86400 } },
    )
    if (!res.ok) return []
    const data = (await res.json()) as { contributions: Activity[] }
    return data.contributions
  } catch {
    return []
  }
}

/** Columns of 7 days, the first one padded so rows line up with weekdays. */
function toWeeks(data: Activity[]) {
  const pad = new Date(`${data[0].date}T00:00:00Z`).getUTCDay()
  const days: (Activity | null)[] = [...Array(pad).fill(null), ...data]
  const weeks: (Activity | null)[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))
  return weeks
}

export async function ContributionGraph({
  locale,
  label,
}: {
  locale: string
  label: string
}) {
  const data = await getContributions()
  if (data.length === 0) return null

  const weeks = toWeeks(data)
  const total = data.reduce((sum, a) => sum + a.count, 0)
  const width = weeks.length * (BLOCK + GAP) - GAP
  const height = LABEL_HEIGHT + (BLOCK + GAP) * 7 - GAP
  const monthFormat = new Intl.DateTimeFormat(locale, {
    month: 'short',
    timeZone: 'UTC',
  })

  // label a month at the first week that starts in it, skipping cramped ones
  const months: { label: string; x: number }[] = []
  weeks.forEach((week, i) => {
    const first = week.find(Boolean)
    if (!first) return
    const date = new Date(`${first.date}T00:00:00Z`)
    const name = monthFormat.format(date)
    const prev = months[months.length - 1]
    if (prev?.label === name) return
    if (prev && i * (BLOCK + GAP) - prev.x < 3 * (BLOCK + GAP)) months.pop()
    months.push({ label: name, x: i * (BLOCK + GAP) })
  })

  return (
    <div
      className="mx-auto flex w-max max-w-full flex-col gap-2 font-mono"
      style={{ fontSize: FONT }}
    >
      <h2 className="sr-only">GitHub Contribution</h2>
      <div className="no-scrollbar max-w-full overflow-x-auto overflow-y-hidden">
        <svg
          className="block overflow-visible"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          <title>Contribution Graph</title>
          <g className="fill-current">
            {months.map((m) => (
              <text key={m.x} x={m.x} dominantBaseline="hanging">
                {m.label}
              </text>
            ))}
          </g>
          {weeks.map((week, w) =>
            week.map((a, d) =>
              a ? (
                <rect
                  key={a.date}
                  className={LEVELS[a.level] ?? LEVELS[4]}
                  width={BLOCK}
                  height={BLOCK}
                  rx={2}
                  x={(BLOCK + GAP) * w}
                  y={LABEL_HEIGHT + (BLOCK + GAP) * d}
                >
                  <title>{`${a.count} · ${a.date}`}</title>
                </rect>
              ) : null,
            ),
          )}
        </svg>
      </div>
      <div className="flex flex-wrap gap-1 whitespace-nowrap sm:gap-x-4">
        <div className="text-foreground">
          {label.replace('{count}', total.toLocaleString(locale))}
        </div>
        <div className="ml-auto flex items-center gap-[3px]">
          <span className="text-muted-foreground mr-1">Less</span>
          {LEVELS.map((level) => (
            <svg key={level} width={BLOCK} height={BLOCK}>
              <rect className={level} width={BLOCK} height={BLOCK} rx={2} />
            </svg>
          ))}
          <span className="text-muted-foreground ml-1">More</span>
        </div>
      </div>
    </div>
  )
}
