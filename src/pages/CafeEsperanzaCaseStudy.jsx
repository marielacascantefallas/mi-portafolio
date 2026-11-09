import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { caseProjects as projects } from '../data/projects'
import '../components/CaseStudy/ProjectCaseStudy.css'
import '../components/CaseStudy/TramaCaseStudy.css'
import '../components/CaseStudy/HiloCaseStudy.css'
import '../components/CaseStudy/WeebtechCaseStudy.css'

// Café Esperanza: client project. Research, naming, identity, brandbook,
// packaging for three roasts, illustration and applications.

const IMG = import.meta.glob('../assets/projects/cafe-esperanza/*.webp', { eager: true, import: 'default' })
const img = (name) => IMG[`../assets/projects/cafe-esperanza/${name}.webp`]
const SIZE = { slide: [2000, 1194], brandbook: [1650, 1275], post: [1400, 1750] }

const SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'research', label: 'Desk research' },
  { id: 'users', label: 'Who it’s for' },
  { id: 'problem', label: 'Problem and solution' },
  { id: 'synthesis', label: 'Research synthesis' },
  { id: 'process', label: 'Design process' },
  { id: 'identity', label: 'Visual identity' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'applications', label: 'Brand applications' },
  { id: 'next', label: 'Decisions and learnings' },
]

const STATS = [
  { value: '85%', label: 'of Costa Rican coffee is exported as green coffee, without a local brand', source: 'SEPSA, Informe de consumo de café 2025' },
  { value: '41.7%', label: 'of the coffee consumed in Costa Rica in 2024 was grown in the country', source: 'SEPSA, Informe de consumo de café 2025' },
  { value: '24,653', label: 'families grow coffee in Costa Rica, most of them small producers', source: 'ICAFE, 2025' },
  { value: '224,059', label: 'fanegas from Pérez Zeledón in 2024/25, the second canton in the country', source: 'ICAFE, 2024/25 harvest' },
  { value: '70%', label: 'of European shoppers have chosen a coffee by its packaging alone', source: 'Amcor, 1,655 shoppers, 2024' },
  { value: '62%', label: 'of US specialty coffee drinkers had a medium roast in the past day', source: 'NCA, Specialty Coffee Report, 2025' },
]

const DECISIONS = [
  {
    title: 'Sell a memory, not only an origin',
    why: 'Every Costa Rican bag says “from the mountains”. The research pointed to what people actually share around coffee: breakfast at home and the family table. So the brand speaks of nostalgia first and origin second.',
  },
  {
    title: 'A plant that grows from one bean',
    why: 'The isotype shows a coffee plant rising from a single bean, the way a family grows from a common root. Framed in a rhombus like the seals stamped on coffee sacks, it works alone on pins, stamps, cups and bags.',
  },
  {
    title: 'One branch per roast',
    why: 'Shoppers pick by the bag, and medium is the most popular roast. Each roast gets its own illustrated branch and color on the same label system, so the three bags read as one family and are easy to tell apart.',
  },
  {
    title: 'A palette taken from the farm',
    why: 'Seven colors come from the coffee itself: the green of the fields and the leaf, the wine red of the ripe cherry, the browns and caramel of the roast, and the cream and honey of an afternoon on the porch.',
  },
  {
    title: 'Warm film photography',
    why: 'Photos are golden, honest and grainy, showing the family, the harvest and shared moments. Cold, posed or too perfect images are left out, so every picture feels like a memory instead of an ad.',
  },
  {
    title: 'A brandbook the family can use',
    why: 'The client sells at local stores and fairs, on social media and online. A 34-page brandbook with clear rules for logo, color, type, photography, illustration and pattern lets every new piece look like Café Esperanza.',
  },
]

const LEARNINGS = [
  'Origin alone does not set a coffee apart in Costa Rica. A real family story and a feeling people recognize did more for the brand than altitude or region.',
  'A label system matters more than a single beautiful bag: once the grid for the three roasts was set, new products fit without redesigning.',
  'Mockups built from the real artwork look more honest than generated ones. When a render looked artificial, rebuilding it from the actual bag and keychain designs fixed it.',
  'Public data framed the problem well, but tasting sessions and sales by channel will show which roast and story sell best at fairs, online and abroad.',
]

function SectionHead({ id, title }) {
  return (
    <h2 className="case-study__section-heading" id={`${id}-label`}>
      {title}
    </h2>
  )
}

