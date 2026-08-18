import socialClubThumb from '../Socialclub/Mockup4.png'
import repuestosAltoThumb from '../assets/projects/repuestos-alto.jpg'
import gexpSoftwareThumb from '../assets/projects/gexp-software.jpg'
import biianchiEstudioThumb from '../assets/projects/biianchi-estudio.jpg'
import goEasyThumb from '../assets/projects/goeasy.jpg'

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
    image: null,
    link: 'https://ticoguides.com/',
    placeholderGradient:
      'linear-gradient(135deg, #0D2B45 0%, #2E86C1 55%, #D35400 100%)',
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
]

export default projects
