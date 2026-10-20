import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ThemeToggle from '../components/ThemeToggle'
import useFillHover from '../hooks/useFillHover'
import projects from '../data/projects'
import bannerImg from '../assets/projects/ruta-banner.jpg'
import todayImg from '../assets/projects/ruta-today.jpg'
import departureImg from '../assets/projects/ruta-departure.jpg'
import bookingImg from '../assets/projects/ruta-booking.jpg'
import weatherImg from '../assets/projects/ruta-weather.jpg'
import calendarImg from '../assets/projects/ruta-calendar.jpg'
import paymentsImg from '../assets/projects/ruta-payments.jpg'
import checkinImg from '../assets/projects/ruta-checkin.jpg'
import '../components/CaseStudy/ProjectCaseStudy.css'
import '../components/CaseStudy/TramaCaseStudy.css'
import '../components/CaseStudy/HiloCaseStudy.css'

// Ruta case study: the third piece of the Trama set (system → Hilo → Ruta).
// Same layout and styles as the other two; the accent switches to Ruta's
// sunset orange so the page carries the product's own brand.

const STORYBOOK_URL = 'https://marielacascantefallas.github.io/trama-design-system/'
const PROTOTYPE_URL = 'https://marielacascantefallas.github.io/trama-design-system/ruta/'

const SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The problem' },
  { id: 'numbers', label: 'By the numbers' },
  { id: 'users', label: 'Who it’s for' },
  { id: 'ai', label: 'The AI layer' },
  { id: 'screens', label: 'Key screens' },
  { id: 'decisions', label: 'Key decisions' },
  { id: 'system', label: 'Same system, new brand' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'next', label: 'What’s next' },
]

const STATS = [
  { value: '7', label: 'screens: 6 for the office and a mobile check-in for the dock' },
  { value: '4', label: 'booking channels in one list: WhatsApp, web, Viator and GetYourGuide' },
  { value: '1', label: 'AI function: turning a WhatsApp message into a booking draft' },
  { value: '48', label: 'pixel touch targets on the dock, where guides check in passengers in the sun' },
]

const AI_RULES = [
  {
    what: 'Read a booking from a WhatsApp message or a platform email',
    who: 'The coordinator reviews every field and creates it',
    why: 'Typing the same details into a form is the slowest part of the day. Each field the AI filled says so.',
  },
  {
    what: 'Match deposits with the bank',
    who: 'A fixed rule, not AI. A person confirms',
    why: 'Money needs results anyone can predict and explain: same amount and same name, or it waits for a person.',
  },
  {
    what: 'Decide whether to cancel for weather',
    who: 'The owner or coordinator, always',
    why: 'Ruta shows the official forecast and who is affected. Whether it is safe to sail is not a model’s call.',
  },
]

const DECISIONS = [
  {
    title: 'Today is a list of departures, not a calendar',
    why: 'The coordinator’s question at 7:00 is “what leaves next and is it ready?”. The day reads top to bottom by time, and the next departure is highlighted with its one action: check-in.',
  },
  {
    title: 'Capacity is a number and a bar, per boat',
    why: 'Overbooking happens when seats are counted across channels in different places. Every departure shows seats taken out of the boat’s capacity, and the calendar shows the same count for the whole week.',
  },
  {
    title: 'Deposits show the proof next to the bank',
    why: 'SINPE Móvil transfers arrive as screenshots on WhatsApp. Ruta puts the client’s proof beside the real bank movement, so confirming is a comparison, not a search through two apps.',
  },
  {
    title: 'Weather moves a whole departure at once',
    why: 'When the swell rises, the coordinator used to message eleven people one by one. Now they pick a new departure that fits everyone and send one message, translated for each client.',
  },
  {
    title: 'Check-in is built for the dock',
    why: 'The guide holds a phone in one hand, in direct sun. Light mode, 48 px buttons and one tap per booking, with payment warnings on the card that needs them.',
  },
]

