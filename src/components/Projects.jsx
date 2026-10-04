import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '../data/projects'
import useFillHover from '../hooks/useFillHover'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

// Fan/carousel geometry — reference: proyectos.jpg. Position is expressed as
// signed "steps" from the active card (0 = center/featured); everything
// beyond ±2 collapses into the same far-offscreen slot so the deck always
// reads as "center + 2 near + 2 far", however many projects there are.
const DESKTOP_STEPS = {
  0: { x: 0, rotate: 0, scale: 1, opacity: 1 },
  1: { x: 230, rotate: 9, scale: 0.84, opacity: 0.85 },
  2: { x: 400, rotate: 15, scale: 0.68, opacity: 0.45 },
  far: { x: 520, rotate: 20, scale: 0.55, opacity: 0 },
}

const MOBILE_STEPS = {
  0: { x: 0, rotate: 0, scale: 1, opacity: 1 },
  1: { x: 120, rotate: 8, scale: 0.8, opacity: 0.8 },
  2: { x: 200, rotate: 13, scale: 0.62, opacity: 0.35 },
  far: { x: 260, rotate: 18, scale: 0.5, opacity: 0 },
}

// Shortest signed distance from `index` to `active` around a circle of
// `total` cards, so the deck wraps both directions instead of dead-ending.
function circularDiff(index, active, total) {
  let diff = (index - active + total) % total
  if (diff > total / 2) diff -= total
  return diff
}

function cardStyle(diff, steps, reducedMotion) {
  const abs = Math.min(Math.abs(diff), 2)
  const sign = Math.sign(diff)
  const cfg = Math.abs(diff) <= 2 ? steps[abs] : steps.far
  return {
    transform: `translateX(calc(-50% + ${sign * cfg.x}px)) rotate(${sign * cfg.rotate}deg) scale(${cfg.scale})`,
    opacity: cfg.opacity,
    zIndex: 10 - Math.abs(diff),
    transition: reducedMotion
      ? 'opacity 0.2s ease'
      : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease',
    pointerEvents: Math.abs(diff) <= 2 ? 'auto' : 'none',
  }
}

export default function Projects() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const { ref: ctaRef, onMouseEnter: ctaEnter, onMouseLeave: ctaLeave } = useFillHover()

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(motionMq.matches)
    updateMotion()
    motionMq.addEventListener('change', updateMotion)

    return () => {
      mq.removeEventListener('change', update)
      motionMq.removeEventListener('change', updateMotion)
    }
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.set(el, { autoAlpha: 0, y: 40 })

    const timer = setTimeout(() => {
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      })
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const total = projects.length
  const goTo = useCallback((i) => setActiveIndex(((i % total) + total) % total), [total])
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); goNext() }
  }

  const active = projects[activeIndex]
  const hasCaseStudy = active.link && active.link.startsWith('/')
  const isExternal = active.link && /^https?:\/\//.test(active.link)
  const steps = isMobile ? MOBILE_STEPS : DESKTOP_STEPS

  return (
    <section id="projects" className="section projects" ref={sectionRef}>
      <h2 className="sr-only">Projects</h2>

      <div
        className="projects__deck"
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {projects.map((p, i) => {
          const diff = circularDiff(i, activeIndex, total)
          const isActive = diff === 0

          return (
            <button
              key={p.id}
              type="button"
              className="projects__card"
              style={cardStyle(diff, steps, reducedMotion)}
              onClick={() => goTo(i)}
              aria-label={`Show ${p.title}`}
              aria-current={isActive}
            >
              {p.image ? (
                <img src={p.image} alt="" loading="lazy" />
              ) : (
                <div
                  className="projects__card-placeholder"
                  style={p.placeholderGradient ? { background: p.placeholderGradient } : undefined}
                />
              )}
            </button>
          )
        })}

        <button
          type="button"
          className="projects__nav projects__nav--prev"
          onClick={goPrev}
          aria-label="Previous project"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className="projects__nav projects__nav--next"
          onClick={goNext}
          aria-label="Next project"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="projects__info">
        <div className="projects__title-row">
          <h3 className="projects__title">{active.title}</h3>
          {active.comingSoon && (
            <span className="projects__badge">Coming Soon</span>
          )}
        </div>

        <p className="projects__desc">{active.description}</p>

        <div className="projects__tags">
          {active.tags.map((tag) => (
            <span key={tag} className="projects__tag">{tag}</span>
          ))}
        </div>

        {hasCaseStudy && (
          <Link
            ref={ctaRef}
            onMouseEnter={ctaEnter}
            onMouseLeave={ctaLeave}
            to={active.link}
            className="projects__cta btn-fill"
          >
            View case study
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        )}
        {isExternal && (
          <a
            ref={ctaRef}
            onMouseEnter={ctaEnter}
            onMouseLeave={ctaLeave}
            href={active.link}
            target="_blank"
            rel="noopener noreferrer"
            className="projects__cta btn-fill"
          >
            Visit site
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        )}
        {active.comingSoon && (
          <span className="projects__cta projects__cta--disabled">
            Coming soon
          </span>
        )}
      </div>
    </section>
  )
}
