import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lights, growFrom, minimizeToDock, openCaseFrom, shrinkTo, useCloseOnOutside } from './WindowShell'

// Small project window that grows out of the desktop file. Red or a click
// on the desktop shrinks it back into the file, yellow sends it to the
// dock, and green (or "Open case study") enlarges it into the full case.
export default function Preview({ project, origin, onClose, onMinimized }) {
  const ref = useRef(null)
  const headingRef = useRef(null)
  const busy = useRef(false)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    growFrom(ref.current, origin)
    headingRef.current?.focus({ preventScroll: true })
  }, [origin, project.slug])

  const close = () => {
    if (busy.current) return
    busy.current = true
    shrinkTo(ref.current, document.querySelector(`[data-file="${project.slug}"]`) || origin, onClose)
  }
  const minimize = () => {
    if (busy.current) return
    busy.current = true
    minimizeToDock(
      ref.current,
      { key: `preview:${project.slug}`, path: '/', preview: project.slug, title: project.title, cover: project.cover },
      onMinimized,
    )
  }
  const openCase = () => {
    openCaseFrom(project.slug, ref.current, '/')
    navigate(project.link)
  }

  useCloseOnOutside(ref, close)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <section ref={ref} className="win preview" role="dialog" aria-labelledby="preview-title">
      <div className="win__bar">
        <Lights onClose={close} onMinimize={minimize} onZoom={openCase} zoomLabel="Enlarge to the full case study" />
        <p className="win__title" aria-hidden="true">
          {project.title}
        </p>
      </div>
      <img className="preview__img" src={project.cover} alt="" width="1000" height="750" />
      <div className="preview__body">
        <h2 id="preview-title" ref={headingRef} tabIndex={-1}>
          {project.title}
        </h2>
        <p className="preview__kind">{project.kind}</p>
        <p className="preview__desc">{project.description}</p>
        <Link className="btn" to={project.link} onClick={() => openCaseFrom(project.slug, ref.current, '/')}>
          Open case study
        </Link>
      </div>
    </section>
  )
}
