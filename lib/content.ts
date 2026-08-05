/**
 * All site copy, transcribed from the approved mockups in /desgin.
 * Kept in one module so sections stay presentational and the text can be
 * swapped without touching layout.
 */

export const site = {
  name: 'Hrushikesh Behera',
  role: 'Junior Frontend Engineer',
  email: 'hello@hrushikesh.dev',
  location: 'Remote',
  status: 'Available Mar 2026',
  timezone: 'IST',
}

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Lab', href: '#lab' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  // Split so the final line can take the didone italic accent treatment.
  lines: ['I build', 'interfaces', 'that feel'],
  accentLine: 'inevitable',
  intro:
    'Junior frontend engineer building clear, responsive digital experiences with thoughtful motion, accessible code, and close attention to detail.',
}

export const about = {
  label: '01 — About',
  statement: 'I turn useful ideas into interfaces that feel natural to use.',
  paragraphs: [
    "I'm a junior frontend engineer focused on building responsive, accessible products with React, Next.js, and TypeScript. I care about the small decisions—clear hierarchy, purposeful motion, and code that stays understandable as a product grows.",
    "My work spans education content, messaging, decentralized document storage, and developer learning tools. Each project is a chance to make a complex idea feel direct, dependable, and human.",
  ],
  stats: [
    { value: '04', label: 'Projects' },
    { value: '100%', label: 'Curious' },
    { value: 'IST', label: 'Timezone' },
  ],
}

/* ─────────────────────────────────────────────────────────────
   PROJECTS — enriched data model for work section + case studies
   ───────────────────────────────────────────────────────────── */

export type Project = {
  index: string
  name: string
  category: string
  href: string
  featured?: boolean
  tagline: string
  year: string
  role: string
  stack: string[]
  description: string[]
  liveUrl?: string
  githubUrl?: string
  thumbnail: string
  heroImage: string
  detailImage: string
  features: {
    title: string
    description: string
  }[]
  metrics?: {
    label: string
    value: string
  }[]
}

