import type { ReactNode } from 'react'

export default function SectionHead({ index, title, children }: { index: string; title: string; children?: ReactNode }) {
  return (
    <div className="section-head reveal">
      <div>
        <span className="section-index">{index}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  )
}
