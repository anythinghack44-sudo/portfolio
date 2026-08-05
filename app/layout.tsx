import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Bodoni_Moda } from 'next/font/google'
import { GrainOverlay } from '@/components/grain-overlay'
import { CustomCursor } from '@/components/custom-cursor'
import { SmoothScroll } from '@/components/smooth-scroll'
import { TransitionProvider } from '@/context/transition-context'
import { TransitionOverlay } from '@/components/transition-overlay'
import { ScrollProgress } from '@/components/scroll-progress'
import { SpinningBadge } from '@/components/spinning-badge'
import './globals.css'

// One grotesque family. The `wdth` axis gives us the condensed display
// widths from the mockups without adding a second font family.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

// Didone italic, used only for the acid-green accent words.
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--font-bodoni',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hrushikesh Behera — Junior Frontend Engineer',
  description:
    'Junior frontend engineer building clear, responsive digital experiences with thoughtful motion, accessible code, and close attention to detail.',
  generator: 'v0.app',
  openGraph: {
    title: 'Hrushikesh Behera — Junior Frontend Engineer',
    description:
      'Frontend portfolio featuring accessible interfaces, thoughtful motion, and selected product work.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${archivo.variable} ${bodoni.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <TransitionProvider>
          <GrainOverlay />
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
          <TransitionOverlay />
          <ScrollProgress />
          <SpinningBadge />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </TransitionProvider>
      </body>
    </html>
  )
}
