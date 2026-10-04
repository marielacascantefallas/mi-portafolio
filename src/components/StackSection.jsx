import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StackSection.css'

gsap.registerPlugin(ScrollTrigger)

// Wraps one top-level section (Hero, About, Projects, Contact) in the
// sticky-card mechanism that makes each section pin at the top and get
// covered by the next one sliding up over it — pure CSS (position: sticky +
// z-index + overlapping wrappers, see StackSection.css), no JS
// scroll-hijacking. The trailing spacer gives every section exactly one
// viewport of dwell/overlap room regardless of its own content height, so
// a section taller than a viewport still gets a proper dwell at the end of
// its own content instead of none, and a short section doesn't get an
// oversized fixed budget that rushes past content near the end.
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

    let tween
    const timer = setTimeout(() => {
      tween = gsap.to(el, {
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
      // No ScrollTrigger.refresh() here: GSAP already measures a new
      // trigger when it's created, and refreshes on its own on `load` and
      // `resize`. Every section calling refresh() in this same 100ms batch
      // added up to ~10 redundant full-page remeasures (each one a forced
      // layout read on every trigger) at mount and on every return from a
      // case study.
    }, 100)

    return () => {
      clearTimeout(timer)
      // If this section is torn down (e.g. route change) before its
      // entrance ever fired, kill the tween and its trigger instead of
      // leaving them registered against a detached node.
      tween?.scrollTrigger?.kill()
      tween?.kill()
    }
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
      <div className="stack-section__spacer" aria-hidden="true" />
    </div>
  )
}