function Fig({ name, size = 'slide', alt, caption, eager = false }) {
  const [w, h] = SIZE[size]
  return (
    <figure className="trama-cs__figure wb-cs__slide">
      <img src={img(name)} alt={alt} width={w} height={h} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function Pair({ children }) {
  return <div className="wb-cs__pair">{children}</div>
}

export default function CafeEsperanzaCaseStudy() {
  const navigate = useNavigate()

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

  const index = projects.findIndex((p) => p.slug === 'cafe-esperanza')
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null
  const nextHasPage = next && next.slug !== 'cafe-esperanza' && next.link

  return (
    <div className="case-study trama-cs wb-cs ce-cs">
      <section className="case-study__hero">
        <Reveal>
          <h1 className="case-study__title">Café Esperanza: nostalgia in the taste of every cup</h1>
          <p className="case-study__tagline">
            Café Esperanza is a coffee grown and harvested by hand on a family farm in Valencia de Páramo, Pérez
            Zeledón. I led the research, naming, brand identity, brandbook, packaging for three roasts and the brand
            applications, so a family coffee can carry its own name from the farm to tables in Costa Rica and abroad.
          </p>
          <ul className="trama-cs__tags" aria-label="Disciplines">
            {['Brand Identity', 'Naming', 'Brandbook', 'Packaging', 'Illustration', 'Art Direction'].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="trama-cs__meta">
            <div>
              <dt>Role</dt>
              <dd>Lead designer: research, brand, packaging and art direction</dd>
            </div>
            <div>
              <dt>Client</dt>
              <dd>Café Esperanza, a family coffee farm in Pérez Zeledón</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>Research · naming · identity · brandbook · packaging · applications</dd>
            </div>
            <div>
              <dt>Channels</dt>
              <dd>Local stores and fairs, social media and WhatsApp, online and export</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>2026</dd>
            </div>
          </dl>
        </Reveal>
      </section>

      <Reveal>
        <Fig
          name="brandbook-01"
          size="brandbook"
          eager
          alt="Brandbook cover: a glass of espresso pouring, with the title Manual de identidad Café Esperanza."
          caption="Client: Café Esperanza · Service: brand identity and packaging · Year: 2026"
        />
      </Reveal>

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
              <SectionHead id="context" title="A family coffee without a name" />
              <p className="case-study__section-text">
                Café Esperanza was born in Valencia de Páramo, in Pérez Zeledón, among mountains, mist and coffee fields
                that have been part of the family’s life for generations. Every bean is picked by hand on the family
                farm, and coffee there is more than a crop: it is the reason to gather around the table, talk without
                hurry and share breakfast or the afternoon with the people they love.
              </p>
              <p className="case-study__section-text">
                The family wanted to sell its own coffee under its own name, in Costa Rica and abroad. It needed a name,
                a brand, packaging for three roasts and the pieces to tell that story everywhere it sells.
              </p>
              <p className="trama-cs__goal">
                <strong>Goal:</strong> a brand that makes people feel close to family and home, and a packaging system
                that stands out on a shelf, at a fair or in an online store.
              </p>
              <Fig name="brandbook-04" size="brandbook" alt="Brandbook page, brand story, next to a photo of red coffee cherries drying in a wooden crate." />
            </Reveal>
          </section>

          <section className="case-study__section" id="research" tabIndex={-1} aria-labelledby="research-label">
            <Reveal>
              <SectionHead id="research" title="Great coffee, sold without a story" />
              <p className="case-study__section-text">
                The desk research looked at where Costa Rican coffee goes, what people drink at home and how they
                choose a bag. Most of the harvest leaves the country as green coffee, less than half of the coffee
                drunk in Costa Rica is national, and shoppers often decide by the packaging.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="trama-cs__stats wb-cs__stats">
                {STATS.map((s) => (
                  <li key={s.label}>
                    <span className="trama-cs__stat-value">{s.value}</span>
                    <span className="trama-cs__stat-label">{s.label}</span>
                    <span className="wb-cs__source">{s.source}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <Fig
                name="slide-03"
                alt="Research slide titled We studied how people choose a bag of coffee, with three dot charts: 70% have chosen a coffee by its packaging alone, 48% of US adults drank specialty coffee in the past day, and 62% of specialty drinkers had a medium roast."
                caption="Three findings behind the label and the three roasts."
              />
            </Reveal>
          </section>

          <section className="case-study__section" id="users" tabIndex={-1} aria-labelledby="users-label">
            <Reveal>
              <SectionHead id="users" title="Two kinds of table" />
              <p className="case-study__section-text">
                Café Esperanza sells to families in Costa Rica and to buyers and visitors abroad. Both drink coffee as a
                morning ritual at home, and both need a reason to choose this bag over the one they already know.
              </p>
              <div className="hilo-cs__roles">
                <div>
                  <h3>Families in Costa Rica</h3>
                  <p className="hilo-cs__role-q">“Where does your morning coffee come from?”</p>
                  <p>
                    Only 41.7% of the coffee consumed in Costa Rica in 2024 was national (SEPSA, 2025). A local coffee
                    needs a name people can recognize and ask for.
                  </p>
                </div>
                <div>
                  <h3>Buyers abroad</h3>
                  <p className="hilo-cs__role-q">“When do you drink your coffee?”</p>
                  <p>
                    85% of US past-day coffee drinkers had it at breakfast and 82% drank it at home (NCA, Fall 2025).
                    The brand speaks to that daily moment.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <Fig name="slide-02" alt="Slide What coffee drinkers need: two wine-red cards. Families in Costa Rica, 41.7% of the coffee consumed in 2024 was national. Buyers abroad, 85% of US coffee drinkers had it at breakfast." />
            </Reveal>
          </section>

          <section className="case-study__section" id="problem" tabIndex={-1} aria-labelledby="problem-label">
            <Reveal>
              <SectionHead id="problem" title="From green beans to a family brand" />
              <p className="case-study__section-text">
                Costa Rica grows some of the world’s best coffee, but most of it leaves the country as green beans, and
                small family farms sell their harvest without a name, a story or a bag of their own. The answer was a
                family brand that carries the farm, the harvest and the memory of breakfast at home into every bag.
              </p>
            </Reveal>
            <Reveal>
              <Fig name="slide-01" alt="Problem and solution slide. Problem: 85% of Costa Rican coffee is exported, 24,653 families grow coffee, and 41.7% of the coffee consumed in 2024 was national. Solution pills: naming, identity, brandbook, three roasts, illustration and photography." />
            </Reveal>
          </section>

          <section className="case-study__section" id="synthesis" tabIndex={-1} aria-labelledby="synthesis-label">
            <Reveal>
              <SectionHead id="synthesis" title="From findings to a brand" />
              <p className="case-study__section-text">
                I sorted the research on one board, in four steps, to design a coffee that tastes like home.
              </p>
              <div className="wb-cs__board">
                <div>
                  <h3>Define the problem</h3>
                  <ul>
                    <li>Great coffee leaves without a name</li>
                    <li>Families buy imported coffee</li>
                    <li>Bags look the same on the shelf</li>
                  </ul>
                </div>
                <div>
                  <h3>Collect ideas</h3>
                  <ul>
                    <li>A name that means family and hope</li>
                    <li>A plant growing from one bean</li>
                    <li>One bag per roast</li>
                  </ul>
                </div>
                <div>
                  <h3>Analyze and refine</h3>
                  <ul>
                    <li>Seven colors from the farm</li>
                    <li>Retro type for nostalgia</li>
                    <li>Warm film photography</li>
                  </ul>
                </div>
                <div>
                  <h3>Find solutions</h3>
                  <ul>
                    <li>Isotype for pins and seals</li>
                    <li>Pattern for bags and cups</li>
                    <li>Brandbook for every piece</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <Fig name="slide-04" alt="Brand research board on dark green, titled Designing a coffee that tastes like home, with notes in four columns: define the problem, collect ideas, analyze and refine, find solutions." />
              <Fig name="slide-07" alt="Brand flow: from the family farm to every breakfast table. Nodes for origin, harvest, three roasts, packaging and the table connect to the Café Esperanza logo." />
            </Reveal>
          </section>

          <section className="case-study__section" id="process" tabIndex={-1} aria-labelledby="process-label">
            <Reveal>
              <SectionHead id="process" title="Design process" />
              <ol className="trama-cs__pipeline">
                <li>
                  <strong>Discovery and naming</strong>
                  <span>Family story and the farm, coffee market research, name and concept.</span>
                </li>
                <li>
                  <strong>Brand strategy</strong>
                  <span>Voice (human, close, emotional), main message and the story of the brand.</span>
                </li>
                <li>
                  <strong>Visual identity</strong>
                  <span>Primary and secondary logo, isotype, seven-color palette, Filmotype Maxwell and Helvetica.</span>
                </li>
                <li>
                  <strong>Packaging</strong>
                  <span>Light, medium and dark roasts, illustrated coffee branches, bean pattern.</span>
                </li>
                <li>
                  <strong>Applications</strong>
                  <span>Pins, keychains, cups and cup holders, apron and cap, warm film photography.</span>
                </li>
              </ol>
            </Reveal>
            <Reveal>
              <Fig name="slide-05" alt="Design process timeline on olive green with five stages: discovery and naming, brand strategy, visual identity, packaging and applications." />
            </Reveal>
          </section>

          <section className="case-study__section" id="identity" tabIndex={-1} aria-labelledby="identity-label">
            <Reveal>
              <SectionHead id="identity" title="Human, close and emotional" />
              <p className="case-study__section-text">
                Café Esperanza speaks like someone from the family: warm, simple and honest, without complicated words
                or exaggerated promises. It tells stories, brings back memories and makes every person feel part of the
                table. The main message: nostalgia in the taste of every cup. A good coffee is more than a drink; it is
                the smell of grandmother’s kitchen, the breakfast conversation and the hug of coming home.
              </p>
              <Pair>
                <Fig name="brandbook-05" size="brandbook" alt="Brandbook page, brand voice: human, close, emotional." />
                <Fig name="brandbook-06" size="brandbook" alt="Brandbook page, main message: nostalgia in the taste of every cup." />
              </Pair>
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Logo and isotype</h3>
              <p className="case-study__section-text">
                The primary logo stacks the isotype over the name, and the secondary logo uses the name alone for
                packaging, labels and textiles where the isotype is already present. The isotype is a coffee plant
                growing from a single bean, framed in a rhombus: six leaves rise in mirrored pairs from one stem, the
                same way a family grows from a common root.
              </p>
              <Fig name="slide-09" alt="Isotype construction: the rhombus mark in light gray over dashed guides for the center, the bean top and base, with dashed circles on the bean and the six leaf tips." caption="Isotype construction: one stem, six mirrored leaves and the bean on the center axis." />
              <Pair>
                <Fig name="brandbook-08" size="brandbook" alt="Brandbook page, primary logo in dark green on white and in cream on black." />
                <Fig name="brandbook-09" size="brandbook" alt="Brandbook page, secondary logo: the Café Esperanza wordmark in dark green and in cream." />
                <Fig name="brandbook-10" size="brandbook" alt="Brandbook page, isotype on white and on black." />
                <Fig name="brandbook-11" size="brandbook" alt="Brandbook page, correct use of the logo on light, dark and gray backgrounds." />
                <Fig name="brandbook-12" size="brandbook" alt="Brandbook page, incorrect use of the logo: low contrast, off-palette colors, rotated and recomposed versions." />
                <Fig name="brandbook-13" size="brandbook" alt="Brandbook page, clear space and minimum size of the logo." />
              </Pair>
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Color, type and graphic elements</h3>
              <p className="case-study__section-text">
                The palette comes from the farm and the coffee process: the deep green of the coffee fields, the wine
                red of the ripe cherry, the browns of the roast and the cream and gold of an afternoon on the porch.
                Filmotype Maxwell, with its handmade, retro character, sets the main titles; Helvetica carries
                secondary titles and text. Illustrated coffee branches and a pattern of mirrored beans, inspired by
                traditional textiles, complete the system.
              </p>
              <ul className="wb-cs__swatches" aria-label="Brand colors">
                {[
                  ['#142208', 'Verde Cafetal'],
                  ['#979C5A', 'Verde Hoja'],
                  ['#611D26', 'Vino Cereza'],
                  ['#7C4725', 'Café Tueste'],
                  ['#CC996A', 'Caramelo'],
                  ['#F2E9DA', 'Crema'],
                  ['#FFC75A', 'Miel de Atardecer'],
                ].map(([hex, name]) => (
                  <li key={hex}>
                    <span className="wb-cs__chip" style={{ background: hex }} aria-hidden="true" />
                    <strong>{name}</strong>
                    <span>{hex}</span>
                  </li>
                ))}
              </ul>
              <Fig name="slide-06" alt="Color palette slide with seven swatches and the isotype: Verde Cafetal, Verde Hoja, Vino Cereza, Café Tueste, Caramelo, Crema and Miel de Atardecer." />
              <Pair>
                <Fig name="brandbook-15" size="brandbook" alt="Brandbook page, typography: Filmotype Maxwell for primary titles and Helvetica for secondary titles, text and details." />
                <Fig name="brandbook-16" size="brandbook" alt="Brandbook page, typography in use on a keychain photo." />
                <Fig name="brandbook-17" size="brandbook" alt="Brandbook page, photography style: warm, honest images of the harvest with film grain." />
                <Fig name="brandbook-18" size="brandbook" alt="Brandbook page, illustration: coffee branches, beans and the brand seal as stickers." />
              </Pair>
              <Fig name="brandbook-19" size="brandbook" alt="Brandbook page, pattern made of mirrored coffee beans in wine red." />
            </Reveal>
          </section>

          <section className="case-study__section" id="packaging" tabIndex={-1} aria-labelledby="packaging-label">
            <Reveal>
              <SectionHead id="packaging" title="One family, three roasts" />
              <p className="case-study__section-text">
                Each roast has its own illustrated coffee branch and color on the same label: light roast with roasted
                beans in caramel, medium roast with a ripe cherry branch, dark roast with a branch in deep green and
                wine. Origin, roast, whole bean and 500 g sit in the same place on every bag, so the line reads as one
                family on a shelf or in an online store.
              </p>
            </Reveal>
            <Reveal>
              <Fig name="slide-08" alt="Slide: on wine red, nostalgia in the taste of every cup, with the isotype. On cream, the three bags for light, medium and dark roast, each with its color bar." />
              <Fig name="app-13" size="post" alt="The three Café Esperanza bags standing on a coffee hillside at sunset, with mountains behind." />
              <Pair>
                <Fig name="app-07" size="post" alt="Light roast bag over a halftone photo of coffee plants." />
                <Fig name="app-06" size="post" alt="Medium roast bag over a halftone photo of the harvest truck." />
                <Fig name="app-05" size="post" alt="Dark roast bag over a halftone photo of coffee plants." />
                <Fig name="app-14" size="post" alt="Light roast bag lying on coffee beans inside an old wooden crate." />
                <Fig name="app-15" size="post" alt="Medium roast bag lying on coffee beans inside an old wooden crate." />
                <Fig name="app-16" size="post" alt="Dark roast bag lying on coffee beans inside an old wooden crate." />
              </Pair>
            </Reveal>
          </section>

          <section className="case-study__section" id="applications" tabIndex={-1} aria-labelledby="applications-label">
            <Reveal>
              <SectionHead id="applications" title="The brand around the table" />
              <p className="case-study__section-text">
                The identity lives where coffee is shared: on enamel mugs at a family breakfast, on a pin, on the keys
                to the farm, on the apron and cap of the people who serve it, on cups and cup holders, and on posters
                with the brand’s illustrations. All photos share the same warm, sunset grade with film grain.
              </p>
            </Reveal>
            <Reveal>
              <Fig name="app-12" size="post" alt="A family at breakfast on a farmhouse porch, with enamel Café Esperanza mugs and keychains in the foreground." />
              <Pair>
                <Fig name="app-01" size="post" alt="Poster: a hand holding a glass of espresso with the cream isotype and the Café Esperanza name." />
                <Fig name="app-02" size="post" alt="Poster: a roasted coffee bean surrounded by illustrated coffee branches in the brand colors." />
                <Fig name="app-03" size="post" alt="Brand stickers over a photo of freshly harvested red cherries." />
                <Fig name="app-04" size="post" alt="Cardboard cup holder with the bean pattern in wine red and two cups." />
                <Fig name="app-09" size="post" alt="A barista wearing a tan apron and a green cap with the Café Esperanza logo." />
                <Fig name="app-10" size="post" alt="Enamel pin with the isotype on the collar of a cream shirt." />
                <Fig name="app-08" size="post" alt="Keychain with a silver Café Esperanza tag and an olive enamel isotype against a blue sky." />
                <Fig name="app-11" size="post" alt="The Café Esperanza wordmark printed on a paper coffee filter with ground coffee." />
              </Pair>
            </Reveal>
          </section>

          <section className="case-study__section" id="next" tabIndex={-1} aria-labelledby="next-label">
            <Reveal>
              <SectionHead id="next" title="Key decisions" />
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
            <Reveal>
              <h3 className="wb-cs__h3">What I learned</h3>
              <ul className="trama-cs__checklist">
                {LEARNINGS.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <h3 className="wb-cs__h3">Sources</h3>
              <ul className="wb-cs__sources">
                <li>SEPSA, Informe de consumo de café en Costa Rica, 2025</li>
                <li>ICAFE, national and canton production, 2024/25 harvest, and producing families, 2025</li>
                <li>National Coffee Association, National Coffee Data Trends, Fall 2025, and Specialty Coffee Report, 2025</li>
                <li>Amcor, European coffee packaging study, 1,655 shoppers, 2024</li>
                <li>Café Esperanza brandbook, 2026</li>
              </ul>
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
