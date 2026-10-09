import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const publicLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/leadership-school', label: 'Leadership School' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <>
      <style jsx global>{`
        .public-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(7, 17, 12, 0.22);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .public-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 78px;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .public-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .public-link,
        .public-login {
          color: #ffffff !important;
          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: 0.2s ease;
          background: none;
          border: none;
          cursor: pointer;
        }

        .public-link:hover,
        .public-login:hover {
          color: #c9921a !important;
        }

        .public-signup {
          color: #ffffff !important;
          background: #c9921a;
          padding: 10px 18px;
          border-radius: 6px;
          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        @media (max-width: 850px) {
          .public-links {
            display: none;
          }

          .public-nav-inner {
            height: 68px;
          }
        }
      `}</style>

      <header className="public-nav">
        <div className="public-nav-inner">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 800,
                color: '#fff',
                letterSpacing: 1,
              }}
            >
              COLIG
            </div>

            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 9,
                color: '#c9921a',
                letterSpacing: 2,
                marginTop: 2,
              }}
            >
              LEADERSHIP FOUNDATION SCHOOL
            </div>
          </Link>

          <nav className="public-links">
            {publicLinks.map((link) => (
              <Link key={link.href} href={link.href} className="public-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {session ? (
              <>
                <button className="public-login" onClick={() => signOut({ callbackUrl: '/' })}>
                  SIGN OUT
                </button>
                <Link href="/dashboard" className="public-signup">
                  MY DASHBOARD
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="public-login">
                  LOGIN
                </Link>
                <Link href="/auth/signup" className="public-signup">
                  JOIN SCHOOL
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}