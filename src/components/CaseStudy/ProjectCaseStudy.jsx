import { Link } from 'react-router-dom'
import Reveal from '../Reveal'
import RevealStagger from '../RevealStagger'
import ThemeToggle from '../ThemeToggle'
import useFillHover from '../../hooks/useFillHover'
import './ProjectCaseStudy.css'

// Generic, data-driven case study template. Pass a project's content in via
// props and it renders the full narrative flow (hero -> problem ->
// opportunity -> personas -> how might we -> ideation -> brand -> key
// screens -> takeaways -> next project), reusing the same fade/scroll-reveal
// animations as the rest of the site. Any project page can be built on top
// of this by supplying a new set of props.
export default function ProjectCaseStudy({
  theme,
  onToggle,
  eyebrow = 'Case Study',
  title,
  tagline,
  scope,
  role,
  duration,
  prototypeLink,
  heroImage,
  problem,
  opportunity,
  personas = [],
  howMightWe = [],
  ideationImages = [],
  ideationThumbs = [],
  brand,
  screenGroups = [],
  takeaways,
  nextProject,
}) {
  const hasPrototypeLink = prototypeLink && prototypeLink !== '#'
  const {
    ref: prototypeRef,
    onMouseEnter: prototypeEnter,
    onMouseLeave: prototypeLeave,
  } = useFillHover()

  return (
    <div className="case-study">
      <header className="case-study__header">
        <Link to="/" className="case-study__back">
          ← Back to portfolio
        </Link>
        <ThemeToggle theme={theme} onToggle={onToggle} />
      </header>

      {/* Hero */}
      <section className="case-study__hero">
        {heroImage && (
          <Reveal>
            <div className="case-study__hero-image case-study__hero-image--top">
              <img src={heroImage} alt={`${title} preview`} loading="lazy" />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <p className="case-study__eyebrow">{eyebrow}</p>
          <h1 className="case-study__title">{title}</h1>
          <p className="case-study__tagline">{tagline}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="case-study__scope-box">
            <div className="case-study__scope-item">
              <span className="case-study__scope-label">Project scope</span>
              <span className="case-study__scope-value">{scope}</span>
            </div>
            <div className="case-study__scope-item">
              <span className="case-study__scope-label">Role</span>
              <span className="case-study__scope-value">{role}</span>
            </div>
            <div className="case-study__scope-item">
              <span className="case-study__scope-label">Project duration</span>
              <span
                className={
                  duration
                    ? 'case-study__scope-value'
                    : 'case-study__scope-value case-study__scope-value--placeholder'
                }
              >
                {duration || 'Add your hours'}
              </span>
            </div>
          </div>

          {hasPrototypeLink ? (
            <a
              ref={prototypeRef}
              onMouseEnter={prototypeEnter}
              onMouseLeave={prototypeLeave}
              href={prototypeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study__prototype-link btn-fill"
            >
              View Figma prototype ↗
            </a>
          ) : (
            <span className="case-study__prototype-link case-study__prototype-link--disabled">
              Figma prototype — coming soon
            </span>
          )}
        </Reveal>
      </section>

      {/* The Problem */}
      {problem && (
        <section className="case-study__section">
          <div
            className={
              problem.image
                ? 'case-study__section-row'
                : undefined
            }
          >
            <Reveal>
              <p className="case-study__section-label">01</p>
              <h2 className="case-study__section-heading">{problem.heading || 'The Problem'}</h2>
              {problem.paragraphs.map((p, i) => (
                <p key={i} className="case-study__section-text">
                  {p}
                </p>
              ))}
            </Reveal>
            {problem.image && (
              <Reveal delay={0.1} className="case-study__section-image">
                <img
                  src={problem.image.src}
                  alt={problem.image.alt}
                  loading="lazy"
                />
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* The Opportunity */}
      {opportunity && (
        <section className="case-study__section">
          <div
            className={
              opportunity.image
                ? 'case-study__section-row'
                : undefined
            }
          >
            <Reveal>
              <p className="case-study__section-label">02</p>
              <h2 className="case-study__section-heading">
                {opportunity.heading || 'The Opportunity'}
              </h2>
              {opportunity.paragraphs.map((p, i) => (
                <p key={i} className="case-study__section-text">
                  {p}
                </p>
              ))}
            </Reveal>
            {opportunity.image && (
              <Reveal delay={0.1} className="case-study__section-image">
                <img
                  src={opportunity.image.src}
                  alt={opportunity.image.alt}
                  loading="lazy"
                />
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Personas — these are finished persona card images; displayed as-is,
          never rebuilt as HTML/CSS. Text on the left, stacked images on the
          right, sized large enough to actually read the card content. */}
      {personas.length > 0 && (
        <section className="case-study__section">
          <div className="case-study__personas-layout">
            <Reveal className="case-study__personas-col-text">
              <p className="case-study__section-label">03</p>
              <h2 className="case-study__section-heading">Target Users / Personas</h2>
              {opportunity?.personasNote && (
                <p className="case-study__section-text">{opportunity.personasNote}</p>
              )}
            </Reveal>

            <RevealStagger
              className="case-study__personas-col-images"
              items={personas.map((p) => ({ ...p, key: p.alt }))}
              renderItem={(persona) => (
                <div className="persona-card-image">
                  <img src={persona.src} alt={persona.alt} loading="lazy" />
                </div>
              )}
            />
          </div>
        </section>
      )}

      {/* How Might We */}
      {howMightWe.length > 0 && (
        <section className="case-study__section">
          <Reveal>
            <p className="case-study__section-label">04</p>
            <h2 className="case-study__section-heading">How Might We</h2>
          </Reveal>
          <RevealStagger
            className="case-study__hmw-list"
            items={howMightWe.map((q, i) => ({ key: i, text: q }))}
            renderItem={(item, i) => (
              <div className="hmw-item">
                <span className="hmw-item__number">{String(i + 1).padStart(2, '0')}</span>
                <p className="hmw-item__text">{item.text}</p>
              </div>
            )}
          />
        </section>
      )}

      {/* Ideation */}
      {ideationImages.length > 0 && (
        <section className="case-study__section">
          <Reveal>
            <p className="case-study__section-label">05</p>
            <h2 className="case-study__section-heading">Ideation</h2>
          </Reveal>
          <div className="case-study__ideation-images">
            {ideationImages.map((img, i) => (
              <Reveal key={i}>
                <div className={`ideation-image${img.wide ? ' ideation-image--wide' : ''}`}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  {img.caption && (
                    <p className="ideation-image__caption">{img.caption}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {ideationThumbs.length > 0 && (
            <>
              <RevealStagger
                className="case-study__ideation-thumbs"
                items={ideationThumbs.map((img) => ({ ...img, key: img.alt }))}
                renderItem={(img) => (
                  <div className="ideation-thumb">
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </div>
                )}
              />
              <Reveal>
                <p className="case-study__ideation-thumbs-label">
                  Early low-fidelity pass across the core screens
                </p>
              </Reveal>
            </>
          )}
        </section>
      )}

      {/* Building the Brand */}
      {brand && (
        <section className="case-study__section">
          <Reveal>
            <p className="case-study__section-label">06</p>
            <h2 className="case-study__section-heading">Building the Brand</h2>
          </Reveal>
          <RevealStagger
            className="case-study__brand-assets"
            items={brand.assets.map((a) => ({ ...a, key: a.caption }))}
            renderItem={(asset) => (
              <div className="brand-asset">
                <img src={asset.src} alt={asset.caption} loading="lazy" />
              </div>
            )}
          />
          {brand.accentImage && (
            <Reveal>
              <div className="case-study__brand-accent">
                <img
                  src={brand.accentImage}
                  alt={`${title} brand applied to the app`}
                  loading="lazy"
                />
              </div>
            </Reveal>
          )}
        </section>
      )}

      {/* Key Screens */}
      {screenGroups.length > 0 && (
        <section className="case-study__section">
          <Reveal>
            <p className="case-study__section-label">07</p>
            <h2 className="case-study__section-heading">Key Screens</h2>
          </Reveal>
          {screenGroups.map((group, gi) => (
            <div key={gi} className="case-study__screen-group">
              <Reveal>
                <h3 className="screen-group__title">{group.title}</h3>
                <p className="screen-group__desc">{group.description}</p>
              </Reveal>
              <RevealStagger
                className={`screen-group__images${
                  group.columns ? ` screen-group__images--cols-${group.columns}` : ''
                }`}
                items={group.images.map((img) => ({ ...img, key: img.alt }))}
                renderItem={(img) => (
                  <div className="screen-image">
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </div>
                )}
              />
            </div>
          ))}
        </section>
      )}

      {/* Takeaways */}
      {takeaways && (
        <section className="case-study__section">
          <Reveal>
            <p className="case-study__section-label">08</p>
            <h2 className="case-study__section-heading">Takeaways</h2>
            {takeaways.map((p, i) => (
              <p key={i} className="case-study__section-text">
                {p}
              </p>
            ))}
          </Reveal>
        </section>
      )}

      {/* Next project */}
      <Reveal as="section" className="case-study__next">
        <p className="case-study__next-label">Next project</p>
        {nextProject?.href && nextProject.href !== '#' ? (
          <Link to={nextProject.href} className="case-study__next-link">
            <h3 className="case-study__next-title">{nextProject.title}</h3>
            View case study →
          </Link>
        ) : (
          <h3 className="case-study__next-title case-study__next-title--placeholder">
            {nextProject?.title || 'More case studies coming soon'}
          </h3>
        )}
      </Reveal>
    </div>
  )
}
