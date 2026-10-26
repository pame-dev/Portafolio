import { useEffect, useRef, useState } from 'react'
import CommandPalette, { type Command } from './components/CommandPalette'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Hero from './components/Hero'
import Lightbox, { type Zoomable } from './components/Lightbox'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import { lenses, profile, ui } from './data/content'
import { useReveal } from './hooks/useReveal'
import PrefsProvider from './PrefsProvider'
import { usePrefs } from './prefs'

const YEAR = new Date().getFullYear()

function Page() {
  const { lang, setLang, toggleTheme, setLens, t } = usePrefs()
  const [zoom, setZoom] = useState<Zoomable | null>(null)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef(0)

  useReveal()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  const notify = (message: string) => {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2200)
  }

  const copyEmail = () => {
    navigator.clipboard?.writeText(profile.email).then(() => notify(t(ui.copied)))
  }

  const goTo = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const commands: Command[] = [
    ...(['work', 'skills', 'certs', 'path', 'contact'] as const).map((id) => ({
      id: `go-${id}`,
      group: t(ui.palette.goTo),
      label: t(ui.nav[id]),
      run: goTo(id),
    })),
    ...lenses.map((l) => ({
      id: `lens-${l.id}`,
      group: t(ui.palette.focus),
      label: t(l.label),
      run: () => {
        setLens(l.id)
        goTo('work')()
      },
    })),
    { id: 'lang', group: '⚙', label: t(ui.palette.lang), run: () => setLang(lang === 'es' ? 'en' : 'es') },
    { id: 'theme', group: '⚙', label: t(ui.palette.theme), run: () => toggleTheme() },
    { id: 'copy', group: '✉', label: t(ui.copy), run: copyEmail },
    { id: 'github', group: t(ui.palette.open_), label: 'GitHub', run: () => open(profile.github, '_blank') },
    { id: 'linkedin', group: t(ui.palette.open_), label: 'LinkedIn', run: () => open(profile.linkedin, '_blank') },
  ]

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <Marquee />
        <div className="container">
          <Projects onZoom={setZoom} />
          <Skills />
          <Certifications onZoom={setZoom} />
          <Timeline />
          <Contact onCopy={copyEmail} />
        </div>
      </main>
      <footer className="footer">
        <span>
          © {YEAR} {profile.fullName}
        </span>
        <span>{t(ui.footer)}</span>
      </footer>

      <Lightbox item={zoom} onClose={() => setZoom(null)} />
      <CommandPalette open={paletteOpen} commands={commands} onClose={() => setPaletteOpen(false)} />
      <div className={`toast${toast ? ' show' : ''}`} role="status">
        {toast}
      </div>
    </>
  )
}

export default function App() {
  return (
    <PrefsProvider>
      <Page />
    </PrefsProvider>
  )
}
