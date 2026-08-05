'use client'

/**
 * Phase 8 — the signature effect: the Work cursor preview rendered as a shader.
 *
 * Behaviour is preserved from Phase 7 (follows the cursor, wipes open on row
 * enter, closes on leave) but the panel is now a textured plane. Switching rows
 * displaces both the outgoing and incoming image along a shared noise field
 * instead of hard-swapping an <img>.
 *
 * The reveal lives in the shader rather than in CSS clip-path, because a drei
 * <View> is scissored to the tracked element's bounding box and cannot be
 * clipped by CSS.
 *
 * Uniforms are created exactly once and driven from the frame loop. They are
 * deliberately NOT tweened by GSAP: `useTexture` hands back a fresh array on
 * some renders, and anything memoised against it (including a uniforms object)
 * would be replaced mid-tween — which silently stranded `uReveal` at 0 and made
 * the whole panel invisible.
 */

import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { View, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { work } from '@/lib/content'
import { PREVIEW_FRAGMENT, PREVIEW_VERTEX } from '@/lib/webgl/shaders'
import { onPreviewPointer, onPreviewTarget } from '@/lib/webgl/work-preview-store'

const ACCENT = new THREE.Color('#c8f31d')

const WIDTH = 320
const OFFSET_X = 28
const OFFSET_Y = -96
const PLANE_ASPECT = 14 / 9
const HEIGHT = WIDTH / PLANE_ASPECT
const EDGE = 16

const THUMBNAILS = work.projects.map((project) => project.thumbnail)

/** object-fit: cover expressed as a UV scale for the given texture. */
function coverFactors(texture: THREE.Texture): THREE.Vector2 {
  const image = texture.image as { width?: number; height?: number } | undefined
  if (!image?.width || !image?.height) return new THREE.Vector2(1, 1)

  const textureAspect = image.width / image.height

  return textureAspect > PLANE_ASPECT
    ? new THREE.Vector2(PLANE_ASPECT / textureAspect, 1)
    : new THREE.Vector2(1, textureAspect / PLANE_ASPECT)
}

function PreviewPlane() {
  const textures = useTexture(THUMBNAILS)
  const viewport = useThree((state) => state.viewport)

  const meshRef = useRef<THREE.Mesh>(null)

  /** Created once, mutated forever. Never rebuilt from a render-scoped value. */
  const uniforms = useMemo(
    () => ({
      uFrom: { value: null as THREE.Texture | null },
      uTo: { value: null as THREE.Texture | null },
      uCoverFrom: { value: new THREE.Vector2(1, 1) },
      uCoverTo: { value: new THREE.Vector2(1, 1) },
      uProgress: { value: 1 },
      uReveal: { value: 0 },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uAccent: { value: ACCENT },
    }),
    [],
  )

  /** Eased-toward values, advanced in the frame loop. */
  const drive = useRef({ revealTarget: 0, hoverTarget: 0, crossfading: false })
  const activeIndex = useRef<string | null>(null)

  // Texture + cover factors keyed by project index.
  const byIndex = useMemo(() => {
    const map = new Map<string, { texture: THREE.Texture; cover: THREE.Vector2 }>()

    work.projects.forEach((project, i) => {
      const texture = textures[i]
      texture.colorSpace = THREE.SRGBColorSpace
      // The plane never tiles; clamping avoids wrapped pixels once the
      // displacement pushes UVs past the edge.
      texture.wrapS = THREE.ClampToEdgeWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.needsUpdate = true

      map.set(project.index, { texture, cover: coverFactors(texture) })
    })

    return map
  }, [textures])

  // Seed the uniforms with the first project so the very first frame after a
  // hover already has a valid sampler bound.
  useEffect(() => {
    if (uniforms.uTo.value) return

    const first = byIndex.get(work.projects[0].index)
    if (!first) return

    uniforms.uFrom.value = first.texture
    uniforms.uTo.value = first.texture
    uniforms.uCoverFrom.value.copy(first.cover)
    uniforms.uCoverTo.value.copy(first.cover)
  }, [byIndex, uniforms])

  useEffect(() => {
    const off = onPreviewTarget(({ index, hovering }) => {
      drive.current.revealTarget = hovering ? 1 : 0
      drive.current.hoverTarget = hovering ? 1 : 0

      if (!index || index === activeIndex.current) return

      const next = byIndex.get(index)
      if (!next) return

      if (activeIndex.current === null) {
        // First hover: no crossfade, just show the target.
        uniforms.uFrom.value = next.texture
        uniforms.uCoverFrom.value.copy(next.cover)
        uniforms.uTo.value = next.texture
        uniforms.uCoverTo.value.copy(next.cover)
        uniforms.uProgress.value = 1
        drive.current.crossfading = false
      } else {
        // Bake whatever is on screen into `from`, then displace across to the
        // new target. Rapid row-to-row movement snaps rather than queueing.
        uniforms.uFrom.value = uniforms.uTo.value
        uniforms.uCoverFrom.value.copy(uniforms.uCoverTo.value)
        uniforms.uTo.value = next.texture
        uniforms.uCoverTo.value.copy(next.cover)
        uniforms.uProgress.value = 0
        drive.current.crossfading = true
      }

      activeIndex.current = index
    })

    return off
  }, [byIndex, uniforms])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 30)
    uniforms.uTime.value += dt

    const d = drive.current

    // Frame-rate independent exponential easing. The wipe closes faster than it
    // opens so leaving a row feels crisp rather than laggy.
    const revealRate = d.revealTarget > uniforms.uReveal.value ? 0.0015 : 0.00002
    const revealEase = 1 - Math.pow(revealRate, dt)
    uniforms.uReveal.value += (d.revealTarget - uniforms.uReveal.value) * revealEase

    const hoverEase = 1 - Math.pow(0.002, dt)
    uniforms.uHover.value += (d.hoverTarget - uniforms.uHover.value) * hoverEase

    if (d.crossfading) {
      uniforms.uProgress.value = Math.min(1, uniforms.uProgress.value + dt / 0.7)
      if (uniforms.uProgress.value >= 1) d.crossfading = false
    }

    const mesh = meshRef.current
    if (!mesh) return

    // Fill the tracked rect, with the Phase 7 hover swell.
    const swell = 1 + uniforms.uHover.value * 0.05
    mesh.scale.set(viewport.width * swell, viewport.height * swell, 1)
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={PREVIEW_VERTEX}
        fragmentShader={PREVIEW_FRAGMENT}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

export default function WorkPreviewView() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = trackRef.current
    if (!node) return

    const quickX = gsap.quickTo(node, 'x', { duration: 0.35, ease: 'power3.out' })
    const quickY = gsap.quickTo(node, 'y', { duration: 0.35, ease: 'power3.out' })

    const off = onPreviewPointer((x, y, immediate) => {
      const maxX = Math.max(EDGE, window.innerWidth - WIDTH - EDGE)
      const maxY = Math.max(EDGE, window.innerHeight - HEIGHT - EDGE)
      const nextX = Math.max(EDGE, Math.min(x + OFFSET_X, maxX))
      const nextY = Math.max(EDGE, Math.min(y + OFFSET_Y, maxY))

      if (immediate) gsap.set(node, { x: nextX, y: nextY })

      quickX(nextX)
      quickY(nextY)
    })

    return () => {
      off()
      gsap.killTweensOf(node)
    }
  }, [])

  return (
    <View
      // Tracked rect only. No `hidden` class: a display:none element reports a
      // zero-size box, which would feed NaN into the shared camera's aspect.
      ref={trackRef as React.RefObject<HTMLDivElement>}
      className="pointer-events-none fixed top-0 left-0"
      style={{ width: WIDTH, aspectRatio: '14 / 9' }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <PreviewPlane />
      </Suspense>
    </View>
  )
}
