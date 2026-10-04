import { useEffect, useRef } from 'react'

const GRAIN_SIZE = 160
const LERP_FACTOR = 0.06
// current/target are normalized (0-1) positions — below this distance a
// frame's redraw would be visually indistinguishable from the last one
// (well under a pixel even on a large display), so skip it instead of
// repainting two full-viewport fillRects for a sub-pixel nudge.
const SETTLE_EPSILON = 0.0005

// Brand yellow/lilac at the center, fading out to each theme's own --color-bg
// at the edge so the canvas blends seamlessly into the page.
const STOPS_DARK = ['#EFD86D', '#AAB6E1', '#242428', '#1C1C1E']
const STOPS_LIGHT = ['#EFD86D', '#AAB6E1', '#F3ECD9', '#F9F2E2']

function lerp(a, b, t) {
  return a + (b - a) * t
}

export function useGrainCanvas(canvasRef) {
  const target = useRef({ x: 0.5, y: 0.5 })
  const current = useRef({ x: 0.5, y: 0.5 })
  const grainCanvas = useRef(null)
  const patternRef = useRef(null)
  const rectRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Create offscreen grain canvas (160x160, 1px noise, alpha 18)
    const grain = document.createElement('canvas')
    grain.width = GRAIN_SIZE
    grain.height = GRAIN_SIZE
    grainCanvas.current = grain

    const grainCtx = grain.getContext('2d')
    const imageData = grainCtx.createImageData(GRAIN_SIZE, GRAIN_SIZE)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255
      data[i] = v
      data[i + 1] = v
      data[i + 2] = v
      data[i + 3] = 18
    }
    grainCtx.putImageData(imageData, 0, 0)

    // Create tiling pattern from the grain canvas
    patternRef.current = ctx.createPattern(grain, 'repeat')

    // Resize handler — also caches the canvas's bounding rect so mousemove
    // never has to call getBoundingClientRect() itself (a layout read that,
    // fired on every pointer move while GSAP writes inline styles elsewhere
    // on the page, risks forcing synchronous layout mid-frame).
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      rectRef.current = canvas.getBoundingClientRect()
      // Recreate pattern after resize (context resets)
      patternRef.current = ctx.createPattern(grainCanvas.current, 'repeat')
      drawFrame()
    }

    const onMouseMove = (e) => {
      const rect = rectRef.current
      if (!rect) return
      target.current.x = (e.clientX - rect.left) / rect.width
      target.current.y = (e.clientY - rect.top) / rect.height
    }

    // One actual canvas repaint — clear, gradient, grain. Pulled out of the
    // rAF loop so both the loop and a one-off "draw a single static frame"
    // path (reduced motion, or the initial paint) can share it.
    const drawFrame = () => {
      const { width, height } = canvas
      const cx = current.current.x * width
      const cy = current.current.y * height

      const theme = document.documentElement.getAttribute('data-theme')
      const isDark = theme !== 'light'
      const stops = isDark ? STOPS_DARK : STOPS_LIGHT

      ctx.clearRect(0, 0, width, height)

      const radius = Math.max(width, height) * 0.9
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
      gradient.addColorStop(0, stops[0])
      gradient.addColorStop(0.22, stops[1])
      gradient.addColorStop(0.55, stops[2])
      gradient.addColorStop(1, stops[3])

      ctx.globalAlpha = 1
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      ctx.globalAlpha = isDark ? 0.5 : 0.18
      ctx.fillStyle = patternRef.current
      ctx.fillRect(0, 0, width, height)
    }

    let raf = null
    let visible = false
    // The animated cursor-follow glow is purely decorative motion — honor
    // prefers-reduced-motion by painting one still frame instead of
    // running the loop at all. Mutable (not const) so a live OS-setting
    // change mid-session is picked up by the closures below.
    let reducedMotion = reducedMotionQuery.matches

    const render = () => {
      current.current.x = lerp(current.current.x, target.current.x, LERP_FACTOR)
      current.current.y = lerp(current.current.y, target.current.y, LERP_FACTOR)

      const dx = Math.abs(current.current.x - target.current.x)
      const dy = Math.abs(current.current.y - target.current.y)

      // Keep looping (to keep chasing the cursor) even on a settled frame,
      // but only pay for an actual repaint when the position has moved
      // enough to matter — most frames during a plain scroll, with no
      // mouse movement, hit this and cost nothing beyond the rAF tick.
      if (dx > SETTLE_EPSILON || dy > SETTLE_EPSILON) {
        drawFrame()
      }

      if (visible && !reducedMotion) raf = requestAnimationFrame(render)
    }

    const startLoop = () => {
      if (raf || reducedMotion) return
      raf = requestAnimationFrame(render)
    }

    const stopLoop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = null
    }

    // Only animate/repaint while the hero is actually on screen — once it's
    // scrolled past (even just covered by the next sticky section, which
    // this canvas doesn't know about on its own) there's no visual reason
    // to keep redrawing a full-viewport canvas 60 times a second.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          window.addEventListener('mousemove', onMouseMove, { passive: true })
          if (reducedMotion) drawFrame()
          else startLoop()
        } else {
          window.removeEventListener('mousemove', onMouseMove)
          stopLoop()
        }
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    resize()
    window.addEventListener('resize', resize)

    const onMotionChange = () => {
      reducedMotion = reducedMotionQuery.matches
      stopLoop()
      if (visible) {
        if (reducedMotion) drawFrame()
        else startLoop()
      }
    }
    reducedMotionQuery.addEventListener('change', onMotionChange)

    return () => {
      stopLoop()
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      reducedMotionQuery.removeEventListener('change', onMotionChange)
    }
  }, [canvasRef])
}
