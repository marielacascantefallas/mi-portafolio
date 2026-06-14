import { useTheme } from './hooks/useTheme'
import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import './App.css'

function App() {
  const { theme, toggle } = useTheme()
  useLenis()

  return (
    <>
      <Nav theme={theme} onToggle={toggle} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <p>© 2025 Mariela Cascante. Todos los derechos reservados.</p>
      </footer>
    </>
  )
}

export default App
