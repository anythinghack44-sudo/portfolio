import { caseStudy } from '@/lib/content'
import { LabGraphic } from '@/components/lab-graphics'

/**
 * Phase 6 — Tier 2: sticky case-study media.
 * The media column sticks (pure CSS, survives Lenis) while the text columns
 * scroll past it. Detail plates carry scrubbed parallax via data attributes.
 */
export function CaseStudy() {
  return (
    <section id="case-study" className="gutter py-20 lg:py-28">
      <div className="mb-12 lg:mb-16">
        <div data-motion="line" className="h-px bg-border" />
        <p data-motion="fade" className="type-label pt-6 text-meta lg:pt-8">
          {caseStudy.breadcrumb}
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
        {/* Sticky media column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div
            data-motion="clip"
            className="flex aspect-[4/3] items-center justify-center overflow-hidden border border-border bg-surface p-8 lg:p-12"
          >
            <div className="w-3/4">
              <LabGraphic name="pixel" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-5">
            {(['orbital', 'wave'] as const).map((graphic, i) => (
              <div
                key={graphic}
                className="flex aspect-square items-center justify-center overflow-hidden border border-border bg-surface p-6"
              >
                <div data-motion="parallax" data-parallax={i === 0 ? 6 : 10} className="w-2/3 will-change-transform">
                  <LabGraphic name={graphic} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling text column */}
        <div className="flex flex-col">
          <h2 data-motion="heading" className="type-statement text-balance text-foreground">
            {caseStudy.title}
          </h2>

          <dl data-motion="fade-group" className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 lg:mt-16">
            {caseStudy.meta.map((item) => (
              <div key={item.label} data-motion="fade" data-motion-grouped>
                <dt className="type-label text-meta">{item.label}</dt>
                <dd className="mt-3 text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 lg:mt-24">
            <div data-motion="line" className="h-px bg-hairline" />
            <p data-motion="fade" className="type-label pt-6 text-meta">
              {caseStudy.challengeLabel}
            </p>
          </div>

          <div data-motion="fade-group" className="mt-10 space-y-7 lg:space-y-8">
            {caseStudy.challenge.map((paragraph, i) => (
              <p
                key={i}
                data-motion="fade"
                data-motion-grouped
                className="max-w-xl text-pretty leading-relaxed text-body"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
