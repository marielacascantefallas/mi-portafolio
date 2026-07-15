import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profilePhoto from '../assets/profile-photo.png'
import useFillHover from '../hooks/useFillHover'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const competencies = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'UX Research & strategy',
    desc: 'Qualitative and quantitative research, personas, journey maps, and service blueprints that ground every design decision.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    title: 'Design systems & component libraries',
    desc: 'Building and maintaining scalable design systems in Figma for cross-functional teams.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Prototyping & usability testing',
    desc: 'Low- to high-fidelity wireframes, interactive prototypes, and heuristic evaluations to validate every flow.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: 'Branding & visual communication',
    desc: 'Graphic design, motion graphics, and brand consistency across every digital touchpoint.',
  },
]

const skills = [
  'Figma', 'Framer', 'Sketch', 'Adobe Photoshop', 'Adobe Illustrator',
  'Adobe InDesign', 'Adobe XD', 'Adobe Animate', 'Adobe Lightroom',
  'HTML', 'CSS', 'Claude Code', 'Cursor',
]

export default function About() {
  const sectionRef = useRef(null)
  const { ref: cvRef, onMouseEnter: cvEnter, onMouseLeave: cvLeave } = useFillHover()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

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

  return (
    <section
      id="about"
      className="section about"
      ref={sectionRef}
    >
      <div className="about__top">
        <div className="about__photo-frame">
          <div className="about__photo-placeholder">
            <img src={profilePhoto} alt="Mariela Cascante" />
          </div>
        </div>

        <div className="about__intro">
          <h2 className="about__title">
            Designing digital experiences{' '}
            <span className="about__title-accent">centered on people</span>
          </h2>
          <p className="about__bio">
            I'm a UX Designer with nearly five years of experience creating
            user-centered digital products that combine business objectives,
            usability principles, and visual excellence. I've led end-to-end
            UX initiatives, collaborating with cross-functional teams to
            transform complex requirements into intuitive digital
            experiences — from discovery and research to implementation and
            continuous improvement.
          </p>
        </div>
      </div>

      <div className="about__competencies">
        {competencies.map((c) => (
          <div key={c.title} className="about__comp">
            <div className="about__comp-icon">{c.icon}</div>
            <h3 className="about__comp-title">{c.title}</h3>
            <p className="about__comp-desc">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="about__skills">
        {skills.map((s) => (
          <span key={s} className="about__chip">{s}</span>
        ))}
      </div>

      <a
        ref={cvRef}
        onMouseEnter={cvEnter}
        onMouseLeave={cvLeave}
        href="/documents/Mariela_Cascante_CV.pdf"
        download="Mariela_Cascante_CV.pdf"
        className="about__cv btn-fill"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download CV (PDF)
      </a>
    </section>
  )
}
