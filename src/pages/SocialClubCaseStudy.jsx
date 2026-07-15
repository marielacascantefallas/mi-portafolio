import ProjectCaseStudy from '../components/CaseStudy/ProjectCaseStudy'

// Style guide
import logoImg from '../Socialclub/Logo.png'
import colorImg from '../Socialclub/Color.png'
import typographyImg from '../Socialclub/Typography.png'
import gridImg from '../Socialclub/Grid system.png'
import shadowImg from '../Socialclub/Shadow.png'

// Hero banner (brand pattern background with phone mockups)
import heroImg from '../Socialclub/Hero.png'

// Decorative accent for The Problem section
import problemAccentImg from '../Socialclub/Mockup 3.png'

// Ideation — sitemap & user flow
import sitemapImg from '../Socialclub/SITEMAP.png'
import userFlowImg from '../Socialclub/USER FLOW POST.png'

// Ideation — early low-fidelity wireframe pass
import lowfiSplash from '../Socialclub/Lowfi wireframeSplash Screen.png'
import lowfiWelcome from '../Socialclub/Lowfi wireframePantalla de loggeo-2.png'
import lowfiSignUp from '../Socialclub/Lowfi wireframePantalla de loggeo.png'
import lowfiLogin from '../Socialclub/Lowfi wireframePantalla de loggeo-1.png'
import lowfiHome from '../Socialclub/Lowfi wireframePantalla de inicio.png'
import lowfiChat from '../Socialclub/Lowfi wireframePantalla de chat.png'
import lowfiProfile from '../Socialclub/Lowfi wireframePantalla de perfil.png'
import lowfiProfileEdit from '../Socialclub/Lowfi wireframePantalla de Drag and Drop para cambiar foto de perfil..png'
import lowfiNotifications from '../Socialclub/Lowfi wireframePantalla de notificaciones.png'
import lowfiSettings from '../Socialclub/Lowfi wireframePantalla de ajustes.png'
import lowfiLoading from '../Socialclub/Lowfi wireframePantalla de carga.png'
import lowfiLoadingError from '../Socialclub/Lowfi wireframePantalla de error de carga.png'
import lowfi404 from '../Socialclub/Lowfi wireframeError 404.png'

// Personas — finished card images, used as-is
import personaConstance from '../Socialclub/user persona 1.png'
import personaMateo from '../Socialclub/user persona 2.png'
import personaValeria from '../Socialclub/user persona 3.png'

// Key screens — High fi wireframe set (the finished, final screens)
import splashImg from '../Socialclub/High fi wireframeSplash Screen.png'
import welcomeImg from '../Socialclub/High fi wireframePantalla de loggeo-2.png'
import signUpImg from '../Socialclub/High fi wireframePantalla de loggeo.png'
import loginImg from '../Socialclub/High fi wireframePantalla de loggeo-1.png'
import homeFeedImg from '../Socialclub/High fi wireframePantalla de inicio.png'
import menuImg from '../Socialclub/High fi wireframePantalla de menú.png'
import chatImg from '../Socialclub/High fi wireframePantalla de chat.png'
import profileImg from '../Socialclub/High fi wireframePantalla de perfil.png'
import profileEditImg from '../Socialclub/High fi wireframePantalla de Drag and Drop para cambiar foto de perfil..png'
import notificationsImg from '../Socialclub/High fi wireframePantalla de notificaciones.png'
import settingsImg from '../Socialclub/High fi wireframePantalla de ajustes.png'
import loadingImg from '../Socialclub/High fi wireframePantalla de carga.png'
import loadingErrorImg from '../Socialclub/High fi wireframePantalla de error de carga.png'
import error404Img from '../Socialclub/High fi wireframeError 407.png'

const personas = [
  { src: personaValeria, alt: 'Valeria — Senior Freelance UI/UX Designer persona card' },
  { src: personaMateo, alt: 'Mateo — Photography Student & Content Creator persona card' },
  { src: personaConstance, alt: 'Constance — Freelance Graphic Designer & Visual Curator persona card' },
]

const howMightWe = [
  'How might we design a feed that prioritizes image quality and curation over algorithmic engagement?',
  'How might we give creators collaboration tools (moodboards, feedback) without the friction of professional software?',
  'How might we build a curated, spam-free community without losing the spontaneity of a social platform?',
]

const lowfiThumbs = [
  { src: lowfiSplash, alt: 'Lowfi wireframe — splash screen' },
  { src: lowfiWelcome, alt: 'Lowfi wireframe — welcome screen' },
  { src: lowfiSignUp, alt: 'Lowfi wireframe — sign up screen' },
  { src: lowfiLogin, alt: 'Lowfi wireframe — login screen' },
  { src: lowfiHome, alt: 'Lowfi wireframe — home feed' },
  { src: lowfiChat, alt: 'Lowfi wireframe — chat screen' },
  { src: lowfiProfile, alt: 'Lowfi wireframe — profile screen' },
  { src: lowfiProfileEdit, alt: 'Lowfi wireframe — profile edit screen' },
  { src: lowfiNotifications, alt: 'Lowfi wireframe — notifications screen' },
  { src: lowfiSettings, alt: 'Lowfi wireframe — settings screen' },
  { src: lowfiLoading, alt: 'Lowfi wireframe — loading screen' },
  { src: lowfiLoadingError, alt: 'Lowfi wireframe — loading error screen' },
  { src: lowfi404, alt: 'Lowfi wireframe — 404 error screen' },
]

