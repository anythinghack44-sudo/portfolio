'use client'

/**
 * Phase 8 — mounts the shared canvas only when the device has opted in.
 *
 * Loaded with ssr:false because a WebGL context is meaningless on the server,
 * and behind the capability gate so reduced-motion and low-end visitors never
 * download or execute it.
 */

import dynamic from 'next/dynamic'
import { useWebgl } from '@/lib/webgl/webgl-context'

const GlCanvas = dynamic(() => import('@/components/webgl/gl-canvas'), { ssr: false })

export function GlLayer() {
  const { enabled } = useWebgl()

  if (!enabled) return null

  return <GlCanvas />
}
