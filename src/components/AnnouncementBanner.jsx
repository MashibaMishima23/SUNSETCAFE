import { useState } from 'react'

// Edit announcements here — set active: false to hide one
const announcements = [
  {
    id: 1,
    active: true,
    emoji: '🎉',
    text: 'New Fruity Soda Series is here! Try all 4 flavors — Strawberry, Grape, Green Apple & Blueberry.',
    cta: { label: 'Order Now', path: '/order' },
    bg: '#a01c1c',
  },
  {
    id: 2,
    active: true,
    emoji: '🤝',
    text: 'Now accepting franchise applications! Packages start at ₱25,000.',
    cta: { label: 'Learn More', path: '/franchise' },
    bg: '#3d1313',
  },
]

const active = announcements.filter(a => a.active)

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dismissed_banners') || '[]') } catch { return [] }
  })
  const [current, setCurrent] = useState(0)

  const visible = active.filter(a => !dismissed.includes(a.id))

  const dismiss = (id) => {
    const updated = [...dismissed, id]
    setDismissed(updated)
    localStorage.setItem('dismissed_banners', JSON.stringify(updated))
    if (current >= visible.length - 1) setCurrent(0)
  }

  if (visible.length === 0) return null

  const banner = visible[current % visible.length]

  return (
    <div className="announcement-banner" style={{ background: banner.bg }}>
      <div className="announcement-content">
        <span className="announcement-emoji">{banner.emoji}</span>
        <span className="announcement-text">{banner.text}</span>
        {banner.cta && (
          <a href={banner.cta.path} className="announcement-cta">{banner.cta.label} →</a>
        )}
      </div>
      <div className="announcement-controls">
        {visible.length > 1 && (
          <div className="announcement-dots">
            {visible.map((_, i) => (
              <button
                key={i}
                className={`announcement-dot${i === current % visible.length ? ' active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Announcement ${i + 1}`}
              />
            ))}
          </div>
        )}
        <button className="announcement-close" onClick={() => dismiss(banner.id)} aria-label="Dismiss">✕</button>
      </div>
    </div>
  )
}