export const work = {
  label: '02 — Selected Work',
  projects: [
    {
      index: '001',
      name: 'CodeWithAnimation',
      category: 'Software Education Content',
      href: '/case-study/001',
      tagline: 'Making code tutorials feel alive with motion',
      year: '2024',
      role: 'Frontend Developer',
      stack: ['React', 'Next.js', 'GSAP', 'CSS Animations'],
      description: [
        'CodeWithAnimation was born from a simple frustration: most coding tutorials are walls of static text. The challenge was to build an educational platform where code concepts are taught through rich, interactive animations that make abstract ideas tangible.',
        'I designed and built the frontend around progressive disclosure—each concept reveals itself through carefully choreographed motion sequences. Complex ideas like recursion, closures, and event loops become visual stories that learners can step through at their own pace.',
      ],
      thumbnail: '/images/projects/cwa-thumbnail-v2.jpg',
      heroImage: '/images/projects/cwa-hero-v2.jpg',
      detailImage: '/images/projects/cwa-detail-v2.jpg',
      features: [
        {
          title: 'Animated Code Walkthroughs',
          description: 'Step-by-step code animations with syntax highlighting and visual execution flow, making abstract concepts tangible.',
        },
        {
          title: 'Interactive Playgrounds',
          description: 'Live code editors where learners can modify examples and see animation changes in real time.',
        },
        {
          title: 'Progressive Curriculum',
          description: 'Structured learning paths that build on previous concepts, with motion cues guiding learners through complexity.',
        },
      ],
      metrics: [
        { label: 'Animated Lessons', value: '24+' },
        { label: 'Concepts Covered', value: '40+' },
        { label: 'Avg. Session', value: '12 min' },
      ],
    },
    {
      index: '002',
      name: 'Dropnote',
      category: 'Message App',
      href: '/case-study/002',
      featured: true,
      tagline: 'Making messages feel effortless',
      year: '2026',
      role: 'Frontend Engineer',
      stack: ['Next.js', 'TypeScript', 'React', 'WebSocket'],
      description: [
        'Dropnote began with a direct question: how little interface does a message need? The challenge was to keep writing and sharing immediate while still making status, feedback, and navigation clear across screen sizes.',
        'I shaped the frontend around focused composition, readable conversations, and responsive interaction states. Reusable components and predictable TypeScript models keep the experience consistent while leaving room for the product to grow.',
      ],
      thumbnail: '/images/projects/dropnote-thumbnail.jpg',
      heroImage: '/images/projects/dropnote-hero.jpg',
      detailImage: '/images/projects/dropnote-detail.jpg',
      features: [
        {
          title: 'Focused Composition',
          description: 'A distraction-free writing interface that makes sending messages feel as natural as thinking them.',
        },
        {
          title: 'Real-time Sync',
          description: 'WebSocket-powered live updates with optimistic UI, so conversations never feel delayed.',
        },
        {
          title: 'Adaptive Layout',
          description: 'Responsive design that shifts seamlessly from compact mobile threads to expansive desktop panels.',
        },
      ],
      metrics: [
        { label: 'Components', value: '35+' },
        { label: 'Type Coverage', value: '98%' },
        { label: 'Lighthouse', value: '96' },
      ],
    },
    {
      index: '003',
      name: 'Medivault',
      category: 'Decentralized Medical Document Store',
      href: '/case-study/003',
      tagline: 'Your medical records, truly yours',
      year: '2025',
      role: 'Frontend Developer',
      stack: ['React', 'Blockchain', 'IPFS', 'TypeScript'],
      description: [
        'Medivault tackles a critical problem in healthcare: patients rarely own their medical data. The challenge was to build a decentralized document store where individuals control access to their health records without relying on a central authority.',
        'I built the frontend to make blockchain interactions invisible to the user. Complex operations like IPFS uploads, wallet signatures, and access-control grants happen behind clean, clinical UI patterns that feel as simple as using a cloud drive.',
      ],
      thumbnail: '/images/projects/medivault-thumbnail.jpg',
      heroImage: '/images/projects/medivault-hero.jpg',
      detailImage: '/images/projects/medivault-detail.jpg',
      features: [
        {
          title: 'Decentralized Storage',
          description: 'Medical documents stored on IPFS with blockchain-anchored access control — no single point of failure.',
        },
        {
          title: 'Granular Permissions',
          description: 'Patients grant and revoke access to specific documents for specific providers, with full audit trails.',
        },
        {
          title: 'Clinical UI',
          description: 'Clean, trust-inspiring interface designed for healthcare contexts — clear hierarchy, calming palette, zero confusion.',
        },
      ],
      metrics: [
        { label: 'Doc Types', value: '12+' },
        { label: 'Encryption', value: 'AES-256' },
        { label: 'Uptime', value: '99.9%' },
      ],
    },
    {
      index: '004',
      name: 'Dsa Universe',
      category: 'DSA Learning Platform',
      href: '/case-study/004',
      tagline: 'Visualize every algorithm, master every structure',
      year: '2025',
      role: 'Frontend Developer',
      stack: ['React', 'Next.js', 'Canvas API', 'TypeScript'],
      description: [
        'DSA Universe was built to bridge the gap between reading about data structures and truly understanding them. The challenge was to create interactive visualizations for complex algorithms that are both beautiful and pedagogically effective.',
        'I developed a canvas-based rendering engine that animates sorting algorithms, tree traversals, graph searches, and more in real time. Each visualization is paired with synchronized code highlighting so learners see exactly which line produces each visual step.',
      ],
      thumbnail: '/images/projects/dsa-universe-thumbnail.jpg',
      heroImage: '/images/projects/dsa-universe-hero.jpg',
      detailImage: '/images/projects/dsa-universe-detail.jpg',
      features: [
        {
          title: 'Live Algorithm Viz',
          description: 'Real-time canvas animations for 30+ algorithms with adjustable speed, step-by-step mode, and custom inputs.',
        },
        {
          title: 'Code Sync',
          description: 'Syntax-highlighted code that highlights the executing line in sync with the visualization — see the code run.',
        },
        {
          title: 'Structured Paths',
          description: 'Curated learning tracks from basics (arrays, stacks) to advanced (DP, graph algorithms) with progress tracking.',
        },
      ],
      metrics: [
        { label: 'Algorithms', value: '30+' },
        { label: 'Visualizations', value: '50+' },
        { label: 'Topics', value: '8 tracks' },
      ],
    },
  ] satisfies Project[],
}

