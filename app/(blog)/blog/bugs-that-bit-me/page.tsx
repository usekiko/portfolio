import { Metadata } from 'next'
import { ArticleJsonLd } from '../article-jsonld'

const title = 'Five Bugs That Bit Me While Building Hypastack'
const description =
  'A cached rejected promise, modulo bias in ID generation, stored XSS on my own CDN, and two features that were never reachable. Real bugs, real fixes.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/blog/bugs-that-bit-me',
  },
}

export default function BugsThatBitMe() {
  return (
    <>
      <h1 className="text-xl font-medium mb-8">{title}</h1>

      <p className="mb-4">
        Writing about architecture is easy because architecture is the part you chose. Bugs are the part that chose you. These are five real ones from Hypastack's history — what broke, why, and what I actually changed.
      </p>

      <hr className="my-8 border-zinc-800" />

      <h2 className="text-lg font-medium mt-12 mb-4">1. The cached promise that poisoned every API call</h2>

      <p className="mb-4">
        Hypastack's client fetches a short-lived proxy token before hitting the API. To avoid requesting one per call, I memoized the in-flight promise — the standard trick:
      </p>

      <pre className="bg-zinc-900 p-4 rounded-xl overflow-x-auto text-sm mb-4">
        <code>{`let tokenPromise = null

function getProxyToken() {
  if (!tokenPromise) tokenPromise = fetchToken()
  return tokenPromise   // every caller awaits the same promise
}`}</code>
      </pre>

      <p className="mb-4">
        This is correct until <code>fetchToken()</code> rejects once. A rejected promise is a permanently rejected value — it does not retry, it does not expire, it just sits in that variable handing the same failure to every future caller. One transient network blip on page load and <em>every</em> subsequent API call in that session failed, forever, until a hard refresh.
      </p>

      <p className="mb-4">
        The worst part is how it presents: not as "the token request failed" but as "the entire app is broken and nothing works", with a stack trace pointing at whatever unlucky call happened to be next. The fix is one line — clear the cache on rejection, so a failure is retryable:
      </p>

      <pre className="bg-zinc-900 p-4 rounded-xl overflow-x-auto text-sm mb-4">
        <code>{`tokenPromise = fetchToken().catch((err) => {
  tokenPromise = null   // let the next caller try again
  throw err
})`}</code>
      </pre>

      <p className="mb-4">
        <strong>The lesson:</strong> caching a promise caches the failure too. If you memoize an async result, decide explicitly what happens when it rejects — because the default is "cache the error until the tab closes".
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">2. Modulo bias in my share IDs</h2>

      <p className="mb-4">
        Share IDs are generated from random bytes mapped onto an alphabet. The natural way to write that is a modulo:
      </p>

      <pre className="bg-zinc-900 p-4 rounded-xl overflow-x-auto text-sm mb-4">
        <code>{`const char = ALPHABET[randomByte % ALPHABET.length]`}</code>
      </pre>

      <p className="mb-4">
        CodeQL flagged it, and it was right. A byte holds 256 values. If the alphabet does not divide 256 evenly, the leftover values wrap around and the first few characters of the alphabet come up measurably more often than the last few. The IDs are still random — just not <em>uniformly</em> random, which quietly shaves entropy off every identifier in the system.
      </p>

      <p className="mb-4">
        The fix is <strong>rejection sampling</strong>: throw away the bytes that land in the biased tail and draw again. It costs a negligible number of extra draws and restores a flat distribution.
      </p>

      <p className="mb-4">
        <strong>The lesson:</strong> "it looks random" is not an argument. This is the kind of bug that never produces a bug report — it just makes your IDs slightly cheaper to guess than you believe they are.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">3. Stored XSS on my own CDN domain</h2>

      <p className="mb-4">
        Hypastack serves user files from <code>r2.hypastack.com</code>. If a user uploads an HTML file and the browser renders it as HTML, that page runs JavaScript <em>on my domain</em>. Same-origin against anything else served from that host. That is textbook stored XSS, and I shipped it.
      </p>

      <p className="mb-4">
        The mitigation is two headers on the R2 serving path in the edge worker:
      </p>

      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><code>X-Content-Type-Options: nosniff</code> — stop the browser from second-guessing the content type and deciding a file is HTML because it looks like HTML.</li>
        <li><code>Content-Security-Policy: sandbox</code> — render whatever it is in an opaque origin with no script execution and no access to anything.</li>
      </ul>

      <p className="mb-4">
        The structural fix matters more than the headers, though: the CDN host is a <strong>separate domain that holds nothing worth stealing</strong>. No cookies, no session, no auth. The worker blocks every path except the public <code>/cdn/</code> prefix and presigned <code>/profiles/</code> reads; uploads and pastes are refused outright and must go through the API.
      </p>

      <p className="mb-4">
        <strong>The lesson:</strong> if you serve user-controlled bytes, serve them from an origin where being XSSed is boring.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">4. Two features nobody could reach</h2>

      <p className="mb-4">
        Two separate discoveries, same shape.
      </p>

      <p className="mb-4">
        The files page had a <strong>grid view</strong> — fully implemented, styled, working. It was also unreachable, because the toggle that switched into it was never rendered. It had been dead for its entire existence and I only found it while auditing components for a cleanup pass.
      </p>

      <p className="mb-4">
        Separately, the manage page had a <strong>loading skeleton</strong> that never appeared. It was declared at the page level, but Next renders the layout first — so during navigation the page component (and its skeleton) had not mounted yet. The skeleton only existed during a window in which it could not possibly be shown. Moving it to the layout made it work.
      </p>

      <p className="mb-4">
        <strong>The lesson:</strong> code that runs is not the same as code that is reachable. I now run <code>knip</code> over the project specifically to find things nothing points at, and it keeps finding them.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">5. The optimization I had to revert</h2>

      <p className="mb-4">
        I subset the Material Symbols icon font from <strong>5.3 MB down to 14 KB</strong> by keeping only the codepoints actually used. Enormous win. I reverted it.
      </p>

      <p className="mb-4">
        The problem with codepoint-based subsetting is that it is only correct for the icons you knew about at build time. Add an icon later, forget to regenerate the subset, and you ship a blank square — a failure that does not throw, does not log, and does not show up in CI. I had traded 5 MB for a permanent tripwire under every future icon, and I decided the trade was bad while the tripwire was still theoretical rather than after it had gone off in production.
      </p>

      <p className="mb-4">
        Around the same time I deleted a WebGL shader that drew ambient rays behind the hero. It looked good. It also burned CPU on <em>every single page load</em>, including for people who scrolled straight past it, and it dragged in a rendering dependency to do so. That one I did not miss.
      </p>

      <p className="mb-4">
        <strong>The lesson:</strong> a performance win that makes future changes silently breakable is a loan, not a gift. Sometimes the right call is to keep the 5 MB and sleep.
      </p>

      <hr className="my-8 border-zinc-800" />

      <p className="italic text-zinc-400 text-sm">
        All five are in the public git history — Hypastack is open source under AGPL-3.0, including the embarrassing commits.
      </p>

      <ArticleJsonLd
        headline={title}
        description={description}
        slug="bugs-that-bit-me"
        datePublished="2026-07-14"
      />
    </>
  )
}
