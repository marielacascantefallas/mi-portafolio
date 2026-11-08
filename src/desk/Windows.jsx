import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CATEGORIES, categorySlug, deskProjects } from '../data/projects'
import { Lights, useGrowFromNav } from './WindowShell'
import ProjectStack from './ProjectStack'

function useRouteWindow(name) {
  const ref = useRef(null)
  const navigate = useNavigate()
  const [zoomed, setZoomed] = useState(false)
  useGrowFromNav(ref, name)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && !e.defaultPrevented) navigate('/')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])
  const lights = (
    <Lights
      onClose={() => navigate('/')}
      onMinimize={() => navigate('/')}
      onZoom={() => setZoomed((z) => !z)}
      zoomLabel={zoomed ? 'Restore window size' : 'Enlarge window'}
    />
  )
  return { ref, lights, zoomed }
}

/* ===== Work ===== */

export function WorkWindow() {
  const { ref, lights, zoomed } = useRouteWindow('work')
  const [params, setParams] = useSearchParams()
  const catSlug = params.get('category')
  const category = CATEGORIES.find((c) => categorySlug(c) === catSlug) || null
  const list = category ? deskProjects.filter((p) => p.categories.includes(category)) : deskProjects
  const setCategory = (c) => {
    const next = new URLSearchParams(params)
    if (c) next.set('category', categorySlug(c))
    else next.delete('category')
    setParams(next, { replace: true })
  }

  return (
    <section ref={ref} className={`win work${zoomed ? ' is-zoomed' : ''}`} aria-labelledby="work-title">
      <div className="win__bar">{lights}</div>
      <h1 id="work-title" className="sr-only">
        Work by Mariela Cascante, Product Designer in Costa Rica
      </h1>
      <div className="work__grid">
        <ProjectStack list={list} resetKey={catSlug || 'all'} label={category ? `Projects in ${category}` : 'All projects'} />

        <div className="work__filters" role="group" aria-labelledby="filter-title">
          <p className="win__label" id="filter-title">
            Filter
          </p>
          <button type="button" aria-pressed={!category} onClick={() => setCategory(null)}>
            All work
          </button>
          {CATEGORIES.map((c) => (
            <button type="button" key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===== About ===== */

const CAPABILITIES = [
  ['Product Design', ['Product Strategy', 'UX/UI Design', 'Design Systems', 'User Research', 'UX Writing', 'Branding']],
  [
    'Design Engineering',
    ['Figma', 'Tokens Studio', 'Style Dictionary', 'CSS/JS', 'Storybook', 'React', 'Next.js', 'TypeScript', 'React Native'],
  ],
  ['Prototyping & Motion', ['Advanced Prototyping', 'Motion Design', 'GSAP', 'Lottie']],
  [
    'AI & Emerging Tech',
    ['AI-Driven Product Features', 'AI Companions', 'Real-Time AI Interfaces', 'OpenAI GPT APIs', 'Claude Code', 'Cursor', 'Agentic Services'],
  ],
  ['Business & Growth', ['Product Metrics', 'Experimentation']],
]

export function AboutWindow() {
  const { ref, lights, zoomed } = useRouteWindow('about')
  return (
    <section ref={ref} className={`win big about${zoomed ? ' is-zoomed' : ''}`} aria-labelledby="about-title">
      <div className="win__bar">{lights}</div>
      <div className="big__scroll" tabIndex={0}>
        <div className="about__grid">
          <h2 className="win__label">About</h2>
          <div>
            <h1 id="about-title" className="about__title">
              I design what teams work with: products, systems and experiences for everyday work.
            </h1>
            <p className="about__bio">
              I’m Mariela Cascante, a product designer based in Costa Rica, focused on designing and building B2B
              products from the first idea to launch. For nearly five years I’ve worked across UX and brand, helping
              companies turn their ideas into clear, scalable and user-centered digital products.
            </p>
          </div>

          <h2 className="win__label">Capabilities</h2>
          <ul className="caps">
            {CAPABILITIES.map(([group, items]) => (
              <li key={group}>
                <h3 className="caps__group">{group}</h3>
                <ul className="caps__items">
                  {items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <h2 className="win__label">Experience</h2>
          <div className="xp">
            <div>
              <h3>Product and UX Design</h3>
              <ol>
                <li>
                  <span className="xp__when">Present</span>
                  <span>
                    Freelance<small>Product Designer, UX/UI Designer</small>
                  </span>
                </li>
                <li>
                  <span className="xp__when">2023–2026</span>
                  <span>
                    GEXP Software<small>Product Designer</small>
                  </span>
                </li>
                <li>
                  <span className="xp__when">2021–2023</span>
                  <span>
                    GEXP Software<small>Social Media Designer</small>
                  </span>
                </li>
              </ol>
            </div>
            <div>
              <h3>Education</h3>
              <ol>
                <li>
                  <span className="xp__when">2024–2026</span>
                  <span>
                    Universidad Cenfotec<small>Technical Degree, Graphic Design and UX Design</small>
                  </span>
                </li>
                <li>
                  <span className="xp__when">Certificate</span>
                  <span>
                    Google<small>UX Design Professional Certificate</small>
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== Contact ===== */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgojgdoe'

export function ContactWindow() {
  const { ref, lights, zoomed } = useRouteWindow('contact')
  const [status, setStatus] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })
      if (res.ok) {
        setStatus('success')
        e.target.reset()
      } else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section ref={ref} className={`win big contact${zoomed ? ' is-zoomed' : ''}`} aria-labelledby="contact-title">
      <div className="win__bar">{lights}</div>
      <div className="big__scroll">
        <div className="contact__grid">
          <div>
            <h1 id="contact-title" className="about__title">
              I’m open to new work.
            </h1>
            <p className="about__bio">
              I’d love to hear about your product, your team or the role you’re hiring for. Share a few details and
              I’ll get back to you as soon as I can.
            </p>
            <p className="about__bio">
              Prefer email? <a href="mailto:cascantefallasmariela@gmail.com">cascantefallasmariela@gmail.com</a>
            </p>
          </div>
          <form className="form" onSubmit={submit}>
            <label>
              What can I help with?
              <select name="topic" defaultValue="A full-time role">
                <option>A full-time role</option>
                <option>A freelance project</option>
                <option>Something else</option>
              </select>
            </label>
            <div className="form__two">
              <label>
                Your name
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                <span>
                  Company <span className="form__opt">(optional)</span>
                </span>
                <input name="company" autoComplete="organization" />
              </label>
            </div>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Message
              <textarea name="message" rows="5" required />
            </label>
            <div className="form__end">
              <button type="submit" className="btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <p role="status" className="form__status">
                {status === 'success' && 'Thanks, your message is on its way. I’ll reply soon.'}
                {status === 'error' && 'The message didn’t send. Please try again or write to my email.'}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
