import { useEffect, useRef, useState } from 'react'
import {
  background,
  certifications,
  lenses,
  profile,
  projects,
  skillGroups,
  ui,
  type Lang,
  type Lens,
} from './data/content'

type Theme = 'light' | 'dark'

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

const initialTheme = (): Theme =>
  stored<Theme>(
    'theme',
    ['light', 'dark'],
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )

export default function App() {
  const [lang, setLang] = useState<Lang>(() => stored<Lang>('lang', ['es', 'en'], 'es'))
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [lens, setLens] = useState<Lens>('all')
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (zoom) dialog.current?.showModal()
    else dialog.current?.close()
  }, [zoom])

  useEffect(() => {
    document.documentElement.lang = lang
    remember('lang', lang)
  }, [lang])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    remember('theme', theme)
  }, [theme])

  const t = (text: Record<Lang, string>) => text[lang]
  const active = lenses.find((l) => l.id === lens)!
  const fits = (roles: string[]) => lens === 'all' || roles.includes(lens)
  const matchCount = projects.filter((p) => fits(p.roles)).length

  return (
    <>
      <header className="nav">
        <a href="#top" className="mark" aria-label={profile.name}>
          PR<span>.</span>
        </a>
        <nav className="nav-links">
          <a href="#work">{t(ui.nav.work)}</a>
          <a href="#skills">{t(ui.nav.skills)}</a>
          <a href="#certs">{t(ui.nav.certs)}</a>
          <a href="#path">{t(ui.nav.path)}</a>
          <a href="#contact">{t(ui.nav.contact)}</a>
        </nav>
        <div className="nav-tools">
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
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-top">
            <img className="avatar" src="/media/pamela.webp" alt={t(ui.photoAlt)} />
            <p className="status">
              <span className="dot" aria-hidden="true" />
              {t(ui.status)} · {t(ui.location)}
            </p>
          </div>
          <h1>
            {profile.name}
            <span className="hero-tag" key={lens + lang}>
              {t(active.headline)}
            </span>
          </h1>
          <p className="pitch" key={'p' + lens + lang}>
            {t(active.pitch)}
          </p>

          <div className="lens">
            <span className="lens-label">{t(ui.lensLabel)}</span>
            <div className="lens-switch" role="radiogroup" aria-label={t(ui.lensLabel)}>
              {lenses.map((l) => (
                <button
                  key={l.id}
                  role="radio"
                  aria-checked={lens === l.id}
                  onClick={() => setLens(l.id)}
                >
                  {t(l.label)}
                </button>
              ))}
            </div>
            <span className="lens-hint">{t(ui.lensHint)}</span>
          </div>
        </section>

        <section id="work" className="section">
          <div className="section-head">
            <h2>{t(ui.workTitle)}</h2>
            <span className="count">
              {String(matchCount).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}{' '}
              {t(ui.matches)}
            </span>
          </div>
          <ol className="projects">
            {projects.map((p, i) => (
              <li key={p.id} className={fits(p.roles) ? 'project' : 'project dim'}>
                <span className="index">{String(i + 1).padStart(2, '0')}</span>
                <div className="project-main">
                  <div className="project-title">
                    <h3>{p.name}</h3>
                    <span className="meta">
                      {t(p.context)} · {p.year}
                    </span>
                  </div>
                  <p>{t(p.summary)}</p>
                  <ul className="stack">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  {p.media && (
                    <div className="media">
                      {p.media.map((item) =>
                        item.kind === 'video' ? (
                          <video
                            key={item.src}
                            src={item.src}
                            poster={item.poster}
                            controls
                            playsInline
                            preload="none"
                            aria-label={t(item.alt)}
                          />
                        ) : (
                          <button
                            key={item.src}
                            className="thumb"
                            onClick={() => setZoom({ src: item.src, alt: t(item.alt) })}
                          >
                            <img src={item.src} alt={t(item.alt)} loading="lazy" />
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>
                <div className="project-links">
                  <a href={p.repo} target="_blank" rel="noreferrer">
                    {t(ui.code)} ↗
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer">
                      {t(ui.live)} ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="skills" className="section">
          <div className="section-head">
            <h2>{t(ui.skillsTitle)}</h2>
          </div>
          <div className="skills">
            {skillGroups.map((g) => (
              <div key={g.title.es} className="skill-group">
                <h3>{t(g.title)}</h3>
                <ul>
                  {g.items.map((s) => (
                    <li key={s.name} className={lens !== 'all' && fits(s.roles) ? 'on' : ''}>
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="certs" className="section">
          <div className="section-head">
            <h2>{t(ui.certsTitle)}</h2>
            <span className="count">{String(certifications.length).padStart(2, '0')}</span>
          </div>
          <ul className="certs">
            {certifications.map((c) => (
              <li key={c.title} className={fits(c.roles) ? 'cert' : 'cert dim'}>
                <button
                  className="cert-image"
                  onClick={() => setZoom({ src: c.image, alt: `${c.title} · ${c.issuer}` })}
                >
                  <img src={c.image} alt={`${c.title} · ${c.issuer}`} loading="lazy" />
                </button>
                <h3>{c.title}</h3>
                <span className="meta">
                  {c.issuer} · {t(c.date)}
                  {c.hours && ` · ${c.hours}`}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section id="path" className="section">
          <div className="section-head">
            <h2>{t(ui.pathTitle)}</h2>
          </div>
          <ol className="timeline">
            {background.map((b) => (
              <li key={b.title.es}>
                <span className="period">{b.period}</span>
                <div>
                  <h3>{t(b.title)}</h3>
                  <span className="meta">{t(b.place)}</span>
                  <p>{t(b.detail)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="section contact">
          <h2>{t(ui.contactTitle)}</h2>
          <p>{t(ui.contactText)}</p>
          <div className="contact-links">
            {profile.email && <a href={`mailto:${profile.email}`}>{profile.email} ↗</a>}
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.fullName}</span>
        <span>{t(ui.footer)}</span>
      </footer>

      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => setZoom(null)}
        onClick={(e) => e.target === e.currentTarget && setZoom(null)}
      >
        {zoom && <img src={zoom.src} alt={zoom.alt} />}
        <button className="lightbox-close" onClick={() => setZoom(null)} aria-label={t(ui.close)}>
          ×
        </button>
      </dialog>
    </>
  )
}
