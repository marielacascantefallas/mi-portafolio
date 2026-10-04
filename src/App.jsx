import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { useLenis } from './hooks/useLenis'
import Home from './pages/Home'
import SocialClubCaseStudy from './pages/SocialClubCaseStudy'
import CaseStudyPage from './pages/CaseStudyPage'
import MusicPlayer from './components/MusicPlayer'
import { consumeHomeScroll } from './utils/scrollMemory'

// Resets scroll position (through Lenis, so it stays in sync with
// ScrollTrigger) whenever the route changes — except landing back on "/"
// right after leaving it for a case study, where the home page's scroll
// position is restored instead (Fase 7: "al volver se conserve la posición
// del scroll"). Projects.jsx saves that position just before navigating
// away; consumeHomeScroll only ever returns a value in that exact case, so
// a fresh/direct visit to "/" still starts at the top as before.
function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') {
      const savedY = consumeHomeScroll()
      if (savedY !== null) {
        lenisRef.current?.scrollTo(savedY, { immediate: true })
        return
      }
    }
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname, lenisRef])

  return null
}

function App() {
  const { theme, toggle } = useTheme()
  const lenisRef = useLenis()

  return (
    <BrowserRouter>
      <ScrollToTop lenisRef={lenisRef} />
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<Home theme={theme} onToggle={toggle} />} />
        <Route
          path="/proyectos/social-club"
          element={<SocialClubCaseStudy theme={theme} onToggle={toggle} />}
        />
        <Route
          path="/proyectos/:slug"
          element={<CaseStudyPage theme={theme} onToggle={toggle} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
