import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <div className="footer-logo">CIVORA FARMS</div>
          <div className="footer-desc">
            A Kaduna-based agricultural investment platform connecting everyday Nigerians to real farmland and real returns.
          </div>
          <div className="footer-badges">
            <div className="f-badge">CAC REGISTERED</div>
            <div className="f-badge">NAIC INSURED</div>
            <div className="f-badge">ESCROW PROTECTED</div>
          </div>
        </div>
        <div>
          <div className="footer-contact-title">QUICK LINKS</div>
          {[
            { href: '/invest', label: 'Invest Now' },
            { href: '/news', label: 'News & Updates' },
            { href: '/about', label: 'About Us' },
            { href: '/auth/signup', label: 'Create Account' },
            { href: '/auth/login', label: 'Investor Login' },
          ].map((link) => (
            <div key={link.href} className="footer-contact-item">
              <Link href={link.href} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{link.label}</Link>
            </div>
          ))}
        </div>
        <div>
          <div className="footer-contact-title">CONTACT US</div>
          <div className="footer-contact-item">Zaria Road, Kafanchan, Kaduna State</div>
          <div className="footer-contact-item">+234 903 011 7888</div>
          <div className="footer-contact-item">civorafarms@gmail.com</div>
        </div>
      </div>
      <div className="footer-disc">
        ⚠️ Investment Disclaimer: All ROI projections are estimates based on expected farm performance. Agricultural investment carries inherent risks including weather, pests, and market fluctuations. Returns are not guaranteed. Invest only funds you can afford to lock up for the stated season duration. CIVORA FARMS LIMITED is registered with the Corporate Affairs Commission (CAC) of Nigeria.
      </div>
      <div className="footer-bottom">
        <span>© 2026 CIVORA FARMS LIMITED. All rights reserved.</span>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>
          <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none' }}>Privacy Policy</Link>
          {' · '}
          <Link href="/terms" style={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none' }}>Terms</Link>
        </span>
      </div>
    </footer>
  );
}
