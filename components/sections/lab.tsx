import { lab, type Experiment } from '@/lib/content'
import { LabGraphic } from '@/components/lab-graphics'

function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <a
      href="#"
      className={`group block border bg-surface/50 p-5 transition-colors lg:p-6 ${
        experiment.featured
          ? 'border-accent'
          : 'border-border hover:border-foreground/40'
      }`}
    >
      {/* Graphic */}
      <div className="mb-6 aspect-[4/3] overflow-hidden lg:mb-8">
        <LabGraphic name={experiment.graphic} />
      </div>

      {/* Name and date */}
      <h3 className="type-label text-foreground">{experiment.name}</h3>
      <p className="type-label mt-2 text-meta">{experiment.date}</p>
    </a>
  )
}

export function Lab() {
  return (
    <section id="lab" className="gutter py-20 lg:py-28">
      {/* Section label with hairline */}
      <div className="mb-10 flex items-center gap-6 lg:mb-14">
        <h2 className="type-label text-meta">{lab.label}</h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Staggered 4-column grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {lab.columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className={`flex flex-col gap-4 lg:gap-6 ${
              // Stagger columns 2 and 4 (index 1 and 3) downward on desktop
              colIndex % 2 === 1 ? 'lg:mt-16' : ''
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
