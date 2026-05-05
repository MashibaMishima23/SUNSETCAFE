import { useState } from 'react'

const STORAGE_KEY = 'sunsetcafe_reviews'

const initialReviews = [
  { id: 1, name: 'Maria S.', drink: 'Spanish Latte', rating: 5, text: 'The Spanish Latte is absolutely divine. I come here every evening after work — it\'s become my ritual!', date: 'May 1, 2026' },
  { id: 2, name: 'Carlo R.', drink: 'Strawberry Soda', rating: 5, text: 'Best iced coffee in Gingoog City, hands down. The Strawberry Soda is a game changer on hot days.', date: 'Apr 28, 2026' },
  { id: 3, name: 'Jessa M.', drink: 'Matcha Latte', rating: 5, text: 'Love the vibe and the drinks. Matcha Latte is perfectly balanced — not too sweet, not too bitter.', date: 'Apr 20, 2026' },
  { id: 4, name: 'Renz T.', drink: 'Caramel Macchiato', rating: 5, text: 'Affordable, delicious, and always consistent. Sunset Cafe never disappoints!', date: 'Apr 15, 2026' },
]

const drinks = [
  'White Chocolate Latte','Spanish Latte','Americano','Matcha Milk','Hazelnut Latte',
  'Caramel Macchiato','French Vanilla Latte','Strawberry Milk','Strawberry Matcha','Matcha Latte',
  'Strawberry Soda','Grape Soda','Green Apple Soda','Blueberry Soda',
]

function getReviews() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : initialReviews
  } catch { return initialReviews }
}

function saveReviews(reviews) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews)) } catch {}
}

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1,2,3,4,5].map(s => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontSize: 28, color: s <= (hovered || value) ? '#f5a623' : '#ddd',
            transition: 'color 0.15s',
          }}
        >★</button>
      ))}
    </div>
  )
}

function StarDisplay({ value }) {
  return (
    <span style={{ color: '#f5a623', letterSpacing: 2, fontSize: 16 }}>
      {'★'.repeat(value)}{'☆'.repeat(5 - value)}
    </span>
  )
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState(getReviews)
  const [form, setForm] = useState({ name: '', drink: '', rating: 0, text: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [showForm, setShowForm] = useState(false)

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  const ratingCounts = [5,4,3,2,1].map(r => ({
    star: r,
    count: reviews.filter(rv => rv.rating === r).length,
    pct: reviews.length ? Math.round(reviews.filter(rv => rv.rating === r).length / reviews.length * 100) : 0,
  }))

  const filtered = reviews
    .filter(r => filter === 'All' || r.drink === filter)
    .sort((a, b) => sortBy === 'newest' ? b.id - a.id : a.id - b.id)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.text.trim() || form.rating === 0) {
      setError('Please fill in your name, rating, and review.')
      return
    }
    const newReview = {
      id: Date.now(),
      name: form.name.trim(),
      drink: form.drink || 'General',
      rating: form.rating,
      text: form.text.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    const updated = [newReview, ...reviews]
    setReviews(updated)
    saveReviews(updated)
    setForm({ name: '', drink: '', rating: 0, text: '' })
    setError('')
    setSubmitted(true)
    setShowForm(false)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <div>
          <p className="section-label" style={{ color: 'var(--red-dark)', textAlign: 'left' }}>Customer Reviews</p>
          <h2 className="reviews-title">Ratings &amp; Reviews</h2>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(f => !f)}>
          {showForm ? 'Cancel' : '✏️ Write a Review'}
        </button>
      </div>

      {/* Summary */}
      <div className="reviews-summary">
        <div className="reviews-avg">
          <span className="reviews-avg-num">{avgRating}</span>
          <StarDisplay value={Math.round(parseFloat(avgRating))} />
          <span className="reviews-count">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="reviews-bars">
          {ratingCounts.map(r => (
            <div className="rating-bar-row" key={r.star}>
              <span className="rating-bar-label">{r.star}★</span>
              <div className="rating-bar-track">
                <div className="rating-bar-fill" style={{ width: `${r.pct}%` }} />
              </div>
              <span className="rating-bar-count">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Form */}
      {showForm && (
        <form className="review-form" onSubmit={handleSubmit}>
          <h3 className="review-form-title">Share Your Experience</h3>
          {error && <div className="form-toast form-toast-error">{error}</div>}
          {submitted && <div className="form-toast form-toast-success">✅ Review posted! Thank you.</div>}
          <div className="review-form-row">
            <label>Your Name *
              <input type="text" placeholder="e.g. Maria S." value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </label>
            <label>Drink (optional)
              <select value={form.drink} onChange={e => setForm(f => ({ ...f, drink: e.target.value }))}>
                <option value="">Select a drink...</option>
                {drinks.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </label>
          </div>
          <label>Your Rating *
            <StarPicker value={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} />
          </label>
          <label>Your Review *
            <textarea rows="4" placeholder="Tell us about your experience..."
              value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} />
          </label>
          <button type="submit" className="btn-primary">Post Review</button>
        </form>
      )}

      {/* Filters */}
      <div className="reviews-filters">
        <div className="reviews-filter-tabs">
          {['All', ...drinks.slice(0, 6)].map(d => (
            <button
              key={d}
              className={`review-filter-btn${filter === d ? ' active' : ''}`}
              onClick={() => setFilter(d)}
            >{d}</button>
          ))}
        </div>
        <select className="reviews-sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Review Cards */}
      <div className="reviews-grid">
        {filtered.length === 0 ? (
          <p style={{ color: '#aaa', fontFamily: "'Hepta Slab', serif", gridColumn: '1/-1', textAlign: 'center', padding: 32 }}>
            No reviews yet for this drink. Be the first!
          </p>
        ) : filtered.map(r => (
          <div className="review-card" key={r.id}>
            <div className="review-card-top">
              <div className="review-avatar">{r.name.charAt(0).toUpperCase()}</div>
              <div>
                <span className="review-name">{r.name}</span>
                {r.drink && r.drink !== 'General' && (
                  <span className="review-drink-tag">{r.drink}</span>
                )}
              </div>
              <span className="review-date">{r.date}</span>
            </div>
            <StarDisplay value={r.rating} />
            <p className="review-text">&ldquo;{r.text}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>
  )
}
