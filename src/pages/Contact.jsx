import { asset } from '../lib/assetUrl'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import ScrollToTop from '../components/ScrollToTop'
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  TEMPLATE_CONTACT,
  TO_EMAIL,
} from '../lib/emailjs'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'success' | 'error'
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      setTimeout(() => setStatus(null), 3500)
      return
    }
    setLoading(true)
    emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATE_CONTACT,
      {
        from_name: form.name,
        name: form.name,
        email: form.email,
        message: `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
      },
      EMAILJS_PUBLIC_KEY
    ).then(() => {
      setLoading(false)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(null), 4000)
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

      {/* Page Hero */}
      <div className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, var(--red-dark) 0%, var(--red-deeper) 100%)' }}>
        <h1 className="page-hero-title">Get in Touch</h1>
        <p className="page-hero-sub">We&apos;d love to hear from you. Reach out anytime!</p>
      </div>

      <ScrollReveal>
        <section className="contact-page">
          <div className="contact-info">
            <h1>Contact Us</h1>
            <p className="contact-tagline">Questions, feedback, or just want to say hi — we&apos;re all ears.</p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <strong>Location</strong>
                  <p>Brgy 23. National Highway<br />Villahermosa Slot, Mini Sports Complex<br />Gingoog City, Misamis Oriental</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕐</span>
                <div>
                  <strong>Hours</strong>
                  <p>Monday &ndash; Sunday<br />5:00 PM &ndash; 12:00 AM</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📸</span>
                <div>
                  <strong>Follow Us</strong>
                  <p>Find us on social media<br />@SunsetCafe</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🗺️</span>
                <div>
                  <strong>Coordinates</strong>
                  <p>8.822619, 125.101576<br />
                    <a href="https://maps.google.com/?q=8.822619,125.101576" target="_blank" rel="noreferrer" className="contact-map-link">
                      Open in Google Maps &rarr;
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap">
            <h2>Send a Message</h2>

            {/* Toast */}
            {status === 'success' && (
              <div className="form-toast form-toast-success">
                ✅ Message sent! We&apos;ll get back to you soon.
              </div>
            )}
            {status === 'send_error' && (
              <div className="form-toast form-toast-error">
                ❌ Failed to send. Please try again or email us directly.
              </div>
            )}
            {status === 'error' && (
              <div className="form-toast form-toast-error">
                ⚠️ Please fill in all fields before sending.
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <label>Name
                <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
              </label>
              <label>Email
                <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
              </label>
              <label>Message
                <textarea name="message" rows="5" placeholder="Write your message here..." value={form.message} onChange={handleChange} />
              </label>
              <button type="submit" disabled={loading} className={loading ? 'btn-loading' : ''}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>
      </ScrollReveal>

      {/* Map Embed */}
      <ScrollReveal>
        <div className="map-embed-wrap">
          <iframe
            title="Sunset Cafe Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.0!2d125.101576!3d8.822619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDknMjEuNCJOIDEyNcKwMDYnMDUuNyJF!5e0!3m2!1sen!2sph!4v1"
            width="100%"
            height="380"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </ScrollReveal>

      <Footer socialImg={asset("/ellipse42596-lake-200h.png")} />
      <ScrollToTop />
    </>
  )
}
