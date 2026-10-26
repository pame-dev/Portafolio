import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { certifications, lenses, profile, projects, ui } from '../data/content'
import { prefersReducedMotion, usePrefs } from '../prefs'
import DotField from './DotField'

function CountUp({ to, pad = 2 }: { to: number; pad?: number }) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? to : 0))
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1200)
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    observer.observe(ref.current!)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to])

  return <span ref={ref}>{String(value).padStart(pad, '0')}</span>
}

function LensSwitch() {
  const { lens, setLens, lang, t } = usePrefs()
  const group = useRef<HTMLDivElement>(null)
  const [pill, setPill] = useState({ left: 0, width: 0 })

  // La píldora de color se desliza hasta el botón activo.
  useLayoutEffect(() => {
    const place = () => {
      const button = group.current?.querySelector<HTMLElement>('[aria-checked="true"]')
      if (button) setPill({ left: button.offsetLeft, width: button.offsetWidth })
    }
    place()
    addEventListener('resize', place)
    document.fonts?.ready.then(place)
    return () => removeEventListener('resize', place)
  }, [lens, lang])

  return (
    <div className="lens reveal">
      <span className="lens-label">{t(ui.lensLabel)}</span>
      <div className="lens-switch" role="radiogroup" aria-label={t(ui.lensLabel)} ref={group}>
        <span className="lens-pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width }} />
        {lenses.map((l) => (
          <button key={l.id} role="radio" aria-checked={lens === l.id} onClick={() => setLens(l.id)}>
            {t(l.label)}
          </button>
        ))}
      </div>
      <span className="lens-hint">{t(ui.lensHint)}</span>
    </div>
  )
}

export default function Hero() {
  const { lens, lang, t } = usePrefs()
  const active = lenses.find((l) => l.id === lens)!
  const words = profile.name.split(' ')

  return (
    <section className="hero" id="top">
      <DotField />
      <div className="hero-content">
        <div className="hero-top reveal">
          <img className="avatar" src="/media/pamela.webp" alt={t(ui.photoAlt)} />
          <p className="status">
            <span className="dot" aria-hidden="true" />
            {t(ui.status)} · {t(ui.location)}
          </p>
        </div>

        <h1 aria-label={profile.name}>
          {words.map((word, w) => (
            <span className="word" key={word} aria-hidden="true">
              {[...word].map((ch, i) => (
                <span className="char" key={i} style={{ animationDelay: `${(w * 7 + i) * 35}ms` }}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-tag" key={lens + lang}>
          {t(active.headline)}
        </p>
        <p className="pitch" key={'p' + lens + lang}>
          {t(active.pitch)}
        </p>

        <LensSwitch />

        <dl className="stats reveal">
          <div>
            <dt>{t(ui.stats.projects)}</dt>
            <dd>
              <CountUp to={projects.length} />
            </dd>
          </div>
          <div>
            <dt>{t(ui.stats.certs)}</dt>
            <dd>
              <CountUp to={certifications.length} />
            </dd>
          </div>
          <div>
            <dt>{t(ui.stats.semester)}</dt>
            <dd>
              <CountUp to={5} pad={1} />°
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
