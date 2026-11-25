/* eslint-disable react-refresh/only-export-components */
import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from 'react'

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

const rectOf = (x) => {
  if (!x) return null
  const r = typeof x.getBoundingClientRect === 'function' ? x.getBoundingClientRect() : x
  return r && r.width && r.height ? { left: r.left, top: r.top, width: r.width, height: r.height } : null
}

// The part of a (possibly very tall) window that is on screen.
export function visibleRect(el) {
  const r = el.getBoundingClientRect()
  const top = Math.max(r.top, 0)
  const bottom = Math.min(r.bottom, window.innerHeight)
  return { left: r.left, top, width: r.width, height: Math.max(bottom - top, 1) }
}

const toTransform = (from, to) =>
  `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`

/* ----- Where windows come from and go back to ----- */

// Desktop files and the current Work card report where they are, so a case
// study can grow out of them and shrink back into them, even after the
// desktop under it has changed page.
const fileRects = new Map()
let cardRect = null
let stackFocus = null
let skipNextGrow = false
const origins = new Map()

export const rememberFile = (slug, el) => {
  const r = rectOf(el)
  if (r) fileRects.set(slug, r)
}
export const rememberCard = (el) => {
  const r = rectOf(el)
  if (r) cardRect = r
}
export const takeStackFocus = () => {
  const s = stackFocus
  stackFocus = null
  return s
}

/** Call right before navigating to a case study. */
export function openCaseFrom(slug, originEl, from) {
  origins.set(slug, { rect: rectOf(originEl), from })
}

const homeOf = (slug) => origins.get(slug) || { from: '/work' }

/** Where a closing case study should land, and which page to show after. */
function backTarget(slug) {
  const { from } = homeOf(slug)
  if (from === '/' && fileRects.get(slug)) return { from, rect: fileRects.get(slug) }
  if (from === '/work' && cardRect) {
    stackFocus = slug
    return { from, rect: cardRect }
  }
  return { from: from || '/work', rect: rectOf(document.querySelector('[data-origin="work"]')) }
}

/* ----- Animations ----- */

// Grows a window out of the element (or rect) it was opened from, the same
// "genie" feel as the reference video.
export function growFrom(el, origin, { duration = 420 } = {}) {
  const a = rectOf(origin)
  if (!el || !a || reduced()) return null
  const b = rectOf(el)
  if (!b) return null
  const dx = a.left + a.width / 2 - (b.left + b.width / 2)
  const dy = a.top + a.height / 2 - (b.top + b.height / 2)
  return el.animate(
    [
      { transform: `translate(${dx}px, ${dy}px) scale(${a.width / b.width}, ${a.height / b.height})`, opacity: 0.3 },
      { transform: 'none', opacity: 1 },
    ],
    { duration, easing: 'cubic-bezier(.2,.8,.2,1)' },
  )
}

