# Portfolio Build Roadmap — Static Design → World-Class Motion

A step-by-step production plan for a senior web developer portfolio: generate
pixel-perfect static mockups with GPT Image 2, convert them to code, then layer
cinematic motion (GSAP + Lenis), SVG, and WebGL.

**Golden rule of sequencing:** design is frozen before motion begins. Animating an
unfinished layout means re-animating it. Every phase below has an exit gate — do
not proceed until it passes.

---

## Table of contents

- [Phase 0 — Decisions & stack research](#phase-0--decisions--stack-research)
- [Phase 1 — The Universal Prompt (Style DNA)](#phase-1--the-universal-prompt-style-dna)
- [Phase 2 — Static image generation, page by page](#phase-2--static-image-generation-page-by-page)
- [Phase 3 — Image → design tokens](#phase-3--image--design-tokens)
- [Phase 4 — Image → static code (pixel-perfect)](#phase-4--image--static-code-pixel-perfect)
- [Phase 5 — Motion foundation](#phase-5--motion-foundation-lenis--gsap)
- [Phase 6 — The motion tiers](#phase-6--the-motion-tiers)
- [Phase 7 — SVG layer](#phase-7--svg-layer)
- [Phase 8 — WebGL / Three.js layer](#phase-8--webgl--threejs-layer)
- [Phase 9 — Performance & accessibility budget](#phase-9--performance--accessibility-budget)
- [Phase 10 — Ship checklist](#phase-10--ship-checklist)
- [Appendix A — AI prompting patterns](#appendix-a--ai-prompting-patterns)
- [Appendix B — Target file structure](#appendix-b--target-file-structure)

---

## Phase 0 — Decisions & stack research

### Research verdict

| Library | Verdict |
| --- | --- |
| **GSAP + ScrollTrigger** | **Chosen.** Industry standard for award-winning scroll storytelling. Imperative timelines give frame-exact control over pinning and scrubbing. All plugins became free in 3.13 — including SplitText, previously paid-only. |
| **Motion (framer-motion)** | Secondary/optional. Better for React UI state (modals, layout morphs, exit animations). Weaker at long scroll choreography. |
| **CSS scroll-driven animations** | Rejected as primary. Fastest and lightest, but `animation-timeline` lacks Safari support and cannot express staggered multi-element timelines. |
| **Lenis** | **Chosen** for smooth scroll. Wraps native scroll so `position: sticky` and accessibility survive. |
| **React Three Fiber + drei** | **Chosen** for the WebGL tier only, lazy-loaded. |

### Why Lenis + GSAP must share one loop

The single biggest cause of janky "smooth scroll" is two competing animation
loops — Lenis on its own RAF, GSAP on its ticker. They must be unified. This is
handled once in Phase 5 and never touched again.

### Install

```bash
pnpm add gsap @gsap/react lenis
# Phase 8 only, when you actually reach it:
pnpm add three @react-three/fiber @react-three/drei
```

### Exit gate
- [ ] Stack agreed, dependencies installed
- [ ] Persona + copy written (see below) — real copy before mockups, always

### Persona & copy (invented — edit freely)

```
Name:      Kaito Mercer
Role:      Senior Frontend Engineer / Interface Designer
Tagline:   I build interfaces that feel inevitable.
Location:  Remote — IST
Status:    Available Mar 2026
Sections:  Hero / About / Selected Work / Case Study / Lab / Capabilities / Contact
Projects:  001 Aperture — realtime video editor
           002 Lumen Bank — financial dashboard
           003 Northwind — logistics platform
           004 Studio Fold — agency site
```

---

## Phase 1 — The Universal Prompt (Style DNA)

This is the backbone of consistency. **Paste this block verbatim at the end of
every single image prompt.** Do not paraphrase it, do not say "same style as
before" — image models have no reliable memory of prior generations, and drift
compounds fast.

```
STYLE DNA (obey exactly):
Dark editorial web design, Awwwards-caliber. Background near-black #0A0A0A with
subtle 4% film grain. Text off-white #F2F0EB. Single accent: acid green #C8F31D,
used sparingly — max 2 elements per screen. Mid-grey #6B6B66 for meta labels.
No other colors. No purple. No gradients. No glow. No neon.
Typography: oversized tight-tracked grotesque for headings (Neue Haas Grotesk
style), thin italic serif (PP Editorial New style) for accent words only.
Body text 16px, generous 1.55 line-height. Uppercase 11px letterspaced labels
with hairline 1px #2A2A28 dividers above sections.
Layout: strict 12-column grid, wide margins, deliberate asymmetry, lots of
negative space. Flat 2D UI mockup, straight-on orthographic view, no browser
chrome, no device frame, no perspective, no drop shadows, no mockup props.
Crisp legible text rendering. 3:2 landscape aspect ratio.
```

### Three rules that make or break this phase

1. **One screen per image.** Never ask for a full scrolling page in a single tall
   canvas — long vertical images produce mushy text and hallucinated UI. Generate
   each section at 3:2, then stack them in Figma or a folder.
2. **Reference-chain your generations.** Generate the hero first. Once it's right,
   attach that winning image as a visual reference alongside prompts 2–8. This
   locks consistency far harder than text alone.
3. **Treat rendered text as placement reference only.** Image models garble small
   copy. You are extracting *typographic scale, rhythm, and hierarchy* — the real
   words get set in code in Phase 4.

### Exit gate
- [ ] Style DNA finalized and saved somewhere reusable
- [ ] Hero image generated and approved as the reference anchor

---

## Phase 2 — Static image generation, page by page

Generate in this order. Each prompt = `[PROMPT BODY]` + `[STYLE DNA]`.
Save outputs as `/design/01-hero.png`, `/design/02-about.png`, etc.

### 01 — Home / Hero

```
Website hero section for a senior web developer's portfolio. Full-bleed dark
canvas. Fixed top bar: small acid-green square logo left, nav right reading
WORK / ABOUT / LAB / CONTACT in 11px uppercase letterspaced type.
Center-left: a colossal 4-line headline occupying 70% of the frame, reading
"I BUILD INTERFACES THAT FEEL INEVITABLE" — the word "inevitable" set in thin
italic serif and colored acid green, everything else off-white uppercase
grotesque, lines tightly stacked with almost no leading, left-aligned.
Bottom-left: a two-line 16px paragraph and a small circular outlined button
with a downward arrow. Bottom-right: vertical 11px text "SCROLL" beside a thin
2px progress line. Top-right corner: 11px "AVAILABLE — MAR 2026" with a small
green dot.

[STYLE DNA]
```

### 02 — About

```
Website about section, dark editorial portfolio. Left column (5 of 12 cols):
a tall grayscale high-contrast portrait photograph of a person at a desk,
heavily desaturated, sharp grain. Right column (6 cols): uppercase 11px label
"01 — ABOUT", then a 3-line statement in 40px off-white grotesque, then two
short 16px body paragraphs in mid-grey. Below that, a horizontal row of three
statistics separated by hairline vertical rules: "08 YEARS", "40+ SHIPPED",
"12 AWARDS" — the numerals large in acid green, labels tiny and uppercase.
Generous negative space between all elements.

[STYLE DNA]
```

### 03 — Selected Work (index)

```
Website project index section, dark editorial portfolio. Uppercase 11px label
"02 — SELECTED WORK" top-left above a hairline divider. Below: four full-width
horizontal project rows stacked vertically, each row separated by a 1px
#2A2A28 divider and containing, left to right: a small 11px index number
"001", a large 44px project name in off-white grotesque, a 11px mid-grey
category label, and a small outlined circular arrow at the far right.
The second row is in a hover state: its text shifted slightly right, its name
rendered in acid green, and a small 16:9 grayscale project thumbnail floating
over the row's right side.

[STYLE DNA]
```

### 04 — Case Study (detail)

```
Website case-study detail page, dark editorial portfolio. Top: 11px uppercase
breadcrumb "WORK / 002". Below it a large 3-line title left-aligned, and to
its right a small metadata stack of label-value pairs (ROLE, YEAR, STACK,
CLIENT) in 11px, values off-white, labels mid-grey. Beneath: a wide full-bleed
16:9 grayscale hero image of an abstract interface. Below the image, a
two-column block — left 4 cols holds an 11px "THE CHALLENGE" label, right 6
cols holds two 16px body paragraphs. At the bottom edge, two small stacked
grayscale detail screenshots side by side with a thin gap.

[STYLE DNA]
```

### 05 — Lab / Playground

```
Website experiments gallery section, dark editorial portfolio. Uppercase 11px
label "03 — THE LAB" with hairline divider. Below: an asymmetric masonry grid
of six cards of deliberately unequal heights and widths, each card a flat dark
#141413 rectangle with a 1px #2A2A28 border, containing a small abstract
monochrome geometric graphic, a 20px title, and a 11px mid-grey date. One
single card is outlined in acid green. Uneven vertical offsets between columns.

[STYLE DNA]
```

### 06 — Capabilities / Marquee

```
Website capabilities section, dark editorial portfolio. Upper half: a single
horizontal band containing enormous 90px uppercase grotesque words running off
both edges of the frame — "TYPESCRIPT · WEBGL · MOTION · NEXT" — clipped at
frame edges as a marquee, off-white, with one word in acid green.
Thin hairline rules directly above and below the band.
Lower half: three equal columns separated by vertical hairlines, each with a
tiny acid-green numeral, a 24px uppercase heading, and a short 16px paragraph
in mid-grey. Heavy negative space beneath.

[STYLE DNA]
```

### 07 — Contact / Footer

```
Website contact and footer section, dark editorial portfolio. Center of frame:
an enormous 3-line uppercase grotesque statement "LET'S MAKE SOMETHING WORTH
REMEMBERING", the last word in thin italic serif acid green. Directly below,
centered, a large 32px underlined email address in off-white.
Bottom edge: a hairline divider, then a footer row with a small acid-green
square logo left, a horizontal list of social links (GITHUB, X, LINKEDIN,
READCV) in 11px uppercase center, and a 11px local time "14:32 IST" right.
Vast empty space above the headline.

[STYLE DNA]
```

### 08 — 404

```
Website 404 error page, dark editorial portfolio. Almost entirely empty dark
canvas. Slightly above center-left, a colossal 200px "404" in off-white
grotesque with extremely tight tracking, the final digit rendered as a thin
italic serif in acid green. Below it a single 16px mid-grey line
"This page never shipped." and a small underlined 11px uppercase link
"RETURN HOME". Nothing else in the frame.

[STYLE DNA]
```

### Mobile variants

Re-run prompts 01–07 with this appended **before** the Style DNA, and change the
DNA's final line to `9:16 portrait aspect ratio`:

```
MOBILE OVERRIDE: 9:16 portrait viewport, single column, 24px side margins,
headline scaled down to 40px, nav collapsed to a single hamburger icon,
multi-column rows restacked vertically, statistics stacked as a 2x2 grid.
```

### Exit gate
- [ ] 8 desktop screens approved
- [ ] 7 mobile screens approved
- [ ] All saved to `/design/` with consistent naming

---

## Phase 3 — Image → design tokens

Before writing any markup, extract the system from the images. This prevents
hardcoded values scattered across components.

**AI prompt to use:**

```
Here are my approved design mockups. Extract a complete design token system:
- Exact hex values, mapped to semantic names (background, foreground, accent,
  muted, border)
- A type scale with rem values and matching line-heights and letter-spacings
- A spacing scale (stick to a 4px base)
- Border radius and hairline border values
Output as Tailwind v4 CSS custom properties inside an @theme block in
globals.css. Do not write any components yet.
```

Target output shape:

```css
@import "tailwindcss";

@theme inline {
  --color-background: #0a0a0a;
  --color-foreground: #f2f0eb;
  --color-accent: #c8f31d;
  --color-muted: #6b6b66;
  --color-border: #2a2a28;
  --font-sans: "Neue Haas Grotesk", "Inter Fallback";
  --font-serif: "PP Editorial New", Georgia;
  --text-display: 8vw;
  --tracking-display: -0.04em;
}
```

### Exit gate
- [ ] Zero raw hex values will appear in component files
- [ ] Fonts loaded via `next/font` and wired to `--font-sans` / `--font-serif`
- [ ] `<html className="bg-background">` set in root layout

---

## Phase 4 — Image → static code (pixel-perfect)

Build **all markup and CSS with zero animation.** Every element sits in its final
resting position. Animation is added later by moving elements *from* somewhere
*to* these positions.

**AI prompt per section:**

```
Attached is the approved mockup for the [SECTION NAME] section.
Build it as a React server component in TypeScript with Tailwind v4.

Requirements:
- Match the mockup's layout, proportions, and type scale exactly
- Use ONLY the design tokens defined in globals.css — no raw hex, no arbitrary
  values like p-[17px]
- Flexbox for layout; CSS Grid only where the mockup is genuinely 2D
- Semantic HTML: <section>, <header>, real heading hierarchy
- Mobile-first, then md: and lg: breakpoints per the mobile mockup
- NO animation, NO transitions, NO motion libraries, NO client directives
- Wrap headlines in text-balance

Return one file: components/sections/[name].tsx
```

### Static build order
1. `layout.tsx` — fonts, metadata, viewport, `bg-background`
2. `components/nav.tsx`
3. Sections 01 → 07 in order
4. `app/not-found.tsx`
5. `app/page.tsx` composing the sections

### Exit gate — the most important gate in this document
- [ ] Every section matches its mockup side by side at 1440px and 390px
- [ ] Verified in a real browser, not just a successful compile
- [ ] Zero `"use client"` outside genuinely interactive leaves
- [ ] Zero animation code in the repo

---

## Phase 5 — Motion foundation (Lenis + GSAP)

Set up once, correctly. This is the plumbing everything else depends on.

### 5.1 The unified scroll loop

`components/smooth-scroll.tsx`:

```tsx
"use client"

import { ReactLenis, useLenis } from "lenis/react"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function SyncGsap() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    lenis.on("scroll", ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.off("scroll", ScrollTrigger.update)
      gsap.ticker.remove(raf)
    }
  }, [lenis])

  return null
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: false, duration: 1.1 }}>
      <SyncGsap />
      {children}
    </ReactLenis>
  )
}
```

Key details: `autoRaf: false` disables Lenis's own loop so GSAP's ticker drives
it, and `lagSmoothing(0)` stops GSAP from skipping frames during scrub.

### 5.2 Reduced-motion gate

Non-negotiable for an accessible award-caliber site. Every animation is
registered inside `gsap.matchMedia()`:

```tsx
"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export function useRevealOnScroll(ref: React.RefObject<HTMLElement>) {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(ref.current!.querySelectorAll("[data-reveal]"), {
        yPercent: 110,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      })
    })

    return () => mm.revert()
  }, { scope: ref })
}
```

`useGSAP` handles cleanup automatically; `matchMedia` means reduced-motion users
simply see the finished static layout from Phase 4.

### Exit gate
- [ ] Scroll feels weighted, no stutter, no double-loop jitter
- [ ] `position: sticky` still works
- [ ] Reduced-motion OS setting yields the static site with zero broken states

---

## Phase 6 — The motion tiers

Add tiers **in order**. Ship-able after any tier. Never start a tier before the
previous one is smooth.

### Tier 1 — Reveal & rhythm (the 80%)

| Effect | Implementation |
| --- | --- |
| Line-mask heading reveal | `SplitText` with `mask: "lines"`, `yPercent: 110 → 0`, `expo.out`, stagger `0.08` |
| Body fade-rise | `y: 24, opacity: 0`, triggered at `top 75%` |
| Image clip reveal | animate `clipPath: inset(100% 0 0 0)` → `inset(0%)` |
| Hairline draw | `scaleX: 0 → 1`, `transformOrigin: left` |
| Number count-up | GSAP tween on a proxy object + `onUpdate` |
| Marquee | `xPercent: -50` infinite, duplicated content, `repeat: -1` |

Text-splitting prompt:

```
Add a character/line reveal to this heading using GSAP SplitText (free in 3.13).
Use type: "lines,words", mask: "lines" so lines slide up from behind their own
clip mask. Animate yPercent 110 → 0, duration 1.1, ease expo.out, stagger 0.08.
Wrap in useGSAP with scope, wrap in gsap.matchMedia for prefers-reduced-motion,
and revert the split on cleanup. Ensure the heading is readable if JS fails.
```

### Tier 2 — Scroll choreography

- **Pinned horizontal work gallery** — `ScrollTrigger` with `pin: true`,
  `scrub: 1`, `end: "+=300%"`, translating a flex row on `xPercent`
- **Parallax depth** — layered `yPercent` at differing rates, always `scrub: true`
- **Sticky case-study media** — image pins while text columns scroll past
- **Scroll-velocity skew** — map `ScrollTrigger.getVelocity()` to a clamped `skewY`
- **Section theme inversion** — tween CSS variables as a section enters

### Tier 3 — Cursor & micro-interaction

- Magnetic cursor: a `quickTo`-driven follower that scales and inverts over links
- Project row hover: thumbnail follows cursor with lag, `clipPath` reveal
- Button fill wipes on `scaleY` from bottom
- Link underline draw on `scaleX`

Always use `gsap.quickTo()` for cursor work — it reuses one tween instead of
allocating per mousemove.

### Tier 4 — Page transitions

Next.js App Router: a client transition layer with an overlay that covers,
navigates via `router.push`, then uncovers. Requires the View Transitions
approach or a manual overlay; keep total duration under 700ms.

### Exit gate per tier
- [ ] 60fps sustained while scrolling (DevTools Performance)
- [ ] Only `transform`, `opacity`, and `clip-path` are animated — never
      `width`, `height`, `top`, `left`, or `margin`
- [ ] No layout thrash warnings

---

## Phase 7 — SVG layer

SVG handles crisp vector detail that DOM and canvas can't.

| Use | Technique |
| --- | --- |
| Logo draw-on | `DrawSVGPlugin` (free in 3.13) on `stroke-dasharray` |
| Scroll progress ring | animate `stroke-dashoffset` bound to `ScrollTrigger` progress |
| Blob/shape morph | `MorphSVGPlugin` between two same-point-count paths |
| Text on curve | `<textPath>` rotating slowly, infinite |
| Grain / noise | `<feTurbulence>` filter as a fixed overlay at 4% opacity |
| Gooey mask reveals | `<feGaussianBlur>` + `<feColorMatrix>` on a mask |

Rules: hand-author only *abstract* vectors. **Never hand-draw SVG paths for maps
or geographic data** — use a mapping library. Keep filters off large repainting
areas; `feTurbulence` is expensive, so render it once as a static overlay rather
than animating it.

**Prompt:**

```
Create an inline SVG scroll-progress indicator: a 40px circle with a 1px
#2A2A28 track and an acid-green #C8F31D progress arc. Drive stroke-dashoffset
from GSAP ScrollTrigger's overall page progress with scrub: true. No JS
per-frame DOM writes beyond the single attribute. Include aria-hidden.
```

### Exit gate
- [ ] SVGs inline (not `<img>`) where they animate
- [ ] Decorative SVGs marked `aria-hidden="true"`
- [ ] Filters not causing repaint storms

---

## Phase 8 — WebGL / Three.js layer

**Add last, and only where it earns its weight.** WebGL is the difference between
"very good" and "award-winning", and also the fastest way to destroy performance.

### Where it's worth it

1. **Hero backdrop** — slow-drifting particle field or displaced plane
2. **Project image hover distortion** — the signature portfolio effect: a shader
   lerping between two textures with a noise displacement map
3. **Scroll-driven mesh curvature** — images bending on scroll velocity
4. **A single Lab centerpiece** — one genuinely interactive 3D object

### Setup

```bash
pnpm add three @react-three/fiber @react-three/drei
```

Always lazy-load, never SSR:

```tsx
const HeroCanvas = dynamic(() => import("@/components/webgl/hero-canvas"), {
  ssr: false,
  loading: () => null,
})
```

### Non-negotiable rules

- One `<Canvas>` per page maximum. Multiple canvases mean multiple WebGL contexts.
- `dpr={[1, 2]}` — never render at unbounded device pixel ratio.
- `frameloop="demand"` for static scenes; call `invalidate()` on change.
- Pause rendering off-screen with drei's `<AdaptiveDpr>` / visibility checks.
- Dispose geometries, materials, and textures on unmount.
- Set `crossOrigin = "anonymous"` on textures loaded into canvas.
- Provide a static image fallback for reduced-motion and no-WebGL cases.
- Compress textures (`.webp`, ≤2048px). Textures dominate the memory budget.

**Prompt:**

```
Build a React Three Fiber hover-distortion component for portfolio thumbnails.
A plane geometry with a custom shader material that lerps between a base
texture and a displaced state driven by a uHover uniform (0→1) and a noise
texture. Animate uHover with GSAP on pointerenter/pointerleave.
Requirements: single Canvas, dpr={[1,2]}, frameloop="demand", full dispose on
unmount, ssr:false dynamic import, static <img> fallback when
prefers-reduced-motion is set or WebGL is unavailable.
```

### Exit gate
- [ ] Lighthouse performance still ≥ 85 on mobile
- [ ] No WebGL context-lost warnings
- [ ] Static fallback verified by disabling WebGL

---

## Phase 9 — Performance & accessibility budget

### Budget

| Metric | Target |
| --- | --- |
| LCP | < 2.5s |
| CLS | < 0.05 (animation must never shift layout) |
| INP | < 200ms |
| JS on first load | < 250KB gzipped, WebGL excluded and lazy |
| Sustained scroll FPS | 60 desktop, 50+ mid-tier mobile |

Measure with the browser-automation tooling (`agent-browser vitals <url> --json`)
rather than guessing.

### Accessibility

- `prefers-reduced-motion` respected at every tier via `gsap.matchMedia()`
- All content readable and reachable with JS disabled — reveals must animate
  *from* hidden *to* visible, never leave content stuck at `opacity: 0`
- Keyboard focus never trapped by pinned or horizontally-scrolled sections
- Smooth scroll doesn't break `Home`/`End`/`PageDown` or anchor links
- Contrast: `#F2F0EB` on `#0A0A0A` passes AAA; acid green on near-black passes AA
  for large text only — never use it for 16px body copy

### Common failure modes

| Symptom | Cause |
| --- | --- |
| Janky smooth scroll | Lenis and GSAP on separate RAF loops |
| Reveals fire at wrong position | ScrollTrigger measured before fonts/images loaded — call `ScrollTrigger.refresh()` after load |
| Content invisible on mobile | Animation set `opacity: 0` and the trigger never fired |
| CLS spikes | Animating layout properties instead of transforms |
| Pinned section overlaps | Missing `pinSpacing` or nested pins |

---

## Phase 10 — Ship checklist

- [ ] All 8 sections match mockups at 390 / 768 / 1440 / 1920
- [ ] Every motion tier degrades gracefully to the Phase 4 static layout
- [ ] Reduced-motion audit passed
- [ ] Keyboard-only navigation passed
- [ ] `metadata` + OG image set in `layout.tsx`
- [ ] Security headers added to `next.config` (`X-Content-Type-Options`,
      `Referrer-Policy`, `Strict-Transport-Security`, `Permissions-Policy`)
- [ ] Real-device test: one mid-tier Android, one iOS Safari
- [ ] Lighthouse ≥ 90 performance / 100 accessibility on desktop

---

## Appendix A — AI prompting patterns

### The four rules

1. **One concern per prompt.** "Build the hero" and "animate the hero" are two
   prompts. Combined, you get mediocre versions of both.
2. **Always state the negative constraints.** `no animation`, `no raw hex`,
   `no client directive`, `no gradients`. Models default to adding things.
3. **Name the exact API.** "Use GSAP SplitText with mask: 'lines'" beats "add a
   nice text animation" every time.
4. **Demand the fallback in the same breath.** Ask for the reduced-motion and
   no-JS path inside the prompt, or it won't exist.

### Reusable prompt skeleton

```
CONTEXT:  [attach mockup / name the file being modified]
GOAL:     [one specific outcome]
STACK:    Next.js App Router, TypeScript, Tailwind v4, GSAP 3.13 + useGSAP, Lenis
CONSTRAINTS:
  - Design tokens only, no raw hex, no arbitrary Tailwind values
  - Animate only transform / opacity / clip-path
  - Wrap in useGSAP with scope + gsap.matchMedia for reduced motion
  - Content must be visible and readable if JS fails
DELIVERABLE: [exact file path(s)]
```

### Phase-to-prompt map

| Phase | Ask the AI for |
| --- | --- |
| 2 | Image prompts + Style DNA (never code) |
| 3 | Token extraction to `globals.css` only |
| 4 | Static components, animation explicitly forbidden |
| 5 | The Lenis/GSAP sync provider, once |
| 6 | One effect per prompt, one tier at a time |
| 7 | Inline SVG + the single attribute it animates |
| 8 | One WebGL component with disposal and fallback specified |
| 9 | An audit, not new features — ask it to find violations |

---

## Appendix B — Target file structure

```
app/
  layout.tsx                 fonts, metadata, bg-background, SmoothScroll
  page.tsx                   composes sections
  not-found.tsx              the 404 design
  work/[slug]/page.tsx       case study
  globals.css                @theme tokens
components/
  smooth-scroll.tsx          Lenis + GSAP unified loop
  nav.tsx
  cursor.tsx                 Tier 3 magnetic cursor
  sections/
    hero.tsx  about.tsx  work-index.tsx
    lab.tsx   capabilities.tsx  contact.tsx
  motion/
    split-reveal.tsx         line-mask heading
    reveal.tsx               generic fade-rise
    marquee.tsx
    horizontal-pin.tsx       Tier 2
  webgl/
    hero-canvas.tsx          lazy, ssr:false
    distortion-image.tsx     shader hover
  svg/
    grain.tsx  progress-ring.tsx
hooks/
  use-reveal.ts  use-lenis-sync.ts
design/
  01-hero.png ... 08-404.png
  mobile/01-hero.png ...
roadmap.md
```

---

## Timeline at a glance

```
Phase 0  Decisions + install + copy
Phase 1  Style DNA locked
Phase 2  15 mockups generated and approved      ← design freeze
Phase 3  Tokens extracted
Phase 4  Static site, zero motion               ← most important gate
Phase 5  Lenis + GSAP foundation
Phase 6  Tier 1 → 2 → 3 → 4 (shippable after each)
Phase 7  SVG detail
Phase 8  WebGL, only where it earns its cost
Phase 9  Audit against budget
Phase 10 Ship
```
