import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

const adminNav = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/investments',  label: 'Investments' },
];

export default function AdminLayout({ children, title }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d1b2e' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: '#071020', borderRight: '1px solid rgba(201,146,26,0.1)', minHeight: '100vh', position: 'fixed', left: 0, top: 0 }}>
        <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(201,146,26,0.1)' }}>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 16, fontWeight: 800, letterSpacing: 4, color: 'var(--gold)' }}>CIVORA FARMS</div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>ADMIN CONSOLE</div>
        </div>
        <nav style={{ padding: '16px 12px' }}>
          {adminNav.map((item) => {
            const active = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 8, marginBottom: 4, textDecoration: 'none', background: active ? 'rgba(201,146,26,0.12)' : 'transparent' }}
              >
           
                <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 700, letterSpacing: 1, color: active ? 'var(--gold)' : 'rgba(255,255,255,0.6)' }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16 }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', textDecoration: 'none', marginBottom: 4 }}>

            <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1 }}>My Dashboard</span>
          </Link>
          <button onClick={() => signOut({ callbackUrl: '/' })} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
         
            <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 12, color: 'rgba(239,68,68,0.7)', fontWeight: 700, letterSpacing: 1 }}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 240, flex: 1, padding: 32 }}>
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: "'Barlow Condensed'", fontSize: 28, fontWeight: 800, letterSpacing: 2, color: '#fff' }}>{title}</h1>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>CIVORA FARMS · ADMIN CONSOLE</div>
          </div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, color: 'rgba(201,146,26,0.7)', letterSpacing: 2 }}>
            Logged in as: {session?.user?.name}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
}

