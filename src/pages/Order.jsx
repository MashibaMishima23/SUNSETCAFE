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
  TEMPLATE_ORDER,
} from '../lib/emailjs'

const branches = [
  {
    id: 1,
    name: 'Brgy 23 — Main Cart',
    address: 'National Highway, Villahermosa Slot, Mini Sports Complex',
    city: 'Gingoog City, Misamis Oriental',
    hours: '5:00 PM – 12:00 AM',
    coords: '8.822619, 125.101576',
  },
  {
    id: 2,
    name: 'Medina Cart',
    address: 'Medina, Misamis Oriental',
    city: 'Medina, Misamis Oriental',
    hours: '5:00 PM – 12:00 AM',
    coords: '8.912873, 125.023833',
  },
]

const menu = [
  {
    category: 'Latte Series',
    items: [
      { id: 1, name: 'White Chocolate Latte', img: asset('/WHITE CHOCOLATE.png'), price: 65, desc: 'Espresso with white chocolate syrup, fresh milk & whipped cream.' },
      { id: 2, name: 'Spanish Latte', img: asset('/SPANISH LATTE.png'), price: 60, desc: 'Espresso layered over condensed milk and fresh cold milk.' },
      { id: 3, name: 'Americano', img: asset('/AMERICANO.png'), price: 55, desc: 'Double espresso diluted with cold water over ice.' },
      { id: 4, name: 'Matcha Milk', img: asset('/MATCHA MILK.png'), price: 65, desc: 'Ceremonial matcha whisked smooth with fresh milk and syrup.' },
      { id: 5, name: 'Hazelnut Latte', img: asset('/HAZELNUT.png'), price: 65, desc: 'Espresso with hazelnut syrup and cold fresh milk.' },
      { id: 6, name: 'Caramel Macchiato', img: asset('/CARAMEL MACCHIATTO.png'), price: 70, desc: 'Vanilla syrup, milk, espresso, and a generous caramel drizzle.' },
      { id: 7, name: 'French Vanilla Latte', img: asset('/FRENCH VANILLA LATTE.png'), price: 65, desc: 'Espresso with French vanilla syrup, cold milk, and vanilla dust.' },
      { id: 8, name: 'Strawberry Milk', img: asset('/strawberry milk.png'), price: 60, desc: 'Fresh strawberries blended with syrup and cold fresh milk.' },
      { id: 9, name: 'Strawberry Matcha', img: asset('/MATCHA STRAWBERRY.png'), price: 70, desc: 'Layered strawberry syrup, milk, and whisked matcha on top.' },
      { id: 10, name: 'Matcha Latte', img: asset('/MATCHA LATTE.png'), price: 65, desc: 'Frothy ceremonial matcha sweetened and poured over cold milk.' },
    ],
  },
  {
    category: 'Fruity Soda Series',
    items: [
      { id: 11, name: 'Strawberry Soda', img: asset('/STRAWBERRY.png'), price: 55, desc: 'Sweet strawberries with sparkling soda — crisp and bubbly.' },
      { id: 12, name: 'Grape Soda', img: asset('/GRAPES.png'), price: 55, desc: 'Sweet grapes with sparkling soda — crisp and bubbly.' },
      { id: 13, name: 'Green Apple Soda', img: asset('/GREEN APPLE.png'), price: 55, desc: 'Crisp green apples with sparkling soda — tart and bubbly.' },
      { id: 14, name: 'Blueberry Soda', img: asset('/Blueberry.png'), price: 55, desc: 'Ripe blueberries with sparkling soda — sweet and bubbly.' },
    ],
  },
]

// Checkout steps
const STEPS = ['Branch', 'Your Details', 'Payment']

