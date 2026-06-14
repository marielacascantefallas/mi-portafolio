import { useRef } from 'react'
import { useGrainCanvas } from '../hooks/useGrainCanvas'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)
  useGrainCanvas(canvasRef)

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__content">
        <h1 className="hero__title">Mariela Cascante</h1>
        <p className="hero__subtitle">UX/UI Product Design</p>
      </div>
      <a href="#proyectos" className="hero__scroll" aria-label="Scroll hacia proyectos">
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
