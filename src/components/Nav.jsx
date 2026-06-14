import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import ThemeToggle from './ThemeToggle'
import './Nav.css'

const links = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Nav({ theme, onToggle }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const overlayRef = useRef(null)
  const linksRef = useRef([])

  useEffect(() => {
    if (!overlayRef.current) return

    if (open) {
      document.body.style.overflow = 'hidden'
      gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.fromTo(
        linksRef.current,
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.08,
          duration: 0.4,
          delay: 0.15,
          ease: 'power2.out',
        }
      )
    } else {
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power2.in',
      })
      document.body.style.overflow = ''
      setHovered(null)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <a href="#" className="nav__logo">MC</a>

      <div className="nav__actions">
        <ThemeToggle theme={theme} onToggle={onToggle} />
        <button
          className={`nav__hamburger ${open ? 'nav__hamburger--open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Fullscreen overlay */}
      <div
        ref={overlayRef}
        className="nav-overlay"
        style={{ visibility: 'hidden', opacity: 0 }}
      >
        <div className="nav-overlay__content">
          <ul className="nav-overlay__links">
            {links.map((l, i) => (
              <li
                key={l.href}
                ref={(el) => (linksRef.current[i] = el)}
              >
                <a
                  href={l.href}
                  onClick={close}
                  onMouseEnter={() => setHovered(l.label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={`nav-overlay__preview ${hovered ? 'nav-overlay__preview--visible' : ''}`}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
