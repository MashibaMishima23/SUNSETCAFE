import { asset } from '../lib/assetUrl'
import { useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import ScrollToTop from '../components/ScrollToTop'

/*
  MINDANAOMAP.png — 1024×1024 px
  Black background, grey Mindanao silhouette.

  Calibration using visible geographic features:
  The image appears to be a standard Mindanao outline map.
  
  Known reference points (estimated from silhouette shape):
  - Zamboanga City tip (western peninsula): ~7.07°N, 122.07°E → px ~(115, 490)
  - Davao City (southeastern coast):        ~7.07°N, 125.61°E → px ~(820, 490)
  - Cagayan de Oro (northern coast):        ~8.48°N, 124.65°E → px ~(710, 310)
  - General Santos (southern tip):          ~6.11°N, 125.17°E → px ~(760, 640)

  Using Zamboanga and Davao as horizontal anchors:
    Δlon = 125.61 - 122.07 = 3.54°  →  Δpx = 820 - 115 = 705px
    px/° lon = 705 / 3.54 = 199.15

  Using CdO and GenSan as vertical anchors:
    Δlat = 8.48 - 6.11 = 2.37°  →  Δpx = 640 - 310 = 330px
    px/° lat = 330 / 2.37 = 139.24  (y inverted)

  Origin anchor: Zamboanga at (115, 490) = (7.07°N, 122.07°E)

  Formula:
    svgX = 115 + (lon - 122.07) * 199.15
    svgY = 490 - (lat - 7.07)   * 139.24

  Gingoog City: 8.822619°N, 125.101576°E
    x = 115 + (125.101576 - 122.07) * 199.15 = 115 + 3.031576 * 199.15 = 115 + 603.7 = 719
    y = 490 - (8.822619  - 7.07)   * 139.24 = 490 - 1.752619 * 139.24 = 490 - 244.1 = 246

  Medina: 8.912873°N, 125.023833°E
    x = 115 + (125.023833 - 122.07) * 199.15 = 115 + 2.953833 * 199.15 = 115 + 588.2 = 703
    y = 490 - (8.912873  - 7.07)   * 139.24 = 490 - 1.842873 * 139.24 = 490 - 256.7 = 233
*/

const stores = [
  {
    id: 1,
    name: 'Gingoog City',
    label: 'Brgy 23 — Main Cart',
    available: 'Available in Gingoog City!',
    address: 'Brgy 23. National Highway\nVillahermosa Slot, Mini Sports Complex',
    city: 'Gingoog City, Misamis Oriental',
    hours: '5:00 PM – 12:00 AM',
    coords: '8.822619, 125.101576',
    plusCode: 'Public Ground, R4C2+WHX, Gingoog City, Misamis Oriental',
    mapsUrl: 'https://maps.google.com/?q=8.822619,125.101576',
    mapX: 719, mapY: 246,
  },
  {
    id: 2,
    name: 'Medina',
    label: 'Medina Cart',
    available: 'Available in Medina!',
    address: 'Medina, Misamis Oriental',
    city: 'Medina, Misamis Oriental',
    hours: '5:00 PM – 12:00 AM',
    coords: '8.912873, 125.023833',
    plusCode: 'Medina, Misamis Oriental',
    mapsUrl: 'https://maps.google.com/?q=8.912873,125.023833',
    mapX: 703, mapY: 233,
  },
]

export default function FindStore() {
  const navigate = useNavigate()
  const wrapperRef = useRef(null)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, store: null })

  const showTip = useCallback((e, store) => {
    const rect = wrapperRef.current.getBoundingClientRect()
    setTooltip({ visible: true, x: e.clientX - rect.left + 18, y: e.clientY - rect.top - 12, store })
  }, [])

  const hideTip = useCallback(() => setTooltip(t => ({ ...t, visible: false })), [])

  const moveTip = useCallback((e) => {
    if (!tooltip.visible) return
    const rect = wrapperRef.current.getBoundingClientRect()
    setTooltip(t => ({ ...t, x: e.clientX - rect.left + 18, y: e.clientY - rect.top - 12 }))
  }, [tooltip.visible])

  return (
    <>
      <Navbar />

      <section className="store-hero">
        <h1>Find a Store in Mindanao</h1>
        <p>Click a pin to see store details</p>
      </section>

      <div className="store-map">
        <div className="map-wrapper" ref={wrapperRef} onMouseMove={moveTip}>

          {/* Tooltip */}
          <div
            className={`map-tooltip${tooltip.visible ? ' visible' : ''}`}
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <strong>{tooltip.store?.name}</strong>
            <span>{tooltip.store?.city}</span>
            <em>Click to view store →</em>
          </div>

          {/* Mindanao map image */}
          <img
            src={asset("/MINDANAOMAP.png")}
            alt="Mindanao Map"
            className="map-img"
            draggable={false}
          />

          {/* SVG pin overlay */}
          <svg
            className="map-pins-svg"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="pinGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(160,28,28,0.9)"/>
              </filter>
            </defs>

            {stores.map(store => {
              const px = store.mapX
              const py = store.mapY
              const lw = store.name.length * 8 + 24
              return (
                <g
                  key={store.id}
                  className="pin-group"
                  onClick={() => navigate(`/store-detail/${store.id}`)}
                  onMouseEnter={e => showTip(e, store)}
                  onMouseLeave={hideTip}
                  filter="url(#pinGlow)"
                >
                  <line x1={px} y1={py + 14} x2={px} y2={py + 44} className="pin-stem"/>
                  <circle cx={px} cy={py} r="16" className="pin-circle"/>
                  <circle cx={px} cy={py} r="7" className="pin-inner"/>
                  <rect x={px - lw / 2} y={py - 40} width={lw} height="24" rx="5" className="pin-label-bg"/>
                  <text x={px} y={py - 23} className="pin-label-text">{store.name}</text>
                </g>
              )
            })}

            {/* Compass */}
            <g transform="translate(60,960)">
              <circle cx="0" cy="0" r="22" fill="rgba(255,255,255,0.85)" stroke="#999" strokeWidth="1"/>
              <text x="0" y="-26" className="compass-text">N</text>
              <polygon points="0,-17 4,-6 0,-10 -4,-6" fill="#a01c1c"/>
              <polygon points="0,17 4,6 0,10 -4,6" fill="#aaa"/>
            </g>

            {/* Map title */}
            <text x="512" y="1015" className="map-title">MINDANAO</text>
          </svg>
        </div>
      </div>

      {/* Branch List */}
      <ScrollReveal>
        <section className="branches-section">
          <p className="section-label" style={{ color: 'var(--red-dark)' }}>Our locations</p>
          <h2 className="section-title" style={{ fontSize: 36, marginBottom: 32 }}>All Branches</h2>
          <div className="branches-grid">
            {stores.map(store => (
              <div className="branch-detail-card" key={store.id}>
                <h2 className="branch-available">{store.available}</h2>
                <p className="branch-locate">
                  {store.address.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </p>
                <p className="branch-coords-text">
                  COORDINATES: {store.coords}<br />
                  {store.plusCode}
                </p>
                <div className="branch-detail-row" style={{ marginTop: 12 }}>
                  <span>🕐</span>
                  <span style={{ fontWeight: 700, color: 'var(--red-dark)' }}>{store.hours} · Mon–Sun</span>
                </div>
                <a href={store.mapsUrl} target="_blank" rel="noreferrer" className="btn-primary"
                  style={{ marginTop: 20, width: '100%', textAlign: 'center' }}>
                  Open in Google Maps
                </a>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <Footer socialImg={asset("/ellipse41718-tbc-200h.png")} />
      <ScrollToTop />
    </>
  )
}
