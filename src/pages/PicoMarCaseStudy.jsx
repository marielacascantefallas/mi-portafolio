import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { caseProjects as projects } from '../data/projects'
import '../components/CaseStudy/ProjectCaseStudy.css'
import '../components/CaseStudy/TramaCaseStudy.css'
import '../components/CaseStudy/HiloCaseStudy.css'
import '../components/CaseStudy/WeebtechCaseStudy.css'
import homeVideo from '../assets/projects/picomar/video/pm-home-scroll.mp4'
import homePoster from '../assets/projects/picomar/video/pm-home-scroll-poster.webp'
import searchVideo from '../assets/projects/picomar/video/pm-search.mp4'
import searchPoster from '../assets/projects/picomar/video/pm-search-poster.webp'
import filtersVideo from '../assets/projects/picomar/video/pm-filters.mp4'
import filtersPoster from '../assets/projects/picomar/video/pm-filters-poster.webp'
import villaVideo from '../assets/projects/picomar/video/pm-villa.mp4'
import villaPoster from '../assets/projects/picomar/video/pm-villa-poster.webp'
import mobileVideo from '../assets/projects/picomar/video/pm-mobile.mp4'
import mobilePoster from '../assets/projects/picomar/video/pm-mobile-poster.webp'

// Pico Mar: client project with GEXP Software. Redesign of picomar.com,
// a luxury villa and concierge company in Uvita, Costa Rica. Videos are
// sequences of real screenshots taken on the live site in November 2026.

const IMG = import.meta.glob('../assets/projects/picomar/*.webp', { eager: true, import: 'default' })
const img = (name) => IMG[`../assets/projects/picomar/${name}.webp`]

const SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'research', label: 'Desk research' },
  { id: 'users', label: 'Who it’s for' },
  { id: 'problem', label: 'Problem and solution' },
  { id: 'synthesis', label: 'Research synthesis' },
  { id: 'architecture', label: 'Booking flow' },
  { id: 'process', label: 'Design process' },
  { id: 'website', label: 'The website' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'next', label: 'Decisions and learnings' },
]

const STATS = [
  { value: '2,689,278', label: 'international air arrivals to Costa Rica in 2025, only 1% more than in 2024', source: 'ICT, via La Nación, 2025' },
  { value: '$5.543B', label: 'tourism foreign-exchange revenue in 2025, a record despite the flat year', source: 'Tico Times, 2026' },
  { value: '72.6%', label: 'of international vacation-rental bookings in Costa Rica go through Airbnb', source: 'Osa Property Management, 2024' },
  { value: '15–20%', label: 'commission charged by Airbnb and Vrbo on every stay, repeat guests included', source: 'Houfy, OTA fee comparison, 2026' },
  { value: '41 days', label: 'average booking lead time in Uvita, with December as the peak month', source: 'AirROI, 2026' },
  { value: '84%', label: 'of affluent US travelers say a trusted advisor beats unlimited online research', source: 'Preferred Hotels & Resorts / Harris Poll, 2025' },
]

const DECISIONS = [
  {
    title: 'Sell the care, not only the house',
    why: 'On Airbnb every villa is one more listing. Picomar’s real difference is the team in Uvita and the concierge included in every booking, so the hero promise is “A luxury villa, looked after”, with the 24/7 concierge and 4,200+ guests right under it.',
  },
  {
    title: 'One search bar for the whole collection',
    why: 'Villa, dates and guests sit in one bar on the home page and carry over to the collection and the villa page. The calendar shows two months with past dates disabled, and guests use a stepper with the real overnight limit.',
  },
  {
    title: 'Filters that live in the address',
    why: 'Dates, guests, price, amenities and access update a live villa count and are saved in the URL, so a guest can send a filtered list to their group on WhatsApp and everyone sees the same villas.',
  },
  {
    title: 'A villa page that reads like a house tour',
    why: 'Gallery, video tour, bedrooms, location and rules follow the order of a visit, with a sticky “Explore” bar to jump between them. On the phone, the price and “Check availability” stay fixed at the bottom.',
  },
  {
    title: 'The full price before the request',
    why: 'Taxes and fees are almost a quarter of a stay. The quote lists nights, IVA, service and cleaning before “Request to book”, and says “You won’t be charged yet”, so booking direct feels safer than the platform.',
  },
  {
    title: 'Content that brings the right search',
    why: 'Collections by occasion, 14 journal entries about Uvita and Osa, and pages for experiences and activities give Google and AI answers real text to show for villa rentals in Costa Rica, not only the brand name.',
  },
]

