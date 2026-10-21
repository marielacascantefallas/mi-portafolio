import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import useFillHover from '../hooks/useFillHover'
import { caseProjects as projects } from '../data/projects'
import bannerImg from '../assets/projects/hilo-banner.jpg'
import inboxImg from '../assets/projects/hilo-inbox.jpg'
import clientImg from '../assets/projects/hilo-client.jpg'
import assignImg from '../assets/projects/hilo-assign.jpg'
import ownerImg from '../assets/projects/hilo-owner.jpg'
import settingsImg from '../assets/projects/hilo-settings.jpg'
import mobileImg from '../assets/projects/hilo-mobile.jpg'
import '../components/CaseStudy/ProjectCaseStudy.css'
import '../components/CaseStudy/TramaCaseStudy.css'
import '../components/CaseStudy/HiloCaseStudy.css'

// Hilo case study. Same structure and styles as the Trama page (the
// reference the user picked), so the two read as a pair: the system,
// then the product built with it.

const PROTOTYPE_URL = 'https://marielacascantefallas.github.io/trama-design-system/hilo/'
const STORYBOOK_URL = 'https://marielacascantefallas.github.io/trama-design-system/'

const SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The problem' },
  { id: 'numbers', label: 'By the numbers' },
  { id: 'users', label: 'Who it’s for' },
  { id: 'ai', label: 'The AI layer' },
  { id: 'screens', label: 'Key screens' },
  { id: 'decisions', label: 'Key decisions' },
  { id: 'system', label: 'Built with Trama' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'next', label: 'What’s next' },
]

const STATS = [
  { value: '6', label: 'screens: 5 for desktop and a mobile inbox for the owner' },
  { value: '5', label: 'new components added back to Trama, in Figma and React' },
  { value: '1', label: 'action the AI takes on its own: flagging urgent chats' },
  { value: '0', label: 'accessibility violations in 7 automated checks of the live prototype' },
]

const AI_RULES = [
  {
    what: 'Summarize each conversation',
    who: 'The agent confirms or corrects it',
    why: 'Saves reading a long thread, but a wrong summary must never become the record.',
  },
  {
    what: 'Suggest who gets a new chat',
    who: 'A person confirms the assignment',
    why: 'Uses each person’s load and history with the client. The owner knows things the data doesn’t.',
  },
  {
    what: 'Draft the owner’s daily report',
    who: 'The owner edits and sends it',
    why: 'The report goes to the whole team, so it carries the owner’s voice.',
  },
  {
    what: 'Flag urgent chats',
    who: 'Automatic. Anyone can remove the mark',
    why: 'Missing a tax deadline costs far more than a false alarm. Removals are counted, so the rules can be tuned.',
  },
  {
    what: 'Reply to clients',
    who: 'Never',
    why: 'Off and locked in this version: an accounting firm can’t send advice nobody reviewed.',
  },
]

const DECISIONS = [
  {
    title: 'The urgent notice sits above the thread, not inside it',
    why: 'An urgent mark buried between messages gets scrolled past. Pinned above the conversation, with the reason in plain words, it is the first thing the agent reads.',
  },
  {
    title: 'AI is labeled with text, not sparkles',
    why: 'Every AI output carries an “IA” badge and a screen reader label that says it was generated. No gradients or glows: in an accounting office, trust comes from looking like a tool, not a toy.',
  },
  {
    title: 'Assignment shows the load before and after',
    why: 'Each person has a load bar and the count changes as you pick (8 → 11 chats). The owner sees the cost of a choice before making it, and who is near their limit.',
  },
  {
    title: 'The owner gets a different view, not more filters',
    why: 'Agents need the next chat to answer. The owner needs to know who is falling behind and act on it, so the team view leads with load, waiting chats and a reassign button.',
  },
  {
    title: 'Mobile is for the owner, not the agents',
    why: 'Agents work at a desk. The owner checks in between meetings, so the mobile inbox opens with three numbers and the one urgent chat nobody has answered.',
  },
]

const SCREENS = [
  {
    img: inboxImg,
    alt: 'Hilo inbox: list of client chats with status chips, the open conversation with an automatic urgent notice and an AI summary, and the client panel with pending tax filings',
    caption: 'Inbox. The urgent notice and the AI summary sit above the thread; the client panel lists what is due this month.',
  },
  {
    img: clientImg,
    alt: 'Client view for Café Cordillera: header with tax tags, four metrics, a timeline grouped by month, and side cards for the AI client summary, contacts and team history',
    caption: 'Client view. The full history in one place, grouped by month, with who has handled the client since 2022.',
  },
  {
    img: assignImg,
    alt: 'Assignment dialog for three new chats: the AI suggests Luis Jiménez with a reason, and each team member shows a load bar, with Ana marked near her limit',
    caption: 'Assignment. The AI suggests a person and says why; the load bars show the cost of each choice.',
  },
  {
    img: ownerImg,
    alt: 'Owner view: today’s metrics, a load table per person, chats falling behind with reassign buttons, the AI daily report and today’s automatic urgencies',
    caption: 'Owner view. Who is overloaded, which chats are waiting and the urgencies Hilo flagged today.',
  },
  {
    img: settingsImg,
    alt: 'Settings: connected WhatsApp number, assignment mode set to suggest with AI and confirm, team roles with an invite field, and automatic urgency switches and rules',
    caption: 'Settings. The owner decides how chats are assigned and which messages count as urgent.',
  },
]

