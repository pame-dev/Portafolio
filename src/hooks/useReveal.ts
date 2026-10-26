import { useEffect } from 'react'

// Agrega la clase `in` a cada elemento `.reveal` la primera vez que entra en pantalla.
export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
