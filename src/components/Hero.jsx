import { memo, useRef } from 'react'
import { useGrainCanvas } from '../hooks/useGrainCanvas'
import GlassLetters from './GlassLetters'
import {
  TITLE_VIEWBOX,
  TITLE_GROUPS,
  SUBTITLE_VIEWBOX,
  SUBTITLE_GROUPS,
} from './heroGlyphPaths'
import './Hero.css'

function Hero() {
  const canvasRef = useRef(null)
  useGrainCanvas(canvasRef)

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__noise noise-overlay" aria-hidden="true" />

      <div className="hero__content">
        {/* Real text for a11y/SEO — visually hidden. The visible artwork is
            the same glyph shapes as two layers: a div masked to their
            silhouette for the blurred/saturated backdrop (see
            .hero-glass-backdrop), and an SVG tracing their real outlines
            on top for the edge glow/bevel/sheen (see GlassLetters.jsx). */}
        <h1 className="sr-only">Mariela Cascante</h1>
        <div className="hero__title-wrap">
          <div className="hero__title hero-glass-backdrop" aria-hidden="true" />
          <GlassLetters
            id="hero-title"
            className="hero__title-svg"
            viewBox={TITLE_VIEWBOX}
            groups={TITLE_GROUPS}
            edgeStrokeWidth={13}
            bevelStdDeviation={14}
            bevelSurfaceScale={16}
          />
        </div>
        <p className="sr-only">UX/UI Product Designer</p>
        <div className="hero__subtitle-wrap">
          <div className="hero__subtitle hero-glass-backdrop" aria-hidden="true" />
          <GlassLetters
            id="hero-subtitle"
            className="hero__subtitle-svg"
            viewBox={SUBTITLE_VIEWBOX}
            groups={SUBTITLE_GROUPS}
            edgeStrokeWidth={2.2}
            bevelStdDeviation={2.4}
            bevelSurfaceScale={2.8}
          />
        </div>
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
