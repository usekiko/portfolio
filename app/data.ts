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
  link?: string
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

const HETAKU_CDN = 'https://s1.hetaku.dev/59ae349f-1bcd-43e3-9438-c65ee3947f11/'

/** Header avatar and banner. Preloaded in the site shell. */
export const AVATAR_IMAGE = `${HETAKU_CDN}a07fc64156634d3130273f71d66fed085bbc2a6f2e5b5b4ffbefcaafc8f4f31b.jpeg`
export const BANNER_IMAGE = `${HETAKU_CDN}5463b0b8931a645ac95623ccbbaa3ffdf4a82c1fcdff2e784d5bc0b34fbdc8a1.jpeg`

// placeholder card image until each project gets its own
const PROJECT_IMAGE = `${HETAKU_CDN}cc97bc9424229a610935046e05ad6a43349c142f2501da041fa0c5df541d99d9.png`

export const PROJECTS: Project[] = [
  {
    name: 'Hypastack',
    description:
      'Privacy-focused file sharing SaaS with a built-in CDN. Encrypted, fast, temporary.',
    link: 'https://hypastack.com/',
    image: PROJECT_IMAGE,
    id: 'project-hypastack',
  },
  {
    name: 'Hypamail',
    description: 'Burner email service.',
    link: 'https://hypamail.me/',
    image: PROJECT_IMAGE,
    id: 'project-hypamail',
  },
]

export const PERSONAL_PROJECTS: Project[] = [
  {
    name: 'UseKiko.com',
    description: 'My personal portfolio, the site you\'re on right now.',
    link: 'https://usekiko.com/',
    image: PROJECT_IMAGE,
    id: 'project-usekiko',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Building from HTML & CSS templates and getting comfortable with JavaScript.',
    title: 'Learning the fundamentals',
    start: '2023',
    end: '2024',
    id: 'work-foundations',
  },
  {
    company:
      'A Python Flask app with a real backend and user auth, insecure, but it taught me how much I didn\'t know.',
    title: 'First backend, first auth',
    start: '2024',
    end: '2024',
    id: 'work-flask',
  },
  {
    company: 'Picked up React, Next.js, and how databases actually work.',
    title: 'Moving to React & Next.js',
    start: '2024',
    end: '2025',
    id: 'work-react',
  },
  {
    company:
      'Shipped something real with actual users, it worked, but it was hard to maintain and didn\'t scale.',
    title: 'First project with real users',
    start: '2025',
    end: '2025',
    id: 'work-first-project',
  },
  {
    company:
      'Rewrote it more times than I can count and hardened it line by line. Fast, reliable, and secure.',
    title: 'Building Hypastack',
    start: '2025',
    end: 'Present',
    link: 'https://hypastack.com',
    id: 'work-hypastack',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Why I Build for the Web',
    description: 'My journey into web development, what drives me to build products, and why privacy and performance matter.',
    link: '/blog/aboutme',
    uid: 'blog-1',
  },
  {
    title: 'Why My Node App Hands Work to Go and Erlang',
    description: 'Hypastack runs three sidecar services alongside Next.js, two in Go, one in Erlang/OTP. What each one does and why Node was the wrong place for it.',
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
    description: 'Skeletons, streamed downloads, and the performance work that actually moved the needle, including the optimization I had to revert.',
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

export const EMAIL = 'usekiko@hypamail.me'
