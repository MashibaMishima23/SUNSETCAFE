import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import emailjs from '@emailjs/browser'
import './index.css'
import App from './App.jsx'
import { EMAILJS_PUBLIC_KEY } from './lib/emailjs'

// Initialize EmailJS once at app startup
emailjs.init(EMAILJS_PUBLIC_KEY)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
