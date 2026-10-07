import { useEffect, useId, useRef, useState } from 'react'
import './Sparkles.css'

// A 4-point "twinkle" star: 4 long tips (N/E/S/W) with 4 short concave
// waists at the diagonals — the classic sparkle/shuriken silhouette.
const STAR_PATH =
  'M12 0 L13.77 10.23 L24 12 L13.77 13.77 L12 24 L10.23 13.77 L0 12 L10.23 10.23 Z'

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

// Reusable animated sparkle field — a moderate number of small 4-point
// stars that fade in, drift, pulse and fade out on an infinite loop, each
// with its own randomized size/speed/delay so the field doesn't read as a
// repeating pattern. Used behind the About hero (Fase "destellos") and
// behind the hamburger menu overlay; same component, same look, both call
// sites just position/size it differently via `className`.
//
// Perf/a11y, all required by design:
// - CSS-only animation of transform + opacity (GPU-composited), no canvas,
//   no animation library, no per-frame JS.
// - Pauses (animation-play-state) rather than unmounting when `active` is
//   false or the field scrolls out of view (IntersectionObserver) — cheap
//   to resume, no layout thrash from mount/unmount.
// - prefers-reduced-motion: reduce swaps the animation for a static dim
//   sparkle, handled entirely in CSS (see Sparkles.css).
// - aria-hidden, pointer-events: none, position: absolute (contributes no
//   layout, so it can't shift the headline/photo or delay LCP), and
//   overflow: hidden on its own box so drifting stars can't cause
//   horizontal scroll.
//
// Tuning knobs:
// - `count` / `mobileCount` (props): how many stars render in total vs.
//   how many stay visible at <=640px (the rest are just display:none'd,
//   no resize listener needed).
// - --sparkle-size-min / --sparkle-size-max (px), --sparkle-duration-min /
//   --sparkle-duration-max (s), --sparkle-opacity-max, --sparkle-drift
//   (px): CSS custom properties with site-wide defaults in Sparkles.css —
//   override them on a wrapping class (see .about__sparkles,
//   .nav-overlay__sparkles) to retune a specific usage without touching
//   this file.
export default function Sparkles({ count = 22, mobileCount = 10, active = true, className = '' }) {
  const rawId = useId()
  const symbolId = `sparkle-star-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`
  const rootRef = useRef(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Randomized per star (position/size/speed/delay/color) so the field
  // doesn't read as a repeating pattern. Math.random() is an impure call,
  // so it can't run inline during render or inside useMemo (render,
  // useMemo included, must stay pure — React may invoke it more than
  // once) — useState's lazy initializer is the one render-phase hook
  // explicitly meant for a one-time-per-mount computation like this.
  const [stars] = useState(() =>
    Array.from({ length: count }, () => ({
      left: randomBetween(4, 96),
      top: randomBetween(4, 96),
      sizeT: Math.random(),
      durT: Math.random(),
      delay: randomBetween(0, 6),
      driftX: randomBetween(-1, 1),
      driftY: randomBetween(-1, 1),
      isAccent: Math.random() < 0.55,
    }))
  )

  const running = active && inView

  return (
    <div
      ref={rootRef}
      className={`sparkles ${running ? '' : 'sparkles--paused'} ${className}`}
      aria-hidden="true"
    >
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <symbol id={symbolId} viewBox="0 0 24 24">
            <path d={STAR_PATH} />
          </symbol>
        </defs>
      </svg>
      {stars.map((s, i) => (
        <span
          key={i}
          className={[
            'sparkles__star',
            i >= mobileCount ? 'sparkles__star--desktop-only' : '',
            s.isAccent ? 'sparkles__star--accent' : 'sparkles__star--yellow',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            '--size-t': s.sizeT,
            '--dur-t': s.durT,
            '--delay': `${s.delay}s`,
            '--drift-x': s.driftX,
            '--drift-y': s.driftY,
          }}
        >
          <svg className="sparkles__star-svg" viewBox="0 0 24 24">
            <use href={`#${symbolId}`} />
          </svg>
        </span>
      ))}
    </div>
  )
}
