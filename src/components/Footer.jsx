export default function Footer({ socialImg = '/ellipse42596-lake-200h.png' }) {
  return (
    <footer className="site-footer">
      <span className="site-footer-brand">SUNSET CAFE</span>
      <div className="site-footer-social">
        <img src={socialImg} alt="Social" />
        <span>Follow us on</span>
      </div>
      <div className="site-footer-links">
        <span>Privacy Policy</span>
        <span className="underline">Anti-Bribery Corruption Policy</span>
        <span className="underline">Terms &amp; Conditions</span>
        <span>Company registration no: 635-381-780-00000</span>
      </div>
      <p className="site-footer-copy">COPYRIGHT 2026 &copy; SUNSET CAFE</p>
    </footer>
  )
}
