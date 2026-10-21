// Writes one static HTML file per route so search engines get the full
// content and the right title, description and structured data without
// running JavaScript. The client then hydrates the same markup.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const { render, metaFor, ROUTES, SITE, caseProjects } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const OG_IMAGE = `${SITE}/og.jpg`

const person = {
  '@type': 'Person',
  '@id': `${SITE}/#mariela`,
  name: 'Mariela Cascante',
  jobTitle: 'Product Designer',
  description: 'Product designer and UX/UI designer in Costa Rica, focused on B2B SaaS products, design systems and AI features.',
  url: `${SITE}/`,
  image: OG_IMAGE,
  email: 'mailto:cascantefallasmariela@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'San José', addressCountry: 'CR' },
  homeLocation: { '@type': 'Place', name: 'Costa Rica' },
  alumniOf: { '@type': 'EducationalOrganization', name: 'Universidad Cenfotec' },
  hasCredential: { '@type': 'EducationalOccupationalCredential', name: 'Google UX Design Professional Certificate' },
  knowsAbout: [
    'Product Design', 'UX/UI Design', 'UX Architecture', 'Design Systems', 'User Research', 'UX Writing',
    'SaaS', 'AI Systems', 'Web Design', 'Branding', 'Figma', 'React', 'Storybook',
  ],
  sameAs: ['https://www.linkedin.com/in/mariela-cascante-fallas-aba957208', 'https://github.com/marielacascantefallas'],
}

function jsonLd(route, m) {
  const graph = [
    person,
    { '@type': 'WebSite', '@id': `${SITE}/#site`, url: `${SITE}/`, name: 'Mariela Cascante, Product Designer', inLanguage: 'en', publisher: { '@id': `${SITE}/#mariela` } },
  ]
  if (route === '/') {
    graph.push({ '@type': 'ProfilePage', url: `${SITE}/`, name: m.title, mainEntity: { '@id': `${SITE}/#mariela` }, inLanguage: 'en' })
  }
  if (route.startsWith('/work/')) {
    const p = caseProjects.find((x) => x.link === route)
    graph.push({
      '@type': 'CreativeWork',
      name: `${p.title} case study`,
      url: m.url,
      description: p.description,
      author: { '@id': `${SITE}/#mariela` },
      creator: { '@id': `${SITE}/#mariela` },
      inLanguage: 'en',
      keywords: (p.categories || []).join(', '),
    })
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE}/work` },
        { '@type': 'ListItem', position: 3, name: p.title, item: m.url },
      ],
    })
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
}

for (const route of ROUTES) {
  const m = metaFor(route)
  const image = m.image ? new URL(m.image, SITE).href : OG_IMAGE
  const head = [
    `<meta property="og:type" content="${route.startsWith('/work/') ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="Mariela Cascante" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${m.url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="geo.region" content="CR-SJ" />`,
    `<meta name="geo.placename" content="San José, Costa Rica" />`,
    `<script type="application/ld+json">${jsonLd(route, m)}</script>`,
  ].join('\n    ')
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace('<meta name="description" content="" />', `<meta name="description" content="${esc(m.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${m.url}" />`)
    .replace('<!--seo-->', head)
    .replace('<!--app-->', render(route))
  const out = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  console.log('prerendered', route)
}

const today = new Date().toISOString().slice(0, 10)
const urls = ROUTES.map((r) => {
  const loc = r === '/' ? `${SITE}/` : `${SITE}${r}`
  const priority = r === '/' ? '1.0' : r.startsWith('/work/') ? '0.8' : '0.7'
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`
})
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
