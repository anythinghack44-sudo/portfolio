import Image from 'next/image'
import { about } from '@/lib/content'

export function About() {
  return (
    <section id="about" className="gutter py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        {/* Portrait — real photo */}
        <div data-motion="clip" className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[36rem]">
          {/* Inner layer is oversized so the scrubbed parallax never exposes an edge */}
          <div data-motion="parallax" data-parallax="8" className="absolute -inset-[6%] will-change-transform">
            <Image
              src="/images/portrait.png"
              alt="Portrait of Hrushikesh Behera working at his desk"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 42vw, 100vw"
              priority
            />
          </div>
        </div>

        {/* Content column */}
        <div className="flex flex-col">
          {/* Hairline + label */}
          <div>
            <div data-motion="line" className="h-px bg-hairline" />
            <p data-motion="fade" className="type-label pt-6 text-meta lg:pt-8">{about.label}</p>
          </div>

          {/* Statement */}
          <h2 data-motion="heading" className="type-statement mt-10 text-balance text-foreground lg:mt-12">
            {about.statement}
          </h2>

          {/* Body paragraphs */}
          <div data-motion="fade-group" className="mt-10 space-y-7 lg:mt-12 lg:space-y-8">
            {about.paragraphs.map((paragraph, i) => (
              <p key={i} data-motion="fade" data-motion-grouped className="max-w-xl text-pretty leading-relaxed text-body">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Stats row — pinned to bottom on desktop */}
          <div data-motion="fade-group" className="mt-14 lg:mt-auto lg:pt-20">
            <div className="flex items-stretch gap-10 lg:gap-12">
              {about.stats.map((stat, i) => (
                <div key={stat.label} data-motion="fade" data-motion-grouped className="flex items-stretch gap-10 lg:gap-12">
                  {i > 0 && (
                    <span aria-hidden="true" data-motion="line" className="w-px self-stretch bg-hairline" />
                  )}
                  <div className="flex flex-col">
                    <span
                      data-motion={/^\d/.test(stat.value) ? 'count' : undefined}
                      data-value={stat.value}
                      className="font-sans text-[3.25rem] leading-none font-bold tracking-tight text-accent lg:text-[4rem]"
                    >
                      {stat.value}
                    </span>
                    <span className="type-label mt-3 text-meta">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
