import { skillGroups, ui } from '../data/content'
import { usePrefs } from '../prefs'
import SectionHead from './SectionHead'

export default function Skills() {
  const { lens, t, fits } = usePrefs()

  return (
    <section id="skills" className="section">
      <SectionHead index="02" title={t(ui.skillsTitle)} />
      <div className="skills">
        {skillGroups.map((g, i) => (
          <div key={g.title.es} className="skill-group reveal" style={{ transitionDelay: `${i * 60}ms` }}>
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
  )
}
