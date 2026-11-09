import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { caseProjects as projects } from '../data/projects'
import '../components/CaseStudy/ProjectCaseStudy.css'
import '../components/CaseStudy/TramaCaseStudy.css'
import '../components/CaseStudy/HiloCaseStudy.css'
import '../components/CaseStudy/WeebtechCaseStudy.css'

// MRS Rent a Car: client project. Research, brand identity, brandbook,
// website and brand applications. Same structure as the Weebtech case study.

const IMG = import.meta.glob('../assets/projects/mrs/*.webp', { eager: true, import: 'default' })
const img = (name) => IMG[`../assets/projects/mrs/${name}.webp`]
const SIZE = {
  slide: [2000, 1194],
  brandbook: [1650, 1275],
  land: [1600, 1236],
  tall: [1600, 1986],
  flyer: [1600, 2070],
  post: [1080, 1350],
}

const SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'research', label: 'Desk research' },
  { id: 'users', label: 'Who it’s for' },
  { id: 'problem', label: 'Problem and solution' },
  { id: 'synthesis', label: 'Research synthesis' },
  { id: 'offer', label: 'The offer' },
  { id: 'process', label: 'Design process' },
  { id: 'identity', label: 'Visual identity' },
  { id: 'website', label: 'Website' },
  { id: 'applications', label: 'Brand applications' },
  { id: 'next', label: 'Decisions and learnings' },
]

const STATS = [
  { value: '2.69M', label: 'international air arrivals in Costa Rica in 2025', source: 'ICT, 2025' },
  { value: '1.78M', label: 'of them landed at Juan Santamaría (SJO), a long drive from the southern zone', source: 'ICT, Anuario estadístico 2025' },
  { value: '69.6%', label: 'of tourists at SJO were on their first visit to Costa Rica', source: 'ICT, Juan Santamaría survey, 2025' },
  { value: '81%', label: 'of tourists came from the US, Canada and Europe', source: 'ICT, international arrivals, 2025' },
  { value: '57%', label: 'of US consumers prefer their phone to book a rental car', source: 'PYMNTS, 2,290 consumers, 2025' },
  { value: 'US$3,000', label: 'credit card hold at a major agency when coverage is declined', source: 'Budget Costa Rica terms, 2026' },
]

const FLEET = [
  ['Suzuki Grand Vitara 2019', 'Automatic, 4WD, gasoline', '$95 (₡45,000)'],
  ['Hyundai Accent 2019', 'Compact sedan', '$80 (₡37,000)'],
  ['Nissan Pathfinder 2004', 'SUV', '$70 (₡35,000)'],
]

const OFFER = [
  ['5 days for $300', 'Any of the three cars, consecutive days'],
  ['Pay 6 days, the 7th is free', 'Any of the three cars, consecutive days'],
  ['Car + airport pickup for $150', 'Instead of $190, with a rental of 5 days or more'],
  ['10% off the daily price', 'When booking 15 or more days in advance'],
  ['Airport pickup or drop-off · $190', 'Private, no stops, between SJO and Pérez Zeledón'],
  ['Round trip · $380', 'Pickup on arrival and return on flight day'],
]

const DECISIONS = [
  {
    title: 'Book over WhatsApp, not a checkout',
    why: '96% of adults with a cellphone in Costa Rica use WhatsApp, and MRS already answered every booking there. The site’s form asks for name, nationality, car and dates, then opens WhatsApp with the message written, so the owner gets a complete request and the renter keeps the conversation they trust.',
  },
  {
    title: 'Say “no credit card” out loud',
    why: 'Big agencies hold US$300 to 3,000 on a credit card. MRS asks for a ₡200,000 deposit in cash or by transfer. That difference is the strongest reason to choose a local rental, so it sits in the hero, in the requirements and in the FAQ.',
  },
  {
    title: 'A daily price on every car',
    why: 'First-time visitors compare before they land. Each car shows its year, transmission and price per day in dollars and colones, and promotions are written as simple rules instead of codes.',
  },
  {
    title: 'Airport transfers as their own offer',
    why: 'Most travelers land at SJO, hours away from Pérez Zeledón. Pickup, drop-off and round trip have their own section and prices, and the car plus pickup bundle connects both services.',
  },
  {
    title: 'Two languages for two kinds of renter',
    why: 'Locals read Spanish and most tourists come from English-speaking markets, so every page exists at its own Spanish and English address, written for each reader instead of translated on the fly.',
  },
  {
    title: 'A brand you can spot from the road',
    why: 'Heavy, rounded lettering in yellow on deep green reads from far away on a sign, a car or a cap, and the M works alone as an icon for WhatsApp, social media and the site.',
  },
]