const SCREENS = [
  {
    img: todayImg,
    alt: 'Ruta’s Today view: weather, four metrics, the day’s five departures with capacity bars and check-in status, the boats, an AI-read booking and a list of things to resolve',
    caption: 'Today. Departures by time, with the next one highlighted; the weather and what needs a decision on the side.',
  },
  {
    img: departureImg,
    alt: 'Departure detail for 9:30: header with boat and crew, manifest of six bookings with pickup, language and payment, a pre-departure checklist and the pickup route',
    caption: 'Departure detail. The manifest, a checklist before sailing and the van’s pickup route.',
  },
  {
    img: bookingImg,
    alt: 'New booking side panel: the client’s original WhatsApp message, an AI card saying it filled six fields, the form with each AI-filled field labeled, departure options with seats left and the price with a 30% deposit',
    caption: 'New booking. The AI fills the form from the client’s message, labels what it filled, and a person creates it.',
  },
  {
    img: weatherImg,
    alt: 'Reschedule dialog for the 13:00 departure: a swell warning from the national forecast, three new departure options showing whether everyone fits, the four bookings that move and the message to send',
    caption: 'Reschedule for weather. One choice moves eleven passengers and drafts one message in each client’s language.',
  },
  {
    img: calendarImg,
    alt: 'Weekly calendar: five departures by seven days, each cell with seats taken, a bar and seats left, maintenance days, today highlighted and daily totals',
    caption: 'Calendar. Occupancy for the week, so full departures and quiet days are visible before they happen.',
  },
  {
    img: paymentsImg,
    alt: 'Payments: four metrics, two SINPE deposits compared with bank movements, one matching and one not yet received, today’s totals by method and the bank feed',
    caption: 'Payments. Each deposit compared with the bank, and a clear next step when they don’t match.',
  },
]

const SYSTEM = [
  { name: 'Same components', desc: 'Metric cards, tabs, chips, buttons, the AI card and the switch come straight from Trama, unchanged.' },
  { name: 'Ruta’s theme', desc: 'Sunset orange and squarer corners (6/8 px) make it feel operational, next to Hilo’s softer indigo.' },
  { name: 'New icons', desc: 'Boat, wallet, waves, cloud, pin, list and checked-in user, drawn to match the existing set.' },
  { name: 'Departure row', desc: 'Time, tour, capacity and status in one row: a pattern Ruta adds for anything scheduled.' },
]

const LEARNINGS = [
  'A design system pays off on the second brand. Ruta took a fraction of Hilo’s time because the hard parts were already solved.',
  'Not everything that could use AI should. Money and safety stayed with rules and people, and the screens are clearer for it.',
  'Design for the place, not just the screen. The dock in the sun shaped the check-in more than any other constraint.',
]

function SectionHead({ id, eyebrow, title }) {
  return (
    <>
      <p className="case-study__section-label" id={`${id}-label`}>
        {eyebrow}
      </p>
      <h2 className="case-study__section-heading">{title}</h2>
    </>
  )
}

function Figure({ img, alt, caption, width = 1600, height = 1080 }) {
  return (
    <Reveal>
      <figure className="trama-cs__figure">
        <img src={img} alt={alt} width={width} height={height} loading="lazy" />
        <figcaption>{caption}</figcaption>
      </figure>
    </Reveal>
  )
}

