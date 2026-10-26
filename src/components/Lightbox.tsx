import { useEffect, useRef } from 'react'
import { ui } from '../data/content'
import { usePrefs } from '../prefs'

export type Zoomable =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; poster: string; alt: string }

export default function Lightbox({ item, onClose }: { item: Zoomable | null; onClose: () => void }) {
  const { t } = usePrefs()
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (item) dialog.current?.showModal()
    else dialog.current?.close()
  }, [item])

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {item?.kind === 'image' && <img src={item.src} alt={item.alt} />}
      {item?.kind === 'video' && (
        <video src={item.src} poster={item.poster} controls autoPlay playsInline aria-label={item.alt} />
      )}
      <button className="lightbox-close" onClick={onClose} aria-label={t(ui.close)}>
        ×
      </button>
    </dialog>
  )
}
