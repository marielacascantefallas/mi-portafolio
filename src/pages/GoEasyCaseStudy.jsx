import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ThemeToggle from '../components/ThemeToggle'
import projects from '../data/projects'
import '../components/CaseStudy/ProjectCaseStudy.css'
import '../components/CaseStudy/TramaCaseStudy.css'
import '../components/CaseStudy/HiloCaseStudy.css'

// GoEasy Chat: the real, shipped product behind Hilo. The app and its files
// belong to the client (MAV Digital), so this case tells the problem,
// decisions and results with diagrams instead of client screens.

const SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The problem' },
  { id: 'numbers', label: 'Results' },
  { id: 'users', label: 'Who it’s for' },
  { id: 'model', label: 'How it works' },
  { id: 'decisions', label: 'Key decisions' },
  { id: 'launch', label: 'Shipping it' },
  { id: 'next', label: 'What I learned' },
]

const STATS = [
  { value: '50+', label: 'active users today' },
  { value: '½', label: 'the time staff spend looking for their clients’ chats' },
  { value: '1', label: 'WhatsApp number shared across the team’s computers' },
  { value: '8–12', label: 'weeks from first design to launch, desktop only' },
]

const DECISIONS = [
  {
    title: 'The owner sees everything; each person sees their own',
    why: 'Privacy and focus pull in opposite directions in a shared inbox. Giving staff only their clients’ chats removed the noise, and giving the owner every conversation kept the control the firm needed.',
  },
  {
    title: 'Every client belongs to someone',
    why: 'The owner decides which clients belong to each person. That made “who answers this client” a fact in the app instead of a question in the office, and it is what lets each person see only their own chats.',
  },
  {
    title: 'Desktop first, and only desktop',
    why: 'The team works from their computers, so desktop is where the product needed to be first. Leaving mobile out kept the scope realistic for an 8 to 12 week project.',
  },
  {
    title: 'Built on the studio’s design system',
    why: 'I used GEXP’s shared components, the same system reused in every project at the studio. It is one reason the design was ready early: most of the interface was assembled from parts the team already trusted.',
  },
]

