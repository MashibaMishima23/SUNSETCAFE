import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import ScrollToTop from '../components/ScrollToTop'
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  TEMPLATE_FRANCHISE,
  TO_EMAIL,
} from '../lib/emailjs'

const packages = [
  {
    name: 'Starter Cart',
    price: '₱25,000',
    tag: 'Best for Beginners',
    color: '#a01c1c',
    features: [
      'Full cart setup & equipment',
      '5 core latte recipes',
      'Initial ingredient supply (1 month)',
      'Branding kit (signage, cups, uniforms)',
      'Operations manual',
      '1-week training',
      'Email support',
    ],
    notIncluded: ['Fruity Soda Series', 'Dedicated account manager', 'Marketing materials'],
  },
  {
    name: 'Growth Package',
    price: '₱45,000',
    tag: '⭐ Most Popular',
    color: '#3d1313',
    highlight: true,
    features: [
      'Full cart setup & equipment',
      'Complete menu (14+ drinks)',
      'Initial ingredient supply (2 months)',
      'Premium branding kit',
      'Operations & recipe manual',
      '2-week hands-on training',
      'Marketing materials (social media kit)',
      'Dedicated account manager',
      'Monthly check-in calls',
    ],
    notIncluded: ['Second cart unit'],
  },
  {
    name: 'Multi-Cart',
    price: '₱80,000',
    tag: 'Maximum Reach',
    color: '#1a1a2e',
    features: [
      '2 full cart setups & equipment',
      'Complete menu (14+ drinks)',
      'Initial ingredient supply (3 months)',
      'Premium branding kit × 2',
      'Operations & recipe manual',
      '3-week intensive training',
      'Full marketing materials',
      'Dedicated account manager',
      'Weekly check-in calls',
      'Priority ingredient restocking',
      'Territory exclusivity (barangay level)',
    ],
    notIncluded: [],
  },
]

const steps = [
  { num: '01', title: 'Submit Application', desc: 'Fill out the franchise inquiry form below with your details and preferred package.' },
  { num: '02', title: 'Initial Interview', desc: 'Our team will reach out within 3–5 business days to schedule a call or meeting.' },
  { num: '03', title: 'Sign Agreement', desc: 'Review and sign the franchise agreement. We keep it simple and transparent.' },
  { num: '04', title: 'Training & Setup', desc: 'Attend your training program and receive your full cart setup and branding kit.' },
  { num: '05', title: 'Launch Day', desc: 'Open your Sunset Cafe cart and start serving your community!' },
]

const faqs = [
  { q: 'Do I need prior experience in food & beverage?', a: 'No experience needed. Our training program covers everything from drink preparation to daily operations.' },
  { q: 'Where can I set up my cart?', a: 'You can set up in public spaces, near schools, markets, sports complexes, or any high-foot-traffic area in your barangay.' },
  { q: 'How long does it take to recoup my investment?', a: 'Most franchisees report recovering their initial investment within 3–6 months depending on location and volume.' },
  { q: 'Is the franchise fee a one-time payment?', a: 'Yes. The package price is a one-time investment. There are no monthly royalty fees for the Starter and Growth packages.' },
  { q: 'Can I expand to more carts later?', a: 'Absolutely. You can upgrade your package or purchase additional cart units at a discounted rate.' },
]

