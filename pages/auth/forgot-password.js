import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSent(true);
    toast.success('Reset link sent! Check your email.');
  }

  return (
    <>
      <Head><title>Forgot Password — COLIG LFS</title></Head>
      <div className="auth-wrap">
        <div className="auth-glow" />
        <div className="auth-card">
          <div className="auth-logo">COLIG FOUNDATION</div>
          <div style={{ fontSize: 40, textAlign: 'center', margin: '16px 0' }}>🔑</div>

          {!sent ? (
            <>
              <div className="auth-h" style={{ textAlign: 'center' }}>Forgot Password?</div>
              <div className="auth-p" style={{ textAlign: 'center' }}>Enter your email — we'll send a reset link</div>
              <form onSubmit={handleSubmit}>
                <label className="flbl">Email Address</label>
                <input className="fi" type="email" required placeholder="your@email.com"
                  value={email} onChange={e => setEmail(e.target.value)} />
                <button type="submit" className="bprim" disabled={loading}>
                  {loading ? 'SENDING…' : 'SEND RESET LINK →'}
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Check Your Email</div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                We sent a reset link to <strong style={{ color: 'var(--gold)' }}>{email}</strong>. It expires in 1 hour.
              </p>
            </div>
          )}

          <div className="msw" style={{ marginTop: 20 }}>
            <Link href="/auth/login">← BACK TO LOGIN</Link>
          </div>
        </div>
      </div>
    </>
  );
}

