import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="not-found-page">
        <div className="not-found-cup">☕</div>
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Oops, this page went cold.</h2>
        <p className="not-found-msg">
          Looks like this page doesn&apos;t exist — but a fresh cup of coffee does.
        </p>
        <Link to="/" className="btn-primary" style={{ marginTop: 32, display: 'inline-block' }}>
          Back to Home
        </Link>
      </div>
    </>
  )
}
