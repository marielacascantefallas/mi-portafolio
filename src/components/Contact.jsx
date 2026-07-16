import { useState } from 'react'
import useFillHover from '../hooks/useFillHover'
import Reveal from './Reveal'
import './Contact.css'

// Formspree endpoint — see setup instructions to get your own form ID.
// Replace YOUR_FORM_ID below with the ID Formspree gives you after creating
// a form (dashboard: https://formspree.io/forms -> + New Form).
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgojgdoe'

const LINKEDIN_URL = 'https://www.linkedin.com/in/mariela-cascante-fallas-aba957208'

const emptyForm = { firstName: '', lastName: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
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
        setForm(emptyForm)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <h2 className="sr-only">Contact</h2>

      <Reveal as="p" className="contact__backdrop" aria-hidden="true" y={20}>
        Contact
      </Reveal>

      <Reveal className="contact__card" delay={0.15} start="top 90%">
        <div className="contact__card-header">
          <a
            href={LINKEDIN_URL}
            className="contact__linkedin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" aria-hidden="true">
              <use href="/icons.svg#linkedin-icon" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__grid">
            <div className="contact__fields">
              <label className="contact__label">
                <span>First Name</span>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="contact__input"
                />
              </label>
              <label className="contact__label">
                <span>Last Name</span>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
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
            </div>

            <label className="contact__label contact__label--message">
              <span>Type your message here</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="contact__input contact__textarea"
              />
            </label>
          </div>

          <input type="hidden" name="_subject" value="New message from portfolio contact form" />
          <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="contact__honeypot" />

          <div className="contact__actions">
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

            <button
              ref={submitRef}
              onMouseEnter={submitEnter}
              onMouseLeave={submitLeave}
              type="submit"
              className="contact__submit btn-fill"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  )
}
