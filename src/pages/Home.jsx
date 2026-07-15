import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import About from '../components/About'
import Contact from '../components/Contact'
import '../App.css'

export default function Home({ theme, onToggle }) {
  return (
    <>
      <Nav theme={theme} onToggle={onToggle} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <p>© 2025 Mariela Cascante. All rights reserved.</p>
      </footer>
    </>
  )
}
