import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { useLenis } from './hooks/useLenis'
import Home from './pages/Home'
import SocialClubCaseStudy from './pages/SocialClubCaseStudy'

// Resets scroll position (through Lenis, so it stays in sync with
// ScrollTrigger) whenever the route changes.
function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation()

  useEffect(() => {
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
      <Routes>
        <Route path="/" element={<Home theme={theme} onToggle={toggle} />} />
        <Route
          path="/proyectos/social-club"
          element={<SocialClubCaseStudy theme={theme} onToggle={toggle} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
