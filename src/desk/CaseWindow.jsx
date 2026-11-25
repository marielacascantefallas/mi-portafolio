import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { caseProjects } from '../data/projects'
import TramaCaseStudy from '../pages/TramaCaseStudy'
import HiloCaseStudy from '../pages/HiloCaseStudy'
import RutaCaseStudy from '../pages/RutaCaseStudy'
import GoEasyCaseStudy from '../pages/GoEasyCaseStudy'
import WeebtechCaseStudy from '../pages/WeebtechCaseStudy'
import MrsCaseStudy from '../pages/MrsCaseStudy'
import CafeEsperanzaCaseStudy from '../pages/CafeEsperanzaCaseStudy'
import PicoMarCaseStudy from '../pages/PicoMarCaseStudy'
import SocialClubCaseStudy from '../pages/SocialClubCaseStudy'
import SimpleCaseStudy from '../components/CaseStudy/SimpleCaseStudy'
import {
  Lights,
  caseHome,
  closeCase,
  growCase,
  minimizeToDock,
  openCaseFrom,
  useCloseOnOutside,
  useZoomMotion,
} from './WindowShell'

const RICH = {
  weebtech: WeebtechCaseStudy,
  'mrs-rent-a-car': MrsCaseStudy,
  'cafe-esperanza': CafeEsperanzaCaseStudy,
  'pico-mar-villas': PicoMarCaseStudy,
  trama: TramaCaseStudy,
  hilo: HiloCaseStudy,
  ruta: RutaCaseStudy,
  'goeasy-chat': GoEasyCaseStudy,
  'social-club': SocialClubCaseStudy,
}

// A case study opens as a large window on the desktop. It grows out of the
// folder or card it was opened from and shrinks back into it on close.
// Red closes, yellow sends it to the dock, green fills the screen.
export default function CaseWindow() {
  const { slug } = useParams()
  const index = caseProjects.findIndex((p) => p.slug === slug)
  if (index < 0) return <Navigate to="/work" replace />
  return <CaseWindowInner key={slug} slug={slug} index={index} />
}

function CaseWindowInner({ slug, index }) {
  const navigate = useNavigate()
  const ref = useRef(null)
  const busy = useRef(false)
  const [zoomed, setZoomed] = useState(false)
  const beforeZoom = useZoomMotion(ref, zoomed)
  const project = caseProjects[index]
  const next = caseProjects[(index + 1) % caseProjects.length]
  const Body = RICH[slug]

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    growCase(ref.current, slug)
  }, [slug])

  const close = () => {
    if (busy.current) return
    busy.current = true
    closeCase(ref.current, slug, (to) => navigate(to))
  }

  const minimize = () => {
    if (busy.current) return
    busy.current = true
    const from = caseHome(slug)
    minimizeToDock(
      ref.current,
      { key: `/work/${slug}`, path: `/work/${slug}`, slug, from, title: project.title, cover: project.cardImage || project.image },
      () => navigate(from),
    )
  }

  const toggleZoom = () => {
    const el = ref.current
    if (!el) return
    if (!zoomed) {
      const offset = Math.max(0, -el.getBoundingClientRect().top)
      beforeZoom()
      setZoomed(true)
      requestAnimationFrame(() => {
        el.scrollTop = offset
      })
    } else {
      const offset = el.scrollTop
      beforeZoom()
      setZoomed(false)
      requestAnimationFrame(() => {
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + offset)
      })
    }
  }

  useCloseOnOutside(ref, close)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape' || e.defaultPrevented) return
      e.preventDefault()
      if (zoomed) toggleZoom()
      else close()
    }
    // Capture, so the page inside does not also handle it.
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  })

  return (
    <article ref={ref} className={`win case${zoomed ? ' is-zoomed' : ''}`} aria-label={`${project.title} case study`}>
      <div className="win__bar case__bar">
        <Lights
          onClose={close}
          onMinimize={minimize}
          onZoom={toggleZoom}
          zoomLabel={zoomed ? 'Exit full screen' : 'Enter full screen'}
        />
        <nav aria-label="Breadcrumb" className="case__crumb">
          <ol>
            <li>
              <Link to="/work">Work</Link>
            </li>
            <li aria-current="page">{project.title}</li>
          </ol>
        </nav>
        <Link className="case__next" to={next.link} onClick={(e) => openCaseFrom(next.slug, e.currentTarget, caseHome(slug))}>
          Next: {next.title}
        </Link>
      </div>
      <div className="case__body">{Body ? <Body /> : <SimpleCaseStudy project={project} />}</div>
    </article>
  )
}
