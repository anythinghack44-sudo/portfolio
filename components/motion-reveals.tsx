'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const revealEase = 'expo.out'

function parseCount(value: string) {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return null

  return {
    target: Number(match[1]),
    digits: match[1].length,
    suffix: match[2],
  }
}

export function MotionReveals({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const splits: SplitText[] = []

        root.querySelectorAll<HTMLElement>('[data-motion="heading"]').forEach((heading) => {
          const split = SplitText.create(heading, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'motion-line',
          })
          splits.push(split)

          const isHero = heading.dataset.motionStart === 'load'
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: revealEase,
            stagger: 0.08,
            delay: isHero ? 0.15 : 0,
            scrollTrigger: isHero
              ? undefined
              : { trigger: heading, start: 'top 75%', once: true },
          })
        })

        root.querySelectorAll<HTMLElement>('[data-motion="fade-group"]').forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>('[data-motion="fade"]')
          if (!items.length) return

          gsap.from(items, {
            y: 24,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: 'top 75%', once: true },
          })
        })

        root.querySelectorAll<HTMLElement>('[data-motion="fade"]:not([data-motion-grouped])').forEach((item) => {
          gsap.from(item, {
            y: 24,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 75%', once: true },
          })
        })

        root.querySelectorAll<HTMLElement>('[data-motion="clip"]').forEach((item) => {
          gsap.fromTo(
            item,
            { clipPath: 'inset(100% 0 0 0)' },
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.15,
              ease: revealEase,
              scrollTrigger: { trigger: item, start: 'top 80%', once: true },
            },
          )
        })

        root.querySelectorAll<HTMLElement>('[data-motion="line"]').forEach((line) => {
          gsap.from(line, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: line, start: 'top 85%', once: true },
          })
        })

        root.querySelectorAll<HTMLElement>('[data-motion="count"]').forEach((item) => {
          const value = item.dataset.value ?? item.textContent?.trim() ?? ''
          const count = parseCount(value)
          if (!count) return

          const proxy = { value: 0 }
          gsap.to(proxy, {
            value: count.target,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%', once: true },
            onUpdate: () => {
              item.textContent = `${Math.round(proxy.value).toString().padStart(count.digits, '0')}${count.suffix}`
            },
          })
        })

        const refresh = () => ScrollTrigger.refresh()
        document.fonts.ready.then(refresh)
        window.addEventListener('load', refresh, { once: true })

        return () => {
          window.removeEventListener('load', refresh)
          splits.forEach((split) => split.revert())
        }
      })

      media.add('(prefers-reduced-motion: reduce)', () => {
        const animated = root.querySelectorAll<HTMLElement>(
          '[data-motion="heading"], [data-motion="fade"], [data-motion="clip"], [data-motion="line"], [data-motion="count"]',
        )
        gsap.set(animated, { clearProps: 'transform,opacity,clipPath' })
      })

      return () => media.revert()
    },
    { scope },
  )

  return <div ref={scope}>{children}</div>
}
