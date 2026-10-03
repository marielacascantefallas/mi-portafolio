import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profilePhoto from '../assets/profile-cutout.png'
import useFillHover from '../hooks/useFillHover'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

// Bloque A — almost-full-screen, everything centered (reference: about.jpg).
// Kept as its own StackSection (see Home.jsx) rather than combined with
// AboutSkills/Bloque B: combined, their total height outgrew a viewport and
// the tail (the pill cloud) only ever became visible at the exact moment
// Projects' cover-in had already reached it — same class of bug as the
// original "scroll reveal overlap" fix, just re-triggered by Bloque A+B's
// combined height. Splitting them back into two viewport-sized sections
// keeps each one inside the safe-window math StackSection.css documents.
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
      <div className="about__hero">
        <h2 className="about__headline">
          <span className="about__headline-light">Designing digital experiences</span>
          <span className="about__headline-bold">centered on people</span>
        </h2>

        {/* Cutout photo centered and overlapping the headline's second line —
            the transparent PNG lets the letters show through around the
            silhouette, exactly like the reference's photo-over-text effect. */}
        <div className="about__photo-wrap">
          <img src={profilePhoto} alt="Mariela Cascante" className="about__photo" />
          <a
            ref={cvRef}
            onMouseEnter={cvEnter}
            onMouseLeave={cvLeave}
            href="/documents/Mariela_Cascante_CV.pdf"
            download="Mariela_Cascante_CV.pdf"
            className="about__cv btn-fill"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>
        </div>

        <div className="about__corner about__corner--left">
          <span className="about__corner-rule" aria-hidden="true" />
          <p className="about__corner-label">UX/UI Product Designer</p>
        </div>

        <p className="about__bio about__corner about__corner--right">
          I'm a UX Designer with nearly five years of experience creating
          user-centered digital products that combine business objectives,
          usability principles, and visual excellence. I've led end-to-end
          UX initiatives, collaborating with cross-functional teams to
          transform complex requirements into intuitive digital
          experiences — from discovery and research to implementation and
          continuous improvement.
        </p>
      </div>
    </section>
  )
}
