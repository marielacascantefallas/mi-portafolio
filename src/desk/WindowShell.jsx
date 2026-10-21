/* eslint-disable react-refresh/only-export-components */
import { useLayoutEffect, useRef } from 'react'

// Window chrome: the red / orange / green controls she designed for the
// top-left corner (close, minimize, zoom). Each button has a 24px target
// with a 13px dot, so they meet WCAG 2.2 target size.
export function Lights({ onClose, onMinimize, onZoom, zoomLabel = 'Zoom window' }) {
  return (
    <div className="lights">
      <button type="button" className="lights__btn lights__btn--close" onClick={onClose} aria-label="Close window">
        <span aria-hidden="true" />
      </button>
      <button type="button" className="lights__btn lights__btn--min" onClick={onMinimize} aria-label="Minimize window">
        <span aria-hidden="true" />
      </button>
      <button type="button" className="lights__btn lights__btn--zoom" onClick={onZoom} aria-label={zoomLabel}>
        <span aria-hidden="true" />
      </button>
    </div>
  )
}

let firstPaintDone = false
export const markFirstPaint = () => {
  firstPaintDone = true
}

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Grows a window out of the element it was opened from (a desktop file or
// a nav pill), the same "genie" feel as the reference video.
export function growFrom(el, originEl, { duration = 420 } = {}) {
  if (!el || !originEl || reduced()) return null
  const a = originEl.getBoundingClientRect()
  const b = el.getBoundingClientRect()
  if (!a.width || !b.width) return null
  const dx = a.left + a.width / 2 - (b.left + b.width / 2)
  const dy = a.top + a.height / 2 - (b.top + b.height / 2)
  const sx = a.width / b.width
  const sy = a.height / b.height
  return el.animate(
    [
      { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, opacity: 0.3 },
      { transform: 'none', opacity: 1 },
    ],
    { duration, easing: 'cubic-bezier(.2,.8,.2,1)' },
  )
}

export function shrinkTo(el, originEl, done) {
  if (!el || !originEl || reduced()) return done()
  const a = originEl.getBoundingClientRect()
  const b = el.getBoundingClientRect()
  const dx = a.left + a.width / 2 - (b.left + b.width / 2)
  const dy = a.top + a.height / 2 - (b.top + b.height / 2)
  const anim = el.animate(
    [
      { transform: 'none', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(${a.width / b.width}, ${a.height / b.height})`, opacity: 0 },
    ],
    { duration: 300, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' },
  )
  anim.onfinish = done
}

// Route windows (Work, About, Contact) grow from the nav pill that opened
// them, but not on a direct page load, where they should just be there.
export function useGrowFromNav(ref, name) {
  useLayoutEffect(() => {
    if (!firstPaintDone) return
    growFrom(ref.current, document.querySelector(`[data-origin="${name}"]`))
  }, [ref, name])
}

export function useWindowRef() {
  return useRef(null)
}
