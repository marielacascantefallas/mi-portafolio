import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import portrait from '../assets/portrait-blur.webp'
import { deskProjects, CATEGORIES, categorySlug } from '../data/projects'
import Speaker from './Speaker'
import Preview from './Preview'
import { markFirstPaint } from './WindowShell'
import './desk.css'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/mariela-cascante-fallas-aba957208'
export const GITHUB_URL = 'https://github.com/marielacascantefallas'

// Dark from 6 p.m. to 6 a.m. in the visitor's own time zone. index.html sets
// it before the first paint; this keeps it right if the page stays open.
const themeForNow = () => {
  const h = new Date().getHours()
  return h >= 18 || h < 6 ? 'dark' : 'light'
}
function useAutoTheme() {
  useEffect(() => {
    const apply = () => document.documentElement.setAttribute('data-theme', themeForNow())
    apply()
    const id = setInterval(apply, 60 * 1000)
    return () => clearInterval(id)
  }, [])
}

function DeskFile({ project, selected, onOpen }) {
  const navigate = useNavigate()
  const href = project.link || project.externalUrl
  const open = (e) => {
    e.preventDefault()
    if (selected) {
      if (project.link) navigate(project.link)
      else window.open(project.externalUrl, '_blank', 'noopener')
      return
    }
    onOpen(project, e.currentTarget)
  }
  return (
    <li className={`file${selected ? ' is-selected' : ''}`}>
      <a
        href={href}
        onClick={open}
        onDoubleClick={() => project.link && navigate(project.link)}
        aria-haspopup="dialog"
        aria-label={`${project.name}, open preview`}
      >
        <img src={project.cover} alt="" width="264" height="184" loading="eager" decoding="async" />
        <span className="file__name">{project.name}</span>
      </a>
    </li>
  )
}

export default function Desk({ children, page = false, home = false }) {
  useAutoTheme()
  const location = useLocation()
  const [opened, setOpened] = useState(null)
  // A preview belongs to the page it was opened on.
  const preview = opened && opened.path === location.pathname ? opened : null

  useEffect(() => {
    markFirstPaint()
  }, [])

  const left = deskProjects.slice(0, 5)
  const right = deskProjects.slice(5)

  const renderFiles = (list) =>
    list.map((p) => (
      <DeskFile
        key={p.slug}
        project={p}
        selected={preview?.project.slug === p.slug}
        onOpen={(proj, el) => setOpened({ project: proj, origin: el, path: location.pathname })}
      />
    ))

  const Who = home ? 'h1' : 'p'

  return (
    <div className={`desk${page ? ' desk--page' : ''}${children ? ' has-window' : ''}`}>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <img className="desk__portrait" src={portrait} alt="" width="600" height="600" fetchPriority="high" />

      <header className="desk__top">
        <Link to="/" className="pill glass desk__role" aria-label="Product Designer, home">
          Product Designer
        </Link>
        <Speaker />
        <nav aria-label="Main">
          <ul className="desk__nav">
            {[
              ['work', 'Work'],
              ['about', 'About'],
              ['contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <NavLink to={`/${to}`} className="pill glass" data-origin={to} end>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="content" tabIndex={-1} className="desk__content">
        {!page && !children && (
          <nav className="desk__files" aria-label="Projects">
            <ul className="desk__group desk__group--left">{renderFiles(left)}</ul>
            <ul className="desk__group desk__group--right">{renderFiles(right)}</ul>
          </nav>
        )}
        {children}
      </main>

      {preview && (
        <Preview
          project={preview.project}
          origin={preview.origin}
          onClose={() => {
            setOpened(null)
            preview.origin?.focus()
          }}
        />
      )}

      <footer className="desk__foot">
        <div className="glass desk__who">
          <Who className="desk__who-text">
            Mariela Cascante<span className="sr-only">,</span>
            <br />
            Product Designer<span className="sr-only"> and UX/UI Designer in Costa Rica</span>
          </Who>
        </div>
        <ul className="glass glass--dark desk__links">
          <li>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer me">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer me">
              GitHub
            </a>
          </li>
        </ul>
        <nav className="glass desk__cats" aria-label="Work by category">
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link to={`/work?category=${categorySlug(c)}`}>{c}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </div>
  )
}
