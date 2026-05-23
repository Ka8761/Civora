import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportButton() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 1000 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            style={{
              position: 'absolute', bottom: 68, right: 0,
              background: '#112240', border: '1px solid rgba(201,146,26,0.3)',
              borderRadius: 12, padding: 20, width: 260,
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 3, color: 'rgba(201,146,26,0.7)', marginBottom: 12 }}>INVESTOR SUPPORT</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 16, lineHeight: 1.6 }}>
              Need help? Our team is available 8am–8pm daily.
            </div>
            <a
              href="https://wa.me/2349030117888"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', padding: '10px 14px', borderRadius: 8, textDecoration: 'none', marginBottom: 8, fontSize: 13, fontWeight: 700 }}
            >
              💬 WhatsApp Us
            </a>
            <a
              href="tel:+2349030117888"
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(201,146,26,0.1)', border: '1px solid rgba(201,146,26,0.3)', color: 'var(--gold)', padding: '10px 14px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 700 }}
            >
              📞 Call: +234 903 011 7888
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 56, height: 56, borderRadius: '50%',
          background: open ? '#0a1628' : 'var(--gold)',
          border: open ? '2px solid var(--gold)' : 'none',
          cursor: 'pointer', fontSize: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(201,146,26,0.4)',
        }}
      >
        {open ? '✕' : '💬'}
      </motion.button>
    </div>
  );
}
