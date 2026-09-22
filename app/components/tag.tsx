export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-muted-foreground inline-flex items-center rounded-lg border bg-zinc-50 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-900">
      {children}
    </span>
  )
}
