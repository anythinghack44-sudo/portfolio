import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Work } from '@/components/sections/work'
import { Lab } from '@/components/sections/lab'
import { Capabilities } from '@/components/sections/capabilities'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Work />
        <Lab />
        <Capabilities />
      </main>
    </>
  )
}
