import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import DashboardLayout from '../../components/layout/DashboardLayout';
import InvestmentCard from '../../components/dashboard/InvestmentCard';
import ReturnsGraph from '../../components/dashboard/ReturnsGraph';

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/investments')
      .then(r => r.json())
      .then(d => { setInvestments(d.investments || []); setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? investments : investments.filter(i => i.status === filter);

  return (
    <>
      <Head><title>My Investments — CIVORA FARMS</title></Head>
      <DashboardLayout title="My Investments">
        {/* Summary bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Invested', val: `₦${investments.reduce((s, i) => s + i.amount, 0).toLocaleString()}`, color: 'var(--gold)' },
            { label: 'Projected Returns', val: `₦${investments.reduce((s, i) => s + (i.projectedReturn || 0), 0).toLocaleString()}`, color: '#4caf50' },
            { label: 'Active Farms', val: investments.filter(i => i.status === 'active').length, color: 'var(--navy)' },
            { label: 'Harvested', val: investments.filter(i => i.status === 'harvested').length, color: 'var(--gold)' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', border: '1px solid #e8e8e8' }}>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: '#9a9a9a', fontWeight: 700, marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 900, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Returns chart */}
        {investments.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <ReturnsGraph investments={investments} />
          </div>
        )}

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['all', 'pending', 'active', 'harvested', 'cancelled'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: '8px 16px', borderRadius: 20, border: filter === f ? 'none' : '1px solid #e0e0e0', background: filter === f ? 'var(--gold)' : '#fff', color: filter === f ? 'var(--navy)' : '#9a9a9a', cursor: 'pointer', textTransform: 'uppercase' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#9a9a9a' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 12, padding: 80, textAlign: 'center', border: '1px solid #e8e8e8' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌾</div>
            <div style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>No investments found</div>
            <Link href="/invest" style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, letterSpacing: 3, color: 'var(--navy)', background: 'var(--gold)', padding: '14px 32px', borderRadius: 6, textDecoration: 'none' }}>
              INVEST NOW →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
            {filtered.map((inv, i) => <InvestmentCard key={inv._id} investment={inv} delay={i * 0.05} />)}
          </div>
        )}
      </DashboardLayout>
    </>
  );
}