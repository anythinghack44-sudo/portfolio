import Image from 'next/image'
import { about } from '@/lib/content'

export function About() {
  return (
    <section id="about" className="gutter py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
        {/* Portrait — grayscale editorial photo */}
        <div className="relative aspect-[4/5] overflow-hidden bg-surface lg:aspect-auto lg:min-h-[36rem]">
          <Image
            src="/placeholder.svg?height=1200&width=960"
            alt="Portrait of Kaito Mercer working at his desk"
            fill
            className="object-cover grayscale"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>

        {/* Content column */}
        <div className="flex flex-col">
          {/* Hairline + label */}
          <div className="border-t border-hairline pt-6 lg:pt-8">
            <p className="type-label text-meta">{about.label}</p>
          </div>

          {/* Statement */}
          <h2 className="type-statement mt-8 text-balance text-foreground lg:mt-10">
            {about.statement}
          </h2>

          {/* Body paragraphs */}
          <div className="mt-8 space-y-6 lg:mt-10 lg:space-y-7">
            {about.paragraphs.map((paragraph, i) => (
              <p key={i} className="max-w-xl text-pretty leading-relaxed text-body">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Stats row — pinned to bottom on desktop */}
          <div className="mt-12 lg:mt-auto lg:pt-16">
            <div className="flex items-stretch gap-8 lg:gap-10">
              {about.stats.map((stat, i) => (
                <div key={stat.label} className="flex items-stretch gap-8 lg:gap-10">
                  {i > 0 && (
                    <span aria-hidden="true" className="w-px self-stretch bg-hairline" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-sans text-[3.25rem] leading-none font-bold tracking-tight text-accent lg:text-[4rem]">
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
