import { useState } from 'react';

export default function SupportButton() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 26, right: 26, zIndex: 1000 }}>
      {open && (
        <div style={{ position: 'absolute', bottom: 68, right: 0, background: '#112240', border: '1px solid rgba(201,146,26,0.3)', borderRadius: 12, padding: 17, width: 244, boxShadow: '0 20px 56px rgba(0,0,0,0.4)', animation: 'slideUp 0.25s ease' }}>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: 'rgba(201,146,26,0.68)', marginBottom: 9 }}>STUDENT SUPPORT</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)', marginBottom: 13, lineHeight: 1.6 }}>Need help? Our team is available Mon–Fri, 9am–6pm.</div>
          <a href="https://wa.me/2340000000000" target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', padding: '10px 13px', borderRadius: 8, textDecoration: 'none', fontFamily: "'Barlow Condensed'", fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 7 }}>
            💬 WHATSAPP US
          </a>
          <a href="mailto:info@coligfoundation.org"
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(201,146,26,0.1)', border: '1px solid rgba(201,146,26,0.3)', color: 'var(--gold)', padding: '10px 13px', borderRadius: 8, textDecoration: 'none', fontFamily: "'Barlow Condensed'", fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>
            📧 EMAIL SUPPORT
          </a>
        </div>
      )}
      <button className="support-btn" onClick={() => setOpen(!open)}>
        {open ? '✕' : '💬'}
      </button>
    </div>
  );
}

