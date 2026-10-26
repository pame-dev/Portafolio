import { background, ui } from '../data/content'
import { usePrefs } from '../prefs'
import SectionHead from './SectionHead'

export default function Timeline() {
  const { t } = usePrefs()

  return (
    <section id="path" className="section">
      <SectionHead index="04" title={t(ui.pathTitle)} />
      <ol className="timeline">
        {background.map((b) => (
          <li key={b.title.es} className="reveal">
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
  )
}
