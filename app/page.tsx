import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Work } from '@/components/sections/work'
import { WorkGallery } from '@/components/sections/work-gallery'
import { CaseStudy } from '@/components/sections/case-study'
import { Lab } from '@/components/sections/lab'
import { Capabilities } from '@/components/sections/capabilities'
import { Contact } from '@/components/sections/contact'
import { SiteFooter } from '@/components/site-footer'
import { MotionReveals } from '@/components/motion-reveals'
import { ScrollChoreography } from '@/components/scroll-choreography'

export default function Page() {
  return (
    <MotionReveals>
      <ScrollChoreography>
        <SiteNav />
        <main>
          <Hero />
          <About />
          <Work />
          <WorkGallery />
          <CaseStudy />
          <Lab />
          <Capabilities />
          <Contact />
        </main>
        <SiteFooter />
      </ScrollChoreography>
    </MotionReveals>
  )
}
