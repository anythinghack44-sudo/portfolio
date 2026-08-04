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

export type Project = {
  index: string
  name: string
  category: string
  href: string
  featured?: boolean
}

export const work = {
  label: '02 — Selected Work',
  projects: [
    {
      index: '001',
      name: 'CodeWithAnimation',
      category: 'Software Education Content',
      href: '#case-study',
    },
    {
      index: '002',
      name: 'Dropnote',
      category: 'Message App',
      href: '#case-study',
      featured: true,
    },
    {
      index: '003',
      name: 'Medivault',
      category: 'Decentralized Medical Document Store',
      href: '#case-study',
    },
    {
      index: '004',
      name: 'Dsa Universe',
      category: 'DSA Learning Platform',
      href: '#case-study',
    },
  ] satisfies Project[],
}

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
  lines: ['Let’s make', 'something'],
  accentLine: 'worth remembering',
  socials: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'X', href: 'https://x.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'ReadCV', href: 'https://read.cv' },
  ],
}
