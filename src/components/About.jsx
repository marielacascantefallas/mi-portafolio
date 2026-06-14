import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const competencies = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    title: 'Design systems & design tokens',
    desc: 'Creación de sistemas escalables con tokens que sincronizan diseño y código.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Librerías de componentes en React',
    desc: 'Componentes accesibles y reutilizables listos para producción.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: 'Storybook como fuente de verdad',
    desc: 'Documentación viva que mantiene alineados a diseñadores y developers.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22" /><path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93" />
      </svg>
    ),
    title: 'Flujos de diseño asistidos por IA',
    desc: 'Integración de herramientas de IA para acelerar iteración y prototipado.',
  },
]

const skills = [
  'Figma', 'React', 'TypeScript', 'JavaScript', 'Storybook',
  'Style Dictionary', 'Telerik React', 'Three.js', 'WebGL',
  'GSAP', 'Accessibility', 'WCAG', 'Git', 'GitHub',
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <section
      id="about"
      className="section about"
      ref={sectionRef}
      style={{ visibility: 'hidden' }}
    >
      <div className="about__inner">
        {/* Left column */}
        <div className="about__left">
          <div className="about__photo">
            <div className="about__photo-placeholder">
              <span className="about__photo-label">foto de cuerpo completo</span>
            </div>
          </div>
          <h2 className="about__title">Diseño sistemas que conectan UX, UI y desarrollo</h2>
          <p className="about__bio">
            Soy diseñadora UX/UI especializada en construir lenguajes visuales
            completos para productos digitales — desde los fundamentos del
            sistema de diseño hasta su implementación como componentes vivos y
            documentados. Trabajo en el punto exacto donde el diseño se
            convierte en código.
          </p>
        </div>

        {/* Right column */}
        <div className="about__right">
          <div className="about__competencies">
            {competencies.map((c) => (
              <div key={c.title} className="about__comp">
                <div className="about__comp-icon">{c.icon}</div>
                <div>
                  <h3 className="about__comp-title">{c.title}</h3>
                  <p className="about__comp-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="about__skills">
            {skills.map((s) => (
              <span key={s} className="about__chip">{s}</span>
            ))}
          </div>
          <a href="#" className="about__cv">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Descargar CV (PDF)
          </a>
        </div>
      </div>
    </section>
  )
}
