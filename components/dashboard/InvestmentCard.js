import { motion } from 'framer-motion';
import { format } from 'date-fns';

const STATUS_COLORS = {
  pending: { bg: 'rgba(234,179,8,0.1)', text: '#ca8a04', border: 'rgba(234,179,8,0.2)' },
  active: { bg: 'rgba(76,175,80,0.1)', text: '#4caf50', border: 'rgba(76,175,80,0.2)' },
  harvested: { bg: 'rgba(201,146,26,0.1)', text: 'var(--gold)', border: 'rgba(201,146,26,0.2)' },
  cancelled: { bg: 'rgba(239,68,68,0.1)', text: '#ef4444', border: 'rgba(239,68,68,0.2)' },
};

const CROP_ICONS = { Maize: '🌽', Groundnut: '🥜', Soybean: '🌿' };

export default function InvestmentCard({ investment, delay = 0 }) {
  const { crop, tier, amount, status, startDate, roiPercent, projectedReturn, farmLocation } = investment;
  const sc = STATUS_COLORS[status] || STATUS_COLORS.pending;
  const progress = roiPercent > 0 ? Math.min(roiPercent / 28 * 100, 100) : 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{
        background: '#fff', borderRadius: 12, border: '1px solid #e8e8e8',
        overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      whileHover={{ borderColor: 'var(--gold)', boxShadow: '0 6px 24px rgba(201,146,26,0.1)' }}
    >
      {/* Header */}
      <div style={{ background: 'var(--navy)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>{CROP_ICONS[crop] || '🌾'}</span>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 16, fontWeight: 800, letterSpacing: 2, color: '#fff' }}>{crop} Farm</div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,0.4)' }}>{tier} Tier</div>
          </div>
        </div>
        <div style={{ background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: 20, padding: '4px 12px' }}>
          <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: sc.text }}>
            {status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: '#9a9a9a', marginBottom: 4 }}>INVESTED</div>
            <div style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, color: 'var(--navy)' }}>₦{amount?.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: '#9a9a9a', marginBottom: 4 }}>PROJECTED RETURN</div>
            <div style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, color: 'var(--green-bright, #4caf50)' }}>
              ₦{(projectedReturn || amount)?.toLocaleString()}
            </div>
          </div>
        </div>

        {/* ROI progress */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 2, color: '#9a9a9a' }}>SEASON ROI</span>
            <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 12, fontWeight: 700, color: roiPercent > 0 ? '#4caf50' : '#9a9a9a' }}>{roiPercent > 0 ? `${roiPercent}%` : 'TBD'}</span>
          </div>
          <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: delay + 0.3 }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--gold), #4caf50)', borderRadius: 4 }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: 12, color: '#9a9a9a' }}>📍 {farmLocation}</div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, color: '#9a9a9a', letterSpacing: 1 }}>
            {startDate ? format(new Date(startDate), 'MMM yyyy') : '—'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

