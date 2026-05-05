import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import ScrollToTop from '../components/ScrollToTop'

const storeData = {
  1: {
    name: 'Gingoog City',
    available: 'Available in Gingoog City!',
    address: 'Brgy 23. National Highway\nVillahermosa Slot, Mini Sports Complex',
    city: 'Gingoog City, Misamis Oriental',
    coords: '8.822619, 125.101576',
    plusCode: 'Public Ground, R4C2+WHX, Gingoog City, Misamis Oriental',
    mapsUrl: 'https://maps.google.com/?q=8.822619,125.101576',
    logo: '/untitled6x6in1721719-cnau-200h.png',
    banner: '/rectangle231718-qwg-1500w.png',
    photos: [
      '/image6155098808171847113737527515550640825927474n11718-sm5e-600h.png',
      '/image6155098808171847113737527515550640825927474n21718-b3yl-600h.png',
      '/image6155098808171847113737527515550640825927474n31718-2ru8-600h.png',
    ],
    socialImg: '/ellipse41718-tbc-200h.png',
  },
  2: {
    name: 'Medina',
    available: 'Available in Medina!',
    address: 'Medina, Misamis Oriental',
    city: 'Medina, Misamis Oriental',
    coords: '8.912873, 125.023833',
    plusCode: 'Medina, Misamis Oriental',
    mapsUrl: 'https://maps.google.com/?q=8.912873,125.023833',
    logo: '/untitled6x6in1721719-cnau-200h.png',
    banner: '/rectangle231718-qwg-1500w.png',
    photos: [
      '/image6515506748690617795193787258417531898554177n11602-0vvd-600h.png',
      '/image6155098808171847113737527515550640825927474n21718-b3yl-600h.png',
      '/image6155098808171847113737527515550640825927474n31718-2ru8-600h.png',
    ],
    socialImg: '/ellipse41718-tbc-200h.png',
  },
}

const amenities = [
  { icon: '🛒', label: 'Cart Cafe' },
  { icon: '🌙', label: 'Open Nightly' },
  { icon: '💨', label: 'Outdoor Seating' },
  { icon: '📍', label: 'Easy to Find' },
  { icon: '💳', label: 'Cash & GCash' },
  { icon: '🥤', label: '14+ Drinks' },
]

const hours = [
  'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
].map(day => ({ day, time: '5:00 PM – 12:00 AM' }))

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

export default function StoreDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const store = storeData[id] || storeData[1]

  return (
    <>
      <Navbar />

      <section className="store-detail-hero">
        <button className="back-btn" onClick={() => navigate('/find-a-store')}>
          ← Back to Map
        </button>
        <img src={store.logo} alt="Sunset Cafe Logo" className="store-detail-logo" />
        <h1>{store.available}</h1>
        <p>
          {store.address.split('\n').map((line, i) => (
            <span key={i}>{line}{i < store.address.split('\n').length - 1 && <br />}</span>
          ))}
        </p>
        <p className="store-detail-coords">
          COORDINATES: {store.coords}<br />
          {store.plusCode}
        </p>
        <a href={store.mapsUrl} target="_blank" rel="noreferrer" className="store-detail-btn">
          Open in Google Maps
        </a>
      </section>

      <img src={store.banner} alt="Store location" className="store-detail-banner" />

      {/* Amenities */}
      <ScrollReveal>
        <section className="amenities-section">
          <h2 className="amenities-title">What to Expect</h2>
          <div className="amenities-grid">
            {amenities.map(a => (
              <div className="amenity-badge" key={a.label}>
                <span className="amenity-icon">{a.icon}</span>
                <span className="amenity-label">{a.label}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Hours */}
      <ScrollReveal>
        <section className="hours-section">
          <h2 className="hours-title">Opening Hours</h2>
          <div className="hours-table">
            {hours.map(h => (
              <div className={`hours-row${h.day === today ? ' today' : ''}`} key={h.day}>
                <span className="hours-day">
                  {h.day}
                  {h.day === today && <span className="today-badge">Today</span>}
                </span>
                <span className="hours-time">{h.time}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Photos */}
      <ScrollReveal>
        <div className="store-detail-photos">
          {store.photos.map((p, i) => (
            <img key={i} src={p} alt={`${store.name} photo ${i + 1}`} />
          ))}
        </div>
      </ScrollReveal>

      <Footer socialImg={store.socialImg} />
      <ScrollToTop />
    </>
  )
}
