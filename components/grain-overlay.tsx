/**
 * Static film-grain overlay.
 *
 * The noise is baked into a small repeating SVG tile passed as a data URI
 * rather than a full-viewport <feTurbulence> filter. A viewport-sized filter
 * is re-rasterised on every resize and is one of the most expensive things
 * you can put on a page; a 200x200 tile is rasterised once and then simply
 * repeated by the compositor.
 */
const NOISE_TILE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>`

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.045]"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(NOISE_TILE)}")`,
        backgroundRepeat: 'repeat',
      }}
    />
  )
}
