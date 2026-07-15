import { useState } from 'react'
import useFillHover from '../hooks/useFillHover'
import './Contact.css'

// Formspree endpoint — see setup instructions to get your own form ID.
// Replace YOUR_FORM_ID below with the ID Formspree gives you after creating
// a form (dashboard: https://formspree.io/forms -> + New Form).
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgojgdoe'

const socials = [
  {
    label: 'LinkedIn',
    icon: 'linkedin-icon',
    href: 'https://www.linkedin.com/in/mariela-cascante-fallas-aba957208/?locale=es',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const {
    ref: submitRef,
    onMouseEnter: submitEnter,
    onMouseLeave: submitLeave,
  } = useFillHover()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })

      if (response.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <h2>Contact</h2>

      <div className="contact__inner">
        <div className="contact__info">
          <p className="contact__text">
            Have a project in mind? I'd love to hear about it. Get in touch and let's talk.
          </p>
          <div className="contact__socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="contact__social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <svg width="20" height="20" aria-hidden="true">
                  <use href={`/icons.svg#${s.icon}`} />
                </svg>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <label className="contact__label">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="contact__input"
            />
          </label>
          <label className="contact__label">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="contact__input"
            />
          </label>
          <label className="contact__label">
            <span>Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="contact__input contact__textarea"
            />
          </label>
          <input type="hidden" name="_subject" value="New message from portfolio contact form" />
          <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="contact__honeypot" />

          <button
            ref={submitRef}
            onMouseEnter={submitEnter}
            onMouseLeave={submitLeave}
            type="submit"
            className="contact__submit btn-fill"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>

          {status === 'success' && (
            <p className="contact__status contact__status--success" role="status">
              Thanks! Your message has been sent.
            </p>
          )}
          {status === 'error' && (
            <p className="contact__status contact__status--error" role="alert">
              Something went wrong. Please email me directly at{' '}
              <a href="mailto:cascantefallasmariela@gmail.com">
                cascantefallasmariela@gmail.com
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
