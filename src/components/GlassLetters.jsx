// Renders pre-rendered glyph artwork (see heroGlyphPaths.js) as real SVG
// paths — not a CSS mask — so the "liquid glass" material can follow the
// actual letter contours: a gradient-stroked edge that catches light from
// the top-left, and an SVG filter that fakes a glass bevel (a bright
// highlight on upper-left-facing edges, a dark one on lower-right-facing
// edges) using feSpecularLighting against the letterforms' own alpha —
// works on arbitrarily complex compound paths because it operates on the
// rasterized shape, not the path geometry itself.
//
// This is layered OVER a separate masked/backdrop-blurred div (see
// Hero.css's .hero-glass-backdrop) that supplies the "see the blurred,
// saturated background through the glass" part — backdrop-filter has no
// equivalent inside an SVG filter graph, so that half of the effect has to
// stay a plain HTML element. This component only draws what the glass's
// own surface does: edge glow, bevel, diagonal sheen, outer drop shadow.
//
// bevelStdDeviation/bevelSurfaceScale/edgeStrokeWidth are all in the same
// units as the artwork's own viewBox, so the title (a ~1632-tall viewBox)
// and the much smaller subtitle (~171-tall) need proportionally different
// values passed in by the caller — there's no single default that reads
// right at both scales.
export default function GlassLetters({
  id,
  viewBox,
  groups,
  className,
  edgeStrokeWidth,
  bevelStdDeviation,
  bevelSurfaceScale,
}) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-edge`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="glass-letters__edge-stop-hi" />
          <stop offset="45%" className="glass-letters__edge-stop-mid" />
          <stop offset="100%" className="glass-letters__edge-stop-lo" />
        </linearGradient>

        <linearGradient id={`${id}-sheen`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="28%" stopColor="#fff" stopOpacity="0" />
          <stop offset="47%" className="glass-letters__sheen-stop" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        {/* Faux glass bevel: blurs the shape's own alpha into a height map,
            then lights it from two opposite directions — white from the
            top-left (the highlight) and black from the bottom-right (the
            inner shadow) — each clipped back to the letterforms so neither
            lighting pass bleeds past the glyph edges. */}
        <filter
          id={`${id}-bevel`}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceAlpha" stdDeviation={bevelStdDeviation} result="blur" />
          <feSpecularLighting
            in="blur"
            surfaceScale={bevelSurfaceScale}
            specularConstant="0.9"
            specularExponent="14"
            lightingColor="#ffffff"
            result="specLight"
          >
            <feDistantLight azimuth="235" elevation="55" />
          </feSpecularLighting>
          <feComposite in="specLight" in2="SourceAlpha" operator="in" result="specLightClipped" />

          <feSpecularLighting
            in="blur"
            surfaceScale={bevelSurfaceScale}
            specularConstant="0.6"
            specularExponent="14"
            lightingColor="#000000"
            result="specShadow"
          >
            <feDistantLight azimuth="55" elevation="55" />
          </feSpecularLighting>
          <feComposite in="specShadow" in2="SourceAlpha" operator="in" result="specShadowClipped" />

          <feMerge>
            <feMergeNode in="specShadowClipped" />
            <feMergeNode in="specLightClipped" />
          </feMerge>
        </filter>
      </defs>

      {groups.map((g, i) => (
        <g key={i} transform={g.transform}>
          {/* Faint base tint — most of the "fill" is actually the backdrop
              layer showing through; this just keeps the glass attached to
              its own shape instead of reading as a pure outline. */}
          <path d={g.d} className="glass-letters__fill" />
          {/* Bevel: highlight (top-left) + inner shadow (bottom-right). */}
          <path d={g.d} className="glass-letters__bevel" filter={`url(#${id}-bevel)`} fill="#fff" />
          {/* Luminous edge, traced on the real glyph outline. */}
          <path
            d={g.d}
            className="glass-letters__edge"
            stroke={`url(#${id}-edge)`}
            strokeWidth={edgeStrokeWidth}
            fill="none"
          />
          {/* Soft diagonal sheen crossing the whole line of letters. */}
          <path d={g.d} className="glass-letters__sheen" fill={`url(#${id}-sheen)`} />
        </g>
      ))}
    </svg>
  )
}
