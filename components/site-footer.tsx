'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Monogram } from '@/components/monogram'
import { contact, site } from '@/lib/content'

export function SiteFooter() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setTime(`${hours}:${minutes} ${site.timezone}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="gutter border-t border-border py-8">
      <div className="flex items-center justify-between gap-6">
        <Link href="/" aria-label="Home" className="text-accent">
          <Monogram className="size-8" />
        </Link>

        <nav className="flex items-center gap-8 lg:gap-12">
          {contact.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="type-label text-meta transition-colors hover:text-accent"
            >
              {social.label}
            </a>
          ))}
        </nav>

        <p className="type-label text-meta">{time}</p>
      </div>
    </footer>
  )
}
