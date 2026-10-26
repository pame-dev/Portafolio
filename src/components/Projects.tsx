import { useEffect, useLayoutEffect, useRef, type PointerEvent } from 'react'
import { projects, ui, type Media, type Project } from '../data/content'
import { prefersReducedMotion, usePrefs } from '../prefs'
import type { Zoomable } from './Lightbox'
import SectionHead from './SectionHead'

type Zoom = (item: Zoomable) => void

// Elige qué se muestra en grande en la tarjeta; el resto queda como miniaturas.
function splitMedia(media: Media[]) {
  const video = media.find((m) => m.kind === 'video')
  if (video) return { stage: [video], extra: media.filter((m) => m !== video) }
  const phones = media.filter((m) => m.kind === 'image' && m.frame === 'phone').slice(0, 2)
  if (phones.length) return { stage: phones, extra: media.filter((m) => !phones.includes(m)) }
  return { stage: media.slice(0, 1), extra: media.slice(1) }
}

function Stage({ project, media, onZoom }: { project: Project; media: Media[]; onZoom: Zoom }) {
  const { t } = usePrefs()
  const first = media[0]

  if (!first) {
    return (
      <div className="stage stage-empty" aria-hidden="true">
        {project.name.slice(0, 2)}
      </div>
    )
  }

  if (first.kind === 'video') {
    return (
      <button className="stage stage-video" onClick={() => onZoom({ ...first, alt: t(first.alt) })}>
        <img src={first.poster} alt={t(first.alt)} loading="lazy" />
        <span className="play">
          <span className="play-icon" aria-hidden="true" />
          {t(ui.play)}
        </span>
      </button>
    )
  }

  if (first.frame === 'phone') {
    return (
      <div className="stage stage-phones">
        {media.map(
          (m) =>
            m.kind === 'image' && (
              <button key={m.src} className="phone" onClick={() => onZoom({ ...m, alt: t(m.alt) })}>
                <img src={m.src} alt={t(m.alt)} loading="lazy" />
              </button>
            ),
        )}
      </div>
    )
  }

  if (first.frame === 'browser') {
    return (
      <button className="stage stage-browser" onClick={() => onZoom({ ...first, alt: t(first.alt) })}>
        <span className="browser">
          <span className="browser-bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <img src={first.src} alt={t(first.alt)} loading="lazy" />
        </span>
      </button>
    )
  }

  return (
    <button className="stage stage-photo" onClick={() => onZoom({ ...first, alt: t(first.alt) })}>
      <img src={first.src} alt={t(first.alt)} loading="lazy" />
    </button>
  )
}

// El brillo del borde sigue al cursor.
function trackPointer(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function Projects({ onZoom }: { onZoom: Zoom }) {
  const { lens, t, fits } = usePrefs()
  const items = useRef(new Map<string, HTMLLIElement>())
  const lastTop = useRef(new Map<string, number>())

  // Los proyectos que coinciden con el enfoque suben al principio.
  const ordered = [...projects].sort((a, b) => Number(fits(b.roles)) - Number(fits(a.roles)))
  const matches = ordered.filter((p) => fits(p.roles)).length

  // FLIP: cada tarjeta parte de donde estaba y se desliza a su nuevo lugar.
  useLayoutEffect(() => {
    const animate = !prefersReducedMotion()
    items.current.forEach((el, id) => {
      const top = el.offsetTop
      const before = lastTop.current.get(id)
      if (animate && before !== undefined && before !== top) {
        el.animate([{ transform: `translateY(${before - top}px)` }, { transform: 'none' }], {
          duration: 700,
          easing: 'cubic-bezier(.2,.8,.2,1)',
        })
      }
      lastTop.current.set(id, top)
    })
  }, [lens])

  useEffect(() => {
    const measure = () => items.current.forEach((el, id) => lastTop.current.set(id, el.offsetTop))
    const observer = new ResizeObserver(measure)
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" className="section">
      <SectionHead index="01" title={t(ui.workTitle)}>
        <span className="count">
          {String(matches).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} {t(ui.matches)}
        </span>
      </SectionHead>

      <ol className="projects">
        {ordered.map((p, i) => {
          const { stage, extra } = splitMedia(p.media ?? [])
          return (
            <li
              key={p.id}
              ref={(el) => {
                if (el) items.current.set(p.id, el)
                else items.current.delete(p.id)
              }}
              className={`card reveal${fits(p.roles) ? '' : ' dim'}`}
              onPointerMove={trackPointer}
            >
              <Stage project={p} media={stage} onZoom={onZoom} />
              <div className="card-body">
                <div className="card-top">
                  <span className="index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="meta">
                    {t(p.context)} · {p.year}
                  </span>
                </div>
                <h3>{p.name}</h3>
                <p>{t(p.summary)}</p>
                <ul className="stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                {extra.length > 0 && (
                  <div className="thumbs" aria-label={t(ui.more)}>
                    {extra.map(
                      (m) =>
                        m.kind === 'image' && (
                          <button key={m.src} className="thumb" onClick={() => onZoom({ ...m, alt: t(m.alt) })}>
                            <img src={m.src} alt={t(m.alt)} loading="lazy" />
                          </button>
                        ),
                    )}
                  </div>
                )}
                <div className="card-links">
                  <a href={p.repo} target="_blank" rel="noreferrer" className="link-btn">
                    {t(ui.code)} <span aria-hidden="true">↗</span>
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="link-btn primary">
                      {t(ui.live)} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
