import { asset } from '../lib/assetUrl'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import ScrollToTop from '../components/ScrollToTop'
import ReviewSection from '../components/ReviewSection'

const latteCards = [
  { img: asset('/WHITE CHOCOLATE.png'), name: 'WHITE CHOCOLATE LATTE', title: 'WHITE CHOCOLATE LATTE', ingredients: ['Espresso shot','White chocolate syrup','Fresh milk','Ice cubes','Whipped cream'], steps: 'Pull a shot of espresso. Stir in white chocolate syrup. Pour over ice, top with cold milk and a swirl of whipped cream.' },
  { img: asset('/SPANISH LATTE.png'), name: 'SPANISH LATTE', title: 'SPANISH LATTE', ingredients: ['Espresso shot','Condensed milk','Fresh milk','Ice cubes'], steps: 'Add condensed milk to a glass. Pour espresso over it. Fill with ice and top with fresh cold milk. Stir gently before drinking.' },
  { img: asset('/AMERICANO.png'), name: 'AMERICANO', title: 'AMERICANO', ingredients: ['Double espresso shot','Cold water','Ice cubes','Simple syrup (optional)'], steps: 'Pull a double espresso. Add cold water to dilute. Pour over ice for a clean, bold iced coffee experience.' },
  { img: asset('/MATCHA MILK.png'), name: 'MATCHA MILK', title: 'MATCHA MILK', ingredients: ['Ceremonial matcha powder','Fresh milk','Simple syrup','Ice cubes'], steps: 'Whisk matcha powder with a splash of hot water until smooth. Pour over ice, add syrup, then fill with cold milk.' },
  { img: asset('/HAZELNUT.png'), name: 'HAZELNUT', title: 'HAZELNUT LATTE', ingredients: ['Espresso shot','Hazelnut syrup','Fresh milk','Ice cubes'], steps: 'Combine espresso with hazelnut syrup. Pour over ice and finish with cold milk for a nutty, smooth iced latte.' },
  { img: asset('/CARAMEL MACCHIATTO.png'), name: 'CARAMEL MACCHIATO', title: 'CARAMEL MACCHIATO', ingredients: ['Espresso shot','Vanilla syrup','Fresh milk','Caramel drizzle','Ice cubes'], steps: 'Add vanilla syrup and milk to a glass of ice. Pour espresso on top and finish with a generous caramel drizzle.' },
  { img: asset('/FRENCH VANILLA LATTE.png'), name: 'FRENCH VANILLA LATTE', title: 'FRENCH VANILLA LATTE', ingredients: ['Espresso shot','French vanilla syrup','Fresh milk','Ice cubes','Vanilla powder (garnish)'], steps: 'Mix espresso with French vanilla syrup. Pour over ice, add cold milk, and dust with vanilla powder on top.' },
  { img: asset('/strawberry milk.png'), name: 'STRAWBERRY MILK', title: 'STRAWBERRY MILK', ingredients: ['Fresh strawberries','Strawberry syrup','Fresh milk','Ice cubes','Sugar (to taste)'], steps: 'Blend strawberries with syrup and sugar. Pour over ice and top with cold fresh milk for a fruity, creamy treat.' },
  { img: asset('/MATCHA STRAWBERRY.png'), name: 'STRAWBERRY MATCHA', title: 'STRAWBERRY MATCHA', ingredients: ['Ceremonial matcha powder','Strawberry syrup','Fresh milk','Ice cubes'], steps: 'Layer strawberry syrup at the bottom, add ice and milk, then slowly pour whisked matcha on top for a stunning two-tone drink.' },
  { img: asset('/MATCHA LATTE.png'), name: 'MATCHA LATTE', title: 'MATCHA LATTE', ingredients: ['Ceremonial matcha powder','Oat or fresh milk','Simple syrup','Ice cubes'], steps: 'Whisk matcha with hot water until frothy. Sweeten with syrup, pour over ice, and finish with your choice of cold milk.' },
]

