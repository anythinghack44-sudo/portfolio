'use client'

/**
 * Phase 8 — hero atmosphere.
 *
 * A slow drifting mote field scissored to the hero section. It draws in front
 * of the headline on purpose: additive blending means it contributes nothing
 * over near-white glyphs, so the type stays at full contrast while the dark
 * field around it gains depth.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { View } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { HERO_FRAGMENT, HERO_VERTEX } from '@/lib/webgl/shaders'

const ACCENT = new THREE.Color('#c8f31d')
const LIGHT = new THREE.Color('#f2f0eb')

/** Deterministic PRNG so the field is identical across renders and reloads. */
function seeded(seed: number) {
  let value = seed
  return () => {
    value = (value * 16807) % 2147483647
    return value / 2147483647
  }
}

function Field({ visible }: { visible: boolean }) {
  const viewport = useThree((state) => state.viewport)
  const size = useThree((state) => state.size)

  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const pointer = useRef({ x: 0, y: 0, currentX: 0, currentY: 0 })

  // Density follows viewport width, not device pixels — a phone gets a sparser
  // field rather than the same field at a lower resolution.
  const count = size.width < 768 ? 1400 : 3200

  // Rounded so a 1px resize doesn't rebuild buffers.
  const spreadX = Math.round(viewport.width * 1.2 * 100) / 100
  const spreadY = Math.round(viewport.height * 1.2 * 100) / 100

  const geometry = useMemo(() => {
    const random = seeded(20260805)
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const scales = new Float32Array(count)

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (random() - 0.5) * spreadX
      positions[i * 3 + 1] = (random() - 0.5) * spreadY
      positions[i * 3 + 2] = (random() - 0.5) * 2.4
      seeds[i] = random()
      // Biased small so a few motes read as near and the rest as haze.
      scales[i] = 0.35 + random() * random() * 1.15
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    return geo
  }, [count, spreadX, spreadY])

  useEffect(() => () => geometry.dispose(), [geometry])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: 1 },
      uOpacity: { value: 0.55 },
      uAccent: { value: ACCENT },
      uLight: { value: LIGHT },
    }),
    [],
  )

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  useFrame((state, delta) => {
    if (!visible) return

    const clamped = Math.min(delta, 1 / 30)
    uniforms.uTime.value += clamped
    uniforms.uPixelRatio.value = state.viewport.dpr

    // Ease toward the pointer so the parallax lags the cursor slightly.
    const p = pointer.current
    p.currentX += (p.x - p.currentX) * Math.min(1, clamped * 3)
    p.currentY += (p.y - p.currentY) * Math.min(1, clamped * 3)
    uniforms.uMouse.value.set(p.currentX, p.currentY)
  })

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={HERO_VERTEX}
        fragmentShader={HERO_FRAGMENT}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function HeroFieldView() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const node = trackRef.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '100px 0px',
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <View
      ref={trackRef as React.RefObject<HTMLDivElement>}
      // The div is only a tracking rect — pixels land on the shared canvas.
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <Field visible={visible} />
    </View>
  )
}
