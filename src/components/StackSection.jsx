import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StackSection.css'

gsap.registerPlugin(ScrollTrigger)

// Wraps one top-level section (Hero, About, Projects, Contact) in the
// sticky-card mechanism that makes each section pin at the top and get
// covered by the next one sliding up over it — pure CSS (position: sticky +
// z-index + overlapping wrappers, see StackSection.css), no JS
// scroll-hijacking. A section whose own content is taller than the
// wrapper's floor (Projects) just grows past it instead of trapping the
// user inside a pinned viewport.
export default function StackSection({ children, zIndex, background, className = '' }) {
  const innerRef = useRef(null)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Leave the section at its natural, fully-visible state — no entrance
    // animation to respect reduced-motion.
    if (prefersReducedMotion) return

    gsap.set(el, { autoAlpha: 0, y: 48, scale: 0.97 })

    const timer = setTimeout(() => {
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`stack-section ${className}`}>
      {/* Background goes on the sticky element itself — see StackSection.css
          for why the (non-sticky) outer wrapper is the wrong place for it. */}
      <div className="stack-section__sticky" style={{ zIndex, background }}>
        <div ref={innerRef} className="stack-section__inner">
          {children}
        </div>
      </div>
    </div>
  )
}
