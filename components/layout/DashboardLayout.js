import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import SupportButton from '../ui/SupportButton';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/investments', label: 'My Investments' },
  { href: '/dashboard/notifications', label: 'Notifications' },
  { href: '/dashboard/profile', label: 'Profile' },
  { href: '/dashboard/settings', label: 'Settings' },
];

export default function DashboardLayout({ children, title }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f8f7', fontFamily: 'Montserrat, sans-serif' }}>
      <style jsx>{`
        @media (max-width: 900px) {
          .dash-sidebar {
            transform: translateX(-100%);
            transition: transform 0.25s ease;
            width: 280px !important;
          }

          .dash-sidebar.open {
            transform: translateX(0);
          }

          .dash-main {
            margin-left: 0 !important;
            padding: 20px !important;
          }

          .dash-topbar {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 16px;
          }

          .dash-stats-grid {
            grid-template-columns: 1fr !important;
          }

          .dash-two-col {
            grid-template-columns: 1fr !important;
          }

          .dash-card-grid {
            grid-template-columns: 1fr !important;
          }

          .sidebar-toggle {
            display: flex !important;
          }

          .mobile-backdrop {
            display: block !important;
          }
        }

        @media (min-width: 901px) {
          .mobile-backdrop {
            display: none !important;
          }
        }

        @media (max-width: 520px) {
          .dash-main {
            padding: 16px !important;
          }

          .dash-title {
            font-size: 22px !important;
          }
        }
      `}</style>

      <button
  className="sidebar-toggle"
  onClick={() => setSidebarOpen(true)}
  style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    position: 'fixed',
    top: 16,
    right: 16,
    zIndex: 80,
    background: '#0f2f1d',
    border: 'none',
    borderRadius: 10,
    padding: '12px',
    cursor: 'pointer',
    width: 48,
    height: 48,
  }}
>
  <span
    style={{
      width: 22,
      height: 2,
      background: '#fff',
      borderRadius: 2,
    }}
  />
  <span
    style={{
      width: 22,
      height: 2,
      background: '#fff',
      borderRadius: 2,
    }}
  />
  <span
    style={{
      width: 22,
      height: 2,
      background: '#fff',
      borderRadius: 2,
    }}
  />
</button>

      {sidebarOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setSidebarOpen(false)}
          style={{
            display: 'none',
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 40,
          }}
        />
      )}

      <aside
        className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}
        style={{
          background: '#0b1f14',
          width: 260,
          minHeight: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          color: '#fff',
        }}
      >
        <div style={{ padding: '28px 24px', marginTop: 16, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 3, color: '#ffffff' }}>CIVORA FARMS</div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
              INVESTOR PORTAL
            </div>
          </Link>
        </div>

        {session && (
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1f6b3b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#fff', flexShrink: 0 }}>
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: 1 }}>
                  {session.user.name}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2, wordBreak: 'break-word' }}>
                  {session.user.email}
                </div>
              </div>
            </div>
          </div>
        )}

        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          {navItems.map((item) => {
            const active = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 10,
                  marginBottom: 6,
                  textDecoration: 'none',
                  background: active ? 'rgba(31,107,59,0.18)' : 'transparent',
                  border: active ? '1px solid rgba(31,107,59,0.35)' : '1px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, color: active ? '#7ee2a4' : 'rgba(255,255,255,0.78)' }}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {session?.user?.role === 'admin' && (
            <>
              <div style={{ margin: '18px 0 10px 14px', fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.35)', fontWeight: 700 }}>
                ADMIN
              </div>
              {[
                { href: '/admin', label: 'Admin Dashboard' },
                { href: '/admin/users', label: 'Manage Users' },
                { href: '/admin/investments', label: 'Investments' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    borderRadius: 10,
                    marginBottom: 6,
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,0.65)' }}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </>
          )}
        </nav>

        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              textDecoration: 'none',
              borderRadius: 10,
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,0.7)' }}>
              Back to Site
            </span>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 10,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#ff8a8a' }}>
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      <main
        className="dash-main"
        style={{
          marginLeft: 260,
          flex: 1,
          padding: '32px',
          minHeight: '100vh',
        }}
      >
        <div
          className="dash-topbar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
            gap: 16,
          }}
        >
          <div>
            <h1
              className="dash-title"
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#0b1f14',
                lineHeight: 1.1,
                margin: 0,
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {title}
            </h1>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 2,
                color: '#66736d',
                marginTop: 6,
              }}
            >
              CIVORA FARMS · INVESTOR PORTAL
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard/notifications" style={{ textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fff', border: '1px solid #e4e9e6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0b1f14' }} />
              </div>
            </Link>

            <Link
              href="/invest"
              style={{
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 2,
                color: '#fff',
                background: '#0f2f1d',
                padding: '10px 18px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              + INVEST MORE
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>

      <SupportButton />
    </div>
  );
}