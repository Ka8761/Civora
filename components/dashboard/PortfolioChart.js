import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#112240', border: '1px solid rgba(201,146,26,0.3)', borderRadius: 8, padding: '12px 16px' }}>
        <p style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 2, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ fontSize: 13, color: entry.color, fontWeight: 600, margin: '4px 0' }}>
            {entry.name}: ₦{entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PortfolioChart({ data }) {
  const chartData = data?.length > 0 ? data : [
    { month: 'Jan', invested: 0, value: 0 },
    { month: 'Feb', invested: 50000, value: 50000 },
    { month: 'Mar', invested: 50000, value: 53000 },
    { month: 'Apr', invested: 100000, value: 106000 },
    { month: 'May', invested: 100000, value: 110000 },
    { month: 'Jun', invested: 100000, value: 125000 },
  ];

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '28px 24px', border: '1px solid #e8e8e8' }}>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: 'var(--gold)', fontWeight: 700, marginBottom: 4 }}>PORTFOLIO PERFORMANCE</div>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>Investment Growth</div>
        </div>
        <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 2, color: 'rgba(0,0,0,0.35)', border: '1px solid #e0e0e0', padding: '4px 12px', borderRadius: 20 }}>LIVE</div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c9921a" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#c9921a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4caf50" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "'Barlow Condensed'", fill: '#9a9a9a', letterSpacing: 1 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fontFamily: "'Barlow Condensed'", fill: '#9a9a9a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₦${(v/1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 1 }} />
          <Area type="monotone" dataKey="invested" name="Invested" stroke="#c9921a" strokeWidth={2} fill="url(#colorInvested)" />
          <Area type="monotone" dataKey="value" name="Portfolio Value" stroke="#4caf50" strokeWidth={2} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}