import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Work } from '@/components/sections/work'
import { Lab } from '@/components/sections/lab'
import { Capabilities } from '@/components/sections/capabilities'
import { Contact } from '@/components/sections/contact'
import { SiteFooter } from '@/components/site-footer'
import { MotionReveals } from '@/components/motion-reveals'
import { ScrollChoreography } from '@/components/scroll-choreography'
import { WebglProvider } from '@/lib/webgl/webgl-context'
import { GlLayer } from '@/components/webgl/gl-layer'

export default function Page() {
  return (
    <MotionReveals>
      <ScrollChoreography>
        {/* One provider decides once whether this device gets GPU work; one
            canvas hosts every scene as a drei <View>. */}
        <WebglProvider>
          <GlLayer />
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
        </WebglProvider>
      </ScrollChoreography>
    </MotionReveals>
  )
}
