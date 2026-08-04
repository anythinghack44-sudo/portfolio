'use client'

import { capabilities } from '@/lib/content'
import { useEffect, useRef } from 'react'

export function Capabilities() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentMarquee = marqueeRef.current
    if (!currentMarquee) return
    const marquee: HTMLDivElement = currentMarquee

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let scrollPosition = 0
    let animationFrame = 0
    const speed = 0.5

    function animate() {
      scrollPosition += speed
      marquee.style.transform = `translateX(-${scrollPosition}px)`

      const firstSet = marquee.firstElementChild as HTMLElement | null
      if (firstSet && scrollPosition >= firstSet.offsetWidth) {
        scrollPosition = 0
      }

      animationFrame = requestAnimationFrame(animate)
    }

    function updateMotionPreference() {
      cancelAnimationFrame(animationFrame)

      if (mediaQuery.matches) {
        scrollPosition = 0
        marquee.style.removeProperty('transform')
        return
      }

      animationFrame = requestAnimationFrame(animate)
    }

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => {
      cancelAnimationFrame(animationFrame)
      mediaQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  return (
    <section className="overflow-hidden py-20 lg:py-28">
      {/* Infinite horizontal marquee */}
      <div className="relative mb-20 overflow-hidden lg:mb-24">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          {/* Render 3 sets to ensure seamless loop */}
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0 items-center gap-10">
              {capabilities.marquee.map((word, wordIndex) => {
                const isAccent = word === capabilities.accentWord
                return (
                  <span
                    key={`${setIndex}-${wordIndex}`}
                    className={`type-display ${
                      isAccent ? 'text-accent' : 'text-foreground'
                    }`}
                  >
                    {word}
                  </span>
                )
              })}
              <span className="type-display text-foreground/40">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Three pillars in a 3-column grid */}
      <div className="gutter grid gap-12 lg:grid-cols-3 lg:gap-8">
        {capabilities.pillars.map((pillar) => (
          <div
            key={pillar.index}
            className="border-t border-border pt-10 lg:pt-12"
          >
            <p className="type-label mb-5 text-accent">{pillar.index}</p>
            <h3 className="type-subhead mb-5 text-foreground">{pillar.title}</h3>
            <p className="text-pretty leading-relaxed text-foreground/80">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
