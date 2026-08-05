'use client'

/**
 * Phase 8 — picks the renderer for the Work cursor preview.
 *
 * WebGL only runs on a capable desktop (the effect is cursor-driven, so it has
 * no meaning on touch). Everywhere else the Phase 7 DOM preview stands in, so
 * the interaction itself never disappears.
 */

import dynamic from 'next/dynamic'
import { useWebgl } from '@/lib/webgl/webgl-context'
import { WorkPreviewDom } from '@/components/work-preview-dom'

const WorkPreviewView = dynamic(() => import('@/components/webgl/work-preview-view'), {
  ssr: false,
})

export function WorkPreview() {
  const { enabled, desktop } = useWebgl()

  if (enabled && desktop) return <WorkPreviewView />

  return <WorkPreviewDom />
}
