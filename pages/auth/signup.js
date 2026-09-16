import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';
import toast from 'react-hot-toast';

const STATES = ['Kaduna','Abuja (FCT)','Lagos','Kano','Rivers','Delta','Oyo','Enugu','Anambra','Imo','Abia','Ogun','Osun','Ondo','Ekiti','Cross River','Akwa Ibom','Bayelsa','Edo','Katsina','Sokoto','Borno','Adamawa','Taraba','Gombe','Bauchi','Plateau','Nasarawa','Niger','Kwara','Kogi','Benue','Zamfara','Jigawa','Kebbi','Yobe','Outside Nigeria'];

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', state: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, state: form.state, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || 'Signup failed'); setLoading(false); return; }
      toast.success('Account created! Signing you in…');
      await signIn('credentials', { redirect: false, email: form.email, password: form.password });
      router.push('/dashboard');
    } catch {
      toast.error('Something went wrong. Try again.');
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    await signIn('google', { callbackUrl: '/dashboard' });
  }

  return (
    <>
      <Head><title>Enrol — COLIG Leadership Foundation School</title></Head>
      <div className="auth-wrap">
        <div className="auth-glow" />
        <div className="auth-card" style={{ maxWidth: 480 }}>
          <div className="auth-logo">COLIG FOUNDATION</div>
          <div className="auth-sub">BEGIN YOUR JOURNEY</div>
          <div className="auth-h">Create Account</div>
          <div className="auth-p">Join COLIG Leadership Foundation School — free</div>

          <button type="button" className="gbtn" onClick={handleGoogle} disabled={googleLoading}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.87 2.7-6.62z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.16.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z"/>
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"/>
            </svg>
            {googleLoading ? 'REDIRECTING…' : 'SIGN UP WITH GOOGLE'}
          </button>

          <div className="auth-divider"><span>OR SIGN UP WITH EMAIL</span></div>

          <form onSubmit={handleSubmit}>
            <div className="fgr">
              <div>
                <label className="flbl">Full Name *</label>
                <input className="fi" type="text" required placeholder="Your full name"
                  value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className="flbl">Phone *</label>
                <input className="fi" type="tel" required placeholder="+234 000 000 0000"
                  value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
              </div>
            </div>

            <label className="flbl">Email Address *</label>
            <input className="fi" type="email" required placeholder="your@email.com"
              value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />

            <label className="flbl">State of Residence</label>
            <select className="fi" value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))}
              style={{ appearance: 'none', cursor: 'pointer' }}>
              <option value="">Select your state…</option>
              {STATES.map(s => <option key={s} value={s} style={{ background: '#112240' }}>{s}</option>)}
            </select>

            <div className="fgr">
              <div>
                <label className="flbl">Password *</label>
                <input className="fi" type="password" required placeholder="8+ characters"
                  value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
              </div>
              <div>
                <label className="flbl">Confirm Password *</label>
                <input className="fi" type="password" required placeholder="Repeat password"
                  value={form.confirm} onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))} />
              </div>
            </div>

            <button type="submit" className="bprim" disabled={loading}>
              {loading ? 'CREATING ACCOUNT…' : 'CREATE ACCOUNT →'}
            </button>
          </form>

          <div className="msw" style={{ marginTop: 16 }}>
            Already enrolled? <Link href="/auth/login">SIGN IN</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gbtn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px;
          background: #fff;
          color: #1a1a2e;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1.5px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 8px;
          cursor: pointer;
          margin-top: 18px;
        }
        .gbtn:disabled {
          opacity: 0.7;
          cursor: default;
        }
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 18px 0;
        }
        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }
        .auth-divider span {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.35);
          white-space: nowrap;
        }
      `}</style>
    </>
  );
}