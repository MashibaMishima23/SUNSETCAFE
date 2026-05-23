import { asset } from '../lib/assetUrl'
import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'

const searchIndex = [
  // Pages
  { label: 'Home', type: 'page', path: '/', desc: 'Back to homepage' },
  { label: 'About', type: 'page', path: '/about', desc: 'Our story, founders & values' },
  { label: 'Contact', type: 'page', path: '/contact', desc: 'Send us a message' },
  { label: 'Find a Store', type: 'page', path: '/find-a-store', desc: 'Gingoog City & Medina branches' },
  { label: 'Order Online', type: 'page', path: '/order', desc: 'Pick drinks & pay via GCash' },
  { label: 'Franchise', type: 'page', path: '/franchise', desc: 'Own a Sunset Cafe cart' },
  // Branches
  { label: 'Gingoog City Branch', type: 'branch', path: '/store-detail/1', desc: 'Brgy 23, Mini Sports Complex' },
  { label: 'Medina Branch', type: 'branch', path: '/store-detail/2', desc: 'Medina, Misamis Oriental' },
  // Latte Series
  { label: 'White Chocolate Latte', type: 'drink', path: '/order', desc: '₱65 · Latte Series' },
  { label: 'Spanish Latte', type: 'drink', path: '/order', desc: '₱60 · Latte Series' },
  { label: 'Americano', type: 'drink', path: '/order', desc: '₱55 · Latte Series' },
  { label: 'Matcha Milk', type: 'drink', path: '/order', desc: '₱65 · Latte Series' },
  { label: 'Hazelnut Latte', type: 'drink', path: '/order', desc: '₱65 · Latte Series' },
  { label: 'Caramel Macchiato', type: 'drink', path: '/order', desc: '₱70 · Latte Series' },
  { label: 'French Vanilla Latte', type: 'drink', path: '/order', desc: '₱65 · Latte Series' },
  { label: 'Strawberry Milk', type: 'drink', path: '/order', desc: '₱60 · Latte Series' },
  { label: 'Strawberry Matcha', type: 'drink', path: '/order', desc: '₱70 · Latte Series' },
  { label: 'Matcha Latte', type: 'drink', path: '/order', desc: '₱65 · Latte Series' },
  // Fruity Soda
  { label: 'Strawberry Soda', type: 'drink', path: '/order', desc: '₱55 · Fruity Soda Series' },
  { label: 'Grape Soda', type: 'drink', path: '/order', desc: '₱55 · Fruity Soda Series' },
  { label: 'Green Apple Soda', type: 'drink', path: '/order', desc: '₱55 · Fruity Soda Series' },
  { label: 'Blueberry Soda', type: 'drink', path: '/order', desc: '₱55 · Fruity Soda Series' },
  // Franchise packages
  { label: 'Starter Cart Package', type: 'franchise', path: '/franchise', desc: '₱25,000 · Franchise' },
  { label: 'Growth Package', type: 'franchise', path: '/franchise', desc: '₱45,000 · Most Popular' },
  { label: 'Multi-Cart Package', type: 'franchise', path: '/franchise', desc: '₱80,000 · Franchise' },
  // People
  { label: 'Dwight Ramos', type: 'about', path: '/about', desc: 'Co-Founder of Sunset Cafe' },
  { label: 'Kervy Y. Rubio', type: 'about', path: '/about', desc: 'Co-Founder of Sunset Cafe' },
  // Features
  { label: 'Reviews & Ratings', type: 'feature', path: '/', desc: 'See what customers say' },
  { label: 'GCash Payment', type: 'feature', path: '/order', desc: 'Pay online via GCash' },
  { label: 'Opening Hours', type: 'info', path: '/find-a-store', desc: '5:00 PM – 12:00 AM daily' },
]

const typeColors = {
  page: '#a01c1c',
  drink: '#1a6b3a',
  branch: '#154360',
  franchise: '#5b2c6f',
  about: '#a01c1c',
  feature: '#b8860b',
  info: '#555',
}

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const searchRef = useRef(null)

  // close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  const results = query.trim().length > 0
    ? searchIndex.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    : []

  const handleSelect = (item) => {
    navigate(item.path)
    setQuery('')
    setSearchOpen(false)
    setMenuOpen(false)
  }

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav className="navbar">
      <span className="navbar-brand">SUNSET<br />CAFE</span>

      <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>HOME</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>ABOUT</NavLink>
        <NavLink to="/order" className={({ isActive }) => isActive ? 'active' : ''}>ORDER</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>CONTACT</NavLink>
        <NavLink to="/find-a-store" className={({ isActive }) => isActive ? 'active' : ''}>FIND A STORE</NavLink>
        <NavLink to="/franchise" className={({ isActive }) => isActive ? `active franchise-link` : 'franchise-link'}>FRANCHISE</NavLink>
      </div>

      <div className="navbar-search" ref={searchRef} style={{ position: 'relative' }}>
        <img src={asset("/search2596-gyjo.svg")} alt="Search" />
        <input
          type="text"
          placeholder="Search.."
          value={query}
          onChange={e => { setQuery(e.target.value); setSearchOpen(true) }}
          onFocus={() => setSearchOpen(true)}
          style={{
            border: 'none', outline: 'none', background: 'transparent',
            fontFamily: "'Hepta Slab', serif", fontSize: 15, color: '#191818',
            width: 120,
          }}
        />
        {searchOpen && results.length > 0 && (
          <div style={{
            position: 'absolute', top: '110%', right: 0,
            background: '#fff', border: '1.5px solid #a01c1c',
            borderRadius: 10, minWidth: 260, zIndex: 200,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)', overflow: 'hidden',
          }}>
            {results.map((item, i) => (
              <div
                key={i}
                onMouseDown={() => handleSelect(item)}
                style={{
                  padding: '10px 16px', cursor: 'pointer',
                  borderBottom: i < results.length - 1 ? '1px solid #f0f0f0' : 'none',
                  fontFamily: "'Hepta Slab', serif",
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fdf0f0'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, color: '#191818', fontWeight: 700 }}>{item.label}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1,
                    color: '#fff', background: typeColors[item.type] || '#a01c1c',
                    padding: '2px 7px', borderRadius: 10, flexShrink: 0,
                  }}>
                    {item.type}
                  </span>
                </div>
                {item.desc && (
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{item.desc}</div>
                )}
              </div>
            ))}
          </div>
        )}
        {searchOpen && query.trim().length > 0 && results.length === 0 && (
          <div style={{
            position: 'absolute', top: '110%', right: 0,
            background: '#fff', border: '1.5px solid #ddd',
            borderRadius: 10, minWidth: 220, zIndex: 200,
            padding: '12px 16px', fontSize: 14, color: '#888',
            fontFamily: "'Hepta Slab', serif",
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}>
            No results for &ldquo;{query}&rdquo;
          </div>
        )}
      </div>

      {/* Hamburger */}
      <button
        className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
        style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer' }}
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
