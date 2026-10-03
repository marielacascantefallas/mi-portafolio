import { forwardRef, useRef } from 'react'
import { useGrainCanvas } from '../hooks/useGrainCanvas'
import './Hero.css'

// Takes a ref (forwarded from Home) so an Intersection Observer there can
// tell the Nav when the hero is on screen, for the glass-while-on-hero
// effect.
const Hero = forwardRef(function Hero(_props, ref) {
  const canvasRef = useRef(null)
  useGrainCanvas(canvasRef)

  return (
    <section className="hero" ref={ref}>
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__noise noise-overlay" aria-hidden="true" />

      {/* Glass panel: frosted/blurred over the gradient + grain behind it,
          which is what gives the "glass over the hero" look the rest of
          the hero (outside this panel) doesn't have. */}
      <div className="hero__content glass">
        <h1 className="hero__name">
          <span className="hero__name-line">MARIELA</span>
          <span className="hero__name-line">CASCANTE</span>
        </h1>
        <p className="hero__subtitle">UX/UI PRODUCT DESIGNER</p>
      </div>

      <a href="#projects" className="hero__scroll" aria-label="Scroll to projects">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  )
})

export default Hero
