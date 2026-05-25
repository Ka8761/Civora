import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const adminNav = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/investments', label: 'Investments' },
];

export default function AdminLayout({ children, title }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // auto-close sidebar on mobile
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d1b2e' }}>

      {/* ================= HAMBURGER ================= */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(prev => !prev)}
          style={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 300,
            background: '#071020',
            border: '1px solid rgba(201,146,26,0.2)',
            borderRadius: 10,
            width: 48,
            height: 48,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer',
          }}
        >
          <span style={{ width: 22, height: 2, background: '#fff' }} />
          <span style={{ width: 22, height: 2, background: '#fff' }} />
          <span style={{ width: 22, height: 2, background: '#fff' }} />
        </button>
      )}

      {/* ================= OVERLAY (mobile only) ================= */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 200,
          }}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        style={{
          width: 240,
          background: '#071020',
          borderRight: '1px solid rgba(201,146,26,0.1)',
          minHeight: '100vh',
          position: 'fixed',
          left: isMobile ? (sidebarOpen ? 0 : -260) : 0,
          top: 0,
          zIndex: 250,
          transition: 'left 0.3s ease',
        }}
      >
        <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(201,146,26,0.1)' }}>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 16, fontWeight: 800, letterSpacing: 4, color: 'var(--gold)' }}>
            CIVORA FARMS
          </div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.3)' }}>
            ADMIN CONSOLE
          </div>
        </div>

        <nav style={{ padding: '16px 12px' }}>
          {adminNav.map((item) => {
            const active = router.pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '11px 14px',
                  borderRadius: 8,
                  marginBottom: 4,
                  textDecoration: 'none',
                  background: active ? 'rgba(201,146,26,0.12)' : 'transparent'
                }}
              >
                <span style={{
                  fontFamily: "'Barlow Condensed'",
                  fontSize: 13,
                  fontWeight: 700,
                  color: active ? 'var(--gold)' : 'rgba(255,255,255,0.6)'
                }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: 16 }}>
          <Link href="/dashboard">
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
              My Dashboard
            </span>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{
              width: '100%',
              marginTop: 10,
              background: 'none',
              border: 'none',
              color: 'rgba(239,68,68,0.7)',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main
        style={{
          marginLeft: isMobile ? 0 : 240,
          flex: 1,
          padding: isMobile ? 16 : 32,
          width: '100%',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 32
        }}>
          <h1 style={{ fontSize: isMobile ? 22 : 28, color: '#fff' }}>
            {title}
          </h1>

          <div style={{ color: 'rgba(201,146,26,0.7)' }}>
            Logged in: {session?.user?.name}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
}