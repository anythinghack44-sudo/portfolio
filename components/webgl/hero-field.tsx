'use client'

/**
 * Capability gate for the hero field. The scene — and with it three.js — is
 * only fetched once we know the device is getting the WebGL layer.
 */

import dynamic from 'next/dynamic'
import { useWebgl } from '@/lib/webgl/webgl-context'

const HeroFieldView = dynamic(() => import('@/components/webgl/hero-field-view'), {
  ssr: false,
})

export function HeroField() {
  const { enabled } = useWebgl()

  if (!enabled) return null

  return <HeroFieldView />
}
