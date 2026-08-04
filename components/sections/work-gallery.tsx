'use client'

/**
 * Phase 6 — Tier 2: pinned horizontal work gallery.
 *
 * Desktop: the section pins and the flex row translates on x, scrubbed.
 * Mobile / reduced motion: the same row is a native snap-scroll carousel, so
 * the content is fully reachable without any JS.
 */

import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LabGraphic } from '@/components/lab-graphics'
import { work, type Experiment } from '@/lib/content'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const PANEL_GRAPHICS: Experiment['graphic'][] = ['ray', 'wave', 'intersect', 'layer']

export function WorkGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const pin = pinRef.current
      const track = trackRef.current
      const progress = progressRef.current
      if (!section || !pin || !track || !progress) return

      const media = gsap.matchMedia()

      media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0)

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(distance(), 1)}`,
            pin,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .fromTo(track, { x: 0 }, { x: () => -distance() }, 0)
          .fromTo(progress, { scaleX: 0 }, { scaleX: 1 }, 0)

        return () => {
          gsap.set([track, progress], { clearProps: 'transform' })
        }
      })

      return () => media.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="gallery" className="relative overflow-hidden">
      <div ref={pinRef} className="flex flex-col justify-center py-20 lg:h-svh lg:pt-32 lg:pb-16">
        {/* Section header */}
        <div className="gutter mb-10 flex items-end justify-between gap-6 lg:mb-14">
          <div>
            <p data-motion="fade" className="type-label text-meta">
              02b — Gallery
            </p>
            <h2 data-motion="heading" className="type-statement mt-5 text-balance text-foreground">
              Scroll sideways
            </h2>
          </div>

          {/* Horizontal progress hairline */}
          <div aria-hidden="true" className="hidden h-px w-48 bg-hairline lg:block">
            <span ref={progressRef} className="block h-px origin-left bg-accent" />
          </div>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:px-10 lg:overflow-x-visible lg:px-14 lg:pb-0 lg:will-change-transform"
        >
          {work.projects.map((project, index) => (
            <Link
              key={project.index}
              href={project.href}
              className="group flex w-[80vw] shrink-0 snap-start flex-col justify-between border border-border bg-surface/40 p-6 transition-colors hover:border-accent md:w-[52vw] lg:h-[58vh] lg:w-[38vw] lg:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="type-label text-meta">{project.index}</span>
                <span className="type-label text-meta">{project.category}</span>
              </div>

              <div className="my-10 flex min-h-0 flex-1 items-center justify-center overflow-hidden lg:my-8">
                <div className="w-2/3">
                  <LabGraphic name={PANEL_GRAPHICS[index % PANEL_GRAPHICS.length]} />
                </div>
              </div>

              <h3 className="type-panel text-balance text-foreground transition-colors group-hover:text-accent">
                {project.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
