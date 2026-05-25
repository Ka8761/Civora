import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

import AdminLayout from '../../components/layout/AdminLayout';

const COLORS = ['#c9921a', '#4caf50', '#2d6a35', '#e8b84b'];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.replace('/dashboard');
    } else {
      router.replace('/admin');
    }
  }, [session, status]);

  useEffect(() => {
    if (session?.user?.role == 'admin') return;
    Promise.all([
      fetch('/api/admin/users').then(r => r.json()),
      fetch('/api/admin/investments').then(r => r.json()),
    ]).then(([ud, id]) => {
      setUsers(ud.users || []);
      setInvestments(id.investments || []);
      setLoading(false);
    });
  }, [session]);

  const totalInvested = investments.reduce((s, i) => s + i.amount, 0);
  const totalProjected = investments.reduce((s, i) => s + (i.projectedReturn || 0), 0);

  const cropBreakdown = ['Maize', 'Groundnut', 'Soybean'].map(crop => ({
    name: crop,
    value: investments.filter(i => i.crop === crop).reduce((s, i) => s + i.amount, 0),
  })).filter(c => c.value > 0);

  const statusBreakdown = ['pending', 'active', 'harvested', 'cancelled'].map(s => ({
    name: s.charAt(0).toUpperCase() + s.slice(1),
    count: investments.filter(i => i.status === s).length,
  }));

  const cardStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: isMobile ? '16px 14px' : '24px 20px'
  };

  return (
    <>
      <title>Admin — CIVORA FARMS</title>

      <AdminLayout title="Admin Overview">

        {/* STATS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
            gap: 16,
            marginBottom: 28
          }}
        >
          {[
            { label: 'TOTAL USERS', val: users.length, color: 'var(--gold)' },
            { label: 'TOTAL INVESTMENTS', val: investments.length, color: '#4caf50' },
            { label: 'TOTAL CAPITAL (NGN)', val: `₦${totalInvested.toLocaleString()}`, color: 'var(--gold)' },
            { label: 'PROJECTED PAYOUTS', val: `₦${totalProjected.toLocaleString()}`, color: '#4caf50' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={cardStyle}
            >
              <div style={{ fontSize: isMobile ? 18 : 24, marginBottom: 10 }}>{s.icon}</div>
              <div style={{
                fontFamily: "'Barlow Condensed'",
                fontSize: 9,
                letterSpacing: 3,
                color: 'rgba(255,255,255,0.35)',
                marginBottom: 6
              }}>
                {s.label}
              </div>
              <div style={{
                fontFamily: "'Playfair Display'",
                fontSize: isMobile ? 18 : 24,
                fontWeight: 700,
                color: s.color,
                lineHeight: 1
              }}>
                {s.val}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CHARTS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 20,
            marginBottom: 28
          }}
        >

          {/* BAR */}
          <div style={cardStyle}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(201,146,26,0.7)' }}>
              INVESTMENT STATUS
            </div>

            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 20 }}>
              By Status
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statusBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#c9921a" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PIE */}
          <div style={cardStyle}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(201,146,26,0.7)' }}>
              CAPITAL BY CROP
            </div>

            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 20 }}>
              Distribution
            </div>

            {cropBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={cropBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {cropBreakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)' }}>
                No investment data yet
              </div>
            )}
          </div>
        </div>

        {/* RECENT */}
        <div style={cardStyle}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(201,146,26,0.7)' }}>
            RECENT ACTIVITY
          </div>

          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 20 }}>
            Latest Investments
          </div>

          {investments.slice(0, 5).map((inv, i) => (
            <div
              key={inv._id}
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                padding: '12px 0',
                borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                gap: isMobile ? 8 : 0
              }}
            >
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 20 }}>
                  {inv.crop === 'Maize' ? '🌽' : inv.crop === 'Groundnut' ? '🥜' : '🌿'}
                </span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff' }}>
                    {inv.userId?.name || 'User'}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                    {inv.crop} · {inv.tier}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                <div style={{ fontWeight: 700, color: 'var(--gold)' }}>
                  ₦{inv.amount?.toLocaleString()}
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>
                  {inv.status?.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>

      </AdminLayout>
    </>
  );
}