const LEARNINGS = [
  'For a small local business, the booking channel matters more than the booking engine. Designing around WhatsApp removed a whole system the client would never have maintained.',
  'Requirements are content, not fine print. Stating the deposit, age and license rules up front answers the questions that used to fill the owner’s chat.',
  'A brand system pays off fast in small companies: the same green, yellow and M carried the site, the cards, the cap, the keychain and the bus stop poster without new design work each time.',
  'Public research is a good start, but booking data from the site and the Google Business Profile will tell MRS which cars, promotions and languages actually convert.',
]

function SectionHead({ id, title }) {
  return (
    <h2 className="case-study__section-heading" id={`${id}-label`}>
      {title}
    </h2>
  )
}

function Fig({ name, size = 'slide', alt, caption, eager = false }) {
  const [w, h] = SIZE[size]
  return (
    <figure className="trama-cs__figure wb-cs__slide">
      <img src={img(name)} alt={alt} width={w} height={h} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function Pair({ children }) {
  return <div className="wb-cs__pair">{children}</div>
}

export default function MrsCaseStudy() {
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

  const index = projects.findIndex((p) => p.slug === 'mrs-rent-a-car')
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null
  const nextHasPage = next && next.slug !== 'mrs-rent-a-car' && next.link

  return (
    <div className="case-study trama-cs wb-cs mrs-cs">
      <section className="case-study__hero">
        <Reveal>
          <h1 className="case-study__title">MRS Rent a Car: a local rental you can book in one message</h1>
          <p className="case-study__tagline">
            MRS Rent a Car is a car rental and airport transfer company born in Pérez Zeledón, in Costa Rica’s southern
            zone. I led the research, brand identity, brandbook and website, so travelers and locals can see every car,
            price and rule up front and book it over WhatsApp, in Spanish or English.
          </p>
          <ul className="trama-cs__tags" aria-label="Disciplines">
            {['Brand Identity', 'Brandbook', 'UX Research', 'Web Design', 'Local SEO', 'Brand Applications'].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="trama-cs__meta">
            <div>
              <dt>Role</dt>
              <dd>Lead designer: research, brand, UX/UI and web development</dd>
            </div>
            <div>
              <dt>Client</dt>
              <dd>MRS Rent a Car, Pérez Zeledón, Costa Rica</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>Research · logo · brandbook · website · local SEO · applications</dd>
            </div>
            <div>
              <dt>Site</dt>
              <dd>
                <a href="https://mrsrentacar.com/" target="_blank" rel="noopener noreferrer">
                  mrsrentacar.com<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>2026</dd>
            </div>
          </dl>
        </Reveal>
      </section>

      <Reveal>
        <Fig
          name="brandbook-01"
          size="brandbook"
          eager
          alt="Brandbook cover: a woman sitting in front of a yellow SUV, with the yellow MRS Rent a Car logo over the photo."
          caption="Client: MRS Rent a Car · Service: brand identity and website · Year: 2026"
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
              <SectionHead id="context" title="A local rental with no place online" />
              <p className="case-study__section-text">
                MRS Rent a Car was born in Pérez Zeledón to offer a direct, reliable way to get around the southern
                zone: up to San Isidro, toward Chirripó or down to the Pacific coast. It runs a small fleet and private
                transfers to and from the airport in San José, and it handled every booking by phone and WhatsApp.
              </p>
              <p className="case-study__section-text">
                The client needed a brand and a website that made that local service easy to find and easy to trust,
                for travelers landing in the country for the first time and for people who live in the zone.
              </p>
              <p className="trama-cs__goal">
                <strong>Goal:</strong> a brand people recognize from the road and a site that answers every question
                before the first message, then turns the visit into a booking on WhatsApp.
              </p>
            </Reveal>
          </section>

          <section className="case-study__section" id="research" tabIndex={-1} aria-labelledby="research-label">
            <Reveal>
              <SectionHead id="research" title="How travelers rent a car in the southern zone" />
              <p className="case-study__section-text">
                The desk research looked at who arrives, where they land, how they plan and what stops them from
                renting. Most visitors are on their first trip, plan it on their own and book from a phone, and big
                agencies ask for a large credit card hold.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="trama-cs__stats wb-cs__stats">
                {STATS.map((s) => (
                  <li key={s.label}>
                    <span className="trama-cs__stat-value">{s.value}</span>
                    <span className="trama-cs__stat-label">{s.label}</span>
                    <span className="wb-cs__source">{s.source}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <Fig
                name="slide-03"
                alt="Research slide titled We studied how travelers rent a car in the southern zone, with three dot charts: 57% of US consumers prefer their phone to book a rental car, 69.6% of tourists at SJO were on their first visit, and 81% came from the US, Canada and Europe."
                caption="Three findings behind the site: mobile first, rules up front and an English version."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="users" tabIndex={-1} aria-labelledby="users-label">
            <Reveal>
              <SectionHead id="users" title="Two groups book with MRS" />
              <p className="case-study__section-text">
                MRS rents to travelers who arrive through San José and to locals who need a car for a few days. They
                plan differently, but both want the price and the rules clear, and both already live on WhatsApp.
              </p>
              <div className="hilo-cs__roles">
                <div>
                  <h3>Travelers</h3>
                  <p className="hilo-cs__role-q">“How do you plan getting around the country?”</p>
                  <p>
                    69.7% of tourists at SJO bought their travel services on their own, not in a package (ICT, 2025).
                    They compare cars, prices and requirements before they land.
                  </p>
                </div>
                <div>
                  <h3>Locals</h3>
                  <p className="hilo-cs__role-q">“How do you contact a business today?”</p>
                  <p>
                    96% of adults with a cellphone in Costa Rica use WhatsApp (CICOM-UCR, 2025, n=792). A booking
                    has to start where they already chat.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <Fig
                name="slide-02"
                alt="Slide What users really need: two green cards. Travelers, 69.7% bought their travel services on their own. Locals, 96% of adults with a cellphone use WhatsApp."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="problem" tabIndex={-1} aria-labelledby="problem-label">
            <Reveal>
              <SectionHead id="problem" title="Hard to find, hard to trust from far away" />
              <p className="case-study__section-text">
                Travelers who land in San José need a car to reach the southern zone, but big agencies ask for a credit
                card hold, and small local rentals are hard to find online. The answer was a bilingual, mobile-first
                site that shows every car with its daily price, states the requirements up front and sends each
                booking straight to WhatsApp.
              </p>
            </Reveal>
            <Reveal>
              <Fig
                name="slide-01"
                alt="Problem and solution slide. Problem: 2.69M international air arrivals in 2025, 1.78M of them at SJO, and a US$3,000 credit card hold at a major agency. Solution pills: fleet, promotions, transfers, no credit card, WhatsApp, ES and EN."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="synthesis" tabIndex={-1} aria-labelledby="synthesis-label">
            <Reveal>
              <SectionHead id="synthesis" title="From findings to solutions" />
              <p className="case-study__section-text">
                I sorted the research on one board, in four steps, to design a rental people can book in one message.
              </p>
              <div className="wb-cs__board">
                <div>
                  <h3>Define the problem</h3>
                  <ul>
                    <li>Travelers can’t find local rentals online</li>
                    <li>Credit card holds block many renters</li>
                    <li>Prices and rules only by phone</li>
                  </ul>
                </div>
                <div>
                  <h3>Collect ideas</h3>
                  <ul>
                    <li>Book by WhatsApp, not a checkout</li>
                    <li>A daily price on every car</li>
                    <li>Requirements before the form</li>
                  </ul>
                </div>
                <div>
                  <h3>Analyze and refine</h3>
                  <ul>
                    <li>Three cars in one clear grid</li>
                    <li>Promotions as simple rules</li>
                    <li>Spanish and English pages</li>
                  </ul>
                </div>
                <div>
                  <h3>Find solutions</h3>
                  <ul>
                    <li>A form that writes the WhatsApp message</li>
                    <li>Airport transfers as their own offer</li>
                    <li>FAQ answers that Google can show</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <Fig name="slide-04" alt="UX research process board on green, titled Designing a rental people can book in one message, with sticky notes in four columns: define the problem, collect ideas, analyze and refine, find solutions." />
            </Reveal>
          </section>

          <section className="case-study__section" id="offer" tabIndex={-1} aria-labelledby="offer-label">
            <Reveal>
              <SectionHead id="offer" title="Every car, price and rule before the first message" />
              <p className="case-study__section-text">
                The site lays out the whole offer the way a renter asks about it: which cars there are, what they
                cost, what deals apply, how to get from the airport and what is needed to rent. Prices are in dollars
                with colones next to them.
              </p>
            </Reveal>
            <Reveal>
              <div className="hilo-cs__table-wrap" tabIndex={0} role="region" aria-label="MRS fleet">
                <table className="hilo-cs__table">
                  <caption className="sr-only">MRS fleet and daily prices</caption>
                  <thead>
                    <tr>
                      <th scope="col">Car</th>
                      <th scope="col">Details</th>
                      <th scope="col">Per day</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FLEET.map(([c, d, p]) => (
                      <tr key={c}>
                        <th scope="row">{c}</th>
                        <td>{d}</td>
                        <td>{p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="hilo-cs__table-wrap" tabIndex={0} role="region" aria-label="Promotions and transfers">
                <table className="hilo-cs__table">
                  <caption className="sr-only">Promotions and airport transfers</caption>
                  <thead>
                    <tr>
                      <th scope="col">Promotion or transfer</th>
                      <th scope="col">Condition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OFFER.map(([o, c]) => (
                      <tr key={o}>
                        <th scope="row">{o}</th>
                        <td>{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h3 className="wb-cs__h3">Requirements, said plainly</h3>
              <ul className="trama-cs__checklist">
                <li>18 or older, with a valid license from Costa Rica or the renter’s country.</li>
                <li>No credit card: a ₡200,000 deposit in cash or by bank transfer.</li>
                <li>The car is delivered with a full tank and returned full.</li>
                <li>Promotions can’t be combined, and availability is limited.</li>
              </ul>
            </Reveal>
            <Reveal>
              <Fig
                name="slide-07"
                alt="Services flow: on a beige panel, from a search to the keys, in one WhatsApp message. On green, nodes for vehicles, promotions, airport transfers, requirements and the booking form connect to the MRS Rent a Car node with the WhatsApp number."
                caption="Every section answers one question, and the form turns the answers into a WhatsApp message."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="process" tabIndex={-1} aria-labelledby="process-label">
            <Reveal>
              <SectionHead id="process" title="Design process" />
              <ol className="trama-cs__pipeline">
                <li>
                  <strong>Discovery</strong>
                  <span>Owner brief and fleet review, local competitor review, traveler requirements research.</span>
                </li>
                <li>
                  <strong>Brand strategy</strong>
                  <span>Voice (clear, local, reliable), main message and brand story, Spanish and English versions.</span>
                </li>
                <li>
                  <strong>Visual identity</strong>
                  <span>Lettered logo and M isotype, green, yellow and beige palette, Articulat CF typography.</span>
                </li>
                <li>
                  <strong>Brand applications</strong>
                  <span>Cap, keychain, polo and cards, bus stop poster and flyer, social media.</span>
                </li>
                <li>
                  <strong>Website</strong>
                  <span>Fleet, promotions and transfers, WhatsApp booking form, local SEO and Google Business Profile.</span>
                </li>
              </ol>
            </Reveal>
            <Reveal>
              <Fig name="slide-05" alt="Design process timeline on yellow with five stages: discovery, brand strategy, visual identity, brand applications and website." />
            </Reveal>
          </section>

          <section className="case-study__section" id="identity" tabIndex={-1} aria-labelledby="identity-label">
            <Reveal>
              <SectionHead id="identity" title="Clear from the first moment, local in every kilometer" />
              <p className="case-study__section-text">
                The brand voice is direct, clear and practical, with the honesty of someone who knows the roads and
                what drivers in the southern zone actually need. It rests on three lines: clarity from the first
                moment, command of the local terrain and support in every kilometer. The main message: MRS Rent a Car
                is the reliable choice to rent a car in Pérez Zeledón, with clear conditions and local support on every
                route in the southern zone.
              </p>
              <Pair>
                <Fig name="brandbook-05" size="brandbook" alt="Brandbook page, brand voice: clarity from the first moment, command of the local terrain, support in every kilometer." />
                <Fig name="brandbook-06" size="brandbook" alt="Brandbook page, main message: MRS Rent a Car is the reliable choice to rent vehicles in Pérez Zeledón." />
              </Pair>
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Logo</h3>
              <p className="case-study__section-text">
                The MRS lettering is drawn, not typed: three heavy letters with soft, inflated curves that feel
                friendly and are easy to spot from a car window. The narrow counter of the R and the wide bowl of the S
                balance the strict M, and the condensed “Rent a Car” runs the same width underneath, so the logo reads
                as one block on a sign, a cap or a phone screen. The M alone works as the isotype.
              </p>
              <Fig
                name="slide-09"
                alt="Logo construction: the MRS Rent a Car logo in light gray over dashed guides for top, baselines, cap height and x-height, with dashed circles on the curves of the M, R and S."
                caption="Logo construction: guides and the circles behind each curve."
              />
              <Pair>
                <Fig name="brandbook-08" size="brandbook" alt="Brandbook page, primary logo: MRS Rent a Car in green on beige and in yellow on green." />
                <Fig name="brandbook-10" size="brandbook" alt="Brandbook page, isotype: the M in yellow on green and in beige on green." />
                <Fig name="brandbook-11" size="brandbook" alt="Brandbook page, correct use: the M isotype inside circles in yellow, green and beige combinations." />
                <Fig name="brandbook-13" size="brandbook" alt="Brandbook page, minimum size and clear space for the isotype and the logo." />
              </Pair>
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Color and type</h3>
              <p className="case-study__section-text">
                Green and yellow are the colors people remember from the road: green for trust and the landscape of the
                southern zone, yellow for visibility on cars, signs and buttons. Beige softens the pair and gives the
                site and printed pieces a warm, paper-like base. Articulat CF carries every title and text, in four
                set styles for primary titles, secondary titles, body and details.
              </p>
              <ul className="wb-cs__swatches" aria-label="Brand colors">
                {[
                  ['#1F3F1F', 'Green', 'Brand base, text'],
                  ['#FFD401', 'Yellow', 'Logo, buttons'],
                  ['#EAE3D2', 'Beige', 'Backgrounds, print'],
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
              <Fig name="slide-06" alt="Color palette slide: primary green #1F3F1F and yellow #FFD401, secondary beige #EAE3D2, each with the M isotype." />
              <Fig name="brandbook-15" size="brandbook" alt="Brandbook page, typography: Articulat CF in primary titles, secondary titles, body text and details." />
            </Reveal>
          </section>

          <section className="case-study__section" id="website" tabIndex={-1} aria-labelledby="website-label">
            <Reveal>
              <SectionHead id="website" title="A site that ends in a WhatsApp message" />
              <p className="case-study__section-text">
                The site follows the order of a renter’s questions: who MRS is, which cars there are, what they cost,
                which deals apply, how to get from the airport, what is needed and how to book. Every section links to
                WhatsApp, and the contact form fills in name, nationality, car and dates, then sends the request
                through WhatsApp with the message already written.
              </p>
            </Reveal>
            <Reveal>
              <Fig
                name="slide-08"
                alt="Slide: on yellow, rent a car in Pérez Zeledón, no credit card, with the M isotype. On the right, the booking form of the site with a requirements card: no credit card, ₡200,000 deposit in cash or transfer."
              />
              <Pair>
                <Fig name="web-laptop" size="tall" alt="Laptop on a desk showing the MRS Rent a Car home page with the yellow logo on green." />
                <Fig name="web-laptop-page" size="post" alt="3D mockup: a laptop with the MRS home page and the page flowing out of the screen with promotions, contact and the footer." />
              </Pair>
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Built to be found locally</h3>
              <ul className="trama-cs__checklist">
                <li>Separate Spanish and English pages for every section, at their own addresses.</li>
                <li>Headings and FAQ written around real searches: car rental in Pérez Zeledón, airport transfer, requirements.</li>
                <li>Prices, requirements and contact as real text, so Google can show them directly.</li>
                <li>The site connected to the client’s existing Google Business Profile.</li>
              </ul>
            </Reveal>
          </section>

          <section className="case-study__section" id="applications" tabIndex={-1} aria-labelledby="applications-label">
            <Reveal>
              <SectionHead id="applications" title="The brand on the road" />
              <p className="case-study__section-text">
                The identity was tested where a rental company actually lives: on the key a renter takes home, on the
                team’s cap and polo, on a business card, on a phone screen and on a bus stop poster.
              </p>
            </Reveal>
            <Reveal>
              <Pair>
                <Fig name="app-keychain" size="post" alt="Green keychain strap with the yellow MRS logo, a carabiner and car keys." />
                <Fig name="app-cap" size="post" alt="Person seen from behind wearing a green cap with the MRS Rent a Car logo embroidered in yellow and cream." />
                <Fig name="app-polo-detail" size="tall" alt="Close-up of a green polo shirt with the MRS Rent a Car logo embroidered in cream." />
                <Fig name="app-bus-stop" size="tall" alt="Bus stop poster on a sunny street: MRS Rent a Car with a white Suzuki Grand Vitara on green and yellow." />
              </Pair>
              <Fig name="app-flyer" size="flyer" alt="Hands holding a green flyer: Suzuki Grand Vitara, ₡45,000 per day, with a photo of the car and the WhatsApp number." />
              <Pair>
                <Fig name="app-phone" size="land" alt="Hand holding a phone with the MRS Rent a Car logo in beige on a green screen." />
                <Fig name="app-polo" size="land" alt="Green polo shirt with the MRS logo on the chest." />
              </Pair>
              <Fig name="app-cap-white" size="land" alt="White and green cap with the MRS Rent a Car logo in green." />
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
                See the live site at{' '}
                <a href="https://mrsrentacar.com/" target="_blank" rel="noopener noreferrer">
                  mrsrentacar.com<span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </p>
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Sources</h3>
              <ul className="wb-cs__sources">
                <li>ICT, international arrivals and Anuario estadístico de turismo, 2025</li>
                <li>ICT, non-resident air survey, Juan Santamaría airport, 2025</li>
                <li>CICOM-UCR, Nuestras apps de cada día 2025 (n=792)</li>
                <li>PYMNTS, Generational Pulse Report on mobile travel purchases, 2025 (n=2,290)</li>
                <li>Budget Costa Rica, terms and conditions, 2026</li>
                <li>MRS Rent a Car brandbook and mrsrentacar.com</li>
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
