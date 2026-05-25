import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import connectDB from '../../lib/mongodb';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { redirect } = router.query;
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await connectDB();
    console.log('connected to mongodb')
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (res?.error) {
      toast.error('Invalid email or password');
    } else {
      toast.success('Welcome back!');
      router.push(redirect || '/dashboard');
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn('google', { callbackUrl: redirect || '/dashboard' });
  };

  return (
    <>
      <Head><title>Login — CIVORA FARMS</title></Head>
      <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <div className="hero-bg-glow" />
          <div className="hero-bg-glow2" />
          <div className="hero-dots" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 2 }}
        >
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 28, fontWeight: 800, letterSpacing: 5, color: 'var(--gold)' }}>CIVORA FARMS</div>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>INVESTOR PORTAL</div>
            </Link>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,146,26,0.15)', borderRadius: 16, padding: '40px 36px', backdropFilter: 'blur(10px)' }}>
            <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 6 }}>Welcome back</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 28 }}>Sign in to your investor account</p>

            {/* Google */}
            <button onClick={handleGoogle} disabled={googleLoading}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, background: '#fff', border: 'none', borderRadius: 8, padding: '13px 20px', cursor: 'pointer', marginBottom: 24, fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: '#333', transition: 'opacity 0.2s' }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
              {googleLoading ? 'Connecting...' : 'Continue with Google'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.3)' }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Email Address</label>
                <input className="form-input" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" required style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Password</label>
                <input className="form-input" type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" required style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>

              <div style={{ textAlign: 'right', marginBottom: 20, marginTop: -8 }}>
                <Link href="/auth/forgot-password" style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 2, color: 'var(--gold)', textDecoration: 'none' }}>
                  FORGOT PASSWORD?
                </Link>
              </div>

              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '15px', background: loading ? 'rgba(201,146,26,0.5)' : 'var(--gold)', color: 'var(--navy)', fontFamily: "'Barlow Condensed'", fontSize: 14, fontWeight: 800, letterSpacing: 3, border: 'none', borderRadius: 8, cursor: loading ? 'default' : 'pointer', transition: 'all 0.2s' }}>
                {loading ? 'SIGNING IN...' : 'SIGN IN →'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: 24, fontFamily: "'Barlow Condensed'", fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 700 }}>SIGN UP</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}