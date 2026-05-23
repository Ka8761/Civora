
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || 'Reset failed'); setLoading(false); return; }
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
      <Head><title>Reset Password — CIVORA FARMS</title></Head>
      <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 420, zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 24, fontWeight: 800, letterSpacing: 5, color: 'var(--gold)' }}>CIVORA FARMS</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,146,26,0.15)', borderRadius: 16, padding: '40px 36px' }}>
            {!done ? (
              <>
                <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: 8 }}>Set New Password</h1>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginBottom: 28 }}>Choose a strong password for your account.</p>
                <form onSubmit={handleSubmit}>
                  {[{ label: 'New Password', key: 'password', placeholder: '8+ characters' }, { label: 'Confirm Password', key: 'confirm', placeholder: 'Repeat password' }].map((f) => (
                    <div className="form-group" key={f.key}>
                      <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>{f.label}</label>
                      <input className="form-input" type="password" value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} required style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                    </div>
                  ))}
                  <button type="submit" disabled={loading}
                    style={{ width: '100%', padding: '14px', background: loading ? 'rgba(201,146,26,0.5)' : 'var(--gold)', color: 'var(--navy)', fontFamily: "'Barlow Condensed'", fontSize: 14, fontWeight: 800, letterSpacing: 3, border: 'none', borderRadius: 8, cursor: loading ? 'default' : 'pointer' }}>
                    {loading ? 'RESETTING...' : 'RESET PASSWORD →'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 900, color: '#fff' }}>Password Reset!</h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 8 }}>Redirecting you to login...</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}