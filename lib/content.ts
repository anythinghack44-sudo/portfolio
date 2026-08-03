/**
 * All site copy, transcribed from the approved mockups in /desgin.
 * Kept in one module so sections stay presentational and the text can be
 * swapped without touching layout.
 */

export const site = {
  name: 'Kaito Mercer',
  role: 'Senior Web Developer',
  email: 'hello@yourname.dev',
  status: 'Available — Mar 2026',
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
    'Senior web developer crafting considered digital experiences with precision, performance, and intent.',
}

export const about = {
  label: '01 — About',
  statement: 'I design and build digital experiences that make an impact.',
  paragraphs: [
    "I'm a senior web developer with a passion for crafting fast, accessible, and engaging websites and applications. I combine clean code with thoughtful design to deliver experiences that are intuitive, performant, and built to last.",
    "With over eight years of experience, I've had the privilege of collaborating with ambitious teams and clients around the world to bring ideas to life and solve real problems through technology.",
  ],
  stats: [
    { value: '08', label: 'Years' },
    { value: '40+', label: 'Shipped' },
    { value: '12', label: 'Awards' },
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
    { index: '001', name: 'Kinetic Studio', category: 'Web Design', href: '#case-study' },
    {
      index: '002',
      name: 'Meridian Pay',
      category: 'Development',
      href: '#case-study',
      featured: true,
    },
    { index: '003', name: 'Nova Systems', category: 'E-Commerce', href: '#case-study' },
    {
      index: '004',
      name: 'Brutal Edition',
      category: 'Creative Direction',
      href: '#case-study',
    },
  ] satisfies Project[],
}

export const caseStudy = {
  breadcrumb: 'Work / 002',
  title: 'Meridian Pay / Reimagining the Checkout',
  meta: [
    { label: 'Role', value: 'Senior Web Developer' },
    { label: 'Year', value: '2024' },
    { label: 'Stack', value: 'Next.js, TypeScript, Stripe' },
    { label: 'Client', value: 'Meridian Pay' },
  ],
  challengeLabel: 'The Challenge',
  challenge: [
    'Meridian Pay’s existing checkout was a conversion bottleneck. It was slow, inconsistent across devices, and lacked the flexibility needed to support their growing product ecosystem. Our challenge was to reimagine the checkout experience—one that was fast, secure, and intuitive, while meeting the highest standards of compliance.',
    'The solution needed to reduce friction at every step, integrate seamlessly with their backend services, and be extensible enough to support future payment methods and global expansion without sacrificing performance or maintainability.',
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