const LEARNINGS = [
  'Ask for platform approvals in week one. The design was ready long before launch; the wait was for WhatsApp access approvals that had to be requested again and again.',
  'Measure what people feel. “Half the time looking for chats” explains the product better than any feature list.',
  'Permissions are a design problem, not a settings page. Deciding who sees what shaped every screen of the app.',
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

/** Before and after, drawn with HTML so it reads in both themes and with a screen reader. */
function BeforeAfter() {
  return (
    <figure className="trama-cs__figure goeasy-cs__compare">
      <div className="goeasy-cs__panel">
        <p className="goeasy-cs__tag">Before</p>
        <h3>One phone, everyone’s clients</h3>
        <ul>
          <li>The whole team needed the same WhatsApp number</li>
          <li>Staff scrolled through every client to find their own</li>
          <li>The owner had no clear view of who handled which client</li>
          <li>Paid WhatsApp management tools were expensive</li>
        </ul>
      </div>
      <span className="goeasy-cs__arrow" aria-hidden="true">
        →
      </span>
      <div className="goeasy-cs__panel goeasy-cs__panel--after">
        <p className="goeasy-cs__tag">With GoEasy Chat</p>
        <h3>One number, on every desk</h3>
        <ul>
          <li>The same number works on several computers at once</li>
          <li>Each person sees only their clients’ chats</li>
          <li>The owner sees every conversation and who owns each client</li>
          <li>One app replaced the paid tools</li>
        </ul>
      </div>
      <figcaption>What changed for the team. The app’s screens belong to the client, so this case uses diagrams.</figcaption>
    </figure>
  )
}

/** The visibility model: one number, the owner's view, and each person's slice. */
function VisibilityModel() {
  const people = [
    { name: 'Accountant A', clients: ['Client 1', 'Client 2', 'Client 3'] },
    { name: 'Accountant B', clients: ['Client 4', 'Client 5'] },
    { name: 'Accountant C', clients: ['Client 6', 'Client 7', 'Client 8'] },
  ]
  return (
    <figure className="trama-cs__figure">
      <div className="goeasy-cs__model" role="img" aria-label="Diagram: one WhatsApp number feeds the owner's view of every chat; each accountant sees only the clients assigned to them.">
        <div className="goeasy-cs__node goeasy-cs__node--number">
          <strong>Firm’s WhatsApp number</strong>
          <span>One number, connected once</span>
        </div>
        <span className="goeasy-cs__down" aria-hidden="true" />
        <div className="goeasy-cs__node goeasy-cs__node--owner">
          <strong>Owner</strong>
          <span>Sees all 8 clients · assigns and reassigns</span>
        </div>
        <span className="goeasy-cs__down" aria-hidden="true" />
        <div className="goeasy-cs__people">
          {people.map((p) => (
            <div key={p.name} className="goeasy-cs__node">
              <strong>{p.name}</strong>
              <span>Sees only their clients</span>
              <ul>
                {p.clients.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <figcaption>The visibility model. Illustrative clients; the real firm has many more.</figcaption>
    </figure>
  )
}

function Timeline() {
  const steps = [
    { what: 'Design', detail: 'Roles, the inbox and client ownership, built with the studio’s design system. Nearly done early.' },
    { what: 'Approvals', detail: 'WhatsApp access permissions, requested many times before they were granted.' },
    { what: 'Launch', detail: 'Desktop app live for the firm; 50+ active users today.' },
  ]
  return (
    <ol className="trama-cs__pipeline goeasy-cs__timeline">
      {steps.map((s) => (
        <li key={s.what}>
          <strong>{s.what}</strong>
          <span>{s.detail}</span>
        </li>
      ))}
    </ol>
  )
}

export default function GoEasyCaseStudy({ theme, onToggle }) {
  const navigate = useNavigate()

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

  const index = projects.findIndex((p) => p.slug === 'goeasy-chat')
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null
  const nextHasPage = next && next.slug !== 'goeasy-chat' && next.link && next.link !== '#'

  return (
    <div className="case-study trama-cs goeasy-cs">
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
          <p className="case-study__eyebrow">Case Study · GoEasy Chat · Shipped product</p>
          <h1 className="case-study__title">One WhatsApp number, a whole accounting team</h1>
          <p className="case-study__tagline">
            I led the design of GoEasy Chat at GEXP Software: a desktop app that lets an accounting firm answer clients
            from one WhatsApp number on several computers, with each person seeing their own clients and the owner
            seeing everything. It is live, with 50+ active users.
          </p>
          <ul className="trama-cs__tags" aria-label="Disciplines">
            {['Product Design', 'B2B SaaS', 'Permissions', 'Desktop', 'Design Systems'].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="trama-cs__meta">
            <div>
              <dt>Role</dt>
              <dd>Lead UX/UI designer, as Creative Supervisor at GEXP Software</dd>
            </div>
            <div>
              <dt>Client</dt>
              <dd>MAV Digital, an accounting firm in Costa Rica</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>Desktop app · owner and staff roles</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>GEXP design and development</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>8 to 12 weeks</dd>
            </div>
          </dl>
          <div className="trama-cs__links">
            <a href="https://goeasy.chat/" target="_blank" rel="noopener noreferrer" className="case-study__prototype-link">
              Public site ↗
            </a>
            <Link to="/proyectos/hilo" className="case-study__prototype-link">
              See Hilo, the redesign concept
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
              <SectionHead id="context" eyebrow="01 · Context" title="Accounting runs on WhatsApp" />
              <p className="case-study__section-text">
                In Costa Rica, a small accounting firm talks to its clients on WhatsApp: invoices, tax questions,
                payroll, reminders. MAV Digital had one business number and a team of accountants who all needed it,
                at the same time, from their own computers.
              </p>
            </Reveal>
          </section>

          <section className="case-study__section" id="problem" tabIndex={-1} aria-labelledby="problem-label">
            <Reveal>
              <SectionHead id="problem" eyebrow="02 · The problem" title="Everyone shared one inbox, and nobody owned it" />
              <p className="case-study__section-text">
                With one shared WhatsApp, every accountant scrolled through every client to find their own, and the
                owner had no clear view of which clients belonged to each person. The tools that solve this cost the
                firm more than it wanted to pay.
              </p>
              <p className="trama-cs__goal">
                <strong>Goal:</strong> one number the whole team can use at once, where each person finds their
                clients immediately and the owner keeps control of every conversation.
              </p>
            </Reveal>
            <Reveal>
              <BeforeAfter />
            </Reveal>
          </section>

          <section className="case-study__section" id="numbers" tabIndex={-1} aria-labelledby="numbers-label">
            <Reveal>
              <SectionHead id="numbers" eyebrow="03 · Results" title="What it changed" />
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
            <Reveal>
              <p className="case-study__section-text">
                The firm also stopped paying for expensive WhatsApp management tools. The goal was never to need fewer
                people: it was to give the same team its time back.
              </p>
            </Reveal>
          </section>

          <section className="case-study__section" id="users" tabIndex={-1} aria-labelledby="users-label">
            <Reveal>
              <SectionHead id="users" eyebrow="04 · Who it’s for" title="Two roles, two views of the same inbox" />
              <div className="hilo-cs__roles">
                <div>
                  <h3>The owner</h3>
                  <p className="hilo-cs__role-q">“Who is handling which client, and is anything slipping?”</p>
                  <p>Needs every conversation in one place, and decides which accountant owns each client.</p>
                </div>
                <div>
                  <h3>The accountant</h3>
                  <p className="hilo-cs__role-q">“Where are my clients’ messages?”</p>
                  <p>Needs only their own clients, without scrolling through everyone else’s.</p>
                </div>
              </div>
            </Reveal>
          </section>

          <section className="case-study__section" id="model" tabIndex={-1} aria-labelledby="model-label">
            <Reveal>
              <SectionHead id="model" eyebrow="05 · How it works" title="Visibility follows ownership" />
              <p className="case-study__section-text">
                The core of the product is a simple rule: a client belongs to one accountant, and you see the clients
                you own. The owner sits above that rule and sees everything.
              </p>
            </Reveal>
            <Reveal>
              <VisibilityModel />
            </Reveal>
          </section>

          <section className="case-study__section" id="decisions" tabIndex={-1} aria-labelledby="decisions-label">
            <Reveal>
              <SectionHead id="decisions" eyebrow="06 · Key decisions" title="The choices that shaped GoEasy Chat" />
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

          <section className="case-study__section" id="launch" tabIndex={-1} aria-labelledby="launch-label">
            <Reveal>
              <SectionHead id="launch" eyebrow="07 · Shipping it" title="The design was ready early; access took longer" />
              <p className="case-study__section-text">
                The project took 8 to 12 weeks. The design was nearly finished early, because it was built on the
                studio’s design system. Most of the remaining time went to WhatsApp access approvals, which had to be
                requested many times before the app could go live.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <Timeline />
            </Reveal>
          </section>

          <section className="case-study__section" id="next" tabIndex={-1} aria-labelledby="next-label">
            <Reveal>
              <SectionHead id="next" eyebrow="08 · What I learned" title="And what I would design next" />
              <ul className="trama-cs__checklist">
                {LEARNINGS.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <p className="case-study__section-text">
                After GoEasy Chat, I asked what the same product would look like for any service team, with an AI that
                summarizes conversations and flags clients with a deadline today. That became{' '}
                <Link to="/proyectos/hilo">Hilo</Link>, built on my own design system,{' '}
                <Link to="/proyectos/trama">Trama</Link>.
              </p>
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
