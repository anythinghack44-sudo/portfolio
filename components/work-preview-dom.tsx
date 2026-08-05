'use client'

/**
 * Non-WebGL cursor preview for the Work rows.
 *
 * This is the Phase 7 behaviour — clip-path reveal plus quickTo follow — moved
 * behind the shared preview store so it can stand in unchanged whenever the
 * WebGL layer is unavailable (no GPU, reduced motion, low-end device).
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { work } from '@/lib/content'
import { onPreviewPointer, onPreviewTarget } from '@/lib/webgl/work-preview-store'

const WIDTH = 300
const OFFSET_X = 24
const OFFSET_Y = -90

export function WorkPreviewDom() {
  const thumbRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<string | null>(work.projects[0].index)

  useEffect(() => {
    const thumb = thumbRef.current
    if (!thumb) return

    const quickX = gsap.quickTo(thumb, 'x', { duration: 0.35, ease: 'power3.out' })
    const quickY = gsap.quickTo(thumb, 'y', { duration: 0.35, ease: 'power3.out' })

    gsap.set(thumb, { clipPath: 'inset(100% 0% 0% 0%)' })

    const place = (x: number, y: number, immediate: boolean) => {
      // Keep the panel inside the viewport instead of pushing it off-screen.
      const maxX = window.innerWidth - WIDTH - 16
      const nextX = Math.min(x + OFFSET_X, maxX)
      const nextY = y + OFFSET_Y

      if (immediate) {
        gsap.set(thumb, { x: nextX, y: nextY })
      }

      quickX(nextX)
      quickY(nextY)
    }

    const offPointer = onPreviewPointer(place)

    const offTarget = onPreviewTarget(({ index, hovering }) => {
      if (index) setActiveIndex(index)

      gsap.to(thumb, {
        clipPath: hovering ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
        scale: hovering ? 1.05 : 1,
        duration: hovering ? 0.45 : 0.35,
        ease: hovering ? 'expo.out' : 'expo.in',
        overwrite: true,
      })
    })

    return () => {
      offPointer()
      offTarget()
      gsap.killTweensOf(thumb)
    }
  }, [])

  return (
    <div
      ref={thumbRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 hidden w-[300px] overflow-hidden border border-border/50 bg-surface shadow-2xl lg:block"
      style={{ boxShadow: '0 0 40px rgba(200, 243, 29, 0.08), 0 25px 50px rgba(0, 0, 0, 0.6)' }}
    >
      {work.projects.map((project) => (
        <div
          key={project.index}
          className="aspect-[14/9]"
          style={{ display: activeIndex === project.index ? 'block' : 'none' }}
        >
          <Image
            src={project.thumbnail}
            alt=""
            width={300}
            height={193}
            className="h-full w-full object-cover"
            sizes="300px"
          />
        </div>
      ))}
    </div>
  )
}
