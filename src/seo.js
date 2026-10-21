import { caseProjects } from './data/projects'

export const SITE = 'https://marielacascante.com'
const NAME = 'Mariela Cascante'

const PAGES = {
  '/': {
    title: 'Mariela Cascante | Product Designer and UX/UI Designer in Costa Rica',
    description:
      'Mariela Cascante is a product designer and UX/UI designer in Costa Rica. She designs B2B SaaS products, design systems and AI features from the first idea to launch.',
  },
  '/work': {
    title: 'Work | Mariela Cascante, Product Designer in Costa Rica',
    description:
      'Case studies by Mariela Cascante, product designer in Costa Rica: a multi-brand design system, an AI inbox for accounting firms, a booking panel for tour operators and client websites.',
  },
  '/about': {
    title: 'About | Mariela Cascante, UX/UI Designer in Costa Rica',
    description:
      'About Mariela Cascante, a UX/UI and product designer based in Costa Rica with nearly five years in UX and brand: capabilities, tools and experience.',
  },
  '/contact': {
    title: 'Contact | Mariela Cascante, Product Designer in Costa Rica',
    description:
      'Hire Mariela Cascante, product designer and UX/UI designer in Costa Rica, for a full-time role or a freelance project.',
  },
}

export function metaFor(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (PAGES[path]) return { ...PAGES[path], url: `${SITE}${path === '/' ? '/' : path}` }
  const slug = path.startsWith('/work/') ? path.slice(6) : null
  const p = caseProjects.find((x) => x.slug === slug)
  if (p) {
    return {
      title: `${p.title} case study | ${NAME}, Product Designer`,
      description: p.description,
      url: `${SITE}/work/${p.slug}`,
      image: p.image || p.cover,
    }
  }
  return { ...PAGES['/'], url: `${SITE}/` }
}

export const ROUTES = ['/', '/work', '/about', '/contact', ...caseProjects.map((p) => p.link)]
