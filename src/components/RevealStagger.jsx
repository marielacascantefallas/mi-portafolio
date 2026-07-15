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

    const timer = setTimeout(() => {
      const els = itemsRef.current.filter(Boolean)
      if (!els.length) return

      gsap.set(els, { autoAlpha: 0, y })

      gsap.to(els, {
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
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(timer)
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
