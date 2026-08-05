'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { TransitionLink } from '@/components/transition-link'
import { work } from '@/lib/content'
import { WorkPreview } from '@/components/webgl/work-preview'
import { setPreviewPointer, setPreviewTarget } from '@/lib/webgl/work-preview-store'

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)

  /**
   * Rows no longer own the preview — they publish hover + pointer into a store
   * and whichever renderer is mounted (WebGL plane or DOM panel) picks it up.
   * Pointer moves go through the store rather than React state so they never
   * re-render this list.
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    setPreviewPointer(e.clientX, e.clientY)
  }

  const handleMouseEnter = (index: string, e: React.MouseEvent) => {
    // `immediate` so the panel appears at the cursor rather than flying in.
    setPreviewPointer(e.clientX, e.clientY, true)
    setPreviewTarget(index, true)
  }

  const handleMouseLeave = (index: string) => {
    setPreviewTarget(index, false)
  }

  return (
    <section ref={sectionRef} id="work" className="gutter py-20 lg:py-28">
      <div className="mb-12 lg:mb-16">
        <div data-motion="line" className="h-px bg-border" />
        <p data-motion="fade" className="type-label pt-6 text-meta lg:pt-8">{work.label}</p>
      </div>

      <div data-motion="fade-group" className="space-y-0">
        {work.projects.map((project, idx) => (
          <article key={project.index} data-motion="fade" data-motion-grouped>
            <TransitionLink
              href={project.href}
              data-cursor="project"
              data-project-index={project.index}
              onMouseMove={handleMouseMove}
              onMouseEnter={(e) => handleMouseEnter(project.index, e)}
              onMouseLeave={() => handleMouseLeave(project.index)}
              className="project-row group relative block border-t border-border py-10 transition-colors hover:bg-surface/50 lg:py-12"
            >
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 lg:grid-cols-[auto_1fr_auto_auto_auto] lg:gap-12">
                {/* Index number */}
                <span className="type-label text-meta">{project.index}</span>

                {/* Project name + tagline */}
                <div className="min-w-0">
                  <h3
                    data-motion="skew"
                    className={`type-statement origin-left text-balance will-change-transform transition-transform duration-300 group-hover:translate-x-2 ${
                      project.featured ? 'text-accent' : 'text-foreground'
                    }`}
                  >
                    {project.name}
                  </h3>
                  {/* Tagline — reveals on hover */}
                  <p className="project-tagline mt-1 text-sm text-meta opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                    {project.tagline}
                  </p>
                </div>

                {/* Thumbnail — featured project shows inline on desktop */}
                {project.featured && (
                  <div data-motion="clip" className="relative hidden aspect-[16/9] w-64 overflow-hidden bg-muted lg:block">
                    <Image
                      src={project.thumbnail}
                      alt={`${project.name} preview`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="256px"
                    />
                  </div>
                )}

                {/* Category */}
                <span className="hidden text-sm uppercase tracking-wider text-meta lg:block">
                  {project.category}
                </span>

                {/* Arrow icon */}
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 group-hover:border-accent group-hover:text-accent-foreground group-hover:rotate-45 btn-fill lg:size-12">
                  <svg
                    viewBox="0 0 24 24"
                    className="relative z-10 size-4 lg:size-5"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 17L17 7m0 0H7m10 0v10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </div>
              </div>

              {/* Mobile category */}
              <span className="mt-3 block text-sm uppercase tracking-wider text-meta lg:hidden">
                {project.category}
              </span>

              {/* Mobile thumbnail — static inline preview */}
              <div className="mt-4 aspect-[16/9] w-full overflow-hidden bg-surface lg:hidden">
                <Image
                  src={project.thumbnail}
                  alt={`${project.name} preview`}
                  width={640}
                  height={360}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 640px"
                />
              </div>
            </TransitionLink>

            {/* Last item gets bottom border */}
            {idx === work.projects.length - 1 && (
              <div className="border-t border-border" />
            )}
          </article>
        ))}
      </div>

      {/* Cursor preview. Renders as a displaced shader plane on capable
          desktops and as the DOM panel everywhere else. */}
      <WorkPreview />
    </section>
  )
}
