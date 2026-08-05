'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { MotionReveals } from '@/components/motion-reveals'
import { ScrollChoreography } from '@/components/scroll-choreography'
import { TransitionLink } from '@/components/transition-link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProjectBySlug, getNextProject, work } from '@/lib/content'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function CaseStudyPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = getProjectBySlug(slug)
  const nextProject = getNextProject(slug)
  const heroRef = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  // Parallax effect on hero and detail images
  useGSAP(() => {
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector('img'), {
        y: '8%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    if (detailRef.current) {
      gsap.to(detailRef.current.querySelector('img'), {
        y: '8%',
        ease: 'none',
        scrollTrigger: {
          trigger: detailRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  })

  if (!project) {
    return (
      <MotionReveals>
        <ScrollChoreography>
          <SiteNav />
          <main className="pt-24 lg:pt-32 gutter">
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="text-center">
                <h1 className="type-statement text-foreground mb-4">Project Not Found</h1>
                <p className="text-body text-meta mb-8">The case study you&apos;re looking for doesn&apos;t exist.</p>
                <TransitionLink href="/#work" className="type-label text-accent link-draw">
                  ← Back to Work
                </TransitionLink>
              </div>
            </div>
          </main>
          <SiteFooter />
        </ScrollChoreography>
      </MotionReveals>
    )
  }

  return (
    <MotionReveals>
      <ScrollChoreography>
        <SiteNav />
        <main className="pt-24 lg:pt-32">
          {/* ─── HEADER ─── */}
          <section className="gutter pb-12 lg:pb-20">
            {/* Breadcrumb */}
            <div data-motion="fade" className="mb-8 lg:mb-12">
              <TransitionLink href="/#work" className="type-label text-meta link-draw transition-colors hover:text-foreground">
                Work
              </TransitionLink>
              <span className="type-label text-meta mx-2">/</span>
              <span className="type-label text-meta">{project.index}</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
              {/* Title + tagline */}
              <div>
                <h1 data-motion="skew" className="type-statement text-foreground mb-3 lg:mb-4">
                  {project.name} /
                </h1>
                <p data-motion="fade" className="type-statement text-meta" style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)' }}>
                  {project.tagline}
                </p>
              </div>

              {/* Meta sidebar */}
              <div data-motion="fade" className="case-study-meta flex flex-wrap gap-8 lg:flex-col lg:gap-6 lg:text-right">
                <div>
                  <span className="type-label text-meta block mb-1">Role</span>
                  <span className="text-sm text-foreground">{project.role}</span>
                </div>
                <div>
                  <span className="type-label text-meta block mb-1">Year</span>
                  <span className="text-sm text-foreground">{project.year}</span>
                </div>
                <div>
                  <span className="type-label text-meta block mb-1">Stack</span>
                  <span className="text-sm text-foreground">{project.stack.join(', ')}</span>
                </div>
                {project.liveUrl && (
                  <div>
                    <span className="type-label text-meta block mb-1">Live</span>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent link-draw">
                      View Site ↗
                    </a>
                  </div>
                )}
                {project.githubUrl && (
                  <div>
                    <span className="type-label text-meta block mb-1">Source</span>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent link-draw">
                      GitHub ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ─── HERO IMAGE ─── */}
          <section data-motion="clip" ref={heroRef} className="image-parallax w-full overflow-hidden">
            <Image
              src={project.heroImage}
              alt={`${project.name} hero`}
              width={1920}
              height={1080}
              className="w-full h-auto object-cover scale-110"
              sizes="100vw"
              priority
            />
          </section>

          {/* ─── THE CHALLENGE ─── */}
          <section className="gutter py-20 lg:py-28">
            <div data-motion="fade" className="mb-8 lg:mb-12">
              <div className="h-px bg-border mb-6" />
              <span className="type-label text-meta">The Challenge</span>
            </div>

            <div data-motion="fade-group" className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              {project.description.map((paragraph, i) => (
                <p key={i} data-motion="fade" data-motion-grouped className="text-body leading-relaxed text-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* ─── DETAIL IMAGE ─── */}
          <section data-motion="clip" ref={detailRef} className="image-parallax w-full overflow-hidden">
            <Image
              src={project.detailImage}
              alt={`${project.name} detail`}
              width={1920}
              height={1080}
              className="w-full h-auto object-cover scale-110"
              sizes="100vw"
            />
          </section>

          {/* ─── KEY FEATURES ─── */}
          <section className="gutter py-20 lg:py-28">
            <div data-motion="fade" className="mb-12 lg:mb-16">
              <div className="h-px bg-border mb-6" />
              <span className="type-label text-meta">Key Features</span>
            </div>

            <div data-motion="fade-group" className="grid gap-8 md:grid-cols-3 lg:gap-12">
              {project.features.map((feature, i) => (
                <div key={i} data-motion="fade" data-motion-grouped className="feature-card group">
                  <div className="mb-4 flex items-baseline gap-3">
                    <span className="type-label text-accent">0{i + 1}</span>
                    <h3 className="type-subhead text-foreground">{feature.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-body">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── METRICS ─── */}
          {project.metrics && project.metrics.length > 0 && (
            <section className="gutter pb-20 lg:pb-28">
              <div data-motion="fade-group" className="grid grid-cols-3 gap-6 border-t border-border pt-10 lg:gap-12 lg:pt-14">
                {project.metrics.map((metric, i) => (
                  <div key={i} data-motion="fade" data-motion-grouped className="text-center">
                    <span className="type-statement text-accent mb-2 block">{metric.value}</span>
                    <span className="type-label text-meta">{metric.label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─── NEXT PROJECT ─── */}
          <section className="gutter border-t border-border py-16 lg:py-24">
            <div data-motion="fade">
              <span className="type-label text-meta mb-6 block">Next Project</span>
              <TransitionLink
                href={nextProject.href}
                className="project-row group flex items-center justify-between gap-8 transition-colors"
              >
                <div>
                  <h2 className="type-statement text-foreground transition-transform duration-300 group-hover:translate-x-2">
                    {nextProject.name}
                  </h2>
                  <p className="mt-2 text-sm text-meta">{nextProject.category}</p>
                </div>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 group-hover:border-accent group-hover:text-accent-foreground group-hover:rotate-45 btn-fill lg:size-16">
                  <svg viewBox="0 0 24 24" className="relative z-10 size-5 lg:size-6" fill="none" aria-hidden="true">
                    <path d="M7 17L17 7m0 0H7m10 0v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </div>
              </TransitionLink>
            </div>
          </section>
        </main>

        <SiteFooter />
      </ScrollChoreography>
    </MotionReveals>
  )
}
