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
      .then((r) => r.json())
      .then((d) => {
        setInvestments(d.investments || []);
        setLoading(false);
      });
  }, []);

  const filtered = filter === 'all' ? investments : investments.filter((i) => i.status === filter);

  return (
    <>
      <Head>
        <title>My Investments — CIVORA FARMS</title>
      </Head>

      <style jsx>{`
        @media (max-width: 768px) {
          .dash-stats-grid {
            grid-template-columns: 1fr !important;
          }

          .dash-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <DashboardLayout title="My Investments">
        <div
          className="dash-stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            marginBottom: 28,
          }}
        >
          {[
            { label: 'Total Invested', val: `₦${investments.reduce((s, i) => s + (i.amount || 0), 0).toLocaleString()}`, color: '#0f2f1d' },
            { label: 'Projected Returns', val: `₦${investments.reduce((s, i) => s + (i.projectedReturn || 0), 0).toLocaleString()}`, color: '#1f6b3b' },
            { label: 'Active Farms', val: investments.filter((i) => i.status === 'active').length, color: '#0b1f14' },
            { label: 'Harvested', val: investments.filter((i) => i.status === 'harvested').length, color: '#1f6b3b' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', border: '1px solid #e8ece9' }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: '#6f7a75', fontWeight: 700, marginBottom: 8 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>
                {s.val}
              </div>
            </div>
          ))}
        </div>

        {investments.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <ReturnsGraph investments={investments} />
          </div>
        )}

        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 20,
            flexWrap: 'wrap',
          }}
        >
          {['all', 'pending', 'active', 'harvested', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                padding: '8px 16px',
                borderRadius: 20,
                border: filter === f ? 'none' : '1px solid #dfe5e1',
                background: filter === f ? '#0f2f1d' : '#fff',
                color: filter === f ? '#fff' : '#6f7a75',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#6f7a75' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 12, padding: 80, textAlign: 'center', border: '1px solid #e8ece9' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0b1f14', marginBottom: 12 }}>
              No investments found
            </div>
            <Link
              href="/invest"
              style={{
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 2,
                color: '#fff',
                background: '#0f2f1d',
                padding: '14px 28px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              INVEST NOW →
            </Link>
          </div>
        ) : (
          <div className="dash-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {filtered.map((inv, i) => (
              <InvestmentCard key={inv._id} investment={inv} delay={i * 0.05} />
            ))}
          </div>
        )}
      </DashboardLayout>
    </>
  );
}