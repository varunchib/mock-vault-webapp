import { footerColumns } from '../../data/landing'
import { Logo } from '../ui/Logo'

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-about">
          <Logo />
          <p>India&apos;s most complete previous year questions platform. Every paper, solved and explained. No paywalls on answers.</p>
        </div>
        {footerColumns.map((column) => (
          <div className="fc" key={column.title}>
            <h4>{column.title}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link}><a href="#top">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bot">
        <p>© 2026 PYQVault · Made for India&apos;s aspirants</p>
        <p>UPSC · SSC · IBPS · State PSCs · NEET · JEE · RRB</p>
      </div>
    </footer>
  )
}