const fruitySlides = [
  { id: 0, bg: '#a01c1c', name: 'STRAWBERRY SODA', desc: 'A refreshing blend of sweet strawberries and sparkling soda, finished with a crisp, bubbly twist.', textBg: asset('/union1402-lr1o.svg'), cup: asset('/STRAWBERRY.png'), tab: '🍓 Strawberry', tabColor: '#a01c1c' },
  { id: 1, bg: '#5b2c6f', name: 'GRAPE SODA', desc: 'A refreshing blend of sweet grapes and sparkling soda, finished with a crisp, bubbly twist.', textBg: asset('/union1257-mhb5.svg'), cup: asset('/GRAPES.png'), tab: '🍇 Grape', tabColor: '#5b2c6f' },
  { id: 2, bg: '#1a6b3a', name: 'GREEN APPLE SODA', desc: 'A refreshing blend of crisp green apples and sparkling soda, finished with a tart, bubbly twist.', textBg: asset('/union1308-1jz6.svg'), cup: asset('/GREEN APPLE.png'), tab: '🍏 Green Apple', tabColor: '#1a6b3a' },
  { id: 3, bg: '#154360', name: 'BLUEBERRY SODA', desc: 'A refreshing blend of ripe blueberries and sparkling soda, finished with a sweet, bubbly twist.', textBg: asset('/union1161-29ho.svg'), cup: asset('/Blueberry.png'), tab: '🫐 Blueberry', tabColor: '#154360' },
]

const testimonials = [
  { name: 'Maria S.', text: 'The Spanish Latte is absolutely divine. I come here every evening after work — it\'s become my ritual!', stars: 5 },
  { name: 'Carlo R.', text: 'Best iced coffee in Gingoog City, hands down. The Strawberry Soda is a game changer on hot days.', stars: 5 },
  { name: 'Jessa M.', text: 'Love the vibe and the drinks. Matcha Latte is perfectly balanced — not too sweet, not too bitter.', stars: 5 },
  { name: 'Renz T.', text: 'Affordable, delicious, and always consistent. Sunset Cafe never disappoints!', stars: 5 },
]

const stats = [
  { value: '10+', label: 'Drinks on Menu' },
  { value: '4', label: 'Fruity Flavors' },
  { value: '5pm–12am', label: 'Open Daily' },
  { value: '100%', label: 'Local Love' },
]

