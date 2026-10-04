import socialClubThumb from '../Socialclub/Mockup4.png'
import gexpSoftwareThumb from '../assets/projects/gexp-software.jpg'
import biianchiEstudioThumb from '../assets/projects/biianchi-estudio.jpg'

// Placeholder values for case-study fields that aren't filled in yet —
// clearly marked so they're obvious to find and replace.
const ADD_DESCRIPTION = 'Add the project description'
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
    image: biianchiEstudioThumb,
    imageWidth: 1200,
    imageHeight: 750,
    link: '/proyectos/biianchi-estudio',
    siteUrl: 'https://www.biianchiestudio.com/',
    duration: '2 weeks',
    role: 'Photography, Editing & UX/UI Design',
    challenge:
      "Biianchi Estudio's work spans strategy, photography, and design — but a one-size portfolio grid risked flattening that range into generic \"creative studio\" filler. In two weeks, the challenge was shooting and curating photography that showed the studio's own creative direction at work, then editing and designing the UX/UI so the site read as one cohesive brand statement rather than a loose collection of past projects.",
  },
  {
    id: 11,
    title: 'Pico Mar Villas',
    slug: 'pico-mar-villas',
    // TODO: description and challenge need real info about the business
    // (reviewing https://picomar.com/ is blocked from this sandbox) — see
    // chat for details. image intentionally left unset until the cover
    // file is provided.
    description: ADD_DESCRIPTION,
    tags: ['Web Development', 'Client Site'],
    image: null,
    link: '/proyectos/pico-mar-villas',
    siteUrl: 'https://picomar.com/',
    duration: '4 weeks',
    role: 'UX/UI Design',
    challenge: ADD_CHALLENGE,
  },
]

export default projects
