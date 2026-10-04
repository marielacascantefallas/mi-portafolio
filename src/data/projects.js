import socialClubThumb from '../Socialclub/Mockup4.png'
import gexpSoftwareThumb from '../assets/projects/gexp-software.jpg'
import gexpSoftwareCard from '../assets/projects/gexp-software-card.jpg'
import biianchiEstudioThumb from '../assets/projects/biianchi-estudio.jpg'
import biianchiEstudioBanner from '../assets/projects/biianchi-estudio-banner.jpg'
import picoMarVillasThumb from '../assets/projects/pico-mar-villas.jpg'
import picoMarVillasBanner from '../assets/projects/pico-mar-villas-banner.jpg'

const projects = [
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
    id: 6,
    title: 'Biianchi Estudio',
    slug: 'biianchi-estudio',
    description:
      'Creative direction studio building memorable brands through strategy, photography, and design.',
    tags: ['Web Development', 'Client Site'],
    // Case-study banner (wide homepage screenshot).
    image: biianchiEstudioBanner,
    imageWidth: 2000,
    imageHeight: 1253,
    // Carousel card cover (vertical brand shot) — falls back to `image`
    // above if unset, see Projects.jsx.
    cardImage: biianchiEstudioThumb,
    cardImageWidth: 1602,
    cardImageHeight: 2000,
    link: '/proyectos/biianchi-estudio',
    siteUrl: 'https://www.biianchiestudio.com/',
    duration: '2 weeks',
    role: 'Photography, Editing & UX/UI Design',
    challenge:
      "Built to feature service packages rather than a gallery of past work, Biianchi Estudio's site puts the two founders front and center. The goal for this two-week build was to create an easy-to-navigate layout that reflects their creative style while keeping the presentation clear, polished, and straightforward.",
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
