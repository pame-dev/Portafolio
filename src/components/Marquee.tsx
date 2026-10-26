import { skillGroups } from '../data/content'

const items = skillGroups.slice(0, 3).flatMap((g) => g.items.map((s) => s.name))

// Cinta infinita: la lista va duplicada para que el ciclo no tenga saltos.
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((name, i) => (
          <span key={i}>{name}</span>
        ))}
      </div>
    </div>
  )
}
