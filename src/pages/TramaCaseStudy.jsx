import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ThemeToggle from '../components/ThemeToggle'
import useFillHover from '../hooks/useFillHover'
import projects from '../data/projects'
import bannerImg from '../assets/projects/trama-banner.jpg'
import buttonsImg from '../assets/projects/trama-buttons.jpg'
import a11yImg from '../assets/projects/trama-a11y.jpg'
import storybookImg from '../assets/projects/trama-storybook.jpg'
import themesImg from '../assets/projects/trama-themes.jpg'
import '../components/CaseStudy/ProjectCaseStudy.css'
import '../components/CaseStudy/TramaCaseStudy.css'

// Rich case study for Trama, structured after the reference the user
// picked (nabauer.com/work/centene-recovery-platform): a thesis title,
// meta grid, impact numbers up front, then short eyebrow + headline +
// 2–4 sentence sections, each paired with a visual or a list, and an
// "On this page" index that stays visible on wide screens.

const STORYBOOK_URL = 'https://marielacascantefallas.github.io/trama-design-system/'
const GITHUB_URL = 'https://github.com/marielacascantefallas/trama-design-system'

const SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The problem' },
  { id: 'numbers', label: 'By the numbers' },
  { id: 'approach', label: 'Approach' },
  { id: 'decisions', label: 'Key decisions' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'components', label: 'Components' },
  { id: 'design-to-code', label: 'Design to code' },
  { id: 'ai', label: 'AI workflow' },
  { id: 'next', label: "What's next" },
]

const STATS = [
  { value: '4', label: 'themes from one codebase: 2 brands × light and dark' },
  { value: '126', label: 'design tokens, with the same names in Figma and code' },
  { value: '36', label: 'button variants: 3 styles × 3 sizes × 4 states' },
  { value: '0', label: 'violations in 63 automated accessibility checks (WCAG 2.2 AA)' },
]

const LAYERS = [
  {
    name: 'Primitives',
    desc: 'Raw values. Never used directly in a component.',
    example: 'añil/600 = #4643DB · atardecer/600 = #C94512',
  },
  {
    name: 'Brand',
    desc: 'One mode per product. Repoints the brand ramp and the corner radius.',
    example: 'brand/600 → añil (Hilo) or atardecer (Ruta)',
  },
  {
    name: 'Semantic',
    desc: 'One mode per color scheme. Names describe the job, not the color.',
    example: 'action/primary → brand/600 (light) or brand/400 (dark)',
  },
  {
    name: 'Components',
    desc: 'Only read semantic tokens, so they never change between brands.',
    example: 'Button background = var(--color-action-primary)',
  },
]

const DECISIONS = [
  {
    title: 'One multi-brand system, not two',
    why: 'Most of the work in both products is the same: lists, statuses, filters and actions. Building it twice would double the maintenance, the bugs and the accessibility fixes.',
  },
  {
    title: 'Indigo for Hilo, not green',
    why: 'Green is WhatsApp’s color and also the system’s “success” color. Indigo keeps the brand distinct and the status colors unambiguous.',
  },
  {
    title: 'Personality through shape, not only color',
    why: 'Hilo uses softer corners (10/14 px) to feel conversational. Ruta is squarer (6/8 px) to feel operational and precise. Two tokens carry that difference.',
  },
  {
    title: 'Three control sizes that line up',
    why: 'S (32 px) for dense rows, M (40 px) by default and L (48 px) for mobile, where a tour operator checks bookings from the dock. Buttons and inputs share the same heights, so they align in a row.',
  },
  {
    title: 'Errors never rely on color',
    why: 'A red border alone fails people with color blindness. Errors use a thicker border, a message that starts with “Error:” and aria-invalid, so they read the same on screen and in a screen reader.',
  },
]

const COMPONENTS = [
  { name: 'Button', desc: 'Primary, secondary and ghost, in S/M/L, with hover, focus and disabled states.' },
  { name: 'Text field', desc: 'Label always visible. Hint and error messages are announced with aria-describedby.' },
  { name: 'Status chip', desc: 'Success, warning, danger and neutral. Always carries text.' },
  { name: 'Avatar', desc: 'Initials from the name. Decorative by default, so screen readers don’t repeat it.' },
  { name: 'List row', desc: 'The same row is a client chat in Hilo and a booking in Ruta, with a selected state marked by a bar and aria-current.' },
]

