import Link from 'next/link'
import { Monogram } from '@/components/monogram'
import { navLinks } from '@/lib/content'

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-sm">
      <div className="gutter flex h-20 items-center justify-between lg:h-24">
        <Link href="/" className="text-accent" aria-label="Home">
          <Monogram className="size-8" />
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-3 md:gap-5">
            {navLinks.map((link, i) => (
              <li key={link.href} className="flex items-center gap-3 md:gap-5">
                {i > 0 && (
                  <span aria-hidden="true" className="type-label text-meta">
                    /
                  </span>
                )}
                <a href={link.href} className="type-label text-foreground hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