function useCounter(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start || isNaN(target)) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatItem({ value, label }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const numericMatch = value.match(/\d+/)
  const numeric = numericMatch ? parseInt(numericMatch[0]) : null
  const prefix = value.replace(/[\d]+.*/, '')
  const suffix = numeric !== null ? value.replace(/.*\d/, '') : ''
  const count = useCounter(numeric, 1400, visible)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-value">
        {numeric !== null ? `${prefix}${count}${suffix}` : value}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % fruitySlides.length), 5000)
    return () => clearInterval(timer)
  }, [paused])

  const goTo = (n) => {
    setCurrent((n + fruitySlides.length) % fruitySlides.length)
    setPaused(true)
    setTimeout(() => setPaused(false), 8000)
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <p className="hero-subtitle">A locally owned Cart Cafe in Gingoog City</p>
          <h1 className="hero-title">A locally owned Cart Cafe in Gingoog City</h1>
          <p className="hero-desc"><strong>Chill out</strong> with our smooth, ice-cold coffee, ready to refresh and energize.</p>
          <p className="hero-story">
            From local gathering spot to <strong>neighborhood hub</strong> &mdash;{' '}
            <strong>Sunset Cafe</strong> brings people together through <strong>coffee</strong>,
            careers, and community. Don&apos;t miss our Cart <strong>Cafe Iced Coffee</strong>,
            chilled and crafted to <strong>perfection.</strong>
          </p>
          <p className="hero-hours">Open 5pm &ndash; 12am Monday-Sunday</p>
          <div className="hero-cta">
            <Link to="/find-a-store" className="btn-primary">Find a Store</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
          <div className="hero-social">
            <img src={asset("/ellipse1i259-wrl-200h.png")} alt="Social" />
            <img src={asset("/ellipse2i259-krs-200h.png")} alt="Social" />
            <img src={asset("/ellipse3i259-7wfe-200h.png")} alt="Social" />
          </div>
        </div>
        <div className="hero-image">
          <img src={asset("/untitleddesign252597-naxf-700h.png")} alt="Iced Coffee" />
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-bar">
        {stats.map(s => <StatItem key={s.label} value={s.value} label={s.label} />)}
      </div>

      {/* Band */}
      <img src={asset("/rectangle222597-pel-1500w.png")} alt="" className="band" />

      {/* Latte Series */}
      <ScrollReveal>
        <section className="latte-section">
          <p className="section-label">Your daily dose of iced coffee, made better at Sunset Cafe.</p>
          <h2 className="section-title">Cool Brews Warm Vibes</h2>
          <p className="section-sub">LATTE SERIES</p>
          <div className="latte-grid">
            {latteCards.map((card) => (
              <div className="latte-card" key={card.name}>
                <img src={card.img} alt={card.name} />
                <span className="card-name">{card.name}</span>
                <div className="card-overlay">
                  <h4>{card.title}</h4>
                  <p className="ingredients-label">Ingredients</p>
                  <ul>{card.ingredients.map(i => <li key={i}>{i}</li>)}</ul>
                  <p className="recipe-label">How it&apos;s made</p>
                  <p className="recipe-steps">{card.steps}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Fruity Series */}
      <section className="fruity-section">
        <ScrollReveal>
          <div className="fruity-header">
            <span className="fruity-new-badge">NEW!</span>
            <h2 className="fruity-headline">Sip Into Summer</h2>
            <p className="fruity-subline">Check Out Our New Fruity Soda Series!</p>
          </div>
        </ScrollReveal>

        <div className="fruity-slider">
          {fruitySlides.map((slide, i) => (
            <div
              key={slide.id}
              className={`fruity-slide${i === current ? ' active' : ''}`}
              style={{ '--slide-bg': slide.bg }}
            >
              <div className="fruity-info">
                <h3 className="fruity-drink-name">{slide.name}</h3>
                <p className="fruity-drink-desc">{slide.desc}</p>
              </div>
              <div className="fruity-stage">
                <img src={slide.textBg} alt="" className="fruity-text-bg" />
                <img src={slide.cup} alt={slide.name} className="fruity-cup" />
              </div>
            </div>
          ))}
          <button className="fruity-arrow fruity-arrow-prev" onClick={() => goTo(current - 1)}>&#8249;</button>
          <button className="fruity-arrow fruity-arrow-next" onClick={() => goTo(current + 1)}>&#8250;</button>

          {/* Dot indicators */}
          <div className="fruity-dots">
            {fruitySlides.map((_, i) => (
              <button
                key={i}
                className={`fruity-dot${i === current ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="fruity-tabs">
          {fruitySlides.map((slide, i) => (
            <button
              key={slide.id}
              className={`fruity-tab${i === current ? ' active' : ''}`}
              style={{ '--tab-color': slide.tabColor, borderBottomColor: i === current ? slide.tabColor : 'transparent' }}
              onClick={() => goTo(i)}
            >
              {slide.tab}
            </button>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <ScrollReveal>
        <section className="testimonials-section">
          <p className="section-label" style={{ color: 'var(--red-dark)' }}>What our customers say</p>
          <h2 className="section-title" style={{ fontSize: 40, marginBottom: 40 }}>Loved by the Community</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
                <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <span className="testimonial-name">— {t.name}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Reviews */}
      <ScrollReveal>
        <ReviewSection />
      </ScrollReveal>

      {/* CTA Banner */}
      <ScrollReveal>
        <section className="cta-banner">
          <div className="cta-banner-content">
            <h2>Ready for your next sip?</h2>
            <p>Visit us every evening from 5pm to midnight. We&apos;re waiting for you.</p>
            <div className="cta-banner-btns">
              <Link to="/find-a-store" className="btn-primary">Find Us Now</Link>
              <Link to="/about" className="btn-outline-light">Our Story</Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <Footer socialImg={asset("/ellipse42596-lake-200h.png")} />
      <ScrollToTop />
    </>
  )
}
