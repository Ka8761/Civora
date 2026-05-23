import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Navbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/invest', label: 'Invest Now' },
    { href: '/news', label: 'News & Updates' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,22,40,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,146,26,0.15)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div className="nav-logo">
              <div className="nav-logo-name">CIVORA<span> FARMS</span></div>
              <div className="nav-logo-tag">Kaduna Agricultural Investment</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: router.pathname === link.href ? 'var(--gold)' : 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  textTransform: 'uppercase',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Live badge */}
            <div className="nav-badge" style={{ display: 'flex' }}>
              Slots Open 2026
            </div>

            {session ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'rgba(201,146,26,0.1)',
                    border: '1px solid rgba(201,146,26,0.3)',
                    borderRadius: 8, padding: '8px 14px', cursor: 'pointer',
                  }}
                >
                  {session.user.image ? (
                    <img src={session.user.image} alt="" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                  ) : (
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, color: 'var(--navy)' }}>
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#fff' }}>
                    {session.user.name?.split(' ')[0]}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>▾</span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      style={{
                        position: 'absolute', top: '100%', right: 0, marginTop: 8,
                        background: '#112240', border: '1px solid rgba(201,146,26,0.2)',
                        borderRadius: 10, padding: 8, minWidth: 200, zIndex: 100,
                      }}
                    >
                      {[
                        { href: '/dashboard', label: '📊 Dashboard' },
                        { href: '/dashboard/investments', label: '🌾 My Investments' },
                        { href: '/dashboard/notifications', label: '🔔 Notifications' },
                        { href: '/dashboard/profile', label: '👤 Profile' },
                        { href: '/dashboard/settings', label: '⚙️ Settings' },
                        ...(session.user.role === 'admin' ? [{ href: '/admin', label: '🔧 Admin Panel' }] : []),
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setProfileOpen(false)}
                          style={{
                            display: 'block', padding: '10px 16px', borderRadius: 6,
                            fontFamily: "'Barlow', sans-serif", fontSize: 13,
                            color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={(e) => e.target.style.background = 'rgba(201,146,26,0.1)'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '8px 0' }} />
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        style={{
                          width: '100%', textAlign: 'left', padding: '10px 16px',
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontFamily: "'Barlow', sans-serif", fontSize: 13,
                          color: '#ef4444', borderRadius: 6,
                        }}
                      >
                        🚪 Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 10 }}>
                <Link href="/auth/login" style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '10px 20px' }}>
                  LOGIN
                </Link>
                <Link href="/auth/signup" style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, letterSpacing: 2, color: 'var(--navy)', background: 'var(--gold)', padding: '10px 20px', borderRadius: 4, textDecoration: 'none' }}>
                  SIGN UP
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
              className="show-mobile"
            >
              <span style={{ color: '#fff', fontSize: 20 }}>☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ background: 'rgba(10,22,40,0.99)', borderTop: '1px solid rgba(201,146,26,0.1)', overflow: 'hidden' }}
          >
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ fontFamily: "'Barlow Condensed'", fontSize: 16, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

