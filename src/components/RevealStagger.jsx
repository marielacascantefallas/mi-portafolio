import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Same fade + scroll reveal pattern as Reveal.jsx, but for a group of
// sibling items (cards, chips, screen groups) that should stagger in
// together — mirrors the stagger approach already used in Projects.jsx.
export default function RevealStagger({
  items,
  renderItem,
  className,
  itemClassName,
  y = 30,
  stagger = 0.1,
  start = 'top 85%',
}) {
  const containerRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const els = itemsRef.current.filter(Boolean)
    if (!els.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Hide immediately, not inside the timer below — otherwise an item
    // already in view at mount briefly renders at full opacity before the
    // timer fires and hides it, a visible flash right before it fades in.
    gsap.set(els, { autoAlpha: 0, y })

    let tween
    const timer = setTimeout(() => {
      tween = gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
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
  }, [y, stagger, start])

  return (
    <div ref={containerRef} className={className}>
      {items.map((item, i) => (
        <div
          key={item.key ?? i}
          ref={(el) => (itemsRef.current[i] = el)}
          className={itemClassName}
        >
          {renderItem(item, i)}
        </div>
      ))}
    </div>
  )
}
