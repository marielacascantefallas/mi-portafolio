import socialClubThumb from '../Socialclub/Mockup4.png'
import repuestosAltoThumb from '../assets/projects/repuestos-alto.jpg'
import ticoGuidesThumb from '../assets/projects/ticoguides-cover.png'
import gexpSoftwareThumb from '../assets/projects/gexp-software.jpg'
import biianchiEstudioThumb from '../assets/projects/biianchi-estudio.jpg'
import goEasyThumb from '../assets/projects/goeasy.jpg'
import sunriseHillGlampingThumb from '../assets/projects/sunrise-hill-glamping.jpg'
import denverTransparentMoversThumb from '../assets/projects/denver-transparent-movers.jpg'
import elMuelleStoreThumb from '../assets/projects/el-muelle-store.jpg'

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
    description:
      'Website for an automotive parts and LED/3D technology retailer serving the Zona Sur of Costa Rica.',
    tags: ['Web Development', 'Client Site'],
    image: repuestosAltoThumb,
    link: 'https://www.repuestosalto.com/',
  },
  {
    id: 4,
    title: 'TicoGuides',
    description:
      'Travel guide platform showcasing curated experiences and local guides across Costa Rica.',
    tags: ['Web Development', 'Client Site'],
    image: ticoGuidesThumb,
    link: 'https://ticoguides.com/',
  },
  {
    id: 5,
    title: 'GEXP Software',
    description:
      'Custom software studio site for a team shipping high-converting websites and apps.',
    tags: ['Web Development', 'Client Site'],
    image: gexpSoftwareThumb,
    link: 'https://gexpsoftware.com/',
  },
  {
    id: 6,
    title: 'Biianchi Estudio',
    description:
      'Creative direction studio building memorable brands through strategy, photography, and design.',
    tags: ['Web Development', 'Client Site'],
    image: biianchiEstudioThumb,
    link: 'https://www.biianchiestudio.com/',
  },
  {
    id: 7,
    title: 'GoEasy',
    description:
      'Multi-agent WhatsApp customer service platform for teams handling high volumes of chats.',
    tags: ['Web Development', 'Client Site'],
    image: goEasyThumb,
    link: 'https://goeasy.chat/',
  },
  {
    id: 8,
    title: 'Sunrise Hill Glamping',
    description:
      'Glamping hotel site in Costa Rica showcasing domes, suites, and social spaces with online booking.',
    tags: ['Web Development', 'Client Site'],
    image: sunriseHillGlampingThumb,
    link: 'https://sunrisehillglamping.com/',
  },
  {
    id: 9,
    title: 'Denver Transparent Movers',
    description:
      'Site for a licensed Denver moving company highlighting owner-operated service and instant quotes.',
    tags: ['Web Development', 'Client Site'],
    image: denverTransparentMoversThumb,
    link: 'https://www.denvertransparentmovers.com/',
  },
  {
    id: 10,
    title: 'El Muelle Store',
    description:
      'E-commerce storefront for a Costa Rican apparel brand selling activewear for men, women, and kids.',
    tags: ['Web Development', 'Client Site'],
    image: elMuelleStoreThumb,
    link: 'https://elmuellestore.com/',
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
