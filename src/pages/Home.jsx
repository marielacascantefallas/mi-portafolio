import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import About from '../components/About'
import AboutSkills from '../components/AboutSkills'
import Contact from '../components/Contact'
import StackSection from '../components/StackSection'
import '../App.css'

export default function Home({ theme, onToggle }) {
  return (
    <>
      <Nav theme={theme} onToggle={onToggle} />
      <main>
        {/* Each section stacks over the previous one as you scroll (see
            StackSection) — z-index increases down the page, and the
            background alternates starting with About (the hero keeps its
            own animated background instead of a flat color). */}
        <StackSection zIndex={1}>
          <Hero />
        </StackSection>
        <StackSection zIndex={2} background="var(--section-bg-a)">
          <About />
        </StackSection>
        <StackSection zIndex={3} background="var(--color-lilac)">
          <AboutSkills />
        </StackSection>
        <StackSection zIndex={4} background="var(--section-bg-b)">
          <Projects />
        </StackSection>
        <StackSection zIndex={5} background="var(--section-bg-a)">
          <Contact />
        </StackSection>
      </main>
      <footer className="footer">
        <p>© 2025 Mariela Cascante. All rights reserved.</p>
      </footer>
    </>
  )
}
