import { GITHUB_URL } from './site-config'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800 px-0 py-4">
      <div className="flex items-center justify-between">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <span className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Kiko. Transform your ideas into a real
            thing.
          </span>
        </a>
      </div>
    </footer>
  )
}
