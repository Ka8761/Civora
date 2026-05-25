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
        background: scrolled
          ? 'rgba(0,0,0,0.96)'
          : 'rgba(10,40,20,0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid rgba(255,255,255,0.04)',
        transition: 'all 0.3s ease',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
          .show-mobile {
            display: flex !important;
          }
          .nav-badge {
            display: none !important;
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: 1250,
          margin: '0 auto',
          padding: '0 30px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 78,
          }}
        >
          {/* LOGO */}
          <Link
            href="/"
            style={{
              textDecoration: 'none',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: 1,
                }}
              >
                CIVORA
                <span
                  style={{
                    color: '#49b34c',
                  }}
                >
                  {' '}
                  FARMS
                </span>
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.65)',
                  marginTop: 2,
                  letterSpacing: 1,
                }}
              >
                Kaduna Agricultural Investment
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            className="hidden-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color:
                    router.pathname === link.href
                      ? '#49b34c'
                      : '#ffffff',
                  textDecoration: 'none',
                  transition: '0.2s ease',
                  textTransform: 'uppercase',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {/* BADGE */}
            <div
              className="nav-badge"
              style={{
                background: '#49b34c',
                color: '#000',
                padding: '10px 16px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Slots Open 2026
            </div>

            {session ? (
              <div
                style={{
                  position: 'relative',
                }}
              >
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'rgba(255,255,255,0.06)',
                    border: 'none',
                    borderRadius: 10,
                    padding: '8px 14px',
                    cursor: 'pointer',
                  }}
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt=""
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        background: '#49b34c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: 13,
                        color: '#000',
                      }}
                    >
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    {session.user.name?.split(' ')[0]}
                  </span>

                  <span
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 10,
                    }}
                  >
                    ▾
                  </span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: 10,
                        background: '#111',
                        borderRadius: 12,
                        padding: 10,
                        minWidth: 220,
                        zIndex: 100,
                        boxShadow:
                          '0 10px 30px rgba(0,0,0,0.3)',
                      }}
                    >
                      {[
                        {
                          href: '/dashboard',
                          label: 'Dashboard',
                        },
                        {
                          href: '/dashboard/investments',
                          label: 'My Investments',
                        },
                        {
                          href: '/dashboard/notifications',
                          label: 'Notifications',
                        },
                        {
                          href: '/dashboard/profile',
                          label: 'Profile',
                        },
                        {
                          href: '/dashboard/settings',
                          label: 'Settings',
                        },
                        ...(session.user.role === 'admin'
                          ? [
                              {
                                href: '/admin',
                                label: 'Admin Panel',
                              },
                            ]
                          : []),
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() =>
                            setProfileOpen(false)
                          }
                          style={{
                            display: 'block',
                            padding: '12px 16px',
                            borderRadius: 8,
                            fontSize: 14,
                            color: '#fff',
                            textDecoration: 'none',
                            transition: '0.2s ease',
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}

                      <div
                        style={{
                          borderTop:
                            '1px solid rgba(255,255,255,0.06)',
                          margin: '8px 0',
                        }}
                      />

                      <button
                        onClick={() =>
                          signOut({
                            callbackUrl: '/',
                          })
                        }
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px 16px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: 14,
                          color: '#ef4444',
                          borderRadius: 8,
                          fontWeight: 600,
                        }}
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                }}
                className="hidden-mobile"
              >
                <Link
                  href="/auth/login"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 1,
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '10px 18px',
                  }}
                >
                  LOGIN
                </Link>

                <Link
                  href="/auth/signup"
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 1,
                    color: '#000',
                    background: '#49b34c',
                    padding: '10px 20px',
                    borderRadius: 8,
                    textDecoration: 'none',
                  }}
                >
                  SIGN UP
                </Link>
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
              }}
              className="show-mobile"
            >
              <span
                style={{
                  color: '#fff',
                  fontSize: 26,
                  lineHeight: 1,
                }}
              >
                {mobileOpen ? '×' : '☰'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            style={{
              background: '#000',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: 1,
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '14px 0',
                    borderBottom:
                      '1px solid rgba(255,255,255,0.05)',
                  }}
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