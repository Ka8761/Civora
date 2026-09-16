import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match.'); return; }
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || 'Reset failed.'); setLoading(false); return; }
      setDone(true);
      toast.success('Password reset successfully!');
      setTimeout(() => router.push('/auth/login'), 2000);
    } catch {
      toast.error('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <>
      <Head><title>Reset Password — COLIG Foundation School</title></Head>
      <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div className="hero-dots" />
        <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 2 }}>
          <div style={{ background: 'rgba(10,22,40,0.98)', border: '1px solid rgba(201,146,26,0.22)', borderRadius: 16, padding: '38px 34px' }}>
            {!done ? (
              <>
                <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: 8 }}>Set New Password</h1>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', textAlign: 'center', marginBottom: 22 }}>Choose a strong new password for your account.</p>
                <form onSubmit={handleSubmit}>
                  <label className="form-label">New Password</label>
                  <input className="form-input" type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="8+ characters" required />
                  <label className="form-label">Confirm Password</label>
                  <input className="form-input" type="password" value={form.confirm} onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))} placeholder="Repeat password" required />
                  <button type="submit" disabled={loading}
                    style={{ width: '100%', padding: 14, background: loading ? 'rgba(201,146,26,0.5)' : 'var(--gold)', color: 'var(--navy)', fontFamily: "'Barlow Condensed'", fontSize: 14, fontWeight: 800, letterSpacing: 3, border: 'none', borderRadius: 8, cursor: loading ? 'default' : 'pointer' }}>
                    {loading ? 'RESETTING...' : 'RESET PASSWORD →'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 14 }}></div>
                <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 900, color: '#fff' }}>Password Reset!</h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 10 }}>Redirecting you to login...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}