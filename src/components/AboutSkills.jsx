import { memo } from 'react'
import useFillHover from '../hooks/useFillHover'
import './About.css'

const LINKEDIN_URL = 'https://www.linkedin.com/in/mariela-cascante-fallas-aba957208'

const competencies = [
  'UX Research & strategy',
  'Design systems',
  'Prototyping',
  'Branding',
]

const skills = [
  'Figma', 'Framer', 'Sketch', 'Adobe Photoshop', 'Adobe Illustrator',
  'Adobe InDesign', 'Adobe XD', 'Adobe Animate', 'Adobe Lightroom',
  'HTML', 'CSS', 'Claude Code', 'Cursor',
]

// Varied rotations so the pills read as a piled, overlapping cluster
// resting on the block's bottom edge, not a tidy grid (reference: about.jpg).
const TILTS = [-8, 5, -4, 7, -6, 3, -9, 6, -3, 8, -5, 4, -7]

// Bloque B — full-bleed solid lilac block. Its own StackSection (see
// About.jsx for why it's split from Bloque A instead of living in the same
// section).
function AboutSkills() {
  const { ref: liRef, onMouseEnter: liEnter, onMouseLeave: liLeave } = useFillHover()

  // No separate entrance fade here — StackSection.jsx already fades/slides
  // in the whole section on scroll-into-view.

  return (
    <section className="section about-skills">
      <div className="about__block">
        <div className="about__block-head">
          <h3 className="about__block-title">
            <span className="about__block-title-bold">UX/UI Product</span>
            <span className="about__block-title-light">designer</span>
          </h3>

          <a
            ref={liRef}
            onMouseEnter={liEnter}
            onMouseLeave={liLeave}
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="about__block-cta btn-fill"
          >
            LinkedIn
          </a>
        </div>

        <div className="about__areas">
          {competencies.map((c) => (
            <span key={c} className="about__area">{c}</span>
          ))}
        </div>

        <div className="about__skills">
          {skills.map((s, i) => (
            <span
              key={s}
              className="about__chip"
              style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// Takes no props, so Home re-rendering (e.g. the hero-visibility toggle
// that drives Nav's glass state) never needs to re-render this too.
export default memo(AboutSkills)
