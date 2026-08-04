'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { capabilities } from '@/lib/content'

gsap.registerPlugin(useGSAP)

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const marquee = marqueeRef.current
      if (!marquee) return

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const createLoop = () => {
          gsap.killTweensOf(marquee)
          gsap.set(marquee, { xPercent: 0 })

          const halfWidth = marquee.scrollWidth / 2
          gsap.to(marquee, {
            xPercent: -50,
            duration: Math.max(halfWidth / 60, 12),
            ease: 'none',
            repeat: -1,
          })
        }

        createLoop()
        const observer = new ResizeObserver(createLoop)
        observer.observe(marquee)

        return () => observer.disconnect()
      })

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(marquee, { clearProps: 'transform' })
      })

      return () => media.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="overflow-hidden py-20 lg:py-28">
      {/* Infinite horizontal marquee */}
      <div className="relative mb-20 overflow-hidden lg:mb-24">
        <div ref={marqueeRef} className="flex w-max whitespace-nowrap will-change-transform">
          {[0, 1].map((setIndex) => (
            <div key={setIndex} aria-hidden={setIndex === 1} className="flex shrink-0 items-center gap-10 pr-10">
              {capabilities.marquee.map((word, wordIndex) => {
                const isAccent = word === capabilities.accentWord
                return (
                  <span
                    key={`${setIndex}-${wordIndex}`}
                    className={`type-display ${isAccent ? 'text-accent' : 'text-foreground'}`}
                  >
                    {word}
                  </span>
                )
              })}
              <span className="type-display text-foreground/40" aria-hidden="true">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Three pillars in a 3-column grid */}
      <div data-motion="fade-group" className="gutter grid gap-12 lg:grid-cols-3 lg:gap-8">
        {capabilities.pillars.map((pillar) => (
          <div
            key={pillar.index}
            data-motion="fade"
            data-motion-grouped
            className="border-t border-border pt-10 lg:pt-12"
          >
            <p className="type-label mb-5 text-accent">{pillar.index}</p>
            <h3 className="type-subhead mb-5 text-foreground">{pillar.title}</h3>
            <p className="text-pretty leading-relaxed text-foreground/80">{pillar.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