/* ─────────────────────────────────────────────────────────────
   HELPERS — used by dynamic case study routes
   ───────────────────────────────────────────────────────────── */

export function getProjectBySlug(slug: string): Project | undefined {
  return work.projects.find((p) => p.index === slug)
}

export function getNextProject(slug: string): Project {
  const idx = work.projects.findIndex((p) => p.index === slug)
  return work.projects[(idx + 1) % work.projects.length]
}

export function getAllProjectSlugs(): string[] {
  return work.projects.map((p) => p.index)
}

/* ─────────────────────────────────────────────────────────────
   LEGACY — kept for backwards compatibility (used nowhere now)
   ───────────────────────────────────────────────────────────── */

export const caseStudy = {
  breadcrumb: 'Work / 002',
  title: 'Dropnote / Making Messages Feel Effortless',
  meta: [
    { label: 'Role', value: 'Frontend Engineer' },
    { label: 'Year', value: '2026' },
    { label: 'Stack', value: 'Next.js, TypeScript, React' },
    { label: 'Project', value: 'Dropnote' },
  ],
  challengeLabel: 'The Challenge',
  challenge: [
    'Dropnote began with a direct question: how little interface does a message need? The challenge was to keep writing and sharing immediate while still making status, feedback, and navigation clear across screen sizes.',
    'I shaped the frontend around focused composition, readable conversations, and responsive interaction states. Reusable components and predictable TypeScript models keep the experience consistent while leaving room for the product to grow.',
  ],
}

export type Experiment = {
  name: string
  date: string
  graphic: 'wave' | 'orbital' | 'pixel' | 'intersect' | 'ray' | 'layer'
  featured?: boolean
}

export const lab = {
  label: '03 — The Lab',
  // Grouped into the four staggered columns seen in the mockup.
  columns: [
    [
      { name: 'Wave Fold', date: 'Apr 14, 2024', graphic: 'wave' },
      { name: 'Ray Trace', date: 'Apr 28, 2024', graphic: 'ray' },
    ],
    [{ name: 'Orbital Study', date: 'May 02, 2024', graphic: 'orbital' }],
    [
      { name: 'Pixel Shift', date: 'May 17, 2024', graphic: 'pixel', featured: true },
      { name: 'Layer Break', date: 'Jun 11, 2024', graphic: 'layer' },
    ],
    [{ name: 'Intersect', date: 'Jun 03, 2024', graphic: 'intersect' }],
  ] satisfies Experiment[][],
}

export const capabilities = {
  marquee: ['TypeScript', 'WebGL', 'Motion', 'Next'],
  accentWord: 'WebGL',
  pillars: [
    {
      index: '01',
      title: 'Engineering',
      body: 'Robust, scalable front-end systems built with TypeScript and modern tooling. Performance, accessibility, and clean architecture at the core of every build.',
    },
    {
      index: '02',
      title: 'Experience',
      body: 'Immersive web experiences that blend code and creativity. WebGL, animation, and interaction design crafted for clarity, emotion, and impact.',
    },
    {
      index: '03',
      title: 'Execution',
      body: 'From concept to deployment with speed and precision. Next.js workflows, iterative delivery, and attention to detail that ship polished, reliable work.',
    },
  ],
}

export const contact = {
  lines: ['Let\'s make', 'something'],
  accentLine: 'worth remembering',
  socials: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'X', href: 'https://x.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'ReadCV', href: 'https://read.cv' },
  ],
}
