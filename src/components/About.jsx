import { memo, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profilePhoto from '../assets/profile-cutout-real.webp'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

// Bloque A — almost-full-screen, everything centered (reference: about.jpg).
// Kept as its own StackSection (see Home.jsx) rather than combined with
// AboutSkills/Bloque B: combined, their total height outgrew a viewport and
// the tail (the pill cloud) only ever became visible at the exact moment
// Projects' cover-in had already reached it — same class of bug as the
// original "scroll reveal overlap" fix, just re-triggered by Bloque A+B's
// combined height. Splitting them back into two viewport-sized sections
// keeps each one inside the safe-window math StackSection.css documents.
function About() {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)

  // No separate entrance fade here — StackSection.jsx already fades/slides
  // in the whole section on scroll-into-view; a second nested autoAlpha
  // tween on this same element was pure redundant compositing cost (two
  // overlapping opacity animations on nested nodes) for no visual gain.

  useEffect(() => {
    const photo = photoRef.current
    const section = sectionRef.current
    if (!photo || !section) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // The photo starts low enough that the headline reads fully, then rises
    // into its final overlapping spot as you scroll through the section's
    // own dwell — instead of covering the text from the very first frame.
    // Scrubbed to scroll position (not time), tied to the pin's dwell,
    // which StackSection.css establishes is always exactly one spacer
    // (100vh) long regardless of this section's own content height.
    if (prefersReducedMotion) {
      gsap.set(photo, { yPercent: 0 })
      return
    }

    gsap.set(photo, { yPercent: 45 })

    const tween = gsap.to(photo, {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        // Finishes well before AboutSkills' cover-in starts, so the fully-
        // overlapped headline gets a calm, static moment first. Measured
        // empirically: with this hero shorter than the viewport, the next
        // section's sticky top re-enters the viewport at roughly 35-40% of
        // the dwell (StackSection.css's spacer/margin math sets the dwell
        // itself at exactly 100vh, independent of content height) — well
        // before the dwell's own end, because a short hero does nothing
        // during most of its own pin. 25% leaves a clear buffer before that.
        end: () => '+=' + window.innerHeight * 0.2,
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section
      id="about"
      className="section about"
      ref={sectionRef}
    >
      <div className="about__hero">
        <h2 className="about__headline">
          <span className="about__headline-light">Designing digital experiences</span>
          <span className="about__headline-bold">centered on people</span>
        </h2>

        {/* Cutout photo centered and overlapping the headline's second line —
            the transparent WebP lets the letters show through around the
            silhouette, exactly like the reference's photo-over-text effect. */}
        <div className="about__photo-wrap" ref={photoRef}>
          <img
            src={profilePhoto}
            alt="Mariela Cascante"
            className="about__photo"
            width="1080"
            height="1080"
            loading="lazy"
          />
        </div>

        <div className="about__corner about__corner--left">
          <span className="about__corner-rule" aria-hidden="true" />
          <p className="about__corner-label">UX/UI Product Designer</p>
        </div>

        <p className="about__bio about__corner about__corner--right">
          I'm a UX Designer with nearly five years of experience creating
          user-centered digital products that combine business objectives,
          usability principles, and visual excellence. I've led end-to-end
          UX initiatives, collaborating with cross-functional teams to
          transform complex requirements into intuitive digital
          experiences — from discovery and research to implementation and
          continuous improvement.
        </p>
      </div>
    </section>
  )
}

// Takes no props, so an unrelated Home re-render never needs to re-render
// this too.
export default memo(About)
