'use client'

/**
 * Phase 8 — mount gate for the Lab centerpiece.
 *
 * Two gates, not one:
 *  1. capability — no GPU / reduced motion / low-end device keeps the SVG.
 *  2. proximity  — the scene is only mounted once the card nears the viewport,
 *     so a visitor who never scrolls to the Lab never pays for it.
 *
 * The SVG graphic stays mounted underneath as the fallback, which also means
 * the card is never visually empty while the chunk loads.
 */

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useWebgl } from '@/lib/webgl/webgl-context'
import { LabGraphic } from '@/components/lab-graphics'
import type { Experiment } from '@/lib/content'

const LabObjectView = dynamic(() => import('@/components/webgl/lab-object-view'), {
  ssr: false,
})

export function LabObject({ graphic }: { graphic: Experiment['graphic'] }) {
  const { enabled, desktop } = useWebgl()
  const holderRef = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  const active = enabled && desktop

  useEffect(() => {
    if (!active || near) return

    const node = holderRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      // Start loading a little before the card is actually on screen.
      { rootMargin: '400px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [active, near])

  return (
    <div ref={holderRef} className="relative h-full w-full">
      {active && near ? <LabObjectView /> : <LabGraphic name={graphic} />}
    </div>
  )
}