const SYSTEM = [
  { name: 'AI card', desc: 'A text “IA” badge, a timestamp and optional confirm actions.' },
  { name: 'Message bubble', desc: 'Incoming and outgoing, with time and who replied. Announces its side to screen readers.' },
  { name: 'Tabs', desc: 'With counts, arrow-key navigation and an underline that doesn’t rely on color.' },
  { name: 'Metric card', desc: 'Label, value and a one-line note, as a definition list.' },
  { name: 'Switch', desc: 'role="switch", a required label and a linked description.' },
]

const LEARNINGS = [
  'Decide what the AI may do alone before designing a single screen. It changed the layout of every view.',
  'A design system proves itself in the second product. Hilo needed five components Trama didn’t have, and now Ruta gets them for free.',
  'Real content finds problems placeholder text hides: long client names, tax terms and amounts in colones broke three layouts.',
]

function SectionHead({ id, title }) {
  return (
    <h2 className="case-study__section-heading" id={`${id}-label`}>
      {title}
    </h2>
  )
}

function Figure({ img, alt, caption, width = 2000, height = 1330 }) {
  return (
    <Reveal>
      <figure className="trama-cs__figure">
        <img src={img} alt={alt} width={width} height={height} loading="lazy" />
        <figcaption>{caption}</figcaption>
      </figure>
    </Reveal>
  )
}

