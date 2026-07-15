import socialClubThumb from '../Socialclub/Mockup4.png'

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
]

export default projects