const PIPELINE = [
  { step: 'Figma variables', detail: 'Collections with modes for brand and for light/dark' },
  { step: 'Tokens JSON', detail: 'One source of truth in the DTCG format' },
  { step: 'Style Dictionary', detail: 'Builds CSS variables in layers and a typed token list' },
  { step: 'React', detail: 'Components with size, variant and state props' },
  { step: 'Storybook', detail: 'Published on GitHub Pages; every push republishes it' },
]

const LEARNINGS = [
  'Check accessibility at the token level. Fixing a contrast pair once fixes it in every component and every theme.',
  'Name things once. When Figma, JSON and CSS share names, handoff stops being a translation exercise.',
  'Personality lives in very few tokens. A brand ramp and two radii were enough to make two products feel different.',
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

function ExternalLinks({ storybookRef, storybookEnter, storybookLeave }) {
  return (
    <div className="trama-cs__links">
      <a
        ref={storybookRef}
        onMouseEnter={storybookEnter}
        onMouseLeave={storybookLeave}
        href={STORYBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="case-study__prototype-link btn-fill"
      >
        View live Storybook ↗
      </a>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="case-study__prototype-link">
        View code on GitHub ↗
      </a>
    </div>
  )
}

export default function TramaCaseStudy({ theme, onToggle }) {
  const navigate = useNavigate()
  const { ref: storybookRef, onMouseEnter: storybookEnter, onMouseLeave: storybookLeave } = useFillHover()
  const { ref: closingRef, onMouseEnter: closingEnter, onMouseLeave: closingLeave } = useFillHover()

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

  const index = projects.findIndex((p) => p.slug === 'trama')
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null
  const nextHasPage = next && next.slug !== 'trama' && next.link && next.link !== '#'

  return (
    <div className="case-study trama-cs">
      <header className="case-study__header">
        <Link to="/" className="case-study__back">
          ← Back to portfolio
        </Link>
        <div className="case-study__theme-wrap glass">
          <ThemeToggle theme={theme} onToggle={onToggle} />
        </div>
      </header>

      {/* Hero */}
      <section className="case-study__hero">
        <Reveal>
          <div className="case-study__hero-image case-study__hero-image--top">
            <img
              src={bannerImg}
              alt="Two products built with Trama: Hilo's client inbox in light mode and Ruta's booking list in dark mode"
              width={2000}
              height={950}
            />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="case-study__eyebrow">Case Study · Trama Design System</p>
          <h1 className="case-study__title">One system, two products</h1>
          <p className="case-study__tagline">
            Trama is a multi-brand design system I designed and built end to end: one set of tokens and components
            that powers Hilo, a shared WhatsApp inbox for service teams, and Ruta, a booking panel for tour operators
            in Costa Rica.
          </p>
          <ul className="trama-cs__tags" aria-label="Disciplines">
            {['Design Systems', 'Design Tokens', 'Accessibility', 'React', 'Storybook'].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="trama-cs__meta">
            <div>
              <dt>Role</dt>
              <dd>Product Designer: system, tokens, components and front-end</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>Self-initiated product concept</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>2 products · 4 themes · 5 components</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>Figma variables, Style Dictionary, React, Storybook, Claude Code</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>October 2026 · in progress</dd>
            </div>
          </dl>
          <ExternalLinks storybookRef={storybookRef} storybookEnter={storybookEnter} storybookLeave={storybookLeave} />
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
          {/* 01 Context */}
          <section className="case-study__section" id="context" tabIndex={-1} aria-labelledby="context-label">
            <Reveal>
              <SectionHead id="context" eyebrow="01 · Context" title="Built on what I learned shipping real products" />
              <p className="case-study__section-text">
                At GEXP Software I designed GoEasy Chat, a desktop SaaS that centralizes WhatsApp conversations for
                accounting teams. It has 50+ active users today and cuts in half the time staff spend scrolling to
                find their clients’ chats. I also built a design system there that was reused across every company
                project and cut delivery times by more than half.
              </p>
              <p className="case-study__section-text">
                I no longer have access to those files. Instead of recreating them from memory, I asked a better
                question: if I started over today, how would I build a system that serves more than one product from
                day one? Trama is my answer.
              </p>
            </Reveal>
          </section>

          {/* 02 Problem */}
          <section className="case-study__section" id="problem" tabIndex={-1} aria-labelledby="problem-label">
            <Reveal>
              <SectionHead
                id="problem"
                eyebrow="02 · The problem"
                title="Small B2B teams end up building the same interface twice"
              />
              <p className="case-study__section-text">
                A studio that ships several products usually starts each one from scratch: a new button, a new input,
                a new set of colors. Two products later, they look related but behave differently, and every
                accessibility fix has to be made twice.
              </p>
              <p className="case-study__section-text">
                Hilo and Ruta are a good test. They do different jobs, answering clients versus running the day’s
                tours, but underneath both are lists, statuses, filters and actions. They should share almost
                everything except their personality.
              </p>
              <p className="trama-cs__goal">
                <strong>Goal:</strong> one source of truth that can change a product’s whole look by switching a
                theme, without touching a single component.
              </p>
            </Reveal>
          </section>

          {/* 03 Numbers */}
          <section className="case-study__section" id="numbers" tabIndex={-1} aria-labelledby="numbers-label">
            <Reveal>
              <SectionHead id="numbers" eyebrow="03 · By the numbers" title="What the first version delivers" />
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="trama-cs__stats">
                {STATS.map((s) => (
                  <li key={s.value + s.label}>
                    <span className="trama-cs__stat-value">{s.value}</span>
                    <span className="trama-cs__stat-label">{s.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* 04 Approach */}
          <section className="case-study__section" id="approach" tabIndex={-1} aria-labelledby="approach-label">
            <Reveal>
              <SectionHead id="approach" eyebrow="04 · Approach" title="Tokens in three layers" />
              <p className="case-study__section-text">
                Every visual decision is a token, and components only read the top layer. Switching brand or color
                scheme just repoints the layers underneath, so the same button becomes Hilo’s indigo or Ruta’s sunset
                orange, in light or dark, with no code changes.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <ol className="trama-cs__layers">
                {LAYERS.map((l, i) => (
                  <li key={l.name}>
                    <span className="trama-cs__layer-index" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h3>{l.name}</h3>
                      <p>{l.desc}</p>
                      <code>{l.example}</code>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal>
              <figure className="trama-cs__figure">
                <img
                  src={themesImg}
                  alt="The same inbox and booking screens rendered in four themes: Hilo light, Hilo dark, Ruta light and Ruta dark"
                  width={1420}
                  height={1180}
                  loading="lazy"
                />
                <figcaption>The same components and tokens, rendered in the four themes.</figcaption>
              </figure>
            </Reveal>
          </section>

          {/* 05 Decisions */}
          <section className="case-study__section" id="decisions" tabIndex={-1} aria-labelledby="decisions-label">
            <Reveal>
              <SectionHead id="decisions" eyebrow="05 · Key decisions" title="The choices that shaped the system" />
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

          {/* 06 Accessibility */}
          <section
            className="case-study__section"
            id="accessibility"
            tabIndex={-1}
            aria-labelledby="accessibility-label"
          >
            <Reveal>
              <SectionHead
                id="accessibility"
                eyebrow="06 · Accessibility"
                title="Accessibility as a build step, not an audit"
              />
              <p className="case-study__section-text">
                I checked every token pair against WCAG 2.2 AA in all four themes before designing a single component.
                That first pass caught two real problems: input borders at 1.4:1, when controls need 3:1, and
                placeholder text at 2.9:1. I split the tokens so decorative dividers and interactive borders could
                follow different rules.
              </p>
              <p className="case-study__section-text">
                Later, automated checks in Storybook caught one more: the helper text of a disabled field had faded
                to 2.7:1. That message often explains why a field is locked, so it has to stay readable. I fixed it in
                code and in Figma.
              </p>
            </Reveal>
            <Reveal>
              <figure className="trama-cs__figure">
                <img
                  src={a11yImg}
                  alt="Before and after: the disabled field's helper text goes from a pale 2.7 to 1 contrast to a readable 6.9 to 1"
                  width={1800}
                  height={400}
                  loading="lazy"
                />
                <figcaption>
                  The disabled field keeps its helper text readable, because it explains why the field is locked.
                </figcaption>
              </figure>
            </Reveal>
            <Reveal>
              <ul className="trama-cs__checklist">
                <li>Text at 4.5:1 or more, and control borders and focus rings at 3:1 or more, in every theme</li>
                <li>A focus ring offset 2 px from the control, the same in every component</li>
                <li>Targets of at least 24 px</li>
                <li>Color is never the only signal: chips carry text and selected rows add a side bar</li>
                <li>Animations turn off when someone asks for reduced motion</li>
              </ul>
            </Reveal>
          </section>

          {/* 07 Components */}
          <section className="case-study__section" id="components" tabIndex={-1} aria-labelledby="components-label">
            <Reveal>
              <SectionHead id="components" eyebrow="07 · Components" title="Five components, every state" />
              <p className="case-study__section-text">
                The first set covers what both products need on day one. Each component has every size and state
                designed in Figma and built in React with the same names, so a variant in the design file is a prop
                in code.
              </p>
            </Reveal>
            <Reveal>
              <figure className="trama-cs__figure">
                <img
                  src={buttonsImg}
                  alt="The button in primary, secondary and ghost styles, sizes S, M and L, plus disabled, shown in the four themes"
                  width={2000}
                  height={1067}
                  loading="lazy"
                />
                <figcaption>The button in three styles and three sizes, in each theme.</figcaption>
              </figure>
            </Reveal>
            <ol className="trama-cs__components">
              {COMPONENTS.map((c, i) => (
                <Reveal as="li" key={c.name} delay={i * 0.03}>
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* 08 Design to code */}
          <section
            className="case-study__section"
            id="design-to-code"
            tabIndex={-1}
            aria-labelledby="design-to-code-label"
          >
            <Reveal>
              <SectionHead id="design-to-code" eyebrow="08 · Design to code" title="One source of truth, five steps" />
              <p className="case-study__section-text">
                The names match end to end. <code>color/action/primary</code> in Figma is{' '}
                <code>var(--color-action-primary)</code> in code, so a developer inspecting a design in Dev Mode sees
                the exact variable they will use.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <ol className="trama-cs__pipeline">
                {PIPELINE.map((p) => (
                  <li key={p.step}>
                    <strong>{p.step}</strong>
                    <span>{p.detail}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal>
              <figure className="trama-cs__figure">
                <img
                  src={storybookImg}
                  alt="Trama's Storybook, with brand and color scheme switchers in the toolbar and the list row shown in four themes"
                  width={2000}
                  height={1250}
                  loading="lazy"
                />
                <figcaption>
                  The live Storybook: brand and color scheme switchers in the toolbar, docs and accessibility checks
                  for every component.
                </figcaption>
              </figure>
            </Reveal>
          </section>

          {/* 09 AI */}
          <section className="case-study__section" id="ai" tabIndex={-1} aria-labelledby="ai-label">
            <Reveal>
              <SectionHead id="ai" eyebrow="09 · AI workflow" title="AI-assisted, designer-led" />
              <p className="case-study__section-text">
                I worked with Claude on the parts that are repetitive or easy to get wrong by hand: creating
                variables through the Figma API, writing the Style Dictionary build, scaffolding components and
                running contrast and accessibility checks.
              </p>
              <p className="case-study__section-text">
                I set the direction and made the calls: what to build, the token architecture, each brand’s
                personality, the three sizes and which trade-offs to accept. Every output was reviewed against the
                design. That is how I expect to work on a modern product team: AI speeds up production, and design
                judgment decides what is right.
              </p>
            </Reveal>
          </section>

          {/* 10 Next */}
          <section className="case-study__section" id="next" tabIndex={-1} aria-labelledby="next-label">
            <Reveal>
              <SectionHead id="next" eyebrow="10 · What’s next" title="Putting Trama to work" />
              <p className="case-study__section-text">
                Trama is the foundation for two products. <Link to="/proyectos/hilo">Hilo</Link>, a shared WhatsApp
                inbox with an AI that summarizes conversations and flags urgent clients, is already designed and
                prototyped only with Trama’s components, and it added five new ones back to the system. Ruta’s booking
                panel is next.
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
                  href={STORYBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study__prototype-link btn-fill"
                >
                  Try it in Storybook ↗
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="case-study__prototype-link">
                  View code on GitHub ↗
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
