
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function ReturnsGraph({ investments }) {
  const data = investments?.map((inv) => ({
    name: `${inv.crop} ${new Date(inv.startDate).getMonth() + 1}/${new Date(inv.startDate).getFullYear()}`,
    invested: inv.amount,
    projected: inv.projectedReturn || 0,
    roi: inv.roiPercent || 0,
  })) || [];

  if (data.length === 0) {
    return (
      <div style={{ background: '#fff', borderRadius: 12, padding: 40, textAlign: 'center', border: '1px solid #e8e8e8' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🌱</div>
        <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, color: '#9a9a9a', letterSpacing: 1 }}>No investments yet — make your first investment to see your returns here.</div>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '28px 24px', border: '1px solid #e8e8e8' }}>
      <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: 'var(--gold)', fontWeight: 700, marginBottom: 4 }}>RETURNS OVERVIEW</div>
      <div style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 20 }}>Investment vs Projected Returns</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={6}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9a9a9a' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#9a9a9a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₦${(v/1000).toFixed(0)}K`} />
          <Tooltip formatter={(v, n) => [`₦${v?.toLocaleString()}`, n]} />
          <Bar dataKey="invested" name="Invested" fill="#c9921a" radius={[4,4,0,0]} />
          <Bar dataKey="projected" name="Projected Return" fill="#4caf50" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
