import { Metadata } from 'next'
import { ArticleJsonLd } from '../article-jsonld'

const title = 'The End of the Loading Spinner'
const description =
  'Spinners are an apology for not knowing what you are about to show. Skeletons, streamed downloads, and the performance work that actually moved the needle on Hypastack.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/blog/end-of-loading-spinners',
  },
}

export default function EndOfLoadingSpinners() {
  return (
    <>
      <h1 className="text-xl font-medium mb-8">{title}</h1>

      <p className="mb-4">
        A spinner is an apology. It says: something is happening, I do not know what, I do not know for how long, please wait. It is the least informative thing you can put on a screen, and for a long time Hypastack was full of them.
      </p>

      <p className="mb-4">
        Replacing them was not one change. It was a series of unglamorous ones.
      </p>

      <hr className="my-8 border-zinc-800" />

      <h2 className="text-lg font-medium mt-12 mb-4">Skeletons that match the real DOM</h2>

      <p className="mb-4">
        The drive and CDN pages now render <strong>skeletons shaped like the content that is coming</strong> — same grid, same tile dimensions, same spacing. When the data lands, the skeleton is replaced by something the same size, so nothing jumps.
      </p>

      <p className="mb-4">
        This only works if the skeleton is honest. A generic grey box that does not match the final layout is a spinner with extra steps: you still get the reflow, you just got a nicer-looking lie first. If your skeleton and your content disagree about dimensions, you have built a cumulative layout shift generator.
      </p>

      <p className="mb-4">
        And a skeleton has to actually mount. Mine did not, for a while — the manage page declared its skeleton at the page level, but Next renders the layout first, so during navigation the skeleton had not mounted yet and never appeared. It had to move up into the layout to exist at all.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">Real progress, not fake progress</h2>

      <p className="mb-4">
        Downloads on <code>/d/</code> used to buffer the whole file into memory and then hand it over. For a large file that meant a long, silent nothing — and a progress bar that could only be theatre, because there was no progress to report.
      </p>

      <p className="mb-4">
        Streaming the response fixed both problems at once: big files stopped ballooning memory, and the progress bar became a measurement instead of an animation. Bulk deletes and folder wipes got the same treatment — they now report what they have actually done, and they fail loudly instead of silently.
      </p>

      <p className="mb-4">
        The principle: <strong>if you can show a number, never show a spinner.</strong> A spinner is what you fall back to when you have failed to instrument the thing you are waiting on.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">Deleting things is a performance strategy</h2>

      <p className="mb-4">
        The single biggest win was not an optimization. It was a deletion.
      </p>

      <p className="mb-4">
        The landing page had a WebGL shader drawing ambient rays behind the hero. It looked genuinely good. It also burned CPU on <strong>every page load</strong>, for every visitor, including the ones who scrolled past it in half a second — and it dragged in a rendering library to do so. Cutting the shader cut the dependency, the CPU cost, and the jank on low-end phones, and the page looks about 95% as good.
      </p>

      <p className="mb-4">
        The same audit found a hero video being preloaded on mobile, where it is never shown. Dead font references to typefaces the site does not use. CSP allowances for Google Fonts, which nothing loads from. None of these were clever fixes. They were just things nobody had checked.
      </p>

      <h2 className="text-lg font-medium mt-12 mb-4">Know when to revert</h2>

      <p className="mb-4">
        I once subset the icon font from <strong>5.3 MB to 14 KB</strong>. It was, by raw numbers, the best performance commit I have ever written. I reverted it a few days later.
      </p>

      <p className="mb-4">
        Codepoint-based subsetting is only correct for the icons that existed when you generated it. Add one later without regenerating, and you ship an invisible blank square — no error, no warning, no CI failure. I had bought 5 MB at the price of a permanent trap under every future icon, and that is a bad price even though the number looked incredible.
      </p>

      <p className="mb-4">
        Performance work has a failure mode where the metric improves and the product gets worse. Watch for it.
      </p>

      <hr className="my-8 border-zinc-800" />

      <h2 className="text-lg font-medium mt-12 mb-4">What is left</h2>

      <p className="mb-4">
        Preload what you will definitely need, on the routes where you will actually need it. Lazy-load what is below the fold. Cache the expensive derived things — rendered OG images now come out of Redis instead of refetching the logo on every render. Let immutable content be cached forever, because it is immutable.
      </p>

      <p className="mb-4">
        None of that is exotic. It is mostly the discipline to keep asking what the browser is doing that nobody asked it to do.
      </p>

      <ArticleJsonLd
        headline={title}
        description={description}
        slug="end-of-loading-spinners"
        datePublished="2026-07-14"
      />
    </>
  )
}
