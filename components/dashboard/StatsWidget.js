import { motion } from 'framer-motion';

export default function StatsWidget({ icon, label, value, sub, color = 'var(--gold)', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{
        background: '#fff', borderRadius: 12, padding: '24px 20px',
        border: '1px solid #e8e8e8', transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      whileHover={{ borderColor: color, boxShadow: `0 4px 20px ${color}20` }}
    >
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: '#9a9a9a', fontWeight: 700, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Playfair Display'", fontSize: 28, fontWeight: 900, color, lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, color: '#9a9a9a', marginTop: 6, letterSpacing: 1 }}>
          {sub}
        </div>
      )}
    </motion.div>
  );
}

