import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || 'Request failed'); setLoading(false); return; }
      setSent(true);
      toast.success('Reset link sent! Check your email.');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Head><title>Forgot Password — CIVORA FARMS</title></Head>
      <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ position: 'absolute', inset: 0 }}><div className="hero-dots" /></div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 24, fontWeight: 800, letterSpacing: 5, color: 'var(--gold)' }}>CIVORA FARMS</div>
            </Link>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,146,26,0.15)', borderRadius: 16, padding: '40px 36px' }}>
            {!sent ? (
              <>
                <div style={{ fontSize: 40, textAlign: 'center', marginBottom: 16 }}>🔑</div>
                <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: 8 }}>Forgot Password?</h1>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginBottom: 28 }}>Enter your email address and we&apos;ll send you a reset link.</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Email Address</label>
                    <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                  </div>
                  <button type="submit" disabled={loading}
                    style={{ width: '100%', padding: '14px', background: loading ? 'rgba(201,146,26,0.5)' : 'var(--gold)', color: 'var(--navy)', fontFamily: "'Barlow Condensed'", fontSize: 14, fontWeight: 800, letterSpacing: 3, border: 'none', borderRadius: 8, cursor: loading ? 'default' : 'pointer' }}>
                    {loading ? 'SENDING...' : 'SEND RESET LINK →'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
                <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Check Your Email</h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                  We&apos;ve sent a password reset link to <strong style={{ color: 'var(--gold)' }}>{email}</strong>. The link expires in 1 hour.
                </p>
              </div>
            )}
            <p style={{ textAlign: 'center', marginTop: 24, fontFamily: "'Barlow Condensed'", fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>
              <Link href="/auth/login" style={{ color: 'var(--gold)', textDecoration: 'none' }}>← BACK TO LOGIN</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}