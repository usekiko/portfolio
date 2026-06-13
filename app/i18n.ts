export const SUPPORTED_LOCALES = ['en', 'pl'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

type Translations = {
  heroTitle: string
  heroDescription: string
  heroHypastackSuffix: string
  sectionPrivacy: string
  sectionPersonal: string
  sectionExperience: string
  sectionBlog: string
  sectionConnect: string
  connectDescription: string
  workTitles: Record<string, string>
  projectDescriptions: Record<string, string>
  personalProjectDescriptions: Record<string, string>
  blogTitles: Record<string, { title: string; description: string }>
}

export const translations: Record<Locale, Translations> = {
  en: {
    heroTitle: 'Backend systems that simply work.',
    heroDescription: 'Building products that prioritize privacy and performance. Currently working on',
    heroHypastackSuffix: '— a secure file sharing platform with built-in CDN.',
    sectionPrivacy: 'Privacy-Focused Web Projects',
    sectionPersonal: 'Personal',
    sectionExperience: 'Full-Stack Development Experience',
    sectionBlog: 'Technical Writing',
    sectionConnect: 'Connect with Kiko',
    connectDescription: 'Open to freelance work and collaborations. Reach out at',
    workTitles: {
      'work-hypastack': 'Founder & Lead Developer',
      'work-freelance': 'Full-Stack Web Development',
    },
    projectDescriptions: {
      'project-hypastack': 'Privacy-focused file sharing SaaS with a built-in CDN. Encrypted, fast, temporary.',
    },
    personalProjectDescriptions: {
      'project-usekiko': 'My personal portfolio — the site you\'re on right now.',
      'project-sugarpetal': 'Pastry website example, sweet, clean UI.',
    },
    blogTitles: {
      'blog-1': {
        title: 'Why I Build for the Web',
        description: 'My journey into web development — what drives me to build products, and why privacy and performance matter.',
      },
      'blog-2': {
        title: 'Building a High-Performance CDN with Cloudflare R2',
        description: 'How I architected the file storage and distribution system for Hypastack.',
      },
      'blog-3': {
        title: 'The End of the Loading Spinner',
        description: 'Aggressive caching, eager loading, and how to make the web feel instantaneous.',
      },
      'blog-4': {
        title: 'How to Export Metadata from MDX for Next.js SEO',
        description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
      },
    },
  },
  pl: {
    heroTitle: 'Systemy backendowe, które po prostu działają.',
    heroDescription: 'Tworzę produkty, w których priorytetem jest prywatność i wydajność. Obecnie pracuję nad',
    heroHypastackSuffix: '— bezpieczną platformą do udostępniania plików z wbudowanym CDN.',
    sectionPrivacy: 'Projekty Webowe z Naciskiem na Prywatność',
    sectionPersonal: 'Osobiste',
    sectionExperience: 'Doświadczenie w Full-Stack Development',
    sectionBlog: 'Pisanie Techniczne',
    sectionConnect: 'Skontaktuj się z Kiko',
    connectDescription: 'Otwarty na zlecenia freelance i współpracę. Napisz na',
    workTitles: {
      'work-hypastack': 'Założyciel i Główny Developer',
      'work-freelance': 'Full-Stack Web Development',
    },
    projectDescriptions: {
      'project-hypastack': 'SaaS do udostępniania plików z naciskiem na prywatność i wbudowanym CDN. Szyfrowany, szybki, tymczasowy.',
    },
    personalProjectDescriptions: {
      'project-usekiko': 'Moje osobiste portfolio — strona, na której właśnie jesteś.',
      'project-sugarpetal': 'Przykładowa strona cukierni, słodki, czysty UI.',
    },
    blogTitles: {
      'blog-1': {
        title: 'Dlaczego Tworzę dla Webu',
        description: 'Moja droga w web development — co motywuje mnie do tworzenia produktów i dlaczego prywatność i wydajność mają znaczenie.',
      },
      'blog-2': {
        title: 'Budowanie Wydajnego CDN z Cloudflare R2',
        description: 'Jak zaprojektowałem system przechowywania i dystrybucji plików dla Hypastack.',
      },
      'blog-3': {
        title: 'Koniec ze Spinnerami Ładowania',
        description: 'Agresywne cache\'owanie, eager loading i jak sprawić, by web działał natychmiastowo.',
      },
      'blog-4': {
        title: 'Jak Eksportować Metadane z MDX dla Next.js SEO',
        description: 'Poradnik eksportowania metadanych z plików MDX, by wykorzystać funkcje SEO w Next.js.',
      },
    },
  },
}

export function getTranslations(locale: string): Translations {
  if (locale in translations) {
    return translations[locale as Locale]
  }
  return translations.en
}
