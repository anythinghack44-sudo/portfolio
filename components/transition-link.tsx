'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from '@/context/transition-context'

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
}

export function TransitionLink({ href, children, className, ...props }: TransitionLinkProps) {
  const router = useRouter()
  const { playTransition } = useTransition()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // If it's a hash link, let it behave normally (scroll to section)
    if (href.startsWith('#')) {
      return
    }

    // If it's an external link, let it behave normally
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      return
    }

    // Otherwise, it's an internal route navigation. Prevent default and animate!
    e.preventDefault()
    playTransition(() => {
      router.push(href)
    })
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  )
}
