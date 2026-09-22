/** Runs before paint so the system theme never flashes. */
export const themeScript = `try{if(matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark')}catch(_){}`
