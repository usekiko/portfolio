import Link from 'next/link'
import {
  PROJECTS,
  PERSONAL_PROJECTS,
  WORK_EXPERIENCE,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
} from '../data'
import { getTranslations, SUPPORTED_LOCALES } from '../i18n'

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}


function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden squircle-sm-inner">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover grayscale"
        loading="eager"
        decoding="sync"
      />
    </div>
  )
}

function SocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-[1px] rounded-full bg-zinc-800 px-2.5 py-1 text-sm text-zinc-100"
      aria-label={`Visit Kiko on ${children}`}
    >
      {children}
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3"
      >
        <path
          d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </a>
  )
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <main className="space-y-24">
      <section id="hero">
        <div className="flex-1">
          <h1 className="mb-4 text-2xl font-medium tracking-tight text-white">
            {t.heroTitle}
          </h1>
          <p className="text-zinc-400">
            {t.heroDescription}{' '}
            <a
              href="https://hypastack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 underline decoration-zinc-600 underline-offset-2"
            >
              Hypastack
            </a>
            {' '}{t.heroHypastackSuffix}
          </p>
        </div>
      </section>

      <section id="privacy">
        <h2 className="mb-5 text-lg font-medium">{t.sectionPrivacy}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative squircle bg-zinc-800/50 p-[1px]">
                <div className="relative h-full w-full squircle-inner bg-zinc-950/40 p-1">
                  <ProjectImage src={project.image} alt={project.name} />
                </div>
              </div>
              <div className="px-1">
                <a
                  className="font-base inline-block font-[450] text-zinc-50"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.name}
                </a>
                <p className="text-base text-zinc-400">
                  {t.projectDescriptions[project.id] || project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="personal">
        <h2 className="mb-5 text-lg font-medium">{t.sectionPersonal}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PERSONAL_PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative squircle bg-zinc-800/50 p-[1px]">
                <div className="relative h-full w-full squircle-inner bg-zinc-950/40 p-1">
                  <ProjectImage src={project.image} alt={project.name} />
                </div>
              </div>
              <div className="px-1">
                <a
                  className="font-base inline-block font-[450] text-zinc-50"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.name}
                </a>
                <p className="text-base text-zinc-400">
                  {t.personalProjectDescriptions[project.id] || project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience">
        <h2 className="mb-5 text-lg font-medium">{t.sectionExperience}</h2>
        <div className="flex flex-col space-y-2">
          {WORK_EXPERIENCE.map((job) => (
            <a
              className="relative block squircle bg-zinc-800/50 p-[1px]"
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              key={job.id}
            >
              <div className="relative flex h-full w-full flex-col space-y-1 squircle-inner bg-black p-3">
                <div className="flex w-full flex-row justify-between">
                  <h3 className="font-normal text-zinc-100">
                    {t.workTitles[job.id] || job.title}
                  </h3>
                  <p className="text-zinc-400">
                    {job.start} — {job.end}
                  </p>
                </div>
                <p className="text-zinc-400">
                  {job.company}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {BLOG_POSTS.length > 0 && (
        <section id="blog">
          <h2 className="mb-3 text-lg font-medium">{t.sectionBlog}</h2>
          <div className="flex flex-col space-y-2">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="relative block squircle bg-zinc-800/50 p-[1px]"
                href={post.link}
              >
                <div className="relative flex h-full w-full flex-col space-y-1 squircle-inner bg-black p-3">
                  <h3 className="font-normal text-zinc-100">
                    {t.blogTitles[post.uid]?.title || post.title}
                  </h3>
                  <p className="text-zinc-400">
                    {t.blogTitles[post.uid]?.description || post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section id="connect">
        <h2 className="mb-5 text-lg font-medium">{t.sectionConnect}</h2>
        <p className="mb-5 text-zinc-400">
          {t.connectDescription}{' '}
          <a className="underline text-zinc-300 decoration-zinc-600 underline-offset-2" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.label} link={link.link}>
              {link.label}
            </SocialLink>
          ))}
        </div>
      </section>


    </main>
  )
}
