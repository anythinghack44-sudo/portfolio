'use client'

/**
 * Phase 6 — Tier 2: scroll choreography.
 *
 * Global, declarative handlers driven by data attributes so sections stay
 * server components wherever possible:
 *
 *   data-motion="parallax"   layered depth, scrubbed (data-parallax="18")
 *   data-motion="skew"       scroll-velocity skewY, clamped
 *   data-invert-zone         section theme inversion via tweened CSS variables
 *
 * Everything animates transform / opacity / CSS custom properties only, and
 * every effect is registered inside gsap.matchMedia so reduced-motion users get
 * the static Phase 4 layout untouched.
 */

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const DARK = {
  bg: '#0a0a0a',
  fg: '#f2f0eb',
  muted: '#6b6b66',
  border: '#2a2a28',
  accent: '#c8f31d',
}

const LIGHT = {
  bg: '#f2f0eb',
  fg: '#0a0a0a',
  muted: '#6b6b66',
  border: '#c7c4bb',
  accent: '#0a0a0a',
}

export function ScrollChoreography({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        /* ---------------------------------------------------------------
         * Parallax depth — layered yPercent at differing rates
         * ------------------------------------------------------------- */
        root.querySelectorAll<HTMLElement>('[data-motion="parallax"]').forEach((layer) => {
          const strength = Number(layer.dataset.parallax ?? 12)

          gsap.fromTo(
            layer,
            { yPercent: -strength / 2 },
            {
              yPercent: strength / 2,
              ease: 'none',
              scrollTrigger: {
                trigger: layer.parentElement ?? layer,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          )
        })

        /* ---------------------------------------------------------------
         * Scroll-velocity skew — one quickTo per element, clamped
         * ------------------------------------------------------------- */
        const skewTargets = Array.from(root.querySelectorAll<HTMLElement>('[data-motion="skew"]'))
        const setters = skewTargets.map((el) =>
          gsap.quickTo(el, 'skewY', { duration: 0.5, ease: 'power3.out' }),
        )
        const clamp = gsap.utils.clamp(-4, 4)

        const velocityTrigger = skewTargets.length
          ? ScrollTrigger.create({
              onUpdate: (self) => {
                const skew = clamp(self.getVelocity() / -260)
                setters.forEach((setSkew) => setSkew(skew))
              },
            })
          : null

        /* ---------------------------------------------------------------
         * Section theme inversion — tween CSS variables as the zone enters
         * ------------------------------------------------------------- */
        const zoneTweens: gsap.core.Tween[] = []

        root.querySelectorAll<HTMLElement>('[data-invert-zone]').forEach((zone) => {
          const proxy = { p: 0 }
          const mix = (a: string, b: string, p: number) => gsap.utils.interpolate(a, b, p)

          const paint = () => {
            const { p } = proxy
            zone.style.setProperty('--zone-bg', mix(DARK.bg, LIGHT.bg, p))
            zone.style.setProperty('--zone-fg', mix(DARK.fg, LIGHT.fg, p))
            zone.style.setProperty('--zone-muted', mix(DARK.muted, LIGHT.muted, p))
            zone.style.setProperty('--zone-border', mix(DARK.border, LIGHT.border, p))
            zone.style.setProperty('--zone-accent', mix(DARK.accent, LIGHT.accent, p))
          }

          zoneTweens.push(
            gsap.to(proxy, {
              p: 1,
              ease: 'none',
              onUpdate: paint,
              scrollTrigger: {
                trigger: zone,
                start: 'top 70%',
                end: 'top 25%',
                scrub: 0.6,
              },
            }),
          )
        })

        return () => {
          velocityTrigger?.kill()
          zoneTweens.forEach((tween) => tween.kill())
          gsap.set(skewTargets, { clearProps: 'transform' })
          root.querySelectorAll<HTMLElement>('[data-invert-zone]').forEach((zone) => {
            zone.removeAttribute('style')
          })
        }
      })

      return () => media.revert()
    },
    { scope },
  )

  return <div ref={scope}>{children}</div>
}
