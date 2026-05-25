import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

export default function AdminUsers() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (session?.user?.role !== 'admin') return;
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(d => { setUsers(d.users || []); setLoading(false); });
  }, [session]);

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.state?.toLowerCase().includes(search.toLowerCase())
  );

  const rowStyle = {
  display: 'grid',
  gridTemplateColumns:
    typeof window !== 'undefined' && window.innerWidth <= 768
      ? '1fr'
      : '2fr 2fr 1fr 1fr 1fr',
  gap: 12,
  alignItems: 'center',
  padding: '14px 20px',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
};
  return (
    <>
      <Head><title>Manage Users — CIVORA FARMS Admin</title></Head>
      <AdminLayout title="Manage Users">
        {/* Search */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email or state..."
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px 20px', color: '#fff', fontFamily: "'Barlow', sans-serif", fontSize: 14, width: '100%', maxWidth: 400, outline: 'none' }}
          />
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Total Users', val: users.length },
            { label: 'Active Investors', val: users.filter(u => u.totalInvested > 0).length },
            { label: 'Admins', val: users.filter(u => u.role === 'admin').length },
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '16px 24px' }}>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 700, color: 'var(--gold)' }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ ...rowStyle, background: 'rgba(201,146,26,0.05)', borderBottom: '1px solid rgba(201,146,26,0.12)' }}>
            {['NAME / EMAIL', 'LOCATION', 'TOTAL INVESTED', 'ROLE', 'JOINED'].map((h, i) => (
              <div key={i} style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: 'rgba(201,146,26,0.7)', fontWeight: 700 }}>{h}</div>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading users...</div>
          ) : filtered.map((user, i) => (
            <motion.div key={user._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              style={{ ...rowStyle, background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: 'var(--navy)', flexShrink: 0 }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: 1 }}>{user.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{user.email}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{user.state || '—'}</div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 15, fontWeight: 700, color: user.totalInvested > 0 ? 'var(--gold)' : 'rgba(255,255,255,0.3)' }}>
                {user.totalInvested > 0 ? `₦${user.totalInvested.toLocaleString()}` : '₦0'}
              </div>
              <div>
                <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, fontWeight: 700, letterSpacing: 2, padding: '4px 10px', borderRadius: 20, background: user.role === 'admin' ? 'rgba(201,146,26,0.15)' : 'rgba(255,255,255,0.06)', color: user.role === 'admin' ? 'var(--gold)' : 'rgba(255,255,255,0.5)' }}>
                  {user.role?.toUpperCase()}
                </span>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                {new Date(user.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </motion.div>
          ))}
        </div>
      </AdminLayout>
    </>
  );
}
