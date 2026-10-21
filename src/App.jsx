import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Desk from './desk/Desk'
import { AboutWindow, ContactWindow, WorkWindow } from './desk/Windows'
import CaseWindow from './desk/CaseWindow'
import { metaFor } from './seo'

function OldCaseRoute() {
  const { slug } = useParams()
  return <Navigate to={`/work/${slug}`} replace />
}

// Keeps the title and description right while moving between windows.
function Meta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const m = metaFor(pathname)
    document.title = m.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', m.url)
    if (!pathname.startsWith('/work/')) window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <Meta />
      <Routes>
        <Route path="/" element={<Desk home />} />
        <Route
          path="/work"
          element={
            <Desk>
              <WorkWindow />
            </Desk>
          }
        />
        <Route
          path="/about"
          element={
            <Desk>
              <AboutWindow />
            </Desk>
          }
        />
        <Route
          path="/contact"
          element={
            <Desk>
              <ContactWindow />
            </Desk>
          }
        />
        <Route
          path="/work/:slug"
          element={
            <Desk page>
              <CaseWindow />
            </Desk>
          }
        />
        <Route path="/proyectos/:slug" element={<OldCaseRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
