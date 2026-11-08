import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { caseProjects as projects } from '../data/projects'
import '../components/CaseStudy/ProjectCaseStudy.css'
import '../components/CaseStudy/TramaCaseStudy.css'
import '../components/CaseStudy/HiloCaseStudy.css'
import '../components/CaseStudy/WeebtechCaseStudy.css'

import homeVideo from '../assets/projects/weebtech/video/weebtech-mockup-home-1340x800.mp4'
import homePoster from '../assets/projects/weebtech/video/weebtech-mockup-home-1340x800-poster.webp'
import aboutVideo from '../assets/projects/weebtech/video/weebtech-mockup-about-1340x800.mp4'
import aboutPoster from '../assets/projects/weebtech/video/weebtech-mockup-about-1340x800-poster.webp'
import reelVideo from '../assets/projects/weebtech/video/weebtech-reel-preview.mp4'
import reelPoster from '../assets/projects/weebtech/video/weebtech-reel-preview-poster.webp'

// Weebtech: the studio Mariela co-founded. Brand identity, research, offer,
// website and the Scan tool. Every slide of the case study deck is shown,
// in the order of the story; videos are the site and brand animations.

const SLIDES = import.meta.glob('../assets/projects/weebtech/slide-*.webp', { eager: true, import: 'default' })
const slide = (n) => SLIDES[`../assets/projects/weebtech/slide-${String(n).padStart(2, '0')}.webp`]
const RATIO = { 2: 567, 4: 617, 8: 597, 18: 747, 19: 747, 23: 747 }

const SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'research', label: 'Desk research' },
  { id: 'market', label: 'Market' },
  { id: 'users', label: 'Who it’s for' },
  { id: 'problem', label: 'Problem and solution' },
  { id: 'synthesis', label: 'Research synthesis' },
  { id: 'offer', label: 'The offer' },
  { id: 'process', label: 'Design process' },
  { id: 'identity', label: 'Visual identity' },
  { id: 'website', label: 'Website and Scan' },
  { id: 'applications', label: 'Brand applications' },
  { id: 'next', label: 'Decisions and learnings' },
]

const SEARCH_STATS = [
  { value: '58.5%', label: 'of Google searches in the US end without a click', source: 'SparkToro and Datos, 2024' },
  { value: '34.5%', label: 'fewer clicks reach the top Google result when an AI Overview appears', source: 'Ahrefs, 300,000 keywords, 2025' },
  { value: '8%', label: 'of searches with an AI summary end in a click on a regular result, versus 15% without one', source: 'Pew Research Center, 68,879 searches, 2025' },
  { value: '25%', label: 'drop in search engine volume predicted by 2026', source: 'Gartner prediction, 2024' },
  { value: '35%', label: 'of small businesses have a Google Business Profile set up', source: 'BrightLocal SMB Marketing Report, 2025' },
  { value: '53%', label: 'of mobile visits are abandoned after 3 seconds of loading', source: 'Google research, 2016' },
]

const MARKETS = [
  ['Hispanic-owned service businesses in the US', 'High, in USD', 'Medium; few strong bilingual agencies', 'Language, culture, time zone', 'Main market'],
  ['Tourism in Costa Rica, selling to the US and Canada', 'Medium to high, in USD', 'Low in GEO', 'Local, past client work, bilingual', 'Fast start'],
  ['US agencies (white label)', 'Medium, steady volume', 'High (India, Philippines, LatAm)', 'Senior quality, time zone', 'Complement'],
  ['Spain', 'Medium, in EUR', 'Medium', 'Language', 'After year one'],
  ['Latin America and local Costa Rica (not tourism)', 'Low', 'High on price', 'Proximity', 'Not a focus'],
]

