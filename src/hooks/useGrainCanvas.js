import { useEffect, useRef } from 'react'

const GRAIN_SIZE = 160
const LERP_FACTOR = 0.06

const STOPS_DARK = ['#FF8A3D', '#2A4D7A', '#15151A', '#0B0B0D']
// More saturated than a straight pastel tint of the dark stops — the
// original ('#FFD9B8'/'#BFD4EE') read as almost gray on a light background.
const STOPS_LIGHT = ['#FFA366', '#6E93C2', '#F4F1EC', '#FAFAF8']

function lerp(a, b, t) {
  return a + (b - a) * t
}

export function useGrainCanvas(canvasRef) {
  const target = useRef({ x: 0.5, y: 0.5 })
  const current = useRef({ x: 0.5, y: 0.5 })
  const grainCanvas = useRef(null)
  const patternRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

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

    // Resize handler
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      // Recreate pattern after resize (context resets)
      patternRef.current = ctx.createPattern(grainCanvas.current, 'repeat')
    }
    resize()
    window.addEventListener('resize', resize)

    // Mouse move — store normalized target position
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      target.current.x = (e.clientX - rect.left) / rect.width
      target.current.y = (e.clientY - rect.top) / rect.height
    }
    window.addEventListener('mousemove', onMouseMove)

    let raf
    const render = () => {
      const { width, height } = canvas

      // Lerp current position toward target
      current.current.x = lerp(current.current.x, target.current.x, LERP_FACTOR)
      current.current.y = lerp(current.current.y, target.current.y, LERP_FACTOR)

      const cx = current.current.x * width
      const cy = current.current.y * height

      // Detect theme
      const theme = document.documentElement.getAttribute('data-theme')
      const isDark = theme !== 'light'
      const stops = isDark ? STOPS_DARK : STOPS_LIGHT

      // Clear
      ctx.clearRect(0, 0, width, height)

      // Radial gradient — radius = 90% of longest side
      const radius = Math.max(width, height) * 0.9
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
      gradient.addColorStop(0, stops[0])
      gradient.addColorStop(0.22, stops[1])
      gradient.addColorStop(0.55, stops[2])
      gradient.addColorStop(1, stops[3])

      ctx.globalAlpha = 1
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Grain overlay — tiled pattern with theme-dependent opacity
      ctx.globalAlpha = isDark ? 0.5 : 0.18
      ctx.fillStyle = patternRef.current
      ctx.fillRect(0, 0, width, height)

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [canvasRef])
}
