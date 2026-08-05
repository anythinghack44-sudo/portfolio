'use client'

/**
 * Phase 8 — the single WebGL context for the page.
 *
 * Every effect is a drei <View> that portals into this one canvas and is
 * scissored to a tracked DOM element, so adding scenes costs draw calls rather
 * than whole GPU contexts.
 *
 * Layering: the canvas sits at z-30 — above section content, below the nav
 * (z-40) and the grain overlay (z-50). The hero field can therefore draw in
 * front of the display type, which is safe because it blends additively and so
 * becomes invisible over near-white glyphs while still lighting the dark field.
 */

import { useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { View } from '@react-three/drei'
import { useWebgl } from '@/lib/webgl/webgl-context'

/**
 * <View> renders with a positive frame priority, which switches off R3F's
 * automatic render — and therefore its automatic clear. Each view also disables
 * autoClear while scissoring. Without this pass the framebuffer is never
 * cleared and moving geometry smears. Priority 0 keeps it ahead of every view
 * without claiming the render loop.
 */
function ClearPass() {
  const size = useThree((state) => state.size)

  useFrame(({ gl }) => {
    gl.setScissorTest(false)
    gl.setViewport(0, 0, size.width, size.height)
    gl.clear(true, true, true)
  }, 0)

  return null
}

function ContextGuard() {
  const gl = useThree((state) => state.gl)
  const { disableWebgl } = useWebgl()

  useEffect(() => {
    const canvas = gl.domElement
    const handleLoss = (event: Event) => {
      event.preventDefault()
      disableWebgl()
    }

    canvas.addEventListener('webglcontextlost', handleLoss)
    return () => canvas.removeEventListener('webglcontextlost', handleLoss)
  }, [disableWebgl, gl])

  return null
}

export default function GlCanvas() {
  const { disableWebgl } = useWebgl()

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30">
      <Canvas
        // Scenes are unlit and author their own colour, so no tone mapping.
        flat
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
        fallback={null}
        style={{ pointerEvents: 'none' }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          if (!gl.getContext()) disableWebgl()
        }}
      >
        <ContextGuard />
        <ClearPass />
        <View.Port />
      </Canvas>
    </div>
  )
}
