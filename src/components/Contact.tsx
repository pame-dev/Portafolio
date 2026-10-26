import { profile, ui } from '../data/content'
import { usePrefs } from '../prefs'

export default function Contact({ onCopy }: { onCopy: () => void }) {
  const { t } = usePrefs()

  return (
    <section id="contact" className="section contact">
      <span className="section-index reveal">05</span>
      <h2 className="reveal">{t(ui.contactTitle)}</h2>
      <p className="reveal">{t(ui.contactText)}</p>
      {profile.email && (
        <div className="email-row reveal">
          <a className="email" href={`mailto:${profile.email}`}>
            {profile.email}
            <span aria-hidden="true">↗</span>
          </a>
          <button className="link-btn" onClick={onCopy}>
            {t(ui.copy)}
          </button>
        </div>
      )}
      <div className="contact-links reveal">
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </div>
    </section>
  )
}
