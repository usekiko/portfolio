type Project = {
  name: string
  description: string
  link: string
  image: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Hypastack',
    description:
      'Privacy-focused file sharing SaaS with a built-in CDN. Encrypted, fast, temporary.',
    link: 'https://hypastack.com/',
    image: 'https://r2.hypastack.com/cdn/2mtv3jprebms/hypastack-new.jpg',
    id: 'project-hypastack',
  },
]

export const PERSONAL_PROJECTS: Project[] = [
  {
    name: 'UseKiko.com',
    description: 'My personal portfolio — the site you\'re on right now.',
    link: 'https://usekiko.com/',
    image: 'https://r2.hypastack.com/cdn/myfmtfngyalf/usekikoimg.webp',
    id: 'project-usekiko',
  },
  {
    name: 'Sugarpetal',
    description: 'Pastry website example, sweet, clean UI.',
    link: 'https://sugarpetal.usekiko.com/',
    image: 'https://r2.hypastack.com/cdn/crv8iytazmei/hero-pastry.jpg',
    id: 'project-sugarpetal',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Hypastack',
    title: 'Founder & Lead Developer',
    start: '2026',
    end: 'Present',
    link: 'https://hypastack.com',
    id: 'work-hypastack',
  },
  {
    company: 'Freelance',
    title: 'Full-Stack Web Development',
    start: '2024',
    end: 'Present',
    link: 'https://usekiko.com',
    id: 'work-freelance',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Why I Build for the Web',
    description: 'My journey into web development — what drives me to build products, and why privacy and performance matter.',
    link: '/blog/aboutme',
    uid: 'blog-1',
  },
  {
    title: 'Building a High-Performance CDN with Cloudflare R2',
    description: 'How I architected the file storage and distribution system for Hypastack.',
    link: '/blog/building-a-cdn',
    uid: 'blog-2',
  },
  {
    title: 'The End of the Loading Spinner',
    description: 'Aggressive caching, eager loading, and how to make the web feel instantaneous.',
    link: '/blog/end-of-loading-spinners',
    uid: 'blog-3',
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
]

export const GITHUB_URL = 'https://github.com/usekiko'

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: GITHUB_URL,
  },
  {
    label: 'Hypastack',
    link: 'https://hypastack.com',
  },
]

export const EMAIL = 'hello@usekiko.com'
