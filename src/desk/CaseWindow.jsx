import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { caseProjects } from '../data/projects'
import TramaCaseStudy from '../pages/TramaCaseStudy'
import HiloCaseStudy from '../pages/HiloCaseStudy'
import RutaCaseStudy from '../pages/RutaCaseStudy'
import GoEasyCaseStudy from '../pages/GoEasyCaseStudy'
import SocialClubCaseStudy from '../pages/SocialClubCaseStudy'
import SimpleCaseStudy from '../components/CaseStudy/SimpleCaseStudy'
import { Lights } from './WindowShell'

const RICH = {
  trama: TramaCaseStudy,
  hilo: HiloCaseStudy,
  ruta: RutaCaseStudy,
  'goeasy-chat': GoEasyCaseStudy,
  'social-club': SocialClubCaseStudy,
}

// A case study opens as a large window on the desktop. The page itself
// scrolls; the window bar stays pinned at the top.
export default function CaseWindow() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [zoomed, setZoomed] = useState(false)
  const index = caseProjects.findIndex((p) => p.slug === slug)
  if (index < 0) return <Navigate to="/work" replace />
  const project = caseProjects[index]
  const next = caseProjects[(index + 1) % caseProjects.length]
  const Body = RICH[slug]

  return (
    <article className={`win case${zoomed ? ' is-zoomed' : ''}`} aria-label={`${project.title} case study`}>
      <div className="win__bar case__bar">
        <Lights
          onClose={() => navigate('/work')}
          onMinimize={() => navigate('/')}
          onZoom={() => setZoomed((z) => !z)}
          zoomLabel={zoomed ? 'Restore window size' : 'Enlarge window'}
        />
        <nav aria-label="Breadcrumb" className="case__crumb">
          <ol>
            <li>
              <Link to="/work">Work</Link>
            </li>
            <li aria-current="page">{project.title}</li>
          </ol>
        </nav>
        <Link className="case__next" to={next.link}>
          Next: {next.title}
        </Link>
      </div>
      <div className="case__body">{Body ? <Body /> : <SimpleCaseStudy project={project} />}</div>
    </article>
  )
}
