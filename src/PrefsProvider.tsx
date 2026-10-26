import { useEffect, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import type { Lang, Lens } from './data/content'
import { PrefsContext, prefersReducedMotion, type Prefs, type Theme } from './prefs'

function stored<V extends string>(key: string, allowed: V[], fallback: V): V {
  try {
    const value = localStorage.getItem(key) as V | null
    return value && allowed.includes(value) ? value : fallback
  } catch {
    return fallback
  }
}

function remember(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Sin almacenamiento disponible: la preferencia solo dura esta visita.
  }
}

export default function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => stored<Lang>('lang', ['es', 'en'], 'es'))
  const [theme, setTheme] = useState<Theme>(() =>
    stored<Theme>('theme', ['light', 'dark'], matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  )
  const [lens, setLens] = useState<Lens>('all')

  useEffect(() => {
    document.documentElement.lang = lang
    remember('lang', lang)
  }, [lang])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    remember('theme', theme)
  }, [theme])

  // El tema nuevo se revela en un círculo que crece desde donde se hizo clic.
  const toggleTheme = (origin?: { x: number; y: number }) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    if (!document.startViewTransition || prefersReducedMotion()) {
      setTheme(next)
      return
    }
    const x = origin?.x ?? innerWidth / 2
    const y = origin?.y ?? innerHeight / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  const value: Prefs = {
    lang,
    setLang,
    theme,
    toggleTheme,
    lens,
    setLens,
    t: (text) => text[lang],
    fits: (roles) => lens === 'all' || roles.includes(lens),
  }

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
}