export default function Franchise() {
  const [openFaq, setOpenFaq] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '', package: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.location) {
      setStatus('error')
      setTimeout(() => setStatus(null), 3500)
      return
    }
    setLoading(true)
    emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATE_FRANCHISE,
      {
        from_name: form.name,
        name: form.name,
        email: form.email,
        message: `FRANCHISE APPLICATION\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nLocation: ${form.location}\nPackage: ${form.package || 'Not specified'}\n\nMessage:\n${form.message || 'No message'}`,
      },
      EMAILJS_PUBLIC_KEY
    ).then(() => {
      setLoading(false)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', location: '', package: '', message: '' })
      setTimeout(() => setStatus(null), 5000)
    }).catch((err) => {
      setLoading(false)
      setStatus('send_error')
      console.error('EmailJS error:', err)
      setTimeout(() => setStatus(null), 4000)
    })
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="franchise-hero">
        <div className="franchise-hero-content">
          <span className="franchise-hero-badge">NOW ACCEPTING APPLICATIONS</span>
          <h1 className="franchise-hero-title">Own a Sunset Cafe Cart</h1>
          <p className="franchise-hero-sub">
            Bring the taste of Sunset Cafe to your neighborhood. Low investment, full support, and a brand your community already loves.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
            <a href="#packages" className="btn-primary">View Packages</a>
            <a href="#apply" className="btn-outline-light">Apply Now</a>
          </div>
        </div>
      </div>

      {/* Why Franchise */}
      <ScrollReveal>
        <section className="franchise-why">
          <p className="section-label" style={{ color: 'var(--red-dark)' }}>Why choose us</p>
          <h2 className="section-title" style={{ fontSize: 40, marginBottom: 40 }}>Why Franchise Sunset Cafe?</h2>
          <div className="franchise-why-grid">
            {[
              { icon: '💰', title: 'Low Investment', desc: 'Start from just ₱25,000 — one of the most affordable cafe franchise opportunities in Mindanao.' },
              { icon: '📦', title: 'Everything Included', desc: 'Cart, equipment, branding, ingredients, and training — all in one package. No hidden costs.' },
              { icon: '🏆', title: 'Proven Brand', desc: 'Sunset Cafe is already loved in Gingoog City. You\'re joining a brand with real community trust.' },
              { icon: '🎓', title: 'Full Training', desc: 'Hands-on training so you\'re confident from day one — no prior experience required.' },
              { icon: '📈', title: 'Fast ROI', desc: 'Most franchisees recover their investment within 3–6 months with consistent daily sales.' },
              { icon: '🤝', title: 'Ongoing Support', desc: 'We don\'t disappear after launch. Dedicated support, restocking, and regular check-ins.' },
            ].map(w => (
              <div className="franchise-why-card" key={w.title}>
                <span className="franchise-why-icon">{w.icon}</span>
                <h3 className="franchise-why-title">{w.title}</h3>
                <p className="franchise-why-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Packages */}
      <ScrollReveal>
        <section className="franchise-packages" id="packages">
          <p className="section-label" style={{ color: 'var(--red-dark)' }}>Choose your path</p>
          <h2 className="section-title" style={{ fontSize: 40, marginBottom: 48 }}>Franchise Packages</h2>
          <div className="packages-grid">
            {packages.map(pkg => (
              <div className={`package-card${pkg.highlight ? ' package-highlight' : ''}`} key={pkg.name}>
                {pkg.highlight && <div className="package-popular-ribbon">Most Popular</div>}
                <div className="package-header" style={{ background: pkg.color }}>
                  <span className="package-tag">{pkg.tag}</span>
                  <h3 className="package-name">{pkg.name}</h3>
                  <span className="package-price">{pkg.price}</span>
                  <span className="package-price-note">one-time investment</span>
                </div>
                <div className="package-body">
                  <ul className="package-features">
                    {pkg.features.map(f => (
                      <li key={f} className="package-feature-yes">
                        <span className="feature-check">✓</span> {f}
                      </li>
                    ))}
                    {pkg.notIncluded.map(f => (
                      <li key={f} className="package-feature-no">
                        <span className="feature-x">✗</span> {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#apply" className={pkg.highlight ? 'btn-primary' : 'btn-outline'}
                    style={{ width: '100%', marginTop: 24, textAlign: 'center' }}
                    onClick={() => setForm(f => ({ ...f, package: pkg.name }))}>
                    Apply for {pkg.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* How It Works */}
      <ScrollReveal>
        <section className="franchise-steps">
          <p className="section-label" style={{ color: 'var(--red-dark)' }}>Simple process</p>
          <h2 className="section-title" style={{ fontSize: 40, marginBottom: 48 }}>How It Works</h2>
          <div className="steps-list">
            {steps.map((step, i) => (
              <div className="step-item" key={step.num}>
                <div className="step-num">{step.num}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
                {i < steps.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className="franchise-faq">
          <p className="section-label" style={{ color: 'var(--red-dark)' }}>Got questions?</p>
          <h2 className="section-title" style={{ fontSize: 40, marginBottom: 40 }}>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-chevron">{openFaq === i ? '▲' : '▼'}</span>
                </button>
                {openFaq === i && <p className="faq-answer">{faq.a}</p>}
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Application Form */}
      <ScrollReveal>
        <section className="franchise-apply" id="apply">
          <div className="franchise-apply-inner">
            <p className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Ready to start?</p>
            <h2 style={{ fontFamily: "'Hepta Slab', serif", fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
              Apply for a Franchise
            </h2>
            <p style={{ fontFamily: "'Hepta Slab', serif", fontSize: 16, color: 'rgba(255,255,255,0.65)', marginBottom: 36 }}>
              Fill out the form and our team will reach out within 3–5 business days.
            </p>

            {status === 'success' && (
              <div className="form-toast form-toast-success" style={{ marginBottom: 24 }}>
                ✅ Application submitted! We&apos;ll contact you within 3–5 business days.
              </div>
            )}
            {status === 'send_error' && (
              <div className="form-toast form-toast-error" style={{ marginBottom: 24 }}>
                ❌ Failed to send. Please try again or contact us directly.
              </div>
            )}
            {status === 'error' && (
              <div className="form-toast form-toast-error" style={{ marginBottom: 24 }}>
                ⚠️ Please fill in all required fields.
              </div>
            )}

            <form className="franchise-form" onSubmit={handleSubmit} noValidate>
              <div className="franchise-form-row">
                <label>Full Name *
                  <input type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} />
                </label>
                <label>Email *
                  <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                </label>
              </div>
              <div className="franchise-form-row">
                <label>Phone Number *
                  <input type="tel" name="phone" placeholder="09XX XXX XXXX" value={form.phone} onChange={handleChange} />
                </label>
                <label>Preferred Location *
                  <input type="text" name="location" placeholder="Barangay / City" value={form.location} onChange={handleChange} />
                </label>
              </div>
              <label>Package Interest
                <select name="package" value={form.package} onChange={handleChange}>
                  <option value="">Select a package...</option>
                  {packages.map(p => <option key={p.name} value={p.name}>{p.name} — {p.price}</option>)}
                </select>
              </label>
              <label>Message / Questions
                <textarea name="message" rows="4" placeholder="Tell us about yourself or ask anything..." value={form.message} onChange={handleChange} />
              </label>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px' }} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </section>
      </ScrollReveal>

      <Footer socialImg="/ellipse42596-lake-200h.png" />
      <ScrollToTop />
    </>
  )
}
