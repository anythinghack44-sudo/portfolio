"use client";

/**
 * Animated film-grain overlay.
 *
 * The noise is baked into a small repeating SVG tile passed as a data URI
 * rather than a full-viewport <feTurbulence> filter. This avoids heavy
 * repainting. We animate a slight hardware-accelerated transform to simulate
 * dynamic film jitter.
 */
const NOISE_TILE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>`

export function GrainOverlay() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes grain-jitter {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-20px, -20px); }
          20% { transform: translate(-40px, 20px); }
          30% { transform: translate(20px, -60px); }
          40% { transform: translate(-20px, 40px); }
          50% { transform: translate(-40px, 20px); }
          60% { transform: translate(40px, 0px); }
          70% { transform: translate(0px, 30px); }
          80% { transform: translate(30px, 50px); }
          90% { transform: translate(-20px, 20px); }
        }
        .animate-grain {
          animation: grain-jitter 0.8s steps(10) infinite;
        }
      `}} />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -inset-[100px] z-50 opacity-[0.15] mix-blend-overlay animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(NOISE_TILE)}")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </>
  )
}