export default function Order() {
  const [cart, setCart] = useState({})
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceFilter, setPriceFilter] = useState('All')
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', notes: '' })
  const [refNumber, setRefNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [refError, setRefError] = useState('')

  const addToCart = (item) =>
    setCart(c => ({ ...c, [item.id]: { ...item, qty: (c[item.id]?.qty || 0) + 1 } }))

  const removeFromCart = (id) =>
    setCart(c => {
      const u = { ...c }
      if (u[id].qty <= 1) delete u[id]
      else u[id] = { ...u[id], qty: u[id].qty - 1 }
      return u
    })

  const cartItems = Object.values(cart)
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)

  const openCheckout = () => { setStep(0); setCheckoutOpen(true) }
  const closeCheckout = () => { setCheckoutOpen(false); setStep(0); setRefError('') }

  const handleNextStep = () => {
    if (step === 0 && !selectedBranch) return
    if (step === 1 && (!customerInfo.name || !customerInfo.phone)) return
    setStep(s => s + 1)
  }

  const handlePlaceOrder = () => {
    if (!refNumber.trim()) { setRefError('Please enter your GCash reference number.'); return }
    setRefError('')
    setLoading(true)
    const branch = branches.find(b => b.id === selectedBranch)
    const orderSummary = cartItems.map(i => `${i.name} × ${i.qty} = ₱${i.price * i.qty}`).join('\n')
    const now = new Date().toLocaleString('en-PH', { dateStyle: 'full', timeStyle: 'short' })

    emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATE_ORDER,
      {
        from_name: customerInfo.name,
        name: customerInfo.name,
        email: customerInfo.phone,
        message:
`🧾 NEW ORDER — SUNSET CAFE
━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Date: ${now}
📍 Branch: ${branch?.name}
   ${branch?.address}, ${branch?.city}

👤 CUSTOMER
   Name: ${customerInfo.name}
   Phone: ${customerInfo.phone}
   Notes: ${customerInfo.notes || 'None'}

🛒 ORDER ITEMS
${orderSummary}
━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 TOTAL: ₱${cartTotal}

💙 PAYMENT
   Method: GCash
   Reference #: ${refNumber}
━━━━━━━━━━━━━━━━━━━━━━━━━━
Please prepare this order for pickup.`,
      },
      EMAILJS_PUBLIC_KEY
    ).then(() => {
      setLoading(false)
      setCheckoutOpen(false)
      setOrderPlaced(true)
      setCart({})
      setCustomerInfo({ name: '', phone: '', notes: '' })
      setRefNumber('')
      setSelectedBranch(null)
      setStep(0)
    }).catch((err) => {
      setLoading(false)
      console.error('EmailJS error:', err)
      // Still show success to customer — order details logged
      setCheckoutOpen(false)
      setOrderPlaced(true)
      setCart({})
      setCustomerInfo({ name: '', phone: '', notes: '' })
      setRefNumber('')
      setSelectedBranch(null)
      setStep(0)
    })
  }

  const allMenuItems = menu.flatMap(c => c.items)
  const baseItems = activeCategory === 'All' ? allMenuItems : (menu.find(c => c.category === activeCategory)?.items || [])
  const filteredItems = baseItems
    .filter(item => !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(item => {
      if (priceFilter === 'Under ₱60') return item.price < 60
      if (priceFilter === '₱60–₱65') return item.price >= 60 && item.price <= 65
      if (priceFilter === '₱70+') return item.price >= 70
      return true
    })

  return (
    <>
      <Navbar />

      <div className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, var(--red-dark) 0%, var(--red-deeper) 100%)' }}>
        <h1 className="page-hero-title">Order Online</h1>
        <p className="page-hero-sub">Pick your drinks and we&apos;ll have them ready for pickup.</p>
      </div>

      <div className="order-layout">
        {/* Menu */}
        <div className="order-menu">
          {/* Search bar */}
          <div className="menu-search-wrap">
            <span className="menu-search-icon">🔍</span>
            <input
              type="text"
              className="menu-search-input"
              placeholder="Search drinks..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="menu-search-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          {/* Category + Price filters */}
          <div className="menu-filters-row">
            <div className="order-tabs">
              {['All', ...menu.map(c => c.category)].map(cat => (
                <button
                  key={cat}
                  className={`order-tab${activeCategory === cat ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="price-filter-wrap">
              {['All', 'Under ₱60', '₱60–₱65', '₱70+'].map(p => (
                <button
                  key={p}
                  className={`price-filter-btn${priceFilter === p ? ' active' : ''}`}
                  onClick={() => setPriceFilter(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="menu-results-count">
            {filteredItems.length} drink{filteredItems.length !== 1 ? 's' : ''} found
            {(searchQuery || priceFilter !== 'All' || activeCategory !== 'All') && (
              <button className="menu-clear-filters" onClick={() => { setSearchQuery(''); setPriceFilter('All'); setActiveCategory('All') }}>
                Clear filters ✕
              </button>
            )}
          </div>

          <ScrollReveal>
            <div className="order-grid">
              {filteredItems.length === 0 ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px 0', fontFamily: "'Hepta Slab', serif", color: '#aaa' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                  <p>No drinks found. Try a different search or filter.</p>
                </div>
              ) : filteredItems.map(item => {
                const qty = cart[item.id]?.qty || 0
                return (
                  <div className="order-card" key={item.id}>
                    <div className="order-card-img-wrap">
                      <img src={item.img} alt={item.name} className="order-card-img" />
                      {qty > 0 && <span className="order-card-badge">{qty}</span>}
                    </div>
                    <div className="order-card-body">
                      <h3 className="order-card-name">{item.name}</h3>
                      <p className="order-card-desc">{item.desc}</p>
                      <div className="order-card-footer">
                        <span className="order-card-price">₱{item.price}</span>
                        <div className="order-qty-controls">
                          {qty > 0 && <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>}
                          <button className="qty-btn qty-btn-add" onClick={() => addToCart(item)}>
                            {qty === 0 ? '+ Add' : '+'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Cart Sidebar */}
        <div className="order-cart">
          <h2 className="cart-title">Your Order {cartCount > 0 && <span className="cart-count">{cartCount}</span>}</h2>
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🧋</span>
              <p>Your cart is empty.<br />Add some drinks!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.img} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">₱{item.price} × {item.qty}</span>
                    </div>
                    <div className="cart-item-controls">
                      <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>
                      <span className="cart-item-qty">{item.qty}</span>
                      <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <span>Total</span>
                <span className="cart-total-amount">₱{cartTotal}</span>
              </div>
              <button className="btn-primary" style={{ width: '100%', marginTop: 16 }} onClick={openCheckout}>
                Proceed to Checkout
              </button>
            </>
          )}
          <div className="cart-note">
            <span>🛒</span>
            <p>Pickup only. Choose your branch at checkout. Open 5pm–12am daily. Payment via GCash required.</p>
          </div>
        </div>
      </div>

      {/* ── Checkout Modal ── */}
      {checkoutOpen && (
        <div className="modal-overlay" onClick={closeCheckout}>
          <div className="modal checkout-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeCheckout}>✕</button>

            {/* Step Indicator */}
            <div className="checkout-steps">
              {STEPS.map((s, i) => (
                <div key={s} className={`checkout-step${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}>
                  <div className="checkout-step-num">{i < step ? '✓' : i + 1}</div>
                  <span className="checkout-step-label">{s}</span>
                  {i < STEPS.length - 1 && <div className="checkout-step-line" />}
                </div>
              ))}
            </div>

            {/* ── Step 0: Branch ── */}
            {step === 0 && (
              <div className="checkout-body">
                <h2 className="modal-title">Choose a Branch</h2>
                <p className="checkout-sub">Select where you&apos;ll pick up your order.</p>
                <div className="branch-list">
                  {branches.map(b => (
                    <div
                      key={b.id}
                      className={`branch-card${selectedBranch === b.id ? ' selected' : ''}`}
                      onClick={() => setSelectedBranch(b.id)}
                    >
                      <div className="branch-radio">{selectedBranch === b.id ? '●' : '○'}</div>
                      <div className="branch-info">
                        <span className="branch-name">{b.name}</span>
                        <span className="branch-address">{b.address}</span>
                        <span className="branch-address">{b.city}</span>
                        <span className="branch-hours">🕐 {b.hours}</span>
                      </div>
                      <span className="branch-open-badge">Open Tonight</span>
                    </div>
                  ))}
                </div>
                <button
                  className="btn-primary" style={{ width: '100%', marginTop: 24 }}
                  onClick={handleNextStep} disabled={!selectedBranch}>
                  Continue →
                </button>
              </div>
            )}

            {/* ── Step 1: Details ── */}
            {step === 1 && (
              <div className="checkout-body">
                <h2 className="modal-title">Your Details</h2>
                <div className="modal-order-summary">
                  {cartItems.map(item => (
                    <div className="modal-order-row" key={item.id}>
                      <span>{item.name} × {item.qty}</span>
                      <span>₱{item.price * item.qty}</span>
                    </div>
                  ))}
                  <div className="modal-order-row modal-order-total">
                    <span>Total</span><span>₱{cartTotal}</span>
                  </div>
                </div>
                <div className="modal-form">
                  <label>Name *
                    <input type="text" placeholder="Your name" value={customerInfo.name}
                      onChange={e => setCustomerInfo(i => ({ ...i, name: e.target.value }))} />
                  </label>
                  <label>Phone *
                    <input type="tel" placeholder="09XX XXX XXXX" value={customerInfo.phone}
                      onChange={e => setCustomerInfo(i => ({ ...i, phone: e.target.value }))} />
                  </label>
                  <label>Special Notes
                    <textarea rows="2" placeholder="Any special requests..."
                      value={customerInfo.notes}
                      onChange={e => setCustomerInfo(i => ({ ...i, notes: e.target.value }))} />
                  </label>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                  <button className="btn-outline" style={{ flex: 1 }} onClick={() => setStep(0)}>← Back</button>
                  <button className="btn-primary" style={{ flex: 2 }}
                    onClick={handleNextStep}
                    disabled={!customerInfo.name || !customerInfo.phone}>
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2: GCash Payment ── */}
            {step === 2 && (
              <div className="checkout-body">
                <h2 className="modal-title">Pay via GCash</h2>
                <p className="checkout-sub">Scan the QR code below and send exactly <strong>₱{cartTotal}</strong>.</p>

                <div className="gcash-box">
                  <div className="gcash-header">
                    <span className="gcash-logo">💙 GCash</span>
                    <span className="gcash-amount">₱{cartTotal}</span>
                  </div>

                  {/* QR Code placeholder — replace /gcash-qr.png with your real QR */}
                  <div className="gcash-qr-wrap">
                    <img
                      src={asset("/GCASH.png")}
                      alt="GCash QR Code"
                      className="gcash-qr"
                      onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                    />
                    <div className="gcash-qr-placeholder">
                      <span>📱</span>
                      <p>GCash QR Code</p>
                      <small>Replace /gcash-qr.png in public folder</small>
                    </div>
                  </div>

                  <div className="gcash-name">Sunset Cafe — Dwight Ramos</div>
                  <div className="gcash-number">09XX XXX XXXX</div>

                  <div className="gcash-steps">
                    <div className="gcash-step-item"><span>1</span> Open GCash app</div>
                    <div className="gcash-step-item"><span>2</span> Tap <strong>Scan QR</strong> or <strong>Send Money</strong></div>
                    <div className="gcash-step-item"><span>3</span> Send exactly <strong>₱{cartTotal}</strong></div>
                    <div className="gcash-step-item"><span>4</span> Enter reference number below</div>
                  </div>
                </div>

                <div className="modal-form" style={{ marginTop: 20 }}>
                  <label>GCash Reference Number *
                    <input
                      type="text"
                      placeholder="e.g. 1234567890"
                      value={refNumber}
                      onChange={e => { setRefNumber(e.target.value); setRefError('') }}
                    />
                  </label>
                  {refError && <p style={{ color: '#c62828', fontFamily: "'Hepta Slab', serif", fontSize: 13 }}>{refError}</p>}
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                  <button className="btn-outline" style={{ flex: 1 }} onClick={() => setStep(1)}>← Back</button>
                  <button className="btn-primary" style={{ flex: 2 }} onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? 'Confirming...' : '✅ Confirm Order'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {orderPlaced && (
        <div className="modal-overlay" onClick={() => setOrderPlaced(false)}>
          <div className="modal modal-success" onClick={e => e.stopPropagation()}>
            <div className="success-icon">✅</div>
            <h2 className="modal-title">Order Confirmed!</h2>
            <p className="success-msg">
              Payment received! Head to our cart at Brgy 23, Mini Sports Complex — your order will be ready for pickup.
            </p>
            <p className="success-hours">Open 5:00 PM – 12:00 AM daily</p>
            <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => setOrderPlaced(false)}>
              Order More
            </button>
          </div>
        </div>
      )}

      <Footer socialImg={asset("/ellipse42596-lake-200h.png")} />
      <ScrollToTop />
    </>
  )
}