export default function HiloCaseStudy() {
  const navigate = useNavigate()
  const { ref: protoRef, onMouseEnter: protoEnter, onMouseLeave: protoLeave } = useFillHover()
  const { ref: closingRef, onMouseEnter: closingEnter, onMouseLeave: closingLeave } = useFillHover()

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

  const index = projects.findIndex((p) => p.slug === 'hilo')
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null
  const nextHasPage = next && next.slug !== 'hilo' && next.link && next.link !== '#'

  return (
    <div className="case-study trama-cs hilo-cs">

      <section className="case-study__hero">
        <Reveal>
          <div className="case-study__hero-image case-study__hero-image--top">
            <img
              src={bannerImg}
              alt="Hilo on desktop, with the inbox, an open conversation and the client panel, and the owner’s mobile inbox beside it"
              width={2000}
              height={950}
            />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="case-study__title">The AI suggests, a person decides</h1>
          <p className="case-study__tagline">
            Hilo is a shared WhatsApp inbox for small accounting firms in Costa Rica, with an AI layer that summarizes
            conversations, suggests who should answer and flags clients with a deadline today. I designed it end to end
            and built a working prototype with my own design system, Trama.
          </p>
          <ul className="trama-cs__tags" aria-label="Disciplines">
            {['Product Design', 'AI UX', 'B2B SaaS', 'Prototyping', 'Accessibility'].map((t) => (
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
              <dd>6 screens · desktop and mobile · 2 roles</dd>
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
              ref={protoRef}
              onMouseEnter={protoEnter}
              onMouseLeave={protoLeave}
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study__prototype-link btn-fill"
            >
              Try the prototype ↗
            </a>
            <Link to="/work/trama" className="case-study__prototype-link">
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
              <SectionHead id="context" title="Where accounting firms really talk to clients" />
              <p className="case-study__section-text">
                In Costa Rica, small accounting firms run on WhatsApp. Clients send invoices, ask how much they owe in
                taxes and remind their accountant of deadlines, all in one chat on one shared phone.
              </p>
              <p className="case-study__section-text">
                I saw this up close designing GoEasy Chat at GEXP Software, a desktop app that centralizes those
                conversations for accounting teams. Hilo is what I would build next: the same job, rethought for a
                team of five with an AI that helps without taking over.
              </p>
            </Reveal>
          </section>

          <section className="case-study__section" id="problem" tabIndex={-1} aria-labelledby="problem-label">
            <Reveal>
              <SectionHead id="problem" title="When everyone can answer, nobody does" />
              <p className="case-study__section-text">
                A shared inbox has no owner per chat. Two people answer the same client, or nobody does. The owner
                only finds out a client was waiting when that client calls, upset, on the day a tax filing is due.
              </p>
              <p className="case-study__section-text">
                Deadlines make it worse. A message that says “I have to pay before 3” looks like any other message in
                the list, and a missed IVA filing means a fine for the client and a lost client for the firm.
              </p>
              <p className="trama-cs__goal">
                <strong>Goal:</strong> every chat has an owner, urgent clients surface on their own, and the owner can
                see in seconds who is falling behind, without the AI ever speaking for the firm.
              </p>
            </Reveal>
          </section>

          <section className="case-study__section" id="numbers" tabIndex={-1} aria-labelledby="numbers-label">
            <Reveal>
              <SectionHead id="numbers" title="What the prototype covers" />
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
              <SectionHead id="users" title="Two people, two different questions" />
              <div className="hilo-cs__roles">
                <div>
                  <h3>The agent</h3>
                  <p className="hilo-cs__role-q">“Which client do I answer next, and what do they need?”</p>
                  <p>
                    Ana handles about 14 clients a day. She needs her chats, the context to reply without reading
                    the whole thread, and the client’s pending filings at hand.
                  </p>
                </div>
                <div>
                  <h3>The owner</h3>
                  <p className="hilo-cs__role-q">“Is anyone being left waiting, and who can take more?”</p>
                  <p>
                    Daniela runs the firm and assigns new clients. She checks the team from her phone between meetings
                    and steps in when someone is overloaded.
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          <section className="case-study__section" id="ai" tabIndex={-1} aria-labelledby="ai-label">
            <Reveal>
              <SectionHead id="ai" title="One rule: the AI suggests, a person decides" />
              <p className="case-study__section-text">
                I wrote the rules before drawing any screen. For each thing the AI could do, I asked what a mistake
                would cost and whether it can be undone. Only one action passed that test to run on its own.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="hilo-cs__table-wrap" role="region" aria-label="What the AI does and who decides" tabIndex={0}>
                <table className="hilo-cs__table">
                  <thead>
                    <tr>
                      <th scope="col">What the AI does</th>
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
              <SectionHead id="screens" title="From the next reply to the whole team" />
              <p className="case-study__section-text">
                Every screen uses real content: Costa Rican tax filings (D-104, CCSS payroll), amounts in colones and
                names that are long enough to break a layout. All of them come from the working prototype.
              </p>
            </Reveal>
            {SCREENS.map((s) => (
              <Figure key={s.caption} {...s} />
            ))}
            <Figure
              img={mobileImg}
              height={1300}
              alt="Three mobile screens: the owner’s inbox with three key numbers and an urgent banner, an open conversation, and the team view"
              caption="Mobile, for the owner: three numbers, the urgent chat nobody has answered and the team at a glance."
            />
          </section>

          <section className="case-study__section" id="decisions" tabIndex={-1} aria-labelledby="decisions-label">
            <Reveal>
              <SectionHead id="decisions" title="The choices that shaped Hilo" />
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
              <SectionHead id="system" title="The product fed the system back" />
              <p className="case-study__section-text">
                Hilo is built only with Trama’s components and tokens. When a screen needed something the system didn’t
                have, I added it to Trama first, in Figma and in React with Storybook docs, and then used it in Hilo.
                The list row also gained a time, and the system a scrim token for dialogs.
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
              <SectionHead id="accessibility" title="Usable with a keyboard and a screen reader" />
              <p className="case-study__section-text">
                Trama already covered contrast and focus. The product added the harder part: flows. I tested them with
                the keyboard and with automated checks on every screen, the dialog and the mobile views.
              </p>
            </Reveal>
            <Reveal>
              <ul className="trama-cs__checklist">
                <li>The assignment dialog traps focus, closes with Esc and returns focus to the button that opened it</li>
                <li>Tabs move with the arrow keys, Home and End</li>
                <li>Urgency is never only red: the notice says why in words, and chips always carry text</li>
                <li>A skip link jumps past the navigation, and each screen moves focus to its content</li>
                <li>Every AI output is announced as generated by AI</li>
              </ul>
            </Reveal>
          </section>

          <section className="case-study__section" id="next" tabIndex={-1} aria-labelledby="next-label">
            <Reveal>
              <SectionHead id="next" title="Testing it with real firms" />
              <p className="case-study__section-text">
                The next step is to put the prototype in front of three accounting firms and watch them assign and
                answer a morning’s chats. The questions I most want answered: do agents trust the summaries enough to
                skip the thread, and do the urgency rules catch the right messages?
              </p>
              <h3 className="trama-cs__subhead">What I learned</h3>
              <ul className="trama-cs__checklist">
                {LEARNINGS.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <div className="trama-cs__links">
                <a
                  ref={closingRef}
                  onMouseEnter={closingEnter}
                  onMouseLeave={closingLeave}
                  href={PROTOTYPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study__prototype-link btn-fill"
                >
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
            View case study
          </Link>
        ) : (
          <h3 className="case-study__next-title case-study__next-title--placeholder">More case studies coming soon</h3>
        )}
      </Reveal>
    </div>
  )
}
