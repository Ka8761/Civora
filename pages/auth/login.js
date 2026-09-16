import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', { redirect: false, email: form.email, password: form.password });
    setLoading(false);
    if (res?.error) { toast.error('Invalid email or password'); return; }
    toast.success('Welcome back! 🙏');
    router.push('/dashboard');
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    await signIn('google', { callbackUrl: '/dashboard' });
  }

  return (
    <>
      <Head><title>Login — COLIG Leadership Foundation School</title></Head>
      <div className="auth-wrap">
        <div className="auth-glow" />
        <div className="auth-card">
          <div className="auth-logo">COLIG FOUNDATION</div>
          <div className="auth-sub">LEADERSHIP FOUNDATION SCHOOL</div>
          <div className="auth-h">Welcome Back</div>
          <div className="auth-p">Sign in to continue your discipleship journey</div>

          <button type="button" className="gbtn" onClick={handleGoogle} disabled={googleLoading}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.87 2.7-6.62z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.16.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z"/>
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"/>
            </svg>
            {googleLoading ? 'REDIRECTING…' : 'SIGN IN WITH GOOGLE'}
          </button>

          <div className="auth-divider"><span>OR SIGN IN WITH EMAIL</span></div>

          <form onSubmit={handleSubmit}>
            <label className="flbl">Email Address</label>
            <input className="fi" type="email" required placeholder="your@email.com"
              value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />

            <label className="flbl">Password</label>
            <input className="fi" type="password" required placeholder="••••••••"
              value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />

            <div style={{ textAlign: 'right', marginBottom: 18, marginTop: -6 }}>
              <Link href="/auth/forgot-password" style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 2, color: 'var(--gold)', textDecoration: 'none' }}>
                FORGOT PASSWORD?
              </Link>
            </div>

            <button type="submit" className="bprim" disabled={loading}>
              {loading ? 'SIGNING IN…' : 'SIGN IN →'}
            </button>
          </form>

          <div className="msw" style={{ marginTop: 20 }}>
            Not enrolled?{' '}
            <Link href="/auth/signup">CREATE ACCOUNT</Link>
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