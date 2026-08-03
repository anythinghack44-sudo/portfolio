import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <About />
      </main>
    </>
  )
}
