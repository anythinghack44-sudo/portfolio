import { contact, site } from '@/lib/content'

export function Contact() {
  return (
    <section id="contact" className="gutter flex min-h-svh flex-col justify-center py-24 lg:py-32">
      <div className="mx-auto max-w-6xl text-center">
        <h2 data-motion="heading" className="type-display text-balance text-foreground">
          {contact.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="type-accent block">{contact.accentLine}</span>
        </h2>

        <a
          data-motion="fade"
          href={`mailto:${site.email}`}
          className="mt-12 inline-block pb-1.5 text-2xl tracking-tight text-foreground transition-colors hover:text-accent link-draw lg:mt-16 lg:text-3xl"
        >
          {site.email}
        </a>
      </div>
    </section>
  )
}