const OFFER = [
  ['Scan', 'AI visibility check: 20 real customer questions tested in ChatGPT, Gemini, Perplexity and Google, a technical review and a 10-minute findings video', 'Entry point; filters serious clients'],
  ['Launch website', '5 to 8 pages in English and Spanish, custom design, technical SEO and schema, ready for AI search', 'Builds trust; opens the monthly plan'],
  ['Growth website', '10 to 25 pages, pages per service and city, bookings or integrations', 'Larger clients'],
  ['Visible plan (monthly)', 'Local SEO plus GEO and AEO: Google Business Profile, content each month, directory citations, AI monitoring and a monthly report', 'Where the profit is'],
  ['Dominance plan (monthly)', 'Everything in Visible, more content, digital PR, third-party mentions and conversion work', 'Clients with more competition'],
  ['Care plan (monthly)', 'Hosting, updates, security and small changes', 'Recurring revenue with little effort'],
]

const SCENES = [
  ['Lighthouse', 'Home hero', 'Being found: the light reaches the business.'],
  ['Filing cabinet', 'AI search (GEO and AEO)', 'The green card is the client: the one the AI picks.'],
  ['Architect’s model', 'Web design', 'A site is planned and built like a house, structure first.'],
  ['Gears', 'Software', 'Custom software: parts that fit and move the business.'],
  ['Greenhouse', 'Care plan', 'A live site needs constant care.'],
  ['Antenna', 'Scan', 'The check looks for where the business shows up.'],
  ['Volcano with the studio', 'About', 'Says where the team is from without a flag.'],
  ['Mailbox', 'Contact', 'Writing to the team should feel as simple as sending a letter.'],
]

const DECISIONS = [
  {
    title: 'Sell visibility, not pages',
    why: 'A website is paid once; visibility is paid every month. The research pointed to one offer that ties design, code and search together, so every service on the site leads to the same goal: a business people and AI can find.',
  },
  {
    title: 'SEO, GEO and AEO in one plan',
    why: 'Generative and answer engine optimization share most of their work. Splitting them into separate services or pages would confuse buyers and compete with each other in search, so they live together in one monthly plan and one AI search page.',
  },
  {
    title: 'A free Scan as the front door',
    why: 'Owners who manage their own marketing need proof before they buy. A public quick check on the site and a full Scan from the internal panel show where a business appears on Google and in AI answers, in plain language.',
  },
  {
    title: 'Present an established studio, not two founders',
    why: 'The site presents Weebtech as a Costa Rican agency that brings together specialists in marketing, software and design, without founder avatars or case studies yet. The message is the capability, not the size of the team.',
  },
  {
    title: 'Two languages for indexing, not for the message',
    why: 'Every page exists in English and Spanish with hreflang so Google and AI index each language, but being bilingual is not part of the pitch. The focus stays on visibility, web design and software.',
  },
  {
    title: '3D only where it helps',
    why: 'Each page has one scene built on the same block island. On desktop it is live 3D tied to scroll; on phones it is a light video loop; with reduced motion it is a still image. The text is always real HTML, so search engines and AI read it even if the 3D never loads.',
  },
]

const LEARNINGS = [
  'Check names before designing anything. “zaaz”, “thintech” and “smoothtech” were all taken, and weebtech.com was already registered, so availability now comes before sketches.',
  'Read a name in every market it will live in. “Weeb” is English slang for an anime fan; knowing it early let us decide on purpose instead of finding out from a client.',
  'Use public research honestly until you have your own. The user data in this case comes from published studies with their sample sizes; interviews with Weebtech’s first clients will replace them.',
  'A studio that sells visibility has to be its own best case. The site was built with schema, an llms.txt file, separate English and Spanish pages and real HTML under every 3D scene.',
]

function SectionHead({ id, title }) {
  return (
    <h2 className="case-study__section-heading" id={`${id}-label`}>
      {title}
    </h2>
  )
}