export default function RutaCaseStudy({ theme, onToggle }) {
  const navigate = useNavigate()
  const { ref: sysRef, onMouseEnter: sysEnter, onMouseLeave: sysLeave } = useFillHover()

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/')
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

  const index = projects.findIndex((p) => p.slug === 'ruta')
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null
  const nextHasPage = next && next.slug !== 'ruta' && next.link && next.link !== '#'

  return (
    <div className="case-study trama-cs ruta-cs">
      <header className="case-study__header">
        <Link to="/" className="case-study__back">
          ← Back to portfolio
        </Link>
        <div className="case-study__theme-wrap glass">
          <ThemeToggle theme={theme} onToggle={onToggle} />
        </div>
      </header>

      <section className="case-study__hero">
        <Reveal>
          <div className="case-study__hero-image case-study__hero-image--top">
            <img
              src={bannerImg}
              alt="Ruta on desktop, showing today’s departures for a whale-watching operator, and the guide’s mobile check-in beside it"
              width={2000}
              height={950}
            />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="case-study__eyebrow">Case Study · Ruta</p>
          <h1 className="case-study__title">Every seat, from WhatsApp to the dock</h1>
          <p className="case-study__tagline">
            Ruta is a booking panel for small boat tour operators in Costa Rica. It brings bookings from every channel
            into one day, keeps capacity honest per boat, reconciles SINPE deposits and moves a whole departure when
            the weather turns. It is the second product built on Trama, designed in Figma and built as a working prototype.
          </p>
          <ul className="trama-cs__tags" aria-label="Disciplines">
            {['Product Design', 'B2B SaaS', 'Operations', 'Mobile', 'Design Systems'].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="trama-cs__meta">
            <div>
              <dt>Role</dt>
              <dd>Product Designer: flows, AI rules, UI and front-end prototype</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>Self-initiated product concept</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>7 screens · desktop and mobile · 3 roles</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>Figma, Trama, React, Claude Code</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>October 2026</dd>
            </div>
          </dl>
          <div className="trama-cs__links">
            <a
              ref={sysRef}
              onMouseEnter={sysEnter}
              onMouseLeave={sysLeave}
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study__prototype-link btn-fill"
            >
              Try the prototype ↗
            </a>
            <Link to="/proyectos/trama" className="case-study__prototype-link">
              See the design system
            </Link>
          </div>
        </Reveal>
      </section>

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
              <SectionHead id="context" eyebrow="01 · Context" title="Small boats, many channels" />
              <p className="case-study__section-text">
                On Costa Rica’s Pacific coast, whale-watching and snorkel tours are run by small teams: an owner, a
                coordinator in the office, two or three captains and a van driver. They have a few boats and sell the
                same seats through WhatsApp, their website, Viator, GetYourGuide and people who walk up to the dock.
              </p>
              <p className="case-study__section-text">
                I chose this case because I know it from client work on a boat tour website, and because it is the
                opposite of Hilo: less conversation, more logistics. A good test for a design system meant to serve
                both.
              </p>
            </Reveal>
          </section>

          <section className="case-study__section" id="problem" tabIndex={-1} aria-labelledby="problem-label">
            <Reveal>
              <SectionHead id="problem" eyebrow="02 · The problem" title="The day starts with lists that don’t agree" />
              <p className="case-study__section-text">
                Bookings live in a spreadsheet, a notebook and four inboxes. Seats get sold twice, a deposit screenshot
                gets lost in a chat, and when the swell rises at noon someone has to message every passenger by hand.
              </p>
              <p className="trama-cs__goal">
                <strong>Goal:</strong> one view of the day that is true for every channel, so the coordinator can see
                what leaves next, who has paid and what needs a decision, and the guide can check people in from the
                dock.
              </p>
            </Reveal>
          </section>

          <section className="case-study__section" id="numbers" tabIndex={-1} aria-labelledby="numbers-label">
            <Reveal>
              <SectionHead id="numbers" eyebrow="03 · By the numbers" title="What the design covers" />
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="trama-cs__stats">
                {STATS.map((s) => (
                  <li key={s.label}>
                    <span className="trama-cs__stat-value">{s.value}</span>
                    <span className="trama-cs__stat-label">{s.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          <section className="case-study__section" id="users" tabIndex={-1} aria-labelledby="users-label">
            <Reveal>
              <SectionHead id="users" eyebrow="04 · Who it’s for" title="The office and the dock" />
              <div className="hilo-cs__roles">
                <div>
                  <h3>The coordinator</h3>
                  <p className="hilo-cs__role-q">“What leaves next, is it full, and has everyone paid?”</p>
                  <p>
                    Works at a desk from 6:30. Takes new bookings all day, confirms deposits and decides what to do
                    when the weather changes, with the owner.
                  </p>
                </div>
                <div>
                  <h3>The guide or captain</h3>
                  <p className="hilo-cs__role-q">“Who is here, who is missing, and can we sail?”</p>
                  <p>
                    Stands on the dock with a phone 30 minutes before each departure, checks people in and needs to
                    know right away if someone still owes money.
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          <section className="case-study__section" id="ai" tabIndex={-1} aria-labelledby="ai-label">
            <Reveal>
              <SectionHead id="ai" eyebrow="05 · The AI layer" title="One AI function, on purpose" />
              <p className="case-study__section-text">
                Hilo taught me to decide what the AI may do before drawing screens. In Ruta the answer was even
                narrower: the AI drafts bookings from messages, and nothing else. Money and safety stay with rules and
                people.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <div
                className="hilo-cs__table-wrap"
                role="region"
                aria-label="What the AI does and who decides"
                tabIndex={0}
              >
                <table className="hilo-cs__table">
                  <thead>
                    <tr>
                      <th scope="col">Task</th>
                      <th scope="col">Who decides</th>
                      <th scope="col">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AI_RULES.map((r) => (
                      <tr key={r.what}>
                        <th scope="row">{r.what}</th>
                        <td>{r.who}</td>
                        <td>{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </section>

          <section className="case-study__section" id="screens" tabIndex={-1} aria-labelledby="screens-label">
            <Reveal>
              <SectionHead id="screens" eyebrow="06 · Key screens" title="From the first booking to the last passenger" />
              <p className="case-study__section-text">
                The content is a fictional whale-watching operator in Uvita: three boats, five departures a day,
                prices and deposits in colones, and numbers that add up across every screen.
              </p>
            </Reveal>
            {SCREENS.map((s) => (
              <Figure key={s.caption} {...s} />
            ))}
            <Figure
              img={checkinImg}
              alt="The guide’s mobile check-in for the 9:30 departure next to the departure detail: six of fourteen aboard, large Arrived buttons and payment warnings"
              caption="Check-in on the dock: one tap per booking, and the cards that still owe money say so."
            />
          </section>

          <section className="case-study__section" id="decisions" tabIndex={-1} aria-labelledby="decisions-label">
            <Reveal>
              <SectionHead id="decisions" eyebrow="07 · Key decisions" title="The choices that shaped Ruta" />
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
          </section>

          <section className="case-study__section" id="system" tabIndex={-1} aria-labelledby="system-label">
            <Reveal>
              <SectionHead id="system" eyebrow="08 · Same system, new brand" title="Built from Trama, themed as Ruta" />
              <p className="case-study__section-text">
                Ruta uses the same components and tokens as Hilo. Switching the brand mode changed the color and the
                corners everywhere at once; the screens only needed new content and a few icons.
              </p>
            </Reveal>
            <ol className="trama-cs__components">
              {SYSTEM.map((c, i) => (
                <Reveal as="li" key={c.name} delay={i * 0.03}>
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                </Reveal>
              ))}
            </ol>
          </section>

          <section
            className="case-study__section"
            id="accessibility"
            tabIndex={-1}
            aria-labelledby="accessibility-label"
          >
            <Reveal>
              <SectionHead id="accessibility" eyebrow="09 · Accessibility" title="Readable in the office and in the sun" />
              <p className="case-study__section-text">
                Every color comes from Trama’s tokens, already checked against WCAG 2.2 AA in Ruta’s light and dark
                themes. I tested the prototype with the keyboard and with automated checks on every screen, the two
                dialogs and the mobile views: zero violations.
              </p>
            </Reveal>
            <Reveal>
              <ul className="trama-cs__checklist">
                <li>Status is always in words: “Full”, “2 seats short”, “Not in the bank yet”, never only a color</li>
                <li>Capacity is a number first and a bar second</li>
                <li>Mobile check-in uses the 48 px size and light mode, for one-handed use outdoors</li>
                <li>Every AI-filled field is labeled under the field, not only with a color</li>
                <li>The weather warning names its source and time, so people can judge it</li>
                <li>The booking panel and the reschedule dialog trap focus, close with Esc and return focus</li>
              </ul>
            </Reveal>
          </section>

          <section className="case-study__section" id="next" tabIndex={-1} aria-labelledby="next-label">
            <Reveal>
              <SectionHead id="next" eyebrow="10 · What’s next" title="From the prototype to the dock" />
              <p className="case-study__section-text">
                The prototype runs the whole morning: create the AI-drafted booking, confirm a deposit, check in the
                9:30 boat and move the afternoon departure for weather. The next step is to test it with two operators
                during whale season. I want to know whether the coordinator trusts the AI drafts and whether the guide
                can check in a full boat in under five minutes.
              </p>
              <h3 className="trama-cs__subhead">What I learned</h3>
              <ul className="trama-cs__checklist">
                {LEARNINGS.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <div className="trama-cs__links">
                <a href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer" className="case-study__prototype-link btn-fill">
                  Try the prototype ↗
                </a>
                <a href={STORYBOOK_URL} target="_blank" rel="noopener noreferrer" className="case-study__prototype-link">
                  Components in Storybook ↗
                </a>
              </div>
            </Reveal>
          </section>
        </div>
      </div>

      <Reveal as="section" className="case-study__next">
        <p className="case-study__next-label">Next project</p>
        {nextHasPage ? (
          <Link to={next.link} className="case-study__next-link">
            <h3 className="case-study__next-title">{next.title}</h3>
            View case study →
          </Link>
        ) : (
          <h3 className="case-study__next-title case-study__next-title--placeholder">More case studies coming soon</h3>
        )}
      </Reveal>
    </div>
  )
}
