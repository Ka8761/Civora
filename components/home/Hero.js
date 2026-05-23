import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-bg-glow"></div>
      <div className="hero-bg-glow2"></div>
      <div className="hero-dots"></div>
      <div className="hero-lines"></div>

      {/* NAV PLACEHOLDER - real nav is fixed above */}
      <div style={{ height: 72 }} />

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="hero-eyebrow">Kaduna State, Nigeria · Launching 2026</div>
        </motion.div>

        <motion.h1
          className="hero-h1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Your Money Deserves<em>Real Soil.</em>
        </motion.h1>

        <motion.div
          className="hero-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          CIVORA FARMS is a <strong>Kaduna-based agricultural investment platform</strong> where everyday Nigerians invest in verified farmland and earn real returns at harvest. Starting from just <strong>₦50,000.</strong> Legal. Insured. Transparent.
        </motion.p>

        <motion.div
          style={{ display: 'flex', gap: 16, marginTop: 44, flexWrap: 'wrap', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <Link href="/invest" className="hero-cta">
            Invest Now →
          </Link>
          <button className="hero-cta" onClick={scrollToRegister} style={{ background: 'transparent', border: '2px solid rgba(201,146,26,0.5)', color: 'var(--gold)' }}>
            Register Interest
          </button>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        className="stats-bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {[
          { val: '₦50K', lbl: 'Minimum Investment' },
          { val: '20–28%', lbl: 'Projected Returns / Season' },
          { val: '4–6M', lbl: 'Season Duration' },
          { val: '70/20/10', lbl: 'Profit Split Model' },
        ].map((s, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-val">{s.val}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