const LEARNINGS = [
  'In luxury rentals, trust is about people. Naming the head concierge and showing the team did more for the page than another photo of a pool.',
  'Showing the full price early is a design decision, not only a legal one. A clear quote is what turns a visitor from the platforms into a direct booking.',
  'Keeping filters in the URL was a small technical choice with a big social effect: groups plan villas together, so the result has to be shareable.',
  'Testing the live site after launch found what the design files could not: photos that load late, a sticky bar that overlaps, panels that don’t close with Escape. Those are now the next round of work.',
]

const FINDINGS = [
  'Home and villa pages paint an empty dark screen for three to four seconds before the main photo. Google found that 53% of mobile visits are abandoned after three seconds.',
  'On The Collection, the sticky filter bar covers the page title when the results get short.',
  'Escape, or opening another filter, leaves the last filter panel open: a keyboard and accessibility fix.',
  'On wide screens the booking card sits after the activities instead of beside the gallery. It should stay in view from 1280 px up.',
]

function SectionHead({ id, title }) {
  return (
    <h2 className="case-study__section-heading" id={`${id}-label`}>
      {title}
    </h2>
  )
}

function Fig({ name, alt, caption, eager = false }) {
  return (
    <figure className="trama-cs__figure wb-cs__slide">
      <img src={img(name)} alt={alt} width="2000" height="1194" loading={eager ? 'eager' : 'lazy'} decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/** Muted loop that plays on its own unless the visitor prefers reduced motion. Controls let anyone pause it. */
function Video({ src, poster, label, caption, phone = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    v.play().catch(() => {})
  }, [])
  return (
    <figure className={`trama-cs__figure wb-cs__video${phone ? ' pm-cs__phone' : ''}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        controls
        preload="metadata"
        width={phone ? 540 : 1340}
        height={phone ? 1170 : 838}
        aria-label={label}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default function PicoMarCaseStudy() {
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

  const index = projects.findIndex((p) => p.slug === 'pico-mar-villas')
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null
  const nextHasPage = next && next.slug !== 'pico-mar-villas' && next.link

  return (
    <div className="case-study trama-cs wb-cs pm-cs">
      <section className="case-study__hero">
        <Reveal>
          <h1 className="case-study__title">Picomar: a luxury villa, looked after, online too</h1>
          <p className="case-study__tagline">
            Picomar is a family-run company in Uvita, on Costa Rica’s South Pacific, that manages more than forty
            private villas and includes a concierge in every stay. With GEXP Software, I redesigned picomar.com from
            research to launch, so guests can find the right villa, see the full price and book direct, with a real
            person one message away.
          </p>
          <ul className="trama-cs__tags" aria-label="Disciplines">
            {['UX Research', 'UX/UI Design', 'Web Development', 'Booking Flow', 'Content', 'SEO'].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="trama-cs__meta">
            <div>
              <dt>Role</dt>
              <dd>Research, UX/UI, web development, content and SEO</dd>
            </div>
            <div>
              <dt>Client</dt>
              <dd>Picomar Luxury Villas, Uvita, Costa Rica, through GEXP Software</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>Website redesign · search and filters · villa pages · booking quote · journal</dd>
            </div>
            <div>
              <dt>Site</dt>
              <dd>
                <a href="https://picomar.com/" target="_blank" rel="noopener noreferrer">
                  picomar.com<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>4 weeks, 2026</dd>
            </div>
          </dl>
        </Reveal>
      </section>

      <Reveal>
        <Fig
          name="slide-01"
          eager
          alt="Cover slide: the Pico Mar Luxury Villas logo in gold on black, the title A luxury villa, looked after, online too, and the live home page of picomar.com on the right."
          caption="Client: Picomar, through GEXP Software · Service: website redesign · Year: 2026"
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
              <SectionHead id="context" title="Forty homes, one name nobody searched for" />
              <p className="case-study__section-text">
                Since 2018, Picomar has looked after luxury homes along Costa Ballena, from Dominical to Uvita and Osa.
                One local team handles housekeeping, maintenance, staff, owner reports and guests, and a concierge
                arranges airport pickups, private chefs, boat trips and surf lessons.
              </p>
              <p className="case-study__section-text">
                Most guests met those villas one listing at a time on the big platforms, next to hundreds of other
                rentals. The team, the concierge and the years on the coast didn’t show anywhere, and every booking
                paid a commission.
              </p>
              <p className="trama-cs__goal">
                <strong>Goal:</strong> a direct-booking site that shows the whole collection, makes the care visible
                and gets a guest from “any villa” to a clear quote in a few steps.
              </p>
            </Reveal>
          </section>

          <section className="case-study__section" id="research" tabIndex={-1} aria-labelledby="research-label">
            <Reveal>
              <SectionHead id="research" title="A flat year for arrivals, a record year for spend" />
              <p className="case-study__section-text">
                The desk research looked at the market, the booking channels and the luxury traveler. Arrivals barely
                grew in 2025, but spending hit a record, so each guest is worth more and the commission on every
                platform booking matters more.
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
                alt="Market research slide: 2,689,278 air arrivals in 2025, $5.543B in tourism revenue and 8.2% growth in Panama. Below, Uvita and Bahía Ballena rentals: a month strip with December as the peak and May as the low, 41 days of booking lead time and 37% median occupancy."
                caption="The season is short and books early, so the site has to win the bookings that already want Costa Ballena."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="users" tabIndex={-1} aria-labelledby="users-label">
            <Reveal>
              <SectionHead id="users" title="Two people trust Picomar with a house" />
              <p className="case-study__section-text">
                The site serves two very different visitors. Guests, often families and groups, want to see the real
                house and the full price, and to know who will be there when they arrive. Homeowners, many of them
                abroad, want one local team they can trust with upkeep, staff and rental income.
              </p>
              <ul className="hilo-cs__roles">
                <li>
                  <strong>Guests</strong>
                  <span>See the real house, rooms and price. Pick by group size and occasion. Reach a person before paying.</span>
                </li>
                <li>
                  <strong>Homeowners</strong>
                  <span>One team for upkeep, staff and guests. Reports in USD or CRC on WhatsApp. Rental income without a hard sell.</span>
                </li>
              </ul>
            </Reveal>
            <Reveal>
              <Fig
                name="slide-04"
                alt="Slide Two people trust Picomar with a house: two dark cards. Guests: Who will actually be there when we arrive? 84% value a trusted advisor over online research. Homeowners: Who looks after my home while I’m abroad? 40+ villas cared for by one team since 2018."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="problem" tabIndex={-1} aria-labelledby="problem-label">
            <Reveal>
              <SectionHead id="problem" title="From one listing among hundreds to a brand people book" />
              <p className="case-study__section-text">
                Airbnb carries most vacation-rental bookings in Costa Rica, and in Uvita alone it lists over 420 homes
                with a pool. The answer was a site that sells the care and not only the house: the whole collection with
                live prices, a quote with every fee, and the concierge on WhatsApp at any step, plus a separate path for
                owners.
              </p>
            </Reveal>
            <Reveal>
              <Fig
                name="slide-02"
                alt="Problem and solution slide. Problem: 72.6% of vacation-rental bookings go through Airbnb, 15–20% commission on Airbnb and Vrbo, 420+ Uvita rentals with a pool. Solution: search by dates, guests and occasion, book direct with the full price, talk to the concierge on WhatsApp, a separate path for owners."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="synthesis" tabIndex={-1} aria-labelledby="synthesis-label">
            <Reveal>
              <SectionHead id="synthesis" title="From findings to four principles" />
              <p className="case-study__section-text">
                I sorted the research on one board and turned it into four principles. Each one takes something
                Picomar already does on the coast and makes the site show it before the guest asks.
              </p>
              <div className="wb-cs__board">
                <div>
                  <h3>Private home first</h3>
                  <ul>
                    <li>Every villa reads like a house tour</li>
                    <li>Gallery, video, bedrooms, map, rules</li>
                    <li>Similar villas at the end</li>
                  </ul>
                </div>
                <div>
                  <h3>A person in every step</h3>
                  <ul>
                    <li>The concierge has a name</li>
                    <li>WhatsApp from the hero and the footer</li>
                    <li>Same-day reply, in English and Spanish</li>
                  </ul>
                </div>
                <div>
                  <h3>The price before the promise</h3>
                  <ul>
                    <li>Nights, IVA, service and cleaning</li>
                    <li>Cancellation and minimum stay in view</li>
                    <li>No charge until the guest confirms</li>
                  </ul>
                </div>
                <div>
                  <h3>Choose by occasion</h3>
                  <ul>
                    <li>Sleeps eight or more</li>
                    <li>Retreats and family reunions</li>
                    <li>Complete privacy and gated communities</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <Fig
                name="slide-05"
                alt="Synthesis slide with four principles: private home first, a person in every step, the price before the promise, and choose by occasion, each with the interface text that applies it."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="architecture" tabIndex={-1} aria-labelledby="architecture-label">
            <Reveal>
              <SectionHead id="architecture" title="From “any villa” to a request in four screens" />
              <p className="case-study__section-text">
                The booking flow has four steps: home, collection, villa and quote. Concierge, experiences, homeowners
                and the journal stay one click away from any of them. I tested it on the live site: “Casa”, December 8
                to 12, six guests, gave 10 villas, then Casa Iguana and a total of $1,819.
              </p>
            </Reveal>
            <Reveal>
              <Fig
                name="slide-06"
                alt="Information architecture slide: four connected boxes, home, the collection, villa and quote, with what each one holds, and below them the sections that are always one step away: concierge, experiences, homeowners and the journal."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="process" tabIndex={-1} aria-labelledby="process-label">
            <Reveal>
              <SectionHead id="process" title="Design process" />
              <ol className="trama-cs__pipeline">
                <li>
                  <strong>Discovery</strong>
                  <span>Review of the old site, the villa data and the listings on the platforms, market and channel research.</span>
                </li>
                <li>
                  <strong>Architecture</strong>
                  <span>Booking flow, collections by occasion, villa page order, owner path and concierge touchpoints.</span>
                </li>
                <li>
                  <strong>UI design</strong>
                  <span>Dark, gold and green look from the brand and the photography, Outfit for titles, search, filters and quote.</span>
                </li>
                <li>
                  <strong>Build</strong>
                  <span>Website with GEXP Software: villa content, live search, filters in the URL and the booking quote.</span>
                </li>
                <li>
                  <strong>Content and SEO</strong>
                  <span>Villa and collection copy, experiences and activities, the journal and the post-launch review.</span>
                </li>
              </ol>
            </Reveal>
          </section>

          <section className="case-study__section" id="website" tabIndex={-1} aria-labelledby="website-label">
            <Reveal>
              <SectionHead id="website" title="One bar that does the work of a travel agent" />
              <p className="case-study__section-text">
                The home page opens with the promise and the search. Below it come the featured villas, the most
                booked homes, collections by occasion, concierge experiences, the owners program, the journal and a
                letter from the head concierge with WhatsApp, email and phone.
              </p>
            </Reveal>
            <Reveal>
              <Video
                src={homeVideo}
                poster={homePoster}
                label="Scroll through the picomar.com home page, from the hero with the search bar to the contact section and the footer."
                caption="The full home page, from the search to the concierge letter."
              />
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Search and filters</h3>
              <p className="case-study__section-text">
                One bar holds villa, dates and guests. The search keeps the choices on the collection, where five
                filters update a live count and are saved in the address of the page.
              </p>
              <Video
                src={searchVideo}
                poster={searchPoster}
                label="Search on picomar.com: typing a villa name, picking December 8 to 12 on the two-month calendar, setting six guests and seeing 10 villas."
                caption="“Casa”, December 8 to 12, six guests: 10 villas."
              />
              <Video
                src={filtersVideo}
                poster={filtersPoster}
                label="Filters on The Collection: the price and amenities panels, with air conditioning and backup generator selected, going from 46 to 4 villas."
                caption="Two amenities take the collection from 46 to 4 villas."
              />
              <Fig
                name="slide-07"
                alt="Search slide: screenshots of the home search with the two-month calendar open, the guest stepper and the filtered collection."
              />
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Villa page and quote</h3>
              <p className="case-study__section-text">
                Each villa reads like a house tour, with a sticky bar to jump between sections, and ends with the
                quote. Prices and policy are real text, so search engines can read them too.
              </p>
              <Video
                src={villaVideo}
                poster={villaPoster}
                label="Casa Iguana villa page: gallery, video tour, description, bedrooms, amenities, location and the quote with the total of $1,819."
                caption="Casa Iguana, from the gallery to the quote."
              />
              <Fig
                name="slide-08"
                alt="Villa slide: screenshots of the Casa Iguana gallery and bedrooms, and the quote for December 8 to 12 and six guests: 4 nights $1,400, IVA $182, service fee $77, cleaning fee $160, total $1,819."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="mobile" tabIndex={-1} aria-labelledby="mobile-label">
            <Reveal>
              <SectionHead id="mobile" title="Built for the phone" />
              <p className="case-study__section-text">
                On the phone, the search stacks into one column, the villa sections become a horizontal bar, and the
                price with “Check availability” stays fixed at the bottom of every villa page.
              </p>
            </Reveal>
            <Reveal>
              <Video
                phone
                src={mobileVideo}
                poster={mobilePoster}
                label="Picomar on a phone: the home search, featured villas, popular villas and the Casa Iguana page with the fixed price bar."
                caption="Mobile home and villa page."
              />
              <Fig
                name="slide-09"
                alt="Mobile and next steps slide: three phone screens of picomar.com and four findings from testing the live site."
              />
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
              <h3 className="wb-cs__h3">What testing the live site found</h3>
              <ul className="trama-cs__checklist">
                {FINDINGS.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">What I learned</h3>
              <ul className="trama-cs__checklist">
                {LEARNINGS.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <p className="case-study__section-text">
                See the live site at{' '}
                <a href="https://picomar.com/" target="_blank" rel="noopener noreferrer">
                  picomar.com<span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </p>
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Sources</h3>
              <ul className="wb-cs__sources">
                <li>ICT, international air arrivals 2025, via La Nación and Travel2Latam</li>
                <li>Tico Times, Costa Rica tourism 2025 results and 2025–2026 high season, 2026</li>
                <li>Osa Property Management, Uvita rental marketing insights, 2024</li>
                <li>Houfy, direct booking vs. OTA fees, 2026</li>
                <li>AirROI, Uvita and Bahía Ballena short-term rental data, 2025–2026</li>
                <li>Preferred Hotels &amp; Resorts and The Harris Poll, The Luxury Travel Report, 2025 (n=500+)</li>
                <li>Google, The Need for Mobile Speed, 2016</li>
                <li>picomar.com, tested live in November 2026</li>
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
