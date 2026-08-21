import { Metadata } from 'next'
import { ArticleJsonLd } from '../article-jsonld'

const title = 'Why My Node App Hands Work to Go and Erlang'
const description =
  'Hypastack runs three sidecar services alongside Next.js, two in Go, one in Erlang/OTP. Here is what each one does and why Node was the wrong place for it.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/blog/polyglot-backend',
  },
}

export default function PolyglotBackend() {
  return (
    <>
      <h1 className="text-xl font-medium mb-8">{title}</h1>

      <p className="mb-4">
        Hypastack started as a single Next.js app. It still mostly is, the API lives in route handlers under <code>/api/v2/</code>, and that is where the product logic belongs. But three jobs kept making Node look bad at what Node is bad at, so they moved out into sidecar services: two written in Go, one in Erlang/OTP.
      </p>

      <p className="mb-4">
        None of them are microservices in the resume-driven sense. They are small, single-purpose processes that talk to the main app over a <strong>Unix domain socket</strong>, no network hop, no service mesh, no discovery layer. If a sidecar is down, Node falls back to doing the work itself.
      </p>

      <hr className="my-8 border-zinc-800" />

      <h2 className="text-lg font-medium mt-12 mb-4">hypahash, key derivation (Go)</h2>

      <p className="mb-4">
        Access keys are hashed with <strong>PBKDF2-HMAC-SHA512 at 100,000 iterations</strong>. That is deliberately expensive, which is the entire point of a password hash, and it is exactly the kind of work you do not want on a single-threaded event loop. A handful of concurrent logins is enough to make every unrelated request wait behind the CPU burn.
      </p>

      <p className="mb-4">
        So derivation moved to Go, where it runs on a real thread pool. The hard constraint was that the Go implementation had to reproduce the <em>exact</em> hash Node produced, or every existing access key would stop verifying. The subtle part is the salt:
      </p>

      <pre className="bg-zinc-900 p-4 rounded-xl overflow-x-auto text-sm mb-4">
        <code>{`salt = 16 random bytes, hex-encoded (32 chars)
key  = PBKDF2-HMAC-SHA512(password, saltHexBytes, 100000 iters, 64 bytes)
hash = "<salt>:<hex(key)>"`}</code>
      </pre>

      <p className="mb-4">
        The bytes fed into PBKDF2 are the <strong>ASCII bytes of the hex string</strong>, not the 16 decoded bytes, because that is what <code>crypto.pbkdf2Sync(password, saltHexString, ...)</code> does in Node. It is a wart. It is also load-bearing, so the Go service copies it faithfully and the comment at the top of <code>main.go</code> exists to stop future me from "fixing" it.
      </p>

      <p className="mb-4">
        PBKDF2 is implemented in-tree rather than pulled from a module, so the build has zero dependency fetches and the algorithm is pinned to something I can read.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">hypasan, sanitization and sniffing (Go)</h2>

      <p className="mb-4">
        Every user-supplied note runs through a scrubbing pipeline: trim, strip all HTML tags but keep the text, strip injection patterns (control characters, protocol handlers, NoSQL operators, template markers, SQL keywords, null bytes), then clamp to a max length. In Node that meant JSDOM and DOMPurify, a heavyweight DOM implementation booted up to throw away every tag it finds.
      </p>

      <p className="mb-4">
        In Go it is <code>bluemonday</code>'s strict policy, which is the same idea with none of the weight. JSDOM is still there as a lazy fallback if the sidecar is unreachable, but it is no longer on the hot path.
      </p>

      <p className="mb-4">
        The same service also does <strong>magic-byte content sniffing</strong>. It takes the head bytes of an upload and answers "what actually is this file", independent of whatever extension or MIME type the client claimed. Notably, hypasan only <em>detects</em>, the allow/block decision stays in Node, in one constants file. A detector that also enforces policy is a detector whose policy you will eventually forget to audit.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">hypasched, expiry and burn-on-read (Erlang/OTP)</h2>

      <p className="mb-4">
        This is the one that actually needed a different language.
      </p>

      <p className="mb-4">
        Every file on Hypastack has an expiry, and some files burn after a single read. The obvious implementation is a cron job that sweeps the database every minute looking for things to delete. That works, and it is what most people do, and it means a file with a 30-second expiry can survive for 90 seconds, which is a strange thing to promise on a privacy product.
      </p>

      <p className="mb-4">
        Erlang gives you a better option: <strong>one lightweight process per pending deletion</strong>, each sleeping until its own fire time. Erlang processes cost a few hundred bytes, so "a process per file" is a completely reasonable thing to say out loud. Jobs live in an ETS registry; the supervisor restarts any worker that crashes, with the same job intact.
      </p>

      <p className="mb-4">
        The details that make it survive contact with reality:
      </p>

      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Long sleeps are chunked.</strong> A worker re-checks the wall clock every 12 hours rather than sleeping for a month straight, so distant expiries do not drift.</li>
        <li><strong>The DB row is re-read at fire time.</strong> If the expiry moved while the worker was asleep, it re-arms instead of deleting. The timer is a hint; the database is the truth.</li>
        <li><strong>R2 object first, then the DB row.</strong> Crash in between and you have an orphaned row pointing at nothing, which is recoverable. The other order leaves a live file nobody can see or delete.</li>
        <li><strong>Failures retry forever with capped exponential backoff.</strong> A deletion that fails is not allowed to be quietly forgotten.</li>
        <li><strong>Everything is reloaded from Postgres on boot</strong>, and reconciled against it every six hours as a safety net for any notification that never arrived.</li>
      </ul>

      <p className="mb-4">
        That last point is the one I would emphasize. In-memory timers are an optimization, not a source of truth. The moment you treat them as authoritative, a restart silently drops a thousand deletions and nobody notices until a file that should have burned turns up months later.
      </p>

      <hr className="my-8 border-zinc-800" />

      <h2 className="text-lg font-medium mt-12 mb-4">Was it worth it?</h2>

      <p className="mb-4">
        For hypasched, unambiguously, the alternative was a sweep loop that could not honour short expiries. For the two Go services it is a narrower call: they buy real CPU headroom, and they cost me two more things to deploy and keep in sync with the Node implementations they mirror.
      </p>

      <p className="mb-4">
        The rule I settled on: a sidecar has to be small enough that I can read the whole thing in one sitting, and the main app has to keep working without it. Both hold here. The moment a sidecar becomes load-bearing <em>and</em> unreadable, it stops being a sidecar and starts being a distributed system I did not ask for.
      </p>

      <p className="mb-4">
        All of it is open source under AGPL-3.0, sidecars included, if you want to see how badly the details go.
      </p>

      <ArticleJsonLd
        headline={title}
        description={description}
        slug="polyglot-backend"
        datePublished="2026-07-14"
      />
    </>
  )
}
