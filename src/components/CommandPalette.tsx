import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ui } from '../data/content'
import { usePrefs } from '../prefs'

export type Command = { id: string; group: string; label: string; run: () => void }

export default function CommandPalette({
  open,
  commands,
  onClose,
}: {
  open: boolean
  commands: Command[]
  onClose: () => void
}) {
  const { t } = usePrefs()
  const dialog = useRef<HTMLDialogElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (open) dialog.current?.showModal()
    else dialog.current?.close()
  }, [open])

  const close = () => {
    setQuery('')
    setSelected(0)
    onClose()
  }

  const normalize = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
  const results = commands.filter((c) => normalize(`${c.group} ${c.label}`).includes(normalize(query)))

  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  const run = (command: Command | undefined) => {
    if (!command) return
    close()
    command.run()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((i) => (i + 1) % Math.max(results.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((i) => (i - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[selected])
    }
  }

  return (
    <dialog
      ref={dialog}
      className="palette"
      onClose={close}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="palette-box" onKeyDown={onKeyDown}>
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelected(0)
          }}
          placeholder={t(ui.palette.placeholder)}
          aria-label={t(ui.palette.placeholder)}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
        />
        <ul id="palette-list" role="listbox" ref={list}>
          {results.length === 0 && <li className="palette-empty">{t(ui.palette.empty)}</li>}
          {results.map((c, i) => (
            <li
              key={c.id}
              role="option"
              aria-selected={i === selected}
              onMouseMove={() => setSelected(i)}
              onClick={() => run(c)}
            >
              <span className="palette-group">{c.group}</span>
              {c.label}
            </li>
          ))}
        </ul>
        <div className="palette-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> {t(ui.palette.hint)}
          </span>
          <span>
            <kbd>Enter</kbd> <kbd>Esc</kbd>
          </span>
        </div>
      </div>
    </dialog>
  )
}
