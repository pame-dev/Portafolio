import { useEffect, useRef } from 'react'
import { prefersReducedMotion, usePrefs } from '../prefs'

const GAP = 26
const RADIUS = 170

// Rejilla de puntos en canvas: se mueve como una ola suave y se aparta del cursor.
export default function DotField() {
  const { theme } = usePrefs()
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const css = getComputedStyle(document.documentElement)
    const ink = css.getPropertyValue('--dot').trim()
    const accent = css.getPropertyValue('--accent').trim()
    const still = prefersReducedMotion()

    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    const pointer = { x: -1e4, y: -1e4 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(devicePixelRatio, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const dist = Math.hypot(dx, dy) || 1
          const near = Math.max(0, 1 - dist / RADIUS)
          const wave = still ? 0 : Math.sin(x * 0.018 + time * 0.0011) + Math.cos(y * 0.022 + time * 0.0009)
          const push = near * near * 14
          ctx.globalAlpha = 0.45 + near * 0.55
          ctx.fillStyle = near > 0.04 ? accent : ink
          ctx.beginPath()
          ctx.arc(x + (dx / dist) * push, y + (dy / dist) * push, 1 + wave * 0.18 + near * 2.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = (time: number) => {
      draw(time)
      if (visible && !still) frame = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      if (still) draw(0)
    }

    const onLeave = () => {
      pointer.x = pointer.y = -1e4
      if (still) draw(0)
    }

    // Solo anima mientras el hero está en pantalla.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible) frame = requestAnimationFrame(loop)
    })

    resize()
    draw(0)
    observer.observe(canvas)
    addEventListener('resize', resize)
    addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      removeEventListener('resize', resize)
      removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [theme])

  return <canvas ref={ref} className="dotfield" aria-hidden="true" />
}
