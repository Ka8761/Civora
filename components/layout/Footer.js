import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#012909',
        color: '#fff',
        padding: '60px 20px 30px',
        fontFamily: "'Barlow Condensed', sans-serif",
      }}
    >
      {/* TOP SECTION */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 40,
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >

        {/* BRAND */}
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 3,
              color: 'var(--gold)',
              marginBottom: 10,
            }}
          >
            CIVORA FARMS
          </div>

          <div
            style={{
              fontSize: 12,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.5)',
              marginBottom: 16,
            }}
          >
            A Kaduna-based agricultural investment platform connecting everyday Nigerians to real farmland and real returns.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <div
              style={{
                fontSize: 10,
                padding: '6px 10px',
                border: '1px solid rgba(201,146,26,0.3)',
                borderRadius: 20,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              CAC REGISTERED
            </div>

            <div
              style={{
                fontSize: 10,
                padding: '6px 10px',
                border: '1px solid rgba(201,146,26,0.3)',
                borderRadius: 20,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              NAIC INSURED
            </div>

            <div
              style={{
                fontSize: 10,
                padding: '6px 10px',
                border: '1px solid rgba(201,146,26,0.3)',
                borderRadius: 20,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              ESCROW PROTECTED
            </div>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2,
              color: 'rgba(255,255,255,0.6)',
              marginBottom: 12,
            }}
          >
            QUICK LINKS
          </div>

          {[
            { href: '/invest', label: 'Invest Now' },
            { href: '/news', label: 'News & Updates' },
            { href: '/about', label: 'About Us' },
            { href: '/auth/signup', label: 'Create Account' },
            { href: '/auth/login', label: 'Investor Login' },
          ].map((link) => (
            <div key={link.href} style={{ marginBottom: 8 }}>
              <Link
                href={link.href}
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  fontSize: 12,
                }}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* CONTACT */}
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2,
              color: 'rgba(255,255,255,0.6)',
              marginBottom: 12,
            }}
          >
            CONTACT US
          </div>

          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
            Zaria Road, Kafanchan, Kaduna State
          </div>

          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
            +234 903 011 7888
          </div>

          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            civorafarms@gmail.com
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div
        style={{
          maxWidth: 1100,
          margin: '40px auto 20px',
          fontSize: 10,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.35)',
          padding: '0 10px',
        }}
      >
        ⚠️ Investment Disclaimer: All ROI projections are estimates based on expected farm performance.
        Agricultural investment carries risks including weather, pests, and market fluctuations.
        Returns are not guaranteed.
      </div>

      {/* BOTTOM */}
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 16,
          fontSize: 11,
          color: 'rgba(255,255,255,0.4)',
          textAlign: 'center',
        }}
      >
        <div>© 2026 CIVORA FARMS LIMITED. All rights reserved.</div>

        <div>
          <Link
            href="/privacy"
            style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', marginRight: 10 }}
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}