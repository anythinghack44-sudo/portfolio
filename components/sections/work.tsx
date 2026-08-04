import Link from 'next/link'
import { work } from '@/lib/content'

export function Work() {
  return (
    <section id="work" className="gutter py-20 lg:py-28">
      <div className="mb-12 lg:mb-16">
        <div data-motion="line" className="h-px bg-border" />
        <p data-motion="fade" className="type-label pt-6 text-meta lg:pt-8">{work.label}</p>
      </div>

      <div data-motion="fade-group" className="space-y-0">
        {work.projects.map((project, idx) => (
          <article key={project.index} data-motion="fade" data-motion-grouped>
            <Link
              href={project.href}
              className="group relative block border-t border-border py-10 transition-colors hover:bg-surface/50 lg:py-12"
            >
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 lg:grid-cols-[auto_1fr_auto_auto_auto] lg:gap-12">
                {/* Index number */}
                <span className="type-label text-meta">{project.index}</span>

                {/* Project name */}
                <h3
                  data-motion="skew"
                  className={`type-statement origin-left text-balance will-change-transform ${
                    project.featured ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {project.name}
                </h3>

                {/* Thumbnail - only on featured project, desktop only */}
                {project.featured && (
                  <div data-motion="clip" className="relative hidden aspect-[16/9] w-64 overflow-hidden bg-muted lg:block">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Placeholder architectural thumbnail */}
                      <svg
                        viewBox="0 0 240 135"
                        className="h-full w-full"
                        aria-hidden="true"
                      >
                        {/* Grid background */}
                        <rect width="240" height="135" fill="#1a1a1a" />
                        
                        {/* Architectural shapes - angular building forms */}
                        <path
                          d="M40 85 L40 40 L80 20 L80 65 Z"
                          fill="#404040"
                          stroke="#2a2a2a"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M80 65 L80 20 L140 35 L140 80 Z"
                          fill="#303030"
                          stroke="#2a2a2a"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M140 80 L140 35 L200 50 L200 95 Z"
                          fill="#353535"
                          stroke="#2a2a2a"
                          strokeWidth="0.5"
                        />
                        
                        {/* Ground plane */}
                        <line
                          x1="0"
                          y1="85"
                          x2="240"
                          y2="85"
                          stroke="#c8f31d"
                          strokeWidth="0.5"
                        />
                        
                        {/* Label */}
                        <text
                          x="200"
                          y="110"
                          fill="#999"
                          fontSize="8"
                          fontFamily="system-ui"
                          letterSpacing="0.5"
                        >
                          MERIDIAN PAY
                        </text>
                      </svg>
                    </div>
                  </div>
                )}

                {/* Category */}
                <span className="hidden text-sm uppercase tracking-wider text-meta lg:block">
                  {project.category}
                </span>

                {/* Arrow icon */}
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-accent group-hover:text-accent lg:size-12">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 lg:size-5"
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
            </Link>

            {/* Last item gets bottom border */}
            {idx === work.projects.length - 1 && (
              <div className="border-t border-border" />
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
