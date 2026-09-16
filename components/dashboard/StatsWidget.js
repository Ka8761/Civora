import { motion } from 'framer-motion';

export default function StatsWidget({
  icon,
  label,
  value,
  sub,
  color = '#c9921a',
  delay = 0,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay,
      }}
      whileHover={{
        y: -3,
      }}
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '22px 20px',
        backdropFilter: 'blur(15px)',
      }}
    >
      <div
        style={{
          fontSize: 25,
          marginBottom: 12,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 10,
          letterSpacing: 2.5,
          color: 'rgba(255,255,255,0.4)',
          fontWeight: 700,
          marginBottom: 7,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 27,
          fontWeight: 800,
          color,
        }}
      >
        {value}
      </div>

      {sub && (
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            marginTop: 6,
            letterSpacing: 1,
          }}
        >
          {sub}
        </div>
      )}
    </motion.div>
  );
}