export default function SocialClubCaseStudy({ theme, onToggle }) {
  return (
    <ProjectCaseStudy
      theme={theme}
      onToggle={onToggle}
      title="Social Club"
      tagline="A social platform built for creatives who want to share and curate their work away from algorithmic noise."
      scope="End-to-End App Concept"
      role="UX/UI Design, Branding, Concept Development"
      duration="6 weeks"
      prototypeLink="https://www.figma.com/proto/bOmtNBx7whF3gHgDTJ0orU/PORTFOLIO-MARIELA-CASCANTE?node-id=1-1977&t=xUSdbdbbe9KOFyin-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2000"
      heroImage={heroImg}
      problem={{
        heading: 'The Problem',
        paragraphs: [
          "Today's social platforms are designed to maximize screen time, not to serve communities with specific interests. For creative professionals — designers, photographers, visual curators — this means feeds dominated by forced short-form video, aggressive image compression, ad spam, and algorithms that reward virality over craft.",
          'The result: creative professionals end up using collaborative design tools for their actual work, and generic social platforms for everything else — with no space in between built specifically for sharing, curating, and talking shop about visual work with a trusted community.',
        ],
        image: { src: problemAccentImg, alt: 'Social Club splash and home feed mockup' },
      }}
      opportunity={{
        heading: 'The Opportunity',
        paragraphs: [
          'Social Club started as a conceptual exploration of a simple question: what would a social platform look like if it were designed by and for creatives, where visual curation was the core experience rather than a side effect of the algorithm?',
          'Instead of starting from formal interviews, this project was built around representative user personas across three distinct creative roles, each with a different relationship to current social platforms — but sharing one frustration in common: the lack of an ad-free, visual-first space free of algorithmic noise.',
        ],
        personasNote:
          'While their roles differ, all three personas share the same core need: a curated, visual-first space free of commercial distractions to share and develop creative work alongside trusted peers.',
      }}
      personas={personas}
      howMightWe={howMightWe}
      ideationImages={[
        {
          src: sitemapImg,
          alt: 'Social Club sitemap',
          caption: 'Sitemap — Home, Create, and Profile branches mapped out before any UI work started.',
        },
        {
          src: userFlowImg,
          alt: 'Social Club user flow for creating a post',
          caption: 'User flow — creating and sharing a post, including the moodboard save path.',
          wide: true,
        },
      ]}
      ideationThumbs={lowfiThumbs}
      brand={{
        paragraphs: [
          'The Social Club logo is presented in four versions to ensure versatility and visual consistency across different contexts, maintaining balance in both light and dark environments.',
          'The color palette ranges from a deep purple to a soft white, providing visual balance, depth, and contrast.',
          'Inter typography ensures readability and clear visual hierarchy across all screen sizes.',
        ],
        assets: [
          { src: logoImg, caption: 'Logo — 4 versions' },
          { src: colorImg, caption: 'Color palette' },
          { src: typographyImg, caption: 'Typography — Inter' },
          { src: gridImg, caption: 'Grid system — 4 columns' },
          { src: shadowImg, caption: 'Shadows' },
        ],
      }}
      screenGroups={[
        {
          title: 'Onboarding',
          description:
            'The first brand impression and a simple entry into the product: splash, welcome, sign up, and login.',
          columns: 2,
          images: [
            { src: splashImg, alt: 'Social Club splash screen' },
            { src: welcomeImg, alt: 'Social Club welcome screen' },
            { src: signUpImg, alt: 'Social Club sign up screen' },
            { src: loginImg, alt: 'Social Club login screen' },
          ],
        },
        {
          title: 'Home & Navigation',
          description:
            'The heart of the visual curation experience: the home feed, the create/menu flow, and messaging.',
          images: [
            { src: homeFeedImg, alt: 'Social Club home feed' },
            { src: menuImg, alt: 'Social Club menu / create post screen' },
            { src: chatImg, alt: 'Social Club chat screen' },
          ],
        },
        {
          title: 'Profile',
          description:
            'How creators present their curated work — profile with the curated image grid, and the profile edit flow.',
          images: [
            { src: profileImg, alt: 'Social Club profile and curated grid' },
            { src: profileEditImg, alt: 'Social Club profile photo edit screen' },
          ],
        },
        {
          title: 'System States',
          description:
            'The details that keep the experience polished in every state: notifications, settings, loading, loading error, and 404.',
          images: [
            { src: notificationsImg, alt: 'Social Club notifications screen' },
            { src: settingsImg, alt: 'Social Club settings screen' },
            { src: loadingImg, alt: 'Social Club loading screen' },
            { src: loadingErrorImg, alt: 'Social Club loading error screen' },
            { src: error404Img, alt: 'Social Club 404 error screen' },
          ],
        },
      ]}
      takeaways={[
        'Social Club was an exercise in designing with empathy for a problem I experience firsthand as a designer: fatigue with current social platforms and the desire for a space dedicated to visual curation. Working without formal research pushed me to lean heavily on well-defined personas to keep design decisions anchored to real needs of creative users, rather than generic assumptions.',
        'If I continued this project, the next step would be validating these decisions with real usability testing, and further exploring the collaboration tools (shared moodboards, real-time feedback) that all three personas flagged as a core need.',
      ]}
      nextProject={{
        title: 'More case studies coming soon',
        href: '#',
      }}
    />
  )
}
