import socialClubThumb from '../Socialclub/Mockup4.png'
import gexpSoftwareThumb from '../assets/projects/gexp-software.jpg'
import gexpSoftwareCard from '../assets/projects/gexp-software-card.jpg'
import mrsRentACarThumb from '../assets/projects/mrs-rent-a-car.jpg'
import mrsRentACarBanner from '../assets/projects/mrs-rent-a-car-banner.jpg'
import picoMarVillasThumb from '../assets/projects/pico-mar-villas.jpg'
import picoMarVillasBanner from '../assets/projects/pico-mar-villas-banner.jpg'
import tramaBanner from '../assets/projects/trama-banner.jpg'
import tramaCard from '../assets/projects/trama-card.jpg'
import hiloBanner from '../assets/projects/hilo-banner.jpg'
import hiloCard from '../assets/projects/hilo-card.jpg'
import rutaBanner from '../assets/projects/ruta-banner.jpg'
import rutaCard from '../assets/projects/ruta-card.jpg'
import goeasyBanner from '../assets/projects/goeasy-banner.jpg'
import goeasyCard from '../assets/projects/goeasy-card.jpg'
const THUMBS = import.meta.glob('../assets/thumbs/*.webp', { eager: true, import: 'default' })
const thumb = (slug) => THUMBS[`../assets/thumbs/${slug}.webp`]

const projects = [
  {
    id: 16,
    title: 'GoEasy Chat',
    slug: 'goeasy-chat',
    description:
      'A shipped desktop app that lets an accounting firm answer clients from one WhatsApp number on several computers. 50+ active users.',
    tags: ['Product Design', 'B2B SaaS', 'Shipped'],
    // Rich page: src/pages/GoEasyCaseStudy.jsx. Client screens are private,
    // so the images are the case study's own diagrams.
    image: goeasyBanner,
    imageWidth: 2000,
    imageHeight: 950,
    cardImage: goeasyCard,
    cardImageWidth: 2000,
    cardImageHeight: 1500,
    link: '/work/goeasy-chat',
    siteUrl: 'https://goeasy.chat/',
  },
  {
    id: 13,
    title: 'Trama Design System',
    slug: 'trama',
    description:
      'A multi-brand design system that powers two B2B products from one set of tokens and components, built from Figma to a live Storybook.',
    tags: ['Design Systems', 'Accessibility', 'React'],
    // Case-study banner (Hilo light + Ruta dark), rendered from the real
    // components. Has its own rich page: src/pages/TramaCaseStudy.jsx.
    image: tramaBanner,
    imageWidth: 2000,
    imageHeight: 950,
    // Carousel card cover: the same screens in the four themes.
    cardImage: tramaCard,
    cardImageWidth: 2000,
    cardImageHeight: 1500,
    link: '/work/trama',
    siteUrl: 'https://marielacascantefallas.github.io/trama-design-system/',
  },
  {
    id: 14,
    title: 'Hilo',
    slug: 'hilo',
    description:
      'A shared WhatsApp inbox for accounting firms, with an AI that suggests and a person who decides. Designed and prototyped with Trama.',
    tags: ['Product Design', 'AI UX', 'B2B SaaS'],
    // Rich page: src/pages/HiloCaseStudy.jsx. Images come from the live prototype.
    image: hiloBanner,
    imageWidth: 2000,
    imageHeight: 950,
    cardImage: hiloCard,
    cardImageWidth: 2000,
    cardImageHeight: 1500,
    link: '/work/hilo',
    siteUrl: 'https://marielacascantefallas.github.io/trama-design-system/hilo/',
  },
  {
    id: 15,
    title: 'Ruta',
    slug: 'ruta',
    description:
      'A booking panel for boat tour operators: every channel in one day, honest capacity per boat, SINPE deposits and weather changes handled in one step.',
    tags: ['Product Design', 'B2B SaaS', 'Mobile'],
    // Rich page: src/pages/RutaCaseStudy.jsx. Images are the Figma screens.
    image: rutaBanner,
    imageWidth: 2000,
    imageHeight: 950,
    cardImage: rutaCard,
    cardImageWidth: 2000,
    cardImageHeight: 1500,
    link: '/work/ruta',
    siteUrl: 'https://marielacascantefallas.github.io/trama-design-system/ruta/',
  },
  {
    id: 1,
    title: 'Social Club',
    slug: 'social-club',
    // Shown in the “Other work” strip under the featured case studies.
    other: true,
    kind: 'Concept',
    description:
      'A conceptual social platform built for creatives who want to share and curate their work away from algorithmic noise.',
    tags: ['UX/UI Design', 'Branding', 'Concept Development'],
    image: socialClubThumb,
    link: '/work/social-club',
    accentClass: 'project--social-club',
  },
  {
    id: 5,
    title: 'GEXP Software',
    // Shown in the “Other work” strip under the featured case studies.
    other: true,
    kind: 'Client site',
    slug: 'gexp-software',
    description:
      'Custom software studio site for a team shipping high-converting websites and apps.',
    tags: ['Web Development', 'Client Site'],
    // Case-study banner — kept as the original site screenshot (per the
    // user: leave this one as it was).
    image: gexpSoftwareThumb,
    imageWidth: 1200,
    imageHeight: 750,
    // Carousel card cover (gexp. logo shot) — falls back to `image` above
    // if unset, see Projects.jsx.
    cardImage: gexpSoftwareCard,
    cardImageWidth: 2000,
    cardImageHeight: 1999,
    link: '/work/gexp-software',
    siteUrl: 'https://gexpsoftware.com/',
    duration: '2 weeks',
    role: 'Editing & UX/UI Design',
    challenge:
      "GEXP Software needed its own marketing site to read as credibly as the high-converting products the team builds for clients, but the existing copy and layout buried that message under generic software-agency boilerplate. Working within a two-week turnaround, the challenge was editing the content and refining the UX/UI without a full rebuild — sharpening the hierarchy, the service narrative, and the call-to-action path so visitors could tell what the team does, and why it's different, fast.",
  },
  {
    id: 12,
    title: 'MRS Rent a Car',
    // Shown in the “Other work” strip under the featured case studies.
    other: true,
    kind: 'Client site',
    slug: 'mrs-rent-a-car',
    description:
      'Bilingual car rental and private airport transfer site for a local company in Pérez Zeledón, Costa Rica.',
    tags: ['Web Development', 'Client Site'],
    // Case-study banner (vehicle carousel, captured at 2x from the live site).
    image: mrsRentACarBanner,
    imageWidth: 2000,
    imageHeight: 1250,
    // Carousel card cover (brand photo supplied by the user) — falls back
    // to `image` above if unset, see Projects.jsx.
    cardImage: mrsRentACarThumb,
    cardImageWidth: 1584,
    cardImageHeight: 1224,
    link: '/work/mrs-rent-a-car',
    siteUrl: 'https://mrsrentacar.com/',
    duration: '2 weeks',
    role: 'UX/UI Design & Web Development',
    challenge:
      "MRS Rent a Car needed a site that could turn local and international travelers into WhatsApp bookings without the friction of a traditional reservation system. The goal was a bilingual, mobile-first experience that showcases the fleet with clear daily prices, explains requirements like the no-credit-card deposit upfront, and presents the private airport transfers, all wrapped in a bold, friendly brand that feels rooted in Costa Rica's southern zone.",
  },
  {
    id: 11,
    title: 'Pico Mar Villas',
    // Shown in the “Other work” strip under the featured case studies.
    other: true,
    kind: 'Client site',
    slug: 'pico-mar-villas',
    description:
      "Luxury villa booking platform for Costa Rica's Pacific coast, pairing curated homes with a professional concierge service.",
    tags: ['Web Development', 'Client Site'],
    // Case-study banner (wide homepage screenshot).
    image: picoMarVillasBanner,
    imageWidth: 2000,
    imageHeight: 1188,
    // Carousel card cover (aerial brand shot) — falls back to `image`
    // above if unset, see Projects.jsx.
    cardImage: picoMarVillasThumb,
    cardImageWidth: 2000,
    cardImageHeight: 1499,
    link: '/work/pico-mar-villas',
    siteUrl: 'https://picomar.com/',
    duration: '4 weeks',
    role: 'UX/UI Design',
    challenge:
      'The goal for Pico Mar was building a seamless booking engine for their entire villa portfolio. The platform had to process reservations quickly and effortlessly while maintaining a refined aesthetic that highlights the property\'s elegance and prestige.',
  },
]

