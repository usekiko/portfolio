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

/** Header avatar. Preloaded in the site shell, so keep the two in sync. */
export const AVATAR_IMAGE =
  'https://r2.hypastack.com/cdn/jxvmdjwe4dnu/hellbound.png'

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
    name: 'Hypamail',
    description: 'Burner email service — disposable inboxes, no signup.',
    link: 'https://hypamail.me/',
    image: 'https://r2.hypastack.com/cdn/hypamail-asset/hypamail.png',
    id: 'project-hypamail',
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
    title: 'Why My Node App Hands Work to Go and Erlang',
    description: 'Hypastack runs three sidecar services alongside Next.js — two in Go, one in Erlang/OTP. What each one does and why Node was the wrong place for it.',
    link: '/blog/polyglot-backend',
    uid: 'blog-2',
  },
  {
    title: 'Five Bugs That Bit Me While Building Hypastack',
    description: 'A cached rejected promise, modulo bias in ID generation, stored XSS on my own CDN, and two features that were never reachable.',
    link: '/blog/bugs-that-bit-me',
    uid: 'blog-3',
  },
  {
    title: 'Building a High-Performance CDN with Cloudflare R2',
    description: 'Browser-side AES-256-GCM, presigned direct-to-R2 uploads, resumable multipart, and an edge worker that blocks everything by default.',
    link: '/blog/building-a-cdn',
    uid: 'blog-4',
  },
  {
    title: 'The End of the Loading Spinner',
    description: 'Skeletons, streamed downloads, and the performance work that actually moved the needle — including the optimization I had to revert.',
    link: '/blog/end-of-loading-spinners',
    uid: 'blog-5',
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
