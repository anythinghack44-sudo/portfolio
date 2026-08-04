/**
 * Abstract geometric graphics for the Lab cards.
 *
 * These are hand-authored inline SVG because they are purely abstract
 * compositions — lines, grids, and circles. Inline (rather than <img>) so they
 * inherit currentColor and can be animated later without a second request.
 */
import type { Experiment } from '@/lib/content'

const STROKE = 'stroke-foreground/60'

function WaveFold() {
  // 24 vertical lines that progressively bend into a sine wave.
  const lines = Array.from({ length: 24 }, (_, i) => {
    const x = 6 + i * 4
    const amp = Number(((i / 23) ** 2 * 9).toFixed(2))
    return (
      <path
        key={i}
        d={`M${x} 6 C ${(x + amp).toFixed(2)} 26, ${(x - amp).toFixed(2)} 48, ${x} 68`}
        className={STROKE}
        strokeWidth="0.6"
        fill="none"
      />
    )
  })
  return (
    <svg viewBox="0 0 104 74" className="w-full" aria-hidden="true">
      {lines}
    </svg>
  )
}

function Orbital() {
  return (
    <svg viewBox="0 0 104 104" className="w-full" aria-hidden="true">
      <circle cx="26" cy="24" r="14" className="fill-foreground/90" />
      <path d="M84 22h10M89 17v10" className={STROKE} strokeWidth="1" />
      <rect x="46" y="34" width="30" height="42" className="fill-foreground/15" />
      <rect x="58" y="56" width="26" height="34" className="fill-foreground/90" />
      <path d="M22 58h40" className={STROKE} strokeWidth="1" />
    </svg>
  )
}

function PixelShift() {
  // 12x11 dot grid with a rectangular void punched out of the middle.
  const dots = []
  for (let r = 0; r < 11; r++) {
    for (let c = 0; c < 12; c++) {
      const hole = r > 3 && r < 7 && c > 3 && c < 9
      if (hole && !(r === 5 && c === 6)) continue
      dots.push(
        <rect key={`${r}-${c}`} x={4 + c * 8} y={4 + r * 8} width="3.5" height="3.5" className="fill-foreground/90" />,
      )
    }
  }
  return (
    <svg viewBox="0 0 104 96" className="w-full" aria-hidden="true">
      {dots}
    </svg>
  )
}

function Intersect() {
  return (
    <svg viewBox="0 0 104 118" className="w-full" aria-hidden="true">
      <circle cx="52" cy="42" r="30" className={STROKE} strokeWidth="0.8" fill="none" />
      <circle cx="52" cy="76" r="30" className={STROKE} strokeWidth="0.8" fill="none" />
      <path
        d="M52 46a30 30 0 0 0 0 26 30 30 0 0 0 0-26"
        className="fill-foreground/25"
      />
      <path d="M52 4v110" className={STROKE} strokeWidth="0.8" strokeDasharray="2 4" />
      <circle cx="52" cy="6" r="1.6" className="fill-foreground" />
      <circle cx="52" cy="112" r="1.6" className="fill-foreground" />
    </svg>
  )
}

function RayTrace() {
  // Radial fan emanating from a point on the left edge.
  const rays = Array.from({ length: 30 }, (_, i) => {
    const angle = (-58 + (i / 29) * 116) * (Math.PI / 180)
    return (
      <path
        key={i}
        // Rounded so server and client render byte-identical path data.
        d={`M8 44 L${(8 + Math.cos(angle) * 96).toFixed(2)} ${(44 + Math.sin(angle) * 96).toFixed(2)}`}
        className={STROKE}
        strokeWidth="0.5"
      />
    )
  })
  return (
    <svg viewBox="0 0 104 88" className="w-full" aria-hidden="true">
      {rays}
      <path d="M8 44h92" className="stroke-foreground" strokeWidth="0.9" />
      <circle cx="8" cy="44" r="4" className="fill-foreground" />
    </svg>
  )
}

function LayerBreak() {
  return (
    <svg viewBox="0 0 104 72" className="w-full" aria-hidden="true">
      <rect x="4" y="6" width="16" height="26" className="fill-foreground/90" />
      <rect x="4" y="38" width="10" height="28" className="fill-foreground/90" />
      <rect x="22" y="34" width="12" height="18" className="fill-foreground/90" />
      <rect x="38" y="8" width="34" height="34" className="fill-foreground/20" />
      <path d="M14 34h30" className={STROKE} strokeWidth="0.8" />
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M${74 + i * 2.4} 26v18`} className={STROKE} strokeWidth="0.7" />
      ))}
      <path d="M92 4v56M99 10v44" className={STROKE} strokeWidth="0.8" />
    </svg>
  )
}

const GRAPHICS: Record<Experiment['graphic'], () => React.JSX.Element> = {
  wave: WaveFold,
  orbital: Orbital,
  pixel: PixelShift,
  intersect: Intersect,
  ray: RayTrace,
  layer: LayerBreak,
}

export function LabGraphic({ name }: { name: Experiment['graphic'] }) {
  const Graphic = GRAPHICS[name]
  return <Graphic />
}
