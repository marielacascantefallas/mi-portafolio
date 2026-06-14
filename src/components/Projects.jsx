import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '../data/projects'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 60, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="proyectos" className="section projects">
      <h2 className="projects__heading">Proyectos</h2>

      {projects.map((p, i) => (
        <div
          key={p.id}
          className={`project ${i % 2 !== 0 ? 'project--reverse' : ''}`}
          ref={(el) => (itemsRef.current[i] = el)}
          style={{ visibility: 'hidden' }}
        >
          <div className="project__thumb">
            {p.image ? (
              <img src={p.image} alt={p.title} />
            ) : (
              <div className="project__placeholder" />
            )}
          </div>
          <div className="project__info">
            <span className="project__number">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="project__title">{p.title}</h3>
            <p className="project__desc">{p.description}</p>
            <div className="project__tags">
              {p.tags.map((tag) => (
                <span key={tag} className="project__tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
