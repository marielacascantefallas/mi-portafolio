import { memo, useRef } from 'react'
import { useGrainCanvas } from '../hooks/useGrainCanvas'
import './Hero.css'

function Hero() {
  const canvasRef = useRef(null)
  useGrainCanvas(canvasRef)

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__noise noise-overlay" aria-hidden="true" />

      <div className="hero__content">
        {/* Real text for a11y/SEO — visually hidden. The visible artwork
            below is the actual glyph shapes (public/hero-title.svg /
            hero-subtitle.svg) used as a mask, so it's decorative/aria-hidden. */}
        <h1 className="sr-only">Mariela Cascante</h1>
        <div className="hero__title hero-glass-text" aria-hidden="true" />
        <p className="sr-only">UX/UI Product Designer</p>
        <div className="hero__subtitle hero-glass-text" aria-hidden="true" />
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
}

export default memo(Hero)
