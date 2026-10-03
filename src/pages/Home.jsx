import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import About from '../components/About'
import Contact from '../components/Contact'
import StackSection from '../components/StackSection'
import '../App.css'

export default function Home({ theme, onToggle }) {
  const heroRef = useRef(null)
  const [heroVisible, setHeroVisible] = useState(true)

  // Drives the nav's glass effect: on while any part of the hero is on
  // screen, off as soon as it scrolls out of view.
  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Nav theme={theme} onToggle={onToggle} glass={heroVisible} />
      <main>
        {/* Each section stacks over the previous one as you scroll (see
            StackSection) — z-index increases down the page, and the
            background alternates starting with About (the hero keeps its
            own animated background instead of a flat color). */}
        <StackSection zIndex={1}>
          <Hero ref={heroRef} />
        </StackSection>
        <StackSection zIndex={2} background="var(--section-bg-a)">
          <About />
        </StackSection>
        <StackSection zIndex={3} background="var(--section-bg-b)">
          <Projects />
        </StackSection>
        <StackSection zIndex={4} background="var(--section-bg-a)">
          <Contact />
        </StackSection>
      </main>
      <footer className="footer">
        <p>© 2025 Mariela Cascante. All rights reserved.</p>
      </footer>
    </>
  )
}