// Categories used by the Work window filter, in the order she listed them.
export const CATEGORIES = [
  'UX Architecture',
  'Web Platforms',
  'SaaS Infrastructure',
  'AI Systems',
  'User Research',
  'Web Design',
  'UX/UI Design',
  'Branding',
]

export const categorySlug = (c) => c.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-')

// Desktop and Work window data: order, short kind, categories (confirmed by
// Mariella) and the cover used as the desktop file icon.
const DESK = {
  trama: { name: 'Trama', kind: 'Design system', categories: ['UX Architecture', 'SaaS Infrastructure', 'UX/UI Design'] },
  hilo: { kind: 'AI product', categories: ['UX Architecture', 'SaaS Infrastructure', 'AI Systems', 'User Research', 'UX/UI Design'] },
  ruta: { kind: 'B2B product', categories: ['SaaS Infrastructure', 'User Research', 'UX/UI Design'] },
  'goeasy-chat': { kind: 'Shipped product', categories: ['UX Architecture', 'SaaS Infrastructure', 'UX/UI Design'] },
  'social-club': { kind: 'Concept', categories: ['Branding', 'UX/UI Design', 'UX Architecture', 'User Research'] },
  'pico-mar-villas': { kind: 'Client site', categories: ['Web Platforms', 'Web Design', 'UX/UI Design'] },
  'mrs-rent-a-car': { kind: 'Client site', categories: ['Web Platforms', 'Web Design', 'UX/UI Design'] },
  'gexp-software': { kind: 'Client site', categories: ['Web Design', 'Branding', 'UX/UI Design'] },
}

const LAB = {
  id: 17,
  title: 'Lab',
  name: 'Lab',
  slug: 'lab',
  kind: 'Experiments',
  description:
    'Three small experiments built on Trama: a theme generator that checks contrast, undo versus confirm, and how to show what an AI summary is based on.',
  categories: ['AI Systems', 'User Research', 'UX/UI Design'],
  cover: thumb('lab'),
  externalUrl: 'https://marielacascantefallas.github.io/trama-design-system/lab/temas/',
}

const ORDER = ['trama', 'hilo', 'ruta', 'goeasy-chat', 'social-club', 'pico-mar-villas', 'mrs-rent-a-car', 'gexp-software']

export const deskProjects = [
  ...ORDER.map((slug) => {
    const p = projects.find((x) => x.slug === slug)
    return { name: p.title, ...p, ...DESK[slug], cover: thumb(slug) }
  }),
  LAB,
]

// Projects with a case study page, in desktop order (drives "Next project").
export const caseProjects = deskProjects.filter((p) => p.link)

export default projects
