import socialClubThumb from '../Socialclub/Mockup4.png'
import repuestosAltoThumb from '../assets/projects/repuestos-alto.jpg'
import ticoGuidesThumb from '../assets/projects/ticoguides-cover.png'
import gexpSoftwareThumb from '../assets/projects/gexp-software.jpg'
import biianchiEstudioThumb from '../assets/projects/biianchi-estudio.jpg'
import goEasyThumb from '../assets/projects/goeasy.jpg'
import sunriseHillGlampingThumb from '../assets/projects/sunrise-hill-glamping.jpg'
import denverTransparentMoversThumb from '../assets/projects/denver-transparent-movers.jpg'
import elMuelleStoreThumb from '../assets/projects/el-muelle-store.jpg'

// Placeholder values for case-study fields that aren't filled in yet —
// clearly marked so they're obvious to find and replace (Fase 7: "usa
// imágenes placeholder y texto placeholder claramente marcado").
const ADD_DURATION = 'Add project duration'
const ADD_ROLE = 'Add your role'
const ADD_CHALLENGE = 'Add the main challenge'

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
    id: 3,
    title: 'Repuestos Alto',
    slug: 'repuestos-alto',
    description:
      'Website for an automotive parts and LED/3D technology retailer serving the Zona Sur of Costa Rica.',
    tags: ['Web Development', 'Client Site'],
    image: repuestosAltoThumb,
    imageWidth: 1200,
    imageHeight: 750,
    link: '/proyectos/repuestos-alto',
    siteUrl: 'https://www.repuestosalto.com/',
    duration: ADD_DURATION,
    role: ADD_ROLE,
    challenge: ADD_CHALLENGE,
  },
  {
    id: 4,
    title: 'TicoGuides',
    slug: 'ticoguides',
    description:
      'Travel guide platform showcasing curated experiences and local guides across Costa Rica.',
    tags: ['Web Development', 'Client Site'],
    image: ticoGuidesThumb,
    imageWidth: 933,
    imageHeight: 721,
    link: '/proyectos/ticoguides',
    siteUrl: 'https://ticoguides.com/',
    duration: ADD_DURATION,
    role: ADD_ROLE,
    challenge: ADD_CHALLENGE,
  },
  {
    id: 5,
    title: 'GEXP Software',
    slug: 'gexp-software',
    description:
      'Custom software studio site for a team shipping high-converting websites and apps.',
    tags: ['Web Development', 'Client Site'],
    image: gexpSoftwareThumb,
    imageWidth: 1200,
    imageHeight: 750,
    link: '/proyectos/gexp-software',
    siteUrl: 'https://gexpsoftware.com/',
    duration: ADD_DURATION,
    role: ADD_ROLE,
    challenge: ADD_CHALLENGE,
  },
  {
    id: 6,
    title: 'Biianchi Estudio',
    slug: 'biianchi-estudio',
    description:
      'Creative direction studio building memorable brands through strategy, photography, and design.',
    tags: ['Web Development', 'Client Site'],
    image: biianchiEstudioThumb,
    imageWidth: 1200,
    imageHeight: 750,
    link: '/proyectos/biianchi-estudio',
    siteUrl: 'https://www.biianchiestudio.com/',
    duration: ADD_DURATION,
    role: ADD_ROLE,
    challenge: ADD_CHALLENGE,
  },
  {
    id: 7,
    title: 'GoEasy',
    slug: 'goeasy',
    description:
      'Multi-agent WhatsApp customer service platform for teams handling high volumes of chats.',
    tags: ['Web Development', 'Client Site'],
    image: goEasyThumb,
    imageWidth: 1200,
    imageHeight: 750,
    link: '/proyectos/goeasy',
    siteUrl: 'https://goeasy.chat/',
    duration: ADD_DURATION,
    role: ADD_ROLE,
    challenge: ADD_CHALLENGE,
  },
  {
    id: 8,
    title: 'Sunrise Hill Glamping',
    slug: 'sunrise-hill-glamping',
    description:
      'Glamping hotel site in Costa Rica showcasing domes, suites, and social spaces with online booking.',
    tags: ['Web Development', 'Client Site'],
    image: sunriseHillGlampingThumb,
    imageWidth: 1200,
    imageHeight: 750,
    link: '/proyectos/sunrise-hill-glamping',
    siteUrl: 'https://sunrisehillglamping.com/',
    duration: ADD_DURATION,
    role: ADD_ROLE,
    challenge: ADD_CHALLENGE,
  },
  {
    id: 9,
    title: 'Denver Transparent Movers',
    slug: 'denver-transparent-movers',
    description:
      'Site for a licensed Denver moving company highlighting owner-operated service and instant quotes.',
    tags: ['Web Development', 'Client Site'],
    image: denverTransparentMoversThumb,
    imageWidth: 1200,
    imageHeight: 750,
    link: '/proyectos/denver-transparent-movers',
    siteUrl: 'https://www.denvertransparentmovers.com/',
    duration: ADD_DURATION,
    role: ADD_ROLE,
    challenge: ADD_CHALLENGE,
  },
  {
    id: 10,
    title: 'El Muelle Store',
    slug: 'el-muelle-store',
    description:
      'E-commerce storefront for a Costa Rican apparel brand selling activewear for men, women, and kids.',
    tags: ['Web Development', 'Client Site'],
    image: elMuelleStoreThumb,
    imageWidth: 1200,
    imageHeight: 750,
    link: '/proyectos/el-muelle-store',
    siteUrl: 'https://elmuellestore.com/',
    duration: ADD_DURATION,
    role: ADD_ROLE,
    challenge: ADD_CHALLENGE,
  },
  {
    id: 2,
    title: 'FitConnect',
    description:
      'Mobile app UX design connecting clients with personal trainers — from booking and secure payments to real-time chat and ratings.',
    tags: ['Mobile App', 'UX Design', 'Booking System'],
    image: null,
    link: '#',
    comingSoon: true,
    placeholderGradient:
      'linear-gradient(135deg, #0D2B45 0%, #2E86C1 55%, #D35400 100%)',
  },
]

export default projects
