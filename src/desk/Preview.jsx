import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lights, growFrom, shrinkTo } from './WindowShell'

// Small project window that grows out of the desktop file. A second click
// on the file, "Open case study", or the green control opens the case.
export default function Preview({ project, origin, onClose }) {
  const ref = useRef(null)
  const headingRef = useRef(null)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    growFrom(ref.current, origin)
    headingRef.current?.focus({ preventScroll: true })
  }, [origin, project.slug])

  const close = () => shrinkTo(ref.current, origin, onClose)
  const openCase = () => navigate(project.link)

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
        <Lights onClose={close} onMinimize={close} onZoom={openCase} zoomLabel="Open case study" />
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
        <Link className="btn" to={project.link}>
          Open case study
        </Link>
      </div>
    </section>
  )
}