export function shrinkTo(el, origin, done) {
  const a = rectOf(origin)
  if (!el || !a || reduced()) return done()
  const b = el.getBoundingClientRect()
  const dx = a.left + a.width / 2 - (b.left + b.width / 2)
  const dy = a.top + a.height / 2 - (b.top + b.height / 2)
  const anim = el.animate(
    [
      { transform: 'none', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(${a.width / b.width}, ${a.height / b.height})`, opacity: 0 },
    ],
    { duration: 320, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' },
  )
  anim.onfinish = done
}

// A case study is taller than the screen. To move it as one window, pin
// the visible part in place, keep its scroll position inside, and animate
// that. `restore` puts it back in the page.
function pin(el) {
  const r = visibleRect(el)
  const wasFixed = getComputedStyle(el).position === 'fixed'
  const offset = wasFixed ? el.scrollTop : Math.max(0, -el.getBoundingClientRect().top)
  const prev = el.getAttribute('style') || ''
  // Hold the window's place in the page so nothing below it jumps.
  let spacer = null
  if (!wasFixed) {
    const cs = getComputedStyle(el)
    spacer = document.createElement('div')
    spacer.setAttribute('aria-hidden', 'true')
    spacer.style.height = `${el.offsetHeight}px`
    spacer.style.marginTop = cs.marginTop
    spacer.style.marginBottom = cs.marginBottom
    el.parentNode.insertBefore(spacer, el)
  }
  Object.assign(el.style, {
    position: 'fixed',
    left: `${r.left}px`,
    top: `${r.top}px`,
    width: `${r.width}px`,
    height: `${r.height}px`,
    margin: '0',
    maxWidth: 'none',
    overflow: 'hidden',
    zIndex: '60',
    transformOrigin: '0 0',
  })
  el.scrollTop = offset
  return {
    rect: r,
    restore: () => {
      el.setAttribute('style', prev)
      spacer?.remove()
    },
    dropSpacer: () => spacer?.remove(),
  }
}

/** Grow a case study out of the rect it was opened from. */
export function growCase(el, slug) {
  const o = origins.get(slug)
  if (!el || !o?.rect || reduced()) return
  const fixed = getComputedStyle(el).position === 'fixed'
  const p = fixed ? { rect: rectOf(el), restore: () => {} } : pin(el)
  if (fixed) el.style.transformOrigin = '0 0'
  const anim = el.animate(
    [
      { transform: toTransform(o.rect, p.rect), opacity: 0.35, borderRadius: '14px' },
      { transform: 'none', opacity: 1 },
    ],
    { duration: 460, easing: 'cubic-bezier(.2,.8,.2,1)' },
  )
  anim.onfinish = anim.oncancel = p.restore
  origins.set(slug, { ...o, rect: null })
}

/** Shrink a case study back to its folder or card, then call done(page). */
export function closeCase(el, slug, done) {
  const { from, rect } = backTarget(slug)
  skipNextGrow = from !== '/'
  if (!el || !rect || reduced()) return done(from)
  const p = pin(el)
  const anim = el.animate(
    [
      { transform: 'none', opacity: 1 },
      { transform: toTransform(rect, p.rect), opacity: 0.15 },
    ],
    { duration: 380, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' },
  )
  anim.onfinish = () => {
    done(from)
    requestAnimationFrame(() => requestAnimationFrame(p.dropSpacer))
  }
}

/** Shrink any window into a rect (used for the dock). */
export function shrinkInto(el, rect, done) {
  if (!el || !rect || reduced()) return done()
  const tall = el.getBoundingClientRect().height > window.innerHeight
  const p = tall ? pin(el) : null
  const r = p ? p.rect : rectOf(el)
  if (!p) el.style.transformOrigin = '0 0'
  const anim = el.animate(
    [
      { transform: 'none', opacity: 1 },
      { transform: toTransform(rect, r), opacity: 0.1 },
    ],
    { duration: 380, easing: 'cubic-bezier(.55,0,.75,.4)', fill: 'forwards' },
  )
  anim.onfinish = () => {
    done()
    if (p) requestAnimationFrame(() => requestAnimationFrame(p.dropSpacer))
  }
}

/** Smoothly move a window between two sizes (zoom and restore). */
export function useZoomMotion(ref, zoomed) {
  const before = useRef(null)
  const first = useRef(true)
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const el = ref.current
    const a = before.current
    before.current = null
    if (!el || !a || reduced()) return
    const b = visibleRect(el)
    el.animate(
      [
        { transform: toTransform(a, b), transformOrigin: `0 ${b.top - el.getBoundingClientRect().top}px` },
        { transform: 'none', transformOrigin: `0 ${b.top - el.getBoundingClientRect().top}px` },
      ],
      { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)' },
    )
  }, [ref, zoomed])
  // Call before changing the zoom state.
  return () => {
    if (ref.current) before.current = visibleRect(ref.current)
  }
}

// Route windows (Work, About, Contact) grow from the nav pill that opened
// them, but not on a direct page load, where they should just be there,
// and not when a case study has just shrunk back into them.
let routeOrigin = null
export const setRouteOrigin = (rect) => {
  routeOrigin = rect
}

export function useGrowFromNav(ref, name) {
  useLayoutEffect(() => {
    if (routeOrigin) {
      growFrom(ref.current, routeOrigin)
      routeOrigin = null
      skipNextGrow = false
      return
    }
    if (!firstPaintDone) return
    if (skipNextGrow) {
      skipNextGrow = false
      return
    }
    growFrom(ref.current, document.querySelector(`[data-origin="${name}"]`))
  }, [ref, name])
}

export function useWindowRef() {
  return useRef(null)
}

/* ----- Clicking the desktop around a window closes it ----- */

const IGNORE = 'a, button, input, textarea, select, label, summary, [role="button"], .glass, .dock, .file, .lights'

export function useCloseOnOutside(ref, onClose, enabled = true) {
  const cb = useRef(onClose)
  useEffect(() => {
    cb.current = onClose
  })
  useEffect(() => {
    if (!enabled) return
    const onDown = (e) => {
      if (e.button !== 0) return
      const t = e.target
      if (!(t instanceof Element)) return
      if (ref.current?.contains(t) || t.closest(IGNORE) || t.closest('.win')) return
      cb.current()
    }
    // Let the click that opened the window finish first.
    const id = setTimeout(() => window.addEventListener('pointerdown', onDown), 0)
    return () => {
      clearTimeout(id)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [ref, enabled])
}

/* ----- Dock for minimized windows ----- */

let dock = []
const subs = new Set()
const emit = () => subs.forEach((f) => f())

export const dockStore = {
  add(item) {
    dock = [...dock.filter((d) => d.key !== item.key), item]
    emit()
  },
  remove(key) {
    dock = dock.filter((d) => d.key !== key)
    emit()
  },
  subscribe(f) {
    subs.add(f)
    return () => subs.delete(f)
  },
  get: () => dock,
}

export const useDock = () => useSyncExternalStore(dockStore.subscribe, dockStore.get, dockStore.get)

/** Put a window in the dock: add it, then shrink the window into its slot. */
export function minimizeToDock(el, item, done) {
  // The window underneath (Work) is already open in the visitor's mind.
  if (item.from && item.from !== '/') skipNextGrow = true
  dockStore.add(item)
  requestAnimationFrame(() => {
    const slot = document.querySelector(`[data-dock="${CSS.escape(item.key)}"]`)
    shrinkInto(el, rectOf(slot), done)
  })
}

/** Remember where a case study came from, before the dock reopens it. */
export function restoreCaseFrom(slug, rect, from) {
  origins.set(slug, { rect, from })
}
export const caseHome = (slug) => homeOf(slug).from
