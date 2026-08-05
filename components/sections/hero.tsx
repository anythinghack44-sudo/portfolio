import { hero, site } from '@/lib/content'

export function Hero() {
  return (
    <section className="gutter relative flex min-h-svh flex-col pt-20 pb-12 lg:pt-24 lg:pb-16">
      {/* Availability badge, aligned to the right edge under the nav */}
      <div className="absolute inset-x-0 top-[5.5rem] lg:top-28">
        <div className="gutter flex justify-end">
          <p data-motion="fade" className="type-label flex items-center gap-2.5 text-meta">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />
            {site.status}
          </p>
        </div>
      </div>

      <h1 data-motion="heading" data-motion-start="load" className="type-display mt-auto text-balance text-foreground">
        {hero.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        <span className="type-accent block">{hero.accentLine}</span>
      </h1>

      <div data-motion="fade-group" className="mt-10 flex items-end justify-between gap-6 lg:mt-12 lg:gap-8">
        <div className="flex items-center gap-6 lg:gap-10">
          <p data-motion="fade" data-motion-grouped className="max-w-[28rem] text-pretty leading-relaxed text-foreground/85 lg:text-lead lg:leading-relaxed">
            {hero.intro}
          </p>

          <a
            href="#about"
            aria-label="Scroll to about section"
            className="hidden size-14 shrink-0 items-center justify-center rounded-full border border-accent text-accent transition-colors hover:text-accent-foreground btn-fill lg:flex"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
              <path
                d="M12 5v14m0 0l-6-6m6 6l6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </a>
        </div>

        {/* Vertical scroll cue */}
        <div className="hidden flex-col items-center gap-4 lg:flex">
          <span className="type-label [writing-mode:vertical-rl] text-meta">Scroll</span>
          <span aria-hidden="true" className="h-20 w-px bg-accent" />
        </div>
      </div>
    </section>
  )
}
