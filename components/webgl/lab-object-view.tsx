'use client'

/**
 * Phase 8 — the Lab centerpiece: one genuinely interactive 3D object.
 *
 * Sits in the featured experiment card. The surface is a noise-displaced
 * icosahedron with a fresnel rim, and the pointer steers its rotation rather
 * than just nudging it, so the card rewards actually playing with it.
 *
 * Pointer input is read from DOM listeners on the tracked element and written
 * into refs — never React state — so dragging cannot re-render the section.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { View } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { LAB_FRAGMENT, LAB_VERTEX } from '@/lib/webgl/shaders'

const ACCENT = new THREE.Color('#c8f31d')
const BASE = new THREE.Color('#14161a')

/** Shared mutable pointer channel for this one object. */
type Pointer = { x: number; y: number; hover: number; target: number }

function LabSolid({
  pointer,
  visible,
  onReady,
}: {
  pointer: React.RefObject<Pointer>
  visible: boolean
  onReady: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const reportedReady = useRef(false)

  // Eased values so the object glides toward the cursor instead of snapping.
  const rotation = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uAccent: { value: ACCENT },
      uBase: { value: BASE },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (!visible) return

    // Clamp delta so a backgrounded tab cannot produce one huge jump.
    const dt = Math.min(delta, 1 / 30)
    const p = pointer.current
    if (!p) return

    uniforms.uTime.value += dt

    // Critically-damped-ish lerp, frame-rate independent.
    const ease = 1 - Math.pow(0.001, dt)

    p.hover += (p.target - p.hover) * ease
    uniforms.uHover.value = p.hover

    // Pointer sets a rotation *target*; idle spin continues underneath it.
    rotation.current.y += (p.x * 0.9 - rotation.current.y) * ease
    rotation.current.x += (p.y * 0.6 - rotation.current.x) * ease

    const mesh = meshRef.current
    if (!mesh) return

    mesh.rotation.y = rotation.current.y + uniforms.uTime.value * 0.18
    mesh.rotation.x = rotation.current.x
  })

  const handleAfterRender = () => {
    if (reportedReady.current) return
    reportedReady.current = true
    // Defer out of the render loop so it never sets state mid-frame.
    requestAnimationFrame(onReady)
  }

  return (
    <mesh ref={meshRef} scale={1.15} onAfterRender={handleAfterRender}>
      {/* Detail is recursive subdivision; 5 is smooth enough for displacement
          without the exponential memory cost of the previous value. */}
      <icosahedronGeometry args={[1, 5]} />
      <shaderMaterial uniforms={uniforms} vertexShader={LAB_VERTEX} fragmentShader={LAB_FRAGMENT} />
    </mesh>
  )
}

export default function LabObjectView({ onReady }: { onReady: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pointer = useRef<Pointer>({ x: 0, y: 0, hover: 0, target: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = trackRef.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '100px 0px',
    })
    observer.observe(node)
    onReady()

    return () => observer.disconnect()
  }, [onReady])

  useEffect(() => {
    const node = trackRef.current
    if (!node) return

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      // Normalise to -1..1 around the card's centre.
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1
    }

    const onEnter = () => {
      pointer.current.target = 1
    }

    const onLeave = () => {
      pointer.current.target = 0
      pointer.current.x = 0
      pointer.current.y = 0
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerenter', onEnter)
    node.addEventListener('pointerleave', onLeave)

    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerenter', onEnter)
      node.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <View ref={trackRef as React.RefObject<HTMLDivElement>} className="h-full w-full">
      <LabSolid pointer={pointer} visible={visible} />
    </View>
  )
}
