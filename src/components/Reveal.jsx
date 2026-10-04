import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Shared fade + scroll reveal wrapper, matching the animation pattern already
// used across the site (About.jsx / Projects.jsx): gsap.set for the hidden
// state, then a gsap.to driven by ScrollTrigger once the element enters the
// viewport. Centralizing it here keeps every new section consistent without
// introducing a new animation technique.
export default function Reveal({
  children,
  as: Tag = 'div',
  y = 40,
  duration = 0.6,
  delay = 0,
  start = 'top 85%',
  className,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.set(el, { autoAlpha: 0, y })

    let tween
    const timer = setTimeout(() => {
      tween = gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
      // No ScrollTrigger.refresh() — GSAP measures a new trigger when it's
      // created and already refreshes on load/resize on its own.
    }, 100)

    return () => {
      clearTimeout(timer)
      tween?.scrollTrigger?.kill()
      tween?.kill()
    }
  }, [y, duration, delay, start])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
