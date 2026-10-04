import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../Reveal'
import ThemeToggle from '../ThemeToggle'
import useFillHover from '../../hooks/useFillHover'
import projects from '../../data/projects'
import '../../components/CaseStudy/ProjectCaseStudy.css'

// Lightweight case study template for client-site projects — reuses the
// same `.case-study__*` classes/CSS as the rich Social Club template
// (ProjectCaseStudy.css) so both read as one system, but only renders the
// fields Fase 7 actually asks for: banner, title, "Case Study" tag, what
// the project consisted of, duration, role, main challenge, and a "Visit
// site" button when it's a live web project. Content for duration/role/
// challenge is placeholder (see src/data/projects.js) until the real
// numbers are filled in.
export default function SimpleCaseStudy({ theme, onToggle, project }) {
  const navigate = useNavigate()
  const {
    ref: siteRef,
    onMouseEnter: siteEnter,
    onMouseLeave: siteLeave,
  } = useFillHover()

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate])

  const index = projects.findIndex((p) => p.id === project.id)
  const next = projects[(index + 1) % projects.length]
  const nextHasPage = next && next.id !== project.id && next.link && next.link !== '#'

  return (
    <div className="case-study">
      <header className="case-study__header">
        <Link to="/" className="case-study__back">
          ← Back to portfolio
        </Link>
        <ThemeToggle theme={theme} onToggle={onToggle} />
      </header>

      <section className="case-study__hero">
        {project.image && (
          <Reveal>
            <div className="case-study__hero-image case-study__hero-image--top">
              <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <p className="case-study__eyebrow">Case Study</p>
          <h1 className="case-study__title">{project.title}</h1>
          <p className="case-study__tagline">{project.description}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="case-study__scope-box">
            <div className="case-study__scope-item">
              <span className="case-study__scope-label">Project duration</span>
              <span className="case-study__scope-value case-study__scope-value--placeholder">
                {project.duration}
              </span>
            </div>
            <div className="case-study__scope-item">
              <span className="case-study__scope-label">Role</span>
              <span className="case-study__scope-value case-study__scope-value--placeholder">
                {project.role}
              </span>
            </div>
            <div className="case-study__scope-item">
              <span className="case-study__scope-label">Main challenge</span>
              <span className="case-study__scope-value case-study__scope-value--placeholder">
                {project.challenge}
              </span>
            </div>
          </div>

          {project.siteUrl && (
            <a
              ref={siteRef}
              onMouseEnter={siteEnter}
              onMouseLeave={siteLeave}
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study__prototype-link btn-fill"
            >
              Visit site ↗
            </a>
          )}
        </Reveal>
      </section>

      <Reveal as="section" className="case-study__next">
        <p className="case-study__next-label">Next project</p>
        {nextHasPage ? (
          <Link to={next.link} className="case-study__next-link">
            <h3 className="case-study__next-title">{next.title}</h3>
            View case study →
          </Link>
        ) : (
          <h3 className="case-study__next-title case-study__next-title--placeholder">
            More case studies coming soon
          </h3>
        )}
      </Reveal>
    </div>
  )
}