function Slide({ n, alt, caption, eager = false }) {
  return (
    <figure className="trama-cs__figure wb-cs__slide">
      <img
        src={slide(n)}
        alt={alt}
        width="2000"
        height={RATIO[n] || 1194}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/** Muted loop that plays on its own unless the visitor prefers reduced motion. Controls let anyone pause it. */
function Video({ src, poster, label, caption }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    v.play().catch(() => {})
  }, [])
  return (
    <figure className="trama-cs__figure wb-cs__video">
      <video ref={ref} src={src} poster={poster} muted loop playsInline controls preload="metadata" width="1340" height="800" aria-label={label} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default function WeebtechCaseStudy() {
  const navigate = useNavigate()

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/work')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate])

  const jumpTo = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24, behavior: reduce ? 'auto' : 'smooth' })
    el.focus({ preventScroll: true })
  }

  const index = projects.findIndex((p) => p.slug === 'weebtech')
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null
  const nextHasPage = next && next.slug !== 'weebtech' && next.link

  return (
    <div className="case-study trama-cs wb-cs">
      <section className="case-study__hero">
        <Reveal>
          <h1 className="case-study__title">Weebtech: search visibility for the AI era</h1>
          <p className="case-study__tagline">
            Weebtech is a studio I co-founded in Costa Rica with a senior systems engineer. It helps businesses get
            found, both on Google and in the AI answers their customers now rely on. I led the research, naming, brand
            identity, offer and website, and designed the Scan tool that checks how visible a business is.
          </p>
          <ul className="trama-cs__tags" aria-label="Disciplines">
            {['Brand Identity', 'UX Research', 'Strategy', 'Web Design', '3D Website', 'Product Design'].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="trama-cs__meta">
            <div>
              <dt>Role</dt>
              <dd>Co-founder and design lead</dd>
            </div>
            <div>
              <dt>Client</dt>
              <dd>Weebtech, my own studio</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>Research · naming · brand · offer · website · Scan tool</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>Me on design, a senior systems engineer on development</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>2026</dd>
            </div>
          </dl>
        </Reveal>
      </section>

      <Reveal>
        <Slide n={1}
          eager
          alt="Two Weebtech business cards held in hand: a black card with the lime spark symbol and a cream card with the studio’s line, plan and execute data-driven digital marketing strategies."
          caption="Client: Weebtech · Service: brand identity · Year: 2026"
        />
      </Reveal>

      <div className="trama-cs__layout">
        <nav className="trama-cs__toc" aria-label="On this page">
          <p className="case-study__section-label">On this page</p>
          <ol>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={(e) => jumpTo(e, s.id)}>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="trama-cs__content">
          <section className="case-study__section" id="context" tabIndex={-1} aria-labelledby="context-label">
            <Reveal>
              <SectionHead id="context" title="Two people, one studio, a new way of searching" />
              <p className="case-study__section-text">
                We were two: a senior systems engineer and me, a senior designer, both in Costa Rica. We wanted a
                company that offers websites, SaaS, SEO, GEO and AEO, works in English and Spanish and can serve
                clients anywhere. Before designing anything, we needed to know where that business would earn the most
                and what people actually need from it.
              </p>
              <p className="case-study__section-text">
                Weebtech is the result: a studio that brings web design, software development and SEO, GEO and AEO
                together under one team, and turns quiet websites into steady sources of calls, bookings and sales, so
                owners can focus on running their business, not chasing traffic.
              </p>
              <p className="trama-cs__goal">
                <strong>Goal:</strong> a business model with the best return for a team of two, a brand that feels like
                an established studio, and a website that proves the service by being found itself.
              </p>
              <Slide n={2} alt="Intro slide: Weebtech is a bilingual studio that helps businesses get found, both on Google and in the AI answers their customers now rely on. Client: Weebtech, service: brand identity, year: 2026, design by Mariella." />
            </Reveal>
          </section>

          <section className="case-study__section" id="research" tabIndex={-1} aria-labelledby="research-label">
            <Reveal>
              <SectionHead id="research" title="We studied how people search today" />
              <p className="case-study__section-text">
                The desk research showed that ranking on Google is no longer enough. People get answers from AI
                summaries and often never click, and most small businesses are not set up to appear there. It shaped
                every service Weebtech offers.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="trama-cs__stats wb-cs__stats">
                {SEARCH_STATS.map((s) => (
                  <li key={s.label}>
                    <span className="trama-cs__stat-value">{s.value}</span>
                    <span className="trama-cs__stat-label">{s.label}</span>
                    <span className="wb-cs__source">{s.source}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <p className="case-study__section-text">
                The research also kept the message honest. Zero-click searches keep growing and AI Overviews appear in
                a large share of tracked queries, yet Google still sends most search visits and few brands measure
                their presence in AI at all. So the pitch is “SEO plus AI”, not “SEO is dead”.
              </p>
              <Slide n={16}
                alt="Research slide titled We studied how people search today to build a studio for the AI era, with three dot charts: 34.5% fewer clicks to the top result with an AI Overview (Ahrefs), 35% of small businesses with a Google Business Profile (BrightLocal) and 8% of AI-summary searches ending in a click (Pew)."
                caption="Three findings that justify the services: GEO and AEO, local SEO, and appearing inside AI answers."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="market" tabIndex={-1} aria-labelledby="market-label">
            <Reveal>
              <SectionHead id="market" title="Where the best return is" />
              <p className="case-study__section-text">
                US businesses pay several times what Latin American ones pay for the same work, and a Costa Rican team
                can serve them from the same time zone with local costs. In 2026, small business SEO in the US mostly
                costs US$1,500 to 3,200 a month, GEO retainers start around US$1,500, and a professional small business
                website costs US$2,000 to 8,000. Costa Rican agencies charge US$25 to 75 an hour and are seen as
                quality nearshore partners.
              </p>
            </Reveal>
            <Reveal>
              <div className="hilo-cs__table-wrap" tabIndex={0} role="region" aria-label="Markets compared">
                <table className="hilo-cs__table">
                  <caption className="sr-only">Markets compared by ticket, competition, advantage and verdict</caption>
                  <thead>
                    <tr>
                      <th scope="col">Market</th>
                      <th scope="col">Ticket</th>
                      <th scope="col">Competition</th>
                      <th scope="col">Our advantage</th>
                      <th scope="col">Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MARKETS.map(([m, t, c, a, v]) => (
                      <tr key={m}>
                        <th scope="row">{m}</th>
                        <td>{t}</td>
                        <td>{c}</td>
                        <td>{a}</td>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal>
              <p className="case-study__section-text">
                The Hispanic market in the US is large and growing: about 5 million Hispanic-owned businesses, and
                employer firms reached nearly 496,000 in 2023, 49.5% more in five years. Construction is the largest
                sector. Tourism in Costa Rica is the fast start: past client work in tours and car rentals, and
                travelers already ask ChatGPT for “the best boat tour in Guanacaste”.
              </p>
              <h3 className="wb-cs__h3">The ideal client</h3>
              <ul className="trama-cs__checklist">
                <li>A service business with 2 to 30 employees that lives on local customers searching Google, Maps or ChatGPT.</li>
                <li>An old, slow or single-language website that does not show up when someone asks an AI about its category and city.</li>
                <li>An owner who decides alone, often prefers Spanish, and serves a mixed clientele.</li>
                <li>Contractors, dental and aesthetic clinics, lawyers, real estate agents, accountants and insurers, where one new customer is worth a lot.</li>
              </ul>
            </Reveal>
          </section>

          <section className="case-study__section" id="users" tabIndex={-1} aria-labelledby="users-label">
            <Reveal>
              <SectionHead id="users" title="What users really need" />
              <p className="case-study__section-text">
                Two groups decide whether a business gets found: the owners who manage its marketing, and the
                customers who search for it. Weebtech does not have its own interviews yet, so I used published
                surveys with real sample sizes: 778 business owners and 1,117 consumers.
              </p>
              <div className="hilo-cs__roles">
                <div>
                  <h3>Business owners</h3>
                  <p className="hilo-cs__role-q">“How do you handle your marketing today?”</p>
                  <p>
                    54% manage their marketing entirely on their own (BrightLocal, 2025, n=778). More than half do it
                    without a specialist team, so they need clear packages and proof, not jargon.
                  </p>
                </div>
                <div>
                  <h3>Customers</h3>
                  <p className="hilo-cs__role-q">“How do you look for answers online?”</p>
                  <p>
                    About 80% rely on zero-click results in at least 40% of their searches (Bain and Dynata, December
                    2024, n=1,117). Most expect the answer before they ever visit a website.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <Slide n={12}
                alt="Slide What users really need: two lime cards. Business owners, 54% manage their marketing entirely on their own. Customers, 80% rely on zero-click results in at least 40% of their searches."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="problem" tabIndex={-1} aria-labelledby="problem-label">
            <Reveal>
              <SectionHead id="problem" title="Good companies stay invisible" />
              <p className="case-study__section-text">
                Customers now ask AI assistants for answers, but most business websites are still built only for
                Google. Without SEO, GEO and AEO working together, good companies stay invisible. Weebtech brings
                design, software and search under one roof: it builds fast websites and digital products, then keeps
                them visible on Google and in AI answers through one monthly plan.
              </p>
            </Reveal>
            <Reveal>
              <Slide n={11}
                alt="Problem and solution slide. Problem: 58.5% of Google searches end without a click, a 25% drop in search engine volume predicted by 2026, and 53% of mobile visits abandoned after 3 seconds. Solution: websites, SaaS, design, SEO, GEO and AEO in one studio."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="synthesis" tabIndex={-1} aria-labelledby="synthesis-label">
            <Reveal>
              <SectionHead id="synthesis" title="From findings to solutions" />
              <p className="case-study__section-text">
                I sorted the research on one board, in four steps, to design a website people and AI can find. Each
                note was tagged by the discipline that owns it: design, content, SEO or engineering.
              </p>
              <div className="wb-cs__board">
                <div>
                  <h3>Define the problem</h3>
                  <ul>
                    <li>Businesses are invisible in AI answers</li>
                    <li>Sites are built only for Google rankings</li>
                    <li>Owners manage marketing on their own</li>
                  </ul>
                </div>
                <div>
                  <h3>Collect ideas</h3>
                  <ul>
                    <li>A free Scan as the entry point</li>
                    <li>One plan for SEO, GEO and AEO</li>
                    <li>English and Spanish pages for indexing</li>
                  </ul>
                </div>
                <div>
                  <h3>Analyze and refine</h3>
                  <ul>
                    <li>Group services into clear packages</li>
                    <li>3D scenes only where they help</li>
                    <li>Real HTML text over every 3D scene</li>
                  </ul>
                </div>
                <div>
                  <h3>Find solutions</h3>
                  <ul>
                    <li>Scroll-driven 3D home page</li>
                    <li>Scan tool: public check and internal panel</li>
                    <li>Monthly report with AI citations</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <Slide n={15} alt="UX research process board titled Designing a website people and AI can find, with sticky notes in four columns: define the problem, collect ideas, analyze and refine, find solutions." />
            </Reveal>
          </section>

          <section className="case-study__section" id="offer" tabIndex={-1} aria-labelledby="offer-label">
            <Reveal>
              <SectionHead id="offer" title="An offer built like a ladder" />
              <p className="case-study__section-text">
                The offer has three steps: a low-cost check to start, a website to earn trust, and a monthly plan where
                the business grows. Prices are fixed per package, below US agencies and above freelancers, and plans
                promise measurable work (visibility, mentions, calls, bookings), never a guaranteed first place or a
                guaranteed spot in ChatGPT.
              </p>
            </Reveal>
            <Reveal>
              <div className="hilo-cs__table-wrap" tabIndex={0} role="region" aria-label="Weebtech offer">
                <table className="hilo-cs__table">
                  <caption className="sr-only">Weebtech products, what each includes and its role in the business</caption>
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">What it includes</th>
                      <th scope="col">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OFFER.map(([p, w, r]) => (
                      <tr key={p}>
                        <th scope="row">{p}</th>
                        <td>{w}</td>
                        <td>{r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal>
              <Slide n={7}
                alt="Slide Search visibility for the AI era: lime panel with the black spark and a short studio description, next to the Scan panel showing SEO 72, GEO 41 and AEO 38 out of 100 and a list of findings by priority."
                caption="The promise and the product behind it: the Scan scores SEO, GEO and AEO and lists what to fix first."
              />
              <Slide n={8} alt="Three steps on a lime frame: scan your website (free scan tool), design and build (web, SaaS, design) and grow your visibility (SEO, GEO, AEO)." />
              <Slide n={9}
                alt="Collage: a halftone Costa Rica laptop image with the line be found on Google and AI, a black panel reading everything your website needs, in one studio, and stacked monthly report cards showing AI citations 2 of 10."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="process" tabIndex={-1} aria-labelledby="process-label">
            <Reveal>
              <SectionHead id="process" title="Design process" />
              <ol className="trama-cs__pipeline">
                <li>
                  <strong>Discovery and naming</strong>
                  <span>Market and competitor review, name exploration and availability, positioning as a Costa Rican studio.</span>
                </li>
                <li>
                  <strong>Brand strategy</strong>
                  <span>Services map for web, SaaS, SEO, GEO and AEO, tone of voice, English and Spanish versions.</span>
                </li>
                <li>
                  <strong>Visual identity</strong>
                  <span>Logo and brand mark, color palette and typography, halftone and line-art image style.</span>
                </li>
                <li>
                  <strong>Brand applications</strong>
                  <span>Posters and campaign mockups, social media templates, case study layouts.</span>
                </li>
                <li>
                  <strong>Website and Scan</strong>
                  <span>3D scroll-driven website, free Scan tool interface, launch and indexing.</span>
                </li>
              </ol>
            </Reveal>
            <Reveal>
              <Slide n={10} alt="Design process timeline with five stages: discovery and naming, brand strategy, visual identity, brand applications, website and Scan." />
            </Reveal>
          </section>

          <section className="case-study__section" id="identity" tabIndex={-1} aria-labelledby="identity-label">
            <Reveal>
              <SectionHead id="identity" title="A spark where design, code and search meet" />
              <p className="case-study__section-text">
                The company started as “zaaz”. That name, and others like “thintech” and “smoothtech”, were not
                available, so we chose Weebtech. The symbol is a spark built from six rounded arms that meet at a single
                point: the moment a business gets found, with design, code and search converging into one clear signal.
                Its three axes and balanced rotation reflect the two languages and two disciplines behind the studio,
                working as one, and soft curves turn technical precision into something warm and approachable.
              </p>
            </Reveal>
            <Reveal>
              <Slide n={3} alt="Logo construction: the spark symbol drawn in light gray over a grid of dashed guides, with six dotted circles that set the curves where the arms meet." caption="Logo construction: three axes, six rounded arms and the circles that soften each joint." />
              <Slide n={4} alt="The Weebtech logo, the lime spark and the lowercase weebtech wordmark, on a black panel." />
              <Slide n={13} alt="The spark symbol in black on a large lime panel." />
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Color</h3>
              <p className="case-study__section-text">
                The primary palette is direct and functional. Lime brings energy and visibility to key actions like
                buttons and highlights, while black grounds the design with contrast and clarity. The secondary palette
                adds warmth: pale yellow and cream give the site its soft, sunny base, and moss green is a grounded
                accent for details, charts and hover states, without competing with the lime.
              </p>
              <ul className="wb-cs__swatches" aria-label="Brand colors">
                {[
                  ['#D4E701', 'Lime', 'Buttons, highlights'],
                  ['#000000', 'Black', 'Text, contrast'],
                  ['#FBFEB7', 'Pale yellow', 'Brand surfaces'],
                  ['#FDFEE9', 'Cream', 'Site background'],
                  ['#758020', 'Moss', 'Accents, hover'],
                ].map(([hex, name, use]) => (
                  <li key={hex}>
                    <span className="wb-cs__chip" style={{ background: hex }} aria-hidden="true" />
                    <strong>{name}</strong>
                    <span>
                      {hex} · {use}
                    </span>
                  </li>
                ))}
              </ul>
              <Slide n={14} alt="Color palette slide: primary lime #D4E701 and black #000000; secondary pale yellow #FBFEB7, cream #FDFEE9 and moss #758020, each with the spark symbol." />
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Type and image style</h3>
              <p className="case-study__section-text">
                Nordique Pro is the display typeface for titles, in Light Italic, Regular and SemiBold, and Helvetica
                carries the text in Light, Regular and Bold. Photography goes through two treatments: black and white
                halftone, and lime line art drawn as concentric rings, so stock images feel like part of one system.
              </p>
              <Slide n={5} alt="Brand imagery: the lime spark on black, a lime line-art portrait made of concentric rings, and a black and white halftone photo of a meeting with the weebtech logo over it." />
            </Reveal>
          </section>

          <section className="case-study__section" id="website" tabIndex={-1} aria-labelledby="website-label">
            <Reveal>
              <SectionHead id="website" title="A website that is found, answered, built and engineered" />
              <p className="case-study__section-text">
                The website is a 3D, scroll-driven site where each page has one scene on the same island of blocks,
                with a giant word that names the promise: FOUND for the home, ANSWERED for AI search, BUILT for web
                design, ENGINEERED for software, COSTA RICA for About and HELLO for Contact. Every page exists in
                English and Spanish, and opens with a direct 40 to 60 word answer, the paragraph Google and AI quote
                most.
              </p>
            </Reveal>
            <Reveal>
              <Video
                src={homeVideo}
                poster={homePoster}
                label="Scroll through the Weebtech home page on a laptop: the lighthouse hero, then the FOUND, ANSWERED, BUILT and ENGINEERED scenes, the call to action and the footer."
                caption="Home page: one 3D scene per service, tied to scroll."
              />
              <Video
                src={aboutVideo}
                poster={aboutPoster}
                label="Scroll through the Weebtech About page: COSTA RICA headline with a volcano scene, the disciplines under one roof, and the closing call to action."
                caption="About page: a Costa Rican agency that brings the disciplines under one roof."
              />
            </Reveal>
            <Reveal>
              <div className="hilo-cs__table-wrap" tabIndex={0} role="region" aria-label="3D scenes of the website">
                <table className="hilo-cs__table">
                  <caption className="sr-only">The 3D object on each page and why it was chosen</caption>
                  <thead>
                    <tr>
                      <th scope="col">Object</th>
                      <th scope="col">Page</th>
                      <th scope="col">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCENES.map(([o, p, w]) => (
                      <tr key={o}>
                        <th scope="row">{o}</th>
                        <td>{p}</td>
                        <td>{w}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal>
              <Slide n={17} alt="Laptop mockup of the Weebtech home page: the word FOUND over a black and white lighthouse on a lime block island, and the headline web design, SEO and AI visibility for businesses that want to be found." />
              <Slide n={18} alt="Slide From invisible to found, on Google and in AI answers, next to a node diagram where Scan, web design, SEO, GEO and AEO and software all connect to Weebtech." caption="Every service feeds the same goal, measured in one monthly report." />
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">The Scan tool</h3>
              <p className="case-study__section-text">
                Scan works in two places from day one: a free quick check on the website and a full Scan in the
                internal panel. It tests real customer questions in Google and AI assistants, scores SEO, GEO and AEO
                out of 100 and lists findings by priority. To run at zero cost, each AI can be set to automatic, manual
                or off: Gemini runs on its free quota, and for ChatGPT, Claude and Perplexity the panel shows each
                question with a copy button and a field to paste the answer, then still finds the mentions,
                competitors and links.
              </p>
              <Slide n={20} alt="A printed poster reading websites built to be found with the black spark, next to the Scan panel with the 3D lighthouse and a lime run scan button, and the weebtech logo on lime." />
              <Slide n={19} alt="The line be found on Google and AI in three lime pills on a cream panel." />
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Built for search engines and AI</h3>
              <ul className="trama-cs__checklist">
                <li>Separate /en/ and /es/ pages with hreflang and canonical URLs, never a JavaScript translate button.</li>
                <li>Schema per page: service with prices, FAQ, article, breadcrumbs and contact.</li>
                <li>A sitemap, a robots.txt that lets AI crawlers in, and an llms.txt file.</li>
                <li>Phone scenes are 40 to 85 KB video loops; reduced motion shows a still image.</li>
              </ul>
            </Reveal>
          </section>

          <section className="case-study__section" id="applications" tabIndex={-1} aria-labelledby="applications-label">
            <Reveal>
              <SectionHead id="applications" title="The brand out in the world" />
              <p className="case-study__section-text">
                The identity was tested on posters, signage, merchandise and the app icon, and in a short motion piece
                where the spark moves between black and lime and lands on the logo.
              </p>
            </Reveal>
            <Reveal>
              <Video
                src={reelVideo}
                poster={reelPoster}
                label="Brand motion: the spark rotates on black and on lime, the app icon appears on a phone and on a glowing tile, and it ends on the weebtech logo on lime."
                caption="Brand motion reel."
              />
              <Slide n={6} alt="Three posters in a gallery: a lime Costa Rica laptop image, a halftone meeting photo with strategy and design pills around the spark, and a lime line-art portrait." />
              <Slide n={21} alt="A black tote bag with the lime spark, a glowing lime tile with the black spark, and the weebtech app icon on a phone screen." />
              <Slide n={22} alt="A lime square sign with the black spark on a concrete wall, and a lime standing sign reading get found on Google and in AI." />
            </Reveal>
          </section>

          <section className="case-study__section" id="next" tabIndex={-1} aria-labelledby="next-label">
            <Reveal>
              <SectionHead id="next" title="Key decisions" />
            </Reveal>
            <ol className="trama-cs__decisions">
              {DECISIONS.map((d, i) => (
                <Reveal as="li" key={d.title} delay={i * 0.03}>
                  <span className="trama-cs__decision-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.why}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal>
              <h3 className="wb-cs__h3">What I learned</h3>
              <ul className="trama-cs__checklist">
                {LEARNINGS.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <p className="case-study__section-text">
                Next, Weebtech’s first clients come from the work I already know: tourism in Costa Rica, like{' '}
                <Link to="/work/mrs-rent-a-car">MRS Rent a Car</Link>, and service businesses in the US.
              </p>
              <Slide n={23} alt="Closing slide: thanks for staying till the end, in three lime pills. Mariella, marielacascante.com." />
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Sources</h3>
              <ul className="wb-cs__sources">
                <li>SparkToro and Datos, zero-click search study, 2024</li>
                <li>Ahrefs, AI Overviews and click-through rate, 300,000 keywords, 2025</li>
                <li>Pew Research Center, AI summaries in Google search, 68,879 searches, 2025</li>
                <li>Gartner, search engine volume prediction, 2024</li>
                <li>BrightLocal, SMB Marketing Report, 2025 (n=778)</li>
                <li>Bain and Dynata, consumer survey on zero-click search, December 2024 (n=1,117)</li>
                <li>Google research, mobile page speed, 2016</li>
                <li>W3era, WebTonic, WebFX, upGrowth and Levitate, SEO, GEO and website pricing, 2026</li>
                <li>US Census Bureau, VOZ and SMBs.com, Hispanic-owned businesses in the US</li>
                <li>GoodFirms and Leanware, agency rates in Costa Rica</li>
              </ul>
            </Reveal>
          </section>
        </div>
      </div>

      <Reveal as="section" className="case-study__next">
        <p className="case-study__next-label">Next project</p>
        {nextHasPage ? (
          <Link to={next.link} className="case-study__next-link">
            <h3 className="case-study__next-title">{next.title}</h3>
            View case study
          </Link>
        ) : (
          <h3 className="case-study__next-title case-study__next-title--placeholder">More case studies coming soon</h3>
        )}
      </Reveal>
    </div>
  )
}
