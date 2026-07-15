import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import ThemeToggle from './ThemeToggle'
import './Nav.css'

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav({ theme, onToggle }) {
  const [open, setOpen] = useState(false)
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
    }
  }, [open])

  const close = () => {
    setOpen(false)
  }

  const toggleOpen = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <a href="#" className="nav__logo">MC</a>

      <div className="nav__actions">
        <ThemeToggle theme={theme} onToggle={onToggle} />
        <button
          className={`nav__hamburger ${open ? 'nav__hamburger--open' : ''}`}
          onClick={toggleOpen}
          aria-label={open ? 'Close menu' : 'Open menu'}
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
                <a href={l.href} onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
