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

const projects = [
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
    link: '/proyectos/trama',
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
    link: '/proyectos/hilo',
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
    link: '/proyectos/ruta',
    siteUrl: 'https://marielacascantefallas.github.io/trama-design-system/ruta/',
  },
  {
    id: 1,
    title: 'Social Club',
    description:
      'A conceptual social platform built for creatives who want to share and curate their work away from algorithmic noise.',
    tags: ['UX/UI Design', 'Branding', 'Concept Development'],
    image: socialClubThumb,
    link: '/proyectos/social-club',
    accentClass: 'project--social-club',
  },
  {
    id: 5,
    title: 'GEXP Software',
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
    link: '/proyectos/gexp-software',
    siteUrl: 'https://gexpsoftware.com/',
    duration: '2 weeks',
    role: 'Editing & UX/UI Design',
    challenge:
      "GEXP Software needed its own marketing site to read as credibly as the high-converting products the team builds for clients, but the existing copy and layout buried that message under generic software-agency boilerplate. Working within a two-week turnaround, the challenge was editing the content and refining the UX/UI without a full rebuild — sharpening the hierarchy, the service narrative, and the call-to-action path so visitors could tell what the team does, and why it's different, fast.",
  },
  {
    id: 12,
    title: 'MRS Rent a Car',
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
    link: '/proyectos/mrs-rent-a-car',
    siteUrl: 'https://mrsrentacar.com/',
    duration: '2 weeks',
    role: 'UX/UI Design & Web Development',
    challenge:
      "MRS Rent a Car needed a site that could turn local and international travelers into WhatsApp bookings without the friction of a traditional reservation system. The goal was a bilingual, mobile-first experience that showcases the fleet with clear daily prices, explains requirements like the no-credit-card deposit upfront, and presents the private airport transfers, all wrapped in a bold, friendly brand that feels rooted in Costa Rica's southern zone.",
  },
  {
    id: 11,
    title: 'Pico Mar Villas',
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
    link: '/proyectos/pico-mar-villas',
    siteUrl: 'https://picomar.com/',
    duration: '4 weeks',
    role: 'UX/UI Design',
    challenge:
      'The goal for Pico Mar was building a seamless booking engine for their entire villa portfolio. The platform had to process reservations quickly and effortlessly while maintaining a refined aesthetic that highlights the property\'s elegance and prestige.',
  },
]

export default projects
