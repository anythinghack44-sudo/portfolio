import { contact, site } from '@/lib/content'

export function Contact() {
  return (
    <section id="contact" className="gutter flex min-h-svh flex-col justify-center py-20 lg:py-28">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="type-display text-balance text-foreground">
          {contact.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="type-accent block">{contact.accentLine}</span>
        </h2>

        <a
          href={`mailto:${site.email}`}
          className="mt-10 inline-block border-b border-foreground pb-1 text-2xl tracking-tight text-foreground transition-colors hover:border-accent hover:text-accent lg:mt-14 lg:text-3xl"
        >
          {site.email}
        </a>
      </div>
    </section>
  )
}
