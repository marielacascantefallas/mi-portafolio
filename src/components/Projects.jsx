import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '../data/projects'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const rowsRef = useRef([])
  const thumbsRef = useRef([])
  const infosRef = useRef([])

  useEffect(() => {
    // Small delay so Lenis has initialized and layout is stable
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        rowsRef.current.forEach((row, i) => {
          if (!row) return
          const thumb = thumbsRef.current[i]
          const info = infosRef.current[i]
          if (!thumb || !info) return

          const infoChildren = Array.from(info.children)

          // Set initial states via GSAP (not inline styles)
          gsap.set(thumb, { clipPath: 'inset(100% 0 0 0)' })
          gsap.set(infoChildren, { autoAlpha: 0, y: 20 })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              once: true,
            },
          })

          // Image clip-path curtain reveal
          tl.to(thumb, {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            ease: 'power3.out',
          })

          // Text fade-in with delay after image starts
          tl.to(
            infoChildren,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power2.out',
            },
            0.2
          )
        })

        ScrollTrigger.refresh()
      })

      // Store for cleanup
      rowsRef._gsapCtx = ctx
    }, 100)

    return () => {
      clearTimeout(timer)
      if (rowsRef._gsapCtx) rowsRef._gsapCtx.revert()
    }
  }, [])

  return (
    <section id="projects" className="section projects">
      <h2 className="projects__heading">Projects</h2>

      {projects.map((p, i) => {
        const hasCaseStudy = p.link && p.link.startsWith('/')

        return (
          <div
            key={p.id}
            className={`project ${i % 2 !== 0 ? 'project--reverse' : ''} ${p.accentClass || ''}`}
            ref={(el) => (rowsRef.current[i] = el)}
          >
            <div
              className="project__thumb"
              ref={(el) => (thumbsRef.current[i] = el)}
            >
              <div className="project__thumb-inner">
                {hasCaseStudy ? (
                  <Link to={p.link} aria-label={`View ${p.title} case study`}>
                    {p.image ? (
                      <img src={p.image} alt={p.title} loading="lazy" />
                    ) : (
                      <div
                        className="project__placeholder"
                        style={p.placeholderGradient ? { background: p.placeholderGradient } : undefined}
                      />
                    )}
                  </Link>
                ) : p.image ? (
                  <img src={p.image} alt={p.title} loading="lazy" />
                ) : (
                  <div
                    className="project__placeholder"
                    style={p.placeholderGradient ? { background: p.placeholderGradient } : undefined}
                  />
                )}
              </div>
            </div>
            <div
              className="project__info"
              ref={(el) => (infosRef.current[i] = el)}
            >
              <div className="project__title-row">
                <h3 className="project__title">{p.title}</h3>
                {p.comingSoon && (
                  <span className="project__badge">Coming Soon</span>
                )}
              </div>
              <p className="project__desc">{p.description}</p>
              <div className="project__tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="project__tag">{tag}</span>
                ))}
              </div>
              {hasCaseStudy && (
                <Link to={p.link} className="project__link">
                  View case study →
                </Link>
              )}
            </div>
          </div>
        )
      })}
    </section>
  )
}
