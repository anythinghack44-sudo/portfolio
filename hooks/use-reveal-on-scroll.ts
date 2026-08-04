'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function useRevealOnScroll(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!ref.current) return

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-reveal]', {
          yPercent: 110,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
          },
        })
      })

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-reveal]', { clearProps: 'all' })
      })

      return () => media.revert()
    },
    { scope: ref },
  )
}
