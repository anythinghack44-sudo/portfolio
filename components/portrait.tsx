'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DeveloperPortrait } from '@/components/developer-portrait'

/**
 * Editorial portrait with grayscale treatment.
 *
 * Drop your photo at: public/images/portrait.jpg
 * Recommended: 1200x1500px (4:5), JPEG, good contrast, dark/neutral background.
 * Next.js automatically serves AVIF/WebP — no manual conversion needed.
 * Falls back to the geometric SVG illustration if the photo is missing.
 */
export function Portrait() {
  const [photoMissing, setPhotoMissing] = useState(false)

  if (photoMissing) {
    return <DeveloperPortrait className="h-full w-full" />
  }

  return (
    <Image
      src="/images/portrait.jpg"
      alt="Portrait of Kaito Mercer"
      fill
      priority
      className="object-cover grayscale contrast-[1.05]"
      sizes="(min-width: 1024px) 40vw, 100vw"
      onError={() => setPhotoMissing(true)}
    />
  )
}
