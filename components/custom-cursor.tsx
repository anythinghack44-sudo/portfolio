'use client'

/**
 * Phase 6 — Tier 3: magnetic cursor follower.
 *
 * Inner dot (14px) + outer ring (36px).
 * Tracks pointer via gsap.quickTo.
 * Scales up/down over interactive elements (links, buttons, project rows).
 * Uses mix-blend-mode: difference for automatic color inversion.
 * Disabled on non-fine pointer devices (touch) and reduced motion.
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only activate on desktop / fine pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Hide system cursor globally on desktop
    document.documentElement.classList.add('custom-cursor-active')

    // Center origin transform
    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 0,
    })

    // Create high-performance quickTo setters
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

    let isVisible = false

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true
        gsap.to(dot, { opacity: 1, duration: 0.2 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onMouseEnterInteractive = () => {
      gsap.to(dot, { scale: 0.5, duration: 0.25, ease: 'power2.out' })
      gsap.to(ring, { scale: 1.25, opacity: 1, duration: 0.25, ease: 'power2.out' })
    }

    const onMouseEnterProject = () => {
      gsap.to(dot, { scale: 2.2, duration: 0.25, ease: 'power2.out' })
      gsap.to(ring, { scale: 1.6, opacity: 1, duration: 0.25, ease: 'power2.out' })
    }

    const onMouseLeaveInteractive = () => {
      gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power2.out' })
      gsap.to(ring, { scale: 0.5, opacity: 0, duration: 0.25, ease: 'power2.out' })
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const project = target.closest('[data-cursor="project"]')
      const interactive = target.closest('a, button, [data-cursor]')

      if (project) {
        onMouseEnterProject()
      } else if (interactive) {
        onMouseEnterInteractive()
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const wasInteractive = target.closest('a, button, [data-cursor]')
      if (wasInteractive) {
        const related = e.relatedTarget as HTMLElement | null
        const stillInside = related?.closest('a, button, [data-cursor]')
        if (!stillInside) {
          onMouseLeaveInteractive()
        }
      }
    }

    const onMouseLeaveWindow = () => {
      isVisible = false
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveWindow)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden size-3.5 rounded-full bg-foreground md:block"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden size-9 rounded-full border border-foreground opacity-0 md:block"
        style={{ mixBlendMode: 'difference' }}
      />
    </>
  )
}
