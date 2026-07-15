import { useCallback, useRef } from 'react'

// Figures out which edge of the element the cursor is closest to, so the
// hover-fill can grow from that edge (where the cursor entered) and shrink
// back toward whichever edge the cursor left from — the classic
// "direction aware" button hover effect.
function closestEdge(e, el) {
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const distances = {
    top: y,
    bottom: rect.height - y,
    left: x,
    right: rect.width - x,
  }
  return Object.keys(distances).reduce((a, b) =>
    distances[a] < distances[b] ? a : b
  )
}

// Attach the returned ref + handlers to any element with the `.btn-fill`
// class (see index.css) to get a rounded button whose fill grows in from
// whichever side the cursor entered, and recedes toward whichever side it
// left from.
export default function useFillHover() {
  const ref = useRef(null)

  const onMouseEnter = useCallback((e) => {
    const el = ref.current
    if (!el) return
    el.dataset.fillDir = closestEdge(e, el)
    requestAnimationFrame(() => el.classList.add('is-filled'))
  }, [])

  const onMouseLeave = useCallback((e) => {
    const el = ref.current
    if (!el) return
    el.dataset.fillDir = closestEdge(e, el)
    requestAnimationFrame(() => el.classList.remove('is-filled'))
  }, [])

  return { ref, onMouseEnter, onMouseLeave }
}
