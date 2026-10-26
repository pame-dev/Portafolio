import { createContext, useContext } from 'react'
import type { Lang, Lens, Role } from './data/content'

export type Theme = 'light' | 'dark'

export type Prefs = {
  lang: Lang
  setLang: (lang: Lang) => void
  theme: Theme
  toggleTheme: (origin?: { x: number; y: number }) => void
  lens: Lens
  setLens: (lens: Lens) => void
  t: (text: Record<Lang, string>) => string
  fits: (roles: Role[]) => boolean
}

export const PrefsContext = createContext<Prefs | null>(null)

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export function usePrefs() {
  const prefs = useContext(PrefsContext)
  if (!prefs) throw new Error('usePrefs debe usarse dentro de <PrefsProvider>')
  return prefs
}
