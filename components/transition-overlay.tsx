'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { useTransition } from '@/context/transition-context'
import { useGSAP } from '@gsap/react'

export function TransitionOverlay() {
  const { isTransitioning, finishTransition } = useTransition()
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const accentRef = useRef<HTMLDivElement>(null)

  // Trigger Cover animation when isTransitioning becomes true
  useGSAP(() => {
    const overlay = overlayRef.current
    const accent = accentRef.current
    if (!overlay || !accent) return

    if (isTransitioning) {
      // Cover phase: sweep up from bottom
      // Set initial transform origin to bottom
      gsap.set([accent, overlay], { transformOrigin: 'bottom' })
      
      gsap.to(accent, {
        scaleY: 1,
        duration: 0.3,
        ease: 'power3.inOut',
      })
      gsap.to(overlay, {
        scaleY: 1,
        duration: 0.3,
        delay: 0.05,
        ease: 'power3.inOut',
      })
    }
  }, [isTransitioning])

  // Trigger Uncover animation when pathname changes
  useGSAP(() => {
    const overlay = overlayRef.current
    const accent = accentRef.current
    if (!overlay || !accent) return

    // Only uncover if we are currently covered (scaleY > 0)
    const currentScaleY = Number(gsap.getProperty(overlay, 'scaleY'))
    if (currentScaleY > 0) {
      // Uncover phase: sweep up to top
      // Change transform origin to top to sweep away upwards
      gsap.set([accent, overlay], { transformOrigin: 'top' })
      
      gsap.to(overlay, {
        scaleY: 0,
        duration: 0.35,
        ease: 'power3.inOut',
        onComplete: () => {
          finishTransition()
        },
      })
      gsap.to(accent, {
        scaleY: 0,
        duration: 0.35,
        delay: 0.05,
        ease: 'power3.inOut',
      })
    }
  }, [pathname])

  return (
    <>
      <div
        ref={accentRef}
        className="fixed inset-0 z-[99998] bg-accent"
        style={{ transform: 'scaleY(0)', transformOrigin: 'bottom' }}
      />
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[99999] bg-background"
        style={{ transform: 'scaleY(0)', transformOrigin: 'bottom' }}
      />
    </>
  )
}
