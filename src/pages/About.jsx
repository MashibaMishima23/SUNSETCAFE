import { asset } from '../lib/assetUrl'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import ScrollToTop from '../components/ScrollToTop'

const values = [
  { icon: '☕', title: 'Quality First', desc: 'Every drink is crafted with care using the finest ingredients available.' },
  { icon: '🤝', title: 'Community', desc: 'We exist to serve and grow alongside the people of Gingoog City.' },
  { icon: '💰', title: 'Affordable', desc: 'Great taste shouldn\'t break the bank. We keep it accessible for everyone.' },
  { icon: '📍', title: 'Accessible', desc: 'Cart-based model means we can bring Sunset Cafe closer to you.' },
]

const timeline = [
  { year: '2022', title: 'The Idea', desc: 'Dwight Ramos and Kervy Y. Rubio dreamed of a cafe that felt like home — affordable, warm, and community-driven.' },
  { year: '2023', title: 'First Cart', desc: 'The first Sunset Cafe cart launched at Brgy 23, Mini Sports Complex. Lines formed on opening night.' },
  { year: '2024', title: 'Fruity Series', desc: 'The Fruity Soda Series launched to massive demand — Strawberry, Grape, Green Apple, and Blueberry.' },
  { year: '2025', title: 'Growing Strong', desc: 'Expanding our reach across Mindanao, one neighborhood at a time.' },
]

export default function About() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, var(--red-dark) 0%, var(--red-deeper) 100%)' }}>
        <h1 className="page-hero-title">Our Story</h1>
        <p className="page-hero-sub">From a dream to your neighborhood — the Sunset Cafe journey.</p>
      </div>

      {/* Main About */}
      <ScrollReveal>
        <section className="about-section">
          <div className="about-text">
            <h1 className="about-title">Welcome to Sunset CAF&Eacute;</h1>
            <div className="about-body">
              <p>At Sunset CAF&Eacute;, we&apos;re more than just a place to grab coffee&mdash;we&apos;re a community hub where flavor, quality, and accessibility meet. Founded and led by <strong>Dwight Ramos</strong> and <strong>Kervy Y. Rubio</strong>, our caf&eacute; was built with a simple mission:</p>
              <span className="label">Mission:</span>
              <span className="quote">&ldquo;To provide accessible, affordable, and high-quality caf&eacute; services anytime and anywhere, serving delicious products that satisfy every customer.&rdquo;</span>
              <p>Every cup, every drink, and every experience at <strong>Sunset CAF&Eacute;</strong> is designed to deliver <strong>satisfaction</strong>, whether you&apos;re on the go or taking a moment to relax.</p>
              <span className="label">Vision:</span>
              <span className="quote">&ldquo;To become a trusted and growing caf&eacute; brand with multiple cart locations, expanding our reach while consistently delivering excellent service and great-tasting offerings.&rdquo;</span>
              <span className="closing">From our signature Cart Caf&eacute; Iced Coffee to our refreshing Fruity Soda Series, we aim to bring joy and refreshment to every neighborhood we touch.</span>
            </div>
          </div>
          <div className="about-image">
            <img src={asset("/image6515506748690617795193787258417531898554177n11602-0vvd-600h.png")} alt="About Sunset Cafe" />
          </div>
        </section>
      </ScrollReveal>

      {/* Values */}
      <ScrollReveal>
        <section className="values-section">
          <p className="section-label" style={{ color: 'var(--red-dark)' }}>What drives us</p>
          <h2 className="section-title" style={{ fontSize: 40, marginBottom: 40 }}>Our Core Values</h2>
          <div className="values-grid">
            {values.map(v => (
              <div className="value-card" key={v.title}>
                <span className="value-icon">{v.icon}</span>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Timeline */}
      <ScrollReveal>
        <section className="timeline-section">
          <p className="section-label" style={{ color: 'var(--red-dark)' }}>How we got here</p>
          <h2 className="section-title" style={{ fontSize: 40, marginBottom: 48 }}>Our Journey</h2>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div className={`timeline-item${i % 2 === 0 ? ' left' : ' right'}`} key={item.year}>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
            <div className="timeline-line" />
          </div>
        </section>
      </ScrollReveal>

      {/* Team */}
      <ScrollReveal>
        <section className="team-section">
          <p className="section-label" style={{ color: 'var(--red-dark)' }}>The people behind the cup</p>
          <h2 className="section-title" style={{ fontSize: 40, marginBottom: 40 }}>Meet the Founders</h2>
          <div className="team-grid">
            <div className="team-card">
              <img src={asset("/Dwight Ramos.jpg")} alt="Dwight Ramos" className="team-photo" />
              <h3 className="team-name">Dwight Ramos</h3>
              <span className="team-role">Co-Founder</span>
              <p className="team-bio">Passionate about building community spaces and making quality coffee accessible to everyone in Gingoog City.</p>
            </div>
            <div className="team-card">
              <img src={asset("/Kervy.jpg")} alt="Kervy Y. Rubio" className="team-photo" />
              <h3 className="team-name">Kervy Y. Rubio</h3>
              <span className="team-role">Co-Founder</span>
              <p className="team-bio">Driven by a love for great flavors and the belief that a good drink can turn any ordinary evening into something special.</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <Footer socialImg={asset("/ellipse41601-9b3rj-200h.png")} />
      <ScrollToTop />
    </>
  )
}
