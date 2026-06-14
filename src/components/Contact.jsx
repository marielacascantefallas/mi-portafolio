import { useState } from 'react'
import './Contact.css'

const socials = [
  { label: 'GitHub', icon: 'github-icon', href: 'https://github.com' },
  { label: 'X', icon: 'x-icon', href: 'https://x.com' },
  { label: 'Bluesky', icon: 'bluesky-icon', href: 'https://bsky.app' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`¡Gracias ${form.name}! Tu mensaje ha sido recibido.`)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contacto" className="section contact">
      <h2>Contacto</h2>

      <div className="contact__inner">
        <div className="contact__info">
          <p className="contact__text">
            ¿Tienes un proyecto en mente? Me encantaría saber más. Escríbeme y hablemos.
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
            <span>Nombre</span>
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
            <span>Mensaje</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="contact__input contact__textarea"
            />
          </label>
          <button type="submit" className="contact__submit">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  )
}
