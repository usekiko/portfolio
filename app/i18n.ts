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
      'project-hypamail': 'Burner email service — disposable inboxes, no signup.',
    },
    blogTitles: {
      'blog-1': {
        title: 'Why I Build for the Web',
        description: 'My journey into web development — what drives me to build products, and why privacy and performance matter.',
      },
      'blog-2': {
        title: 'Why My Node App Hands Work to Go and Erlang',
        description: 'Hypastack runs three sidecar services alongside Next.js — two in Go, one in Erlang/OTP. What each one does and why Node was the wrong place for it.',
      },
      'blog-3': {
        title: 'Five Bugs That Bit Me While Building Hypastack',
        description: 'A cached rejected promise, modulo bias in ID generation, stored XSS on my own CDN, and two features that were never reachable.',
      },
      'blog-4': {
        title: 'Building a High-Performance CDN with Cloudflare R2',
        description: 'Browser-side AES-256-GCM, presigned direct-to-R2 uploads, resumable multipart, and an edge worker that blocks everything by default.',
      },
      'blog-5': {
        title: 'The End of the Loading Spinner',
        description: 'Skeletons, streamed downloads, and the performance work that actually moved the needle — including the optimization I had to revert.',
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
      'project-hypamail': 'Tymczasowa poczta e-mail — jednorazowe skrzynki, bez rejestracji.',
    },
    blogTitles: {
      'blog-1': {
        title: 'Dlaczego Tworzę dla Webu',
        description: 'Moja droga w web development — co motywuje mnie do tworzenia produktów i dlaczego prywatność i wydajność mają znaczenie.',
      },
      'blog-2': {
        title: 'Dlaczego Mój Node Oddaje Pracę Go i Erlangowi',
        description: 'Hypastack uruchamia trzy usługi pomocnicze obok Next.js — dwie w Go, jedną w Erlang/OTP. Co robi każda z nich i dlaczego Node był złym miejscem na te zadania.',
      },
      'blog-3': {
        title: 'Pięć Błędów, Które Popełniłem przy Hypastack',
        description: 'Zbuforowane odrzucone Promise, bias modulo w generowaniu ID, stored XSS na własnym CDN i dwie funkcje, do których nie dało się dotrzeć.',
      },
      'blog-4': {
        title: 'Budowanie Wydajnego CDN z Cloudflare R2',
        description: 'AES-256-GCM po stronie przeglądarki, presigned uploady prosto do R2, wznawialny multipart i edge worker blokujący wszystko domyślnie.',
      },
      'blog-5': {
        title: 'Koniec ze Spinnerami Ładowania',
        description: 'Skeletony, strumieniowane pobieranie i optymalizacje, które naprawdę zrobiły różnicę — łącznie z tą, którą musiałem cofnąć.',
      },
    },
  },
}

/**
 * Membership must be tested against SUPPORTED_LOCALES, not `locale in
 * translations` — the `in` operator walks the prototype chain, so "toString",
 * "constructor", "__proto__" etc. would all resolve to inherited members.
 */
export function isSupportedLocale(locale: string): locale is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale)
}

export function getTranslations(locale: string): Translations {
  return isSupportedLocale(locale) ? translations[locale] : translations.en
}
