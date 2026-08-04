import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Work } from '@/components/sections/work'
import { Lab } from '@/components/sections/lab'
import { Capabilities } from '@/components/sections/capabilities'
import { Contact } from '@/components/sections/contact'
import { SiteFooter } from '@/components/site-footer'

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
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
