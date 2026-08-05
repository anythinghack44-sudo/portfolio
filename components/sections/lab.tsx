import { lab, type Experiment } from '@/lib/content'
import { LabGraphic } from '@/components/lab-graphics'
import { LabObject } from '@/components/webgl/lab-object'

function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <a
      href="#"
      data-motion="fade"
      data-motion-grouped
      className={`group block border bg-surface/50 p-6 transition-colors lg:p-7 ${
        experiment.featured
          ? 'border-accent'
          : 'border-border hover:border-foreground/40'
      }`}
    >
      {/* Graphic. The featured experiment is the section's one interactive
          object — it upgrades to a WebGL solid when the device allows it. */}
      <div className="mb-8 aspect-[4/3] overflow-hidden lg:mb-10">
        {experiment.featured ? (
          <LabObject graphic={experiment.graphic} />
        ) : (
          <LabGraphic name={experiment.graphic} />
        )}
      </div>

      {/* Name and date */}
      <h3 className="type-label text-foreground">{experiment.name}</h3>
      <p className="type-label mt-2.5 text-meta">{experiment.date}</p>
    </a>
  )
}

export function Lab() {
  return (
    <section id="lab" className="gutter py-20 lg:py-28">
      {/* Section label with hairline */}
      <div className="mb-12 flex items-center gap-6 lg:mb-16">
        <h2 data-motion="fade" className="type-label text-meta">{lab.label}</h2>
        <div data-motion="line" className="h-px flex-1 bg-border" />
      </div>

      {/* Staggered 4-column grid */}
      <div data-motion="fade-group" className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
        {lab.columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className={`flex flex-col gap-5 lg:gap-7 ${
              // Stagger columns 2 and 4 (index 1 and 3) downward on desktop
              colIndex % 2 === 1 ? 'lg:mt-20' : ''
            }`}
          >
            {column.map((experiment) => (
              <ExperimentCard key={experiment.name} experiment={experiment} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
