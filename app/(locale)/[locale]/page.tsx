import { BoxIcon } from 'lucide-react'
import { ContributionGraph } from '../../components/contribution-graph'
import { Experiences } from '../../components/experiences'
import { GithubIcon } from '../../components/github-icon'
import { LinkList } from '../../components/link-list'
import { PronounceMyName } from '../../components/pronounce-my-name'
import { RevealOnLoad } from '../../components/reveal-on-load'
import { Section, SectionTitle, Separator } from '../../components/section'
import { SkillsVenn } from '../../components/skills-venn'
import {
  AVATAR_IMAGE,
  BLOG_POSTS,
  EMAIL,
  PERSONAL_PROJECTS,
  PROJECTS,
  SOCIAL_LINKS,
  WORK_EXPERIENCE,
} from '../../data'
import { getTranslations } from '../../i18n'

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <main>
      <Section id="hero">
        <RevealOnLoad delay={0} duration={0.5}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">Kiko</h1>
              <PronounceMyName name="Kiko" />
            </div>
            <p className="font-mono text-sm tracking-wider text-muted-foreground uppercase">
              {t.jobTitle}
            </p>
          </div>
        </RevealOnLoad>

        <RevealOnLoad delay={0.15} duration={0.5}>
          <div className="mt-6 space-y-3 text-foreground/70">
            <p className="leading-relaxed">{t.heroTitle}</p>
            <p className="leading-relaxed">{t.heroDescription}</p>
          </div>
        </RevealOnLoad>

        <RevealOnLoad delay={0.3} duration={0.6}>
          <SkillsVenn profileImage={AVATAR_IMAGE} skills={t.skills} className="mt-8" />
        </RevealOnLoad>
      </Section>

      <Separator />

      <Section>
        <ContributionGraph locale={locale} label={t.contributions} />
      </Section>

      <Separator />

      <Section id="privacy">
        <div className="space-y-6">
          <SectionTitle>{t.sectionPrivacy}</SectionTitle>
          <LinkList
            icon={<BoxIcon />}
            items={PROJECTS.map((p) => ({
              id: p.id,
              title: p.name,
              description: t.projectDescriptions[p.id] || p.description,
              href: p.link,
              tag: p.discontinued ? t.discontinued : undefined,
            }))}
          />
        </div>
      </Section>

      <Separator />

      <Section id="personal">
        <div className="space-y-6">
          <SectionTitle>{t.sectionPersonal}</SectionTitle>
          <LinkList
            icon={<BoxIcon />}
            items={PERSONAL_PROJECTS.map((p) => ({
              id: p.id,
              title: p.name,
              description: t.personalProjectDescriptions[p.id] || p.description,
              href: p.link,
            }))}
          />
        </div>
      </Section>

      <Separator />

      <Section id="experience">
        <div className="space-y-6">
          <SectionTitle>{t.sectionExperience}</SectionTitle>
          <Experiences
            entries={[...WORK_EXPERIENCE].reverse().map((job) => ({
              id: job.id,
              title: t.workTitles[job.id] || job.title,
              description: t.workDescriptions[job.id] || job.company,
              start: job.start,
              end: job.end,
              link: job.link,
              current: job.end === 'Present',
            }))}
          />
        </div>
      </Section>

      {BLOG_POSTS.length > 0 && (
        <>
          <Separator />
          <Section id="blog">
            <div className="space-y-6">
              <SectionTitle>{t.sectionBlog}</SectionTitle>
              <LinkList
                divided
                external={false}
                items={BLOG_POSTS.map((post) => ({
                  id: post.uid,
                  title: t.blogTitles[post.uid]?.title || post.title,
                  description: t.blogTitles[post.uid]?.description || post.description,
                  href: post.link,
                }))}
              />
            </div>
          </Section>
        </>
      )}

      <Separator />

      <Section id="connect">
        <div className="space-y-6">
          <SectionTitle>{t.sectionConnect}</SectionTitle>
          <p className="leading-relaxed text-foreground/70">
            {t.connectDescription}{' '}
            <a className="link text-foreground" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
          <div className="flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Kiko on ${link.label}`}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
              >
                <GithubIcon className="size-4" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Section>
    </main>
  )
}
