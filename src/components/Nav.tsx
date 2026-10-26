import type { Lang } from '../data/content'
import { profile, ui } from '../data/content'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { usePrefs } from '../prefs'

const SECTIONS = ['work', 'skills', 'certs', 'path', 'contact'] as const

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { lang, setLang, theme, toggleTheme, t } = usePrefs()
  const active = useScrollSpy(SECTIONS as unknown as string[])
  const mac = /Mac|iPhone|iPad/.test(navigator.platform)

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="mark" aria-label={profile.name}>
          PR<span>.</span>
        </a>
        <nav className="nav-links">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
              {t(ui.nav[id])}
            </a>
          ))}
        </nav>
        <div className="nav-tools">
          <button className="kbd-btn" onClick={onOpenPalette} aria-label={t(ui.palette.open)}>
            <span className="kbd-icon" aria-hidden="true">⌕</span>
            <kbd>{mac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <div className="lang" role="group" aria-label="Idioma / Language">
            {(['es', 'en'] as Lang[]).map((l) => (
              <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="theme"
            aria-label={t(ui.toggleTheme)}
            title={t(ui.toggleTheme)}
            onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {theme === 'dark' ? (
                <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4.2" />
                  <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
                </g>
              ) : (
                <path fill="currentColor" d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
