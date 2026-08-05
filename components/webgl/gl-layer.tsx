'use client'

/**
 * Phase 8 — mounts the shared canvas only when the device has opted in.
 *
 * Loaded with ssr:false because a WebGL context is meaningless on the server,
 * and behind the capability gate so reduced-motion and low-end visitors never
 * download or execute it.
 */

import { Component, type ErrorInfo, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useWebgl } from '@/lib/webgl/webgl-context'

const GlCanvas = dynamic(() => import('@/components/webgl/gl-canvas'), { ssr: false })

class CanvasErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function GlLayer() {
  const { enabled, disableWebgl } = useWebgl()

  if (!enabled) return null

  return (
    <CanvasErrorBoundary onError={disableWebgl}>
      <GlCanvas />
    </CanvasErrorBoundary>
  )
}
