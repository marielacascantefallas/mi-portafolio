import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Projects stacked in depth: the current one faces the visitor, the others
// tilt away above and below. Wheel, trackpad, swipe and arrow keys move one
// project at a time, right away. Used by the Work window and the phone home.
export default function ProjectStack({ list, resetKey = 'all', label = 'All projects', headingLevel = 2 }) {
  const [pos, setPos] = useState({ key: resetKey, i: 0 })
  const index = pos.key === resetKey ? pos.i : 0
  const i = Math.min(index, list.length - 1)
  const listRef = useRef(list)
  const stageRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    listRef.current = list
  }, [list])

  const step = (dir) =>
    setPos((s) => {
      const cur = s.key === resetKey ? s.i : 0
      const n = listRef.current.length
      return { key: resetKey, i: Math.max(0, Math.min(n - 1, Math.min(cur, n - 1) + dir)) }
    })
  const go = (k) => setPos({ key: resetKey, i: k })

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    let acc = 0
    let last = 0
    const onWheel = (e) => {
      e.preventDefault()
      acc += e.deltaY
      const now = performance.now()
      if (Math.abs(acc) >= 30 && now - last > 110) {
        step(acc > 0 ? 1 : -1)
        acc = 0
        last = now
      }
    }
    let startY = null
    let moved = false
    const onDown = (e) => {
      startY = e.clientY
      moved = false
    }
    const onMove = (e) => {
      if (startY === null) return
      const d = startY - e.clientY
      if (Math.abs(d) > 55) {
        step(d > 0 ? 1 : -1)
        startY = e.clientY
        moved = true
      }
    }
    const onUp = () => {
      startY = null
    }
    // A swipe should not also count as a tap on the card under the finger.
    const onClickCapture = (e) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('click', onClickCapture, true)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('click', onClickCapture, true)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey])

  const onKeyDown = (e) => {
    const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!k) return
    e.preventDefault()
    const next = Math.max(0, Math.min(list.length - 1, i + k))
    go(next)
    stageRef.current?.querySelectorAll('.card')[next]?.focus({ preventScroll: true })
  }

  const current = list[i]
  const H = `h${headingLevel}`

  return (
    <>
      <div className="work__info" aria-live="polite">
        <p className="work__hint">Scroll, swipe or use the arrow keys to browse</p>
        {current && (
          <>
            <H className="work__name">{current.title}</H>
            <p className="work__kind">{current.kind}</p>
            <p className="work__cats">{current.categories.join(', ')}</p>
            {current.link ? (
              <Link className="btn" to={current.link}>
                Open case study
              </Link>
            ) : (
              <a className="btn" href={current.externalUrl} target="_blank" rel="noopener noreferrer">
                Open the Lab<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </>
        )}
      </div>

      <div className="work__stage" ref={stageRef} onKeyDown={onKeyDown}>
        <ul aria-label={label}>
          {list.map((p, k) => {
            const d = k - i
            const a = Math.abs(d)
            return (
              <li
                key={p.slug}
                className="card-wrap"
                style={{
                  transform: `translateY(${d * 64}%) translateZ(${-a * 90}px) rotateX(${-d * 28}deg) scale(${1 - a * 0.06})`,
                  opacity: a > 2 ? 0 : 1 - a * 0.16,
                  zIndex: 10 - a,
                  visibility: a > 2 ? 'hidden' : 'visible',
                }}
              >
                <a
                  className="card"
                  href={p.link || p.externalUrl}
                  aria-current={d === 0 ? 'true' : undefined}
                  tabIndex={d === 0 ? 0 : -1}
                  onFocus={() => go(k)}
                  onClick={(e) => {
                    if (d !== 0) {
                      e.preventDefault()
                      go(k)
                    } else if (p.link) {
                      e.preventDefault()
                      navigate(p.link)
                    }
                  }}
                  {...(p.link ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <img src={p.cover} alt="" width="800" height="600" loading={a > 1 ? 'lazy' : 'eager'} draggable="false" />
                  <span className="sr-only">{p.title}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
