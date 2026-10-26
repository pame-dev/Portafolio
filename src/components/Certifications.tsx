import { certifications, ui } from '../data/content'
import { usePrefs } from '../prefs'
import type { Zoomable } from './Lightbox'
import SectionHead from './SectionHead'

export default function Certifications({ onZoom }: { onZoom: (item: Zoomable) => void }) {
  const { t, fits } = usePrefs()

  return (
    <section id="certs" className="section">
      <SectionHead index="03" title={t(ui.certsTitle)}>
        <span className="count">{String(certifications.length).padStart(2, '0')}</span>
      </SectionHead>
      <ul className="certs">
        {certifications.map((c, i) => {
          const alt = `${c.title} · ${c.issuer}`
          return (
            <li
              key={c.title}
              className={`cert reveal${fits(c.roles) ? '' : ' dim'}`}
              style={{ transitionDelay: `${(i % 3) * 70}ms` }}
            >
              <button className="cert-image" onClick={() => onZoom({ kind: 'image', src: c.image, alt })}>
                <img src={c.image} alt={alt} loading="lazy" />
              </button>
              <h3>{c.title}</h3>
              <span className="meta">
                {c.issuer} · {t(c.date)}
                {c.hours && ` · ${c.hours}`}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
