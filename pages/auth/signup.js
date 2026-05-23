
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const STATES = ['Kaduna','Abuja (FCT)','Lagos','Kano','Katsina','Sokoto','Zamfara','Niger','Plateau','Nasarawa','Bauchi','Gombe','Adamawa','Taraba','Borno','Yobe','Jigawa','Kebbi','Kwara','Kogi','Benue','Rivers','Delta','Enugu','Anambra','Imo','Abia','Ogun','Oyo','Osun','Ondo','Ekiti','Cross River','Akwa Ibom','Bayelsa','Edo','Outside Nigeria'];

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', state: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignup = async (e) => {
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
      toast.success('Account created! Signing you in...');
      await signIn('credentials', { redirect: false, email: form.email, password: form.password });
      router.push('/dashboard');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <>
      <Head><title>Create Account — CIVORA FARMS</title></Head>
      <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <div className="hero-bg-glow" />
          <div className="hero-dots" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 2 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 28, fontWeight: 800, letterSpacing: 5, color: 'var(--gold)' }}>CIVORA FARMS</div>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>CREATE YOUR INVESTOR ACCOUNT</div>
            </Link>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,146,26,0.15)', borderRadius: 16, padding: '40px 36px' }}>
            <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 4 }}>Start Investing</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 28 }}>Join thousands of Nigerian investors growing wealth through farmland.</p>

            <button onClick={handleGoogle} disabled={googleLoading}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, background: '#fff', border: 'none', borderRadius: 8, padding: '13px 20px', cursor: 'pointer', marginBottom: 20, fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: '#333' }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
              {googleLoading ? 'Connecting...' : 'Sign up with Google'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.3)' }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            </div>

            <form onSubmit={handleSignup}>
              {[
                { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'Your full name' },
                { label: 'Email Address *', key: 'email', type: 'email', placeholder: 'your@email.com' },
                { label: 'Phone / WhatsApp *', key: 'phone', type: 'tel', placeholder: '+234 000 000 0000' },
              ].map((field) => (
                <div className="form-group" key={field.key}>
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>{field.label}</label>
                  <input className="form-input" type={field.type} value={form[field.key]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))} placeholder={field.placeholder} required style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                </div>
              ))}

              <div className="form-group">
                <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>State of Residence</label>
                <select className="form-select" value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)', color: form.state ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                  <option value="">Select your state...</option>
                  {STATES.map(s => <option key={s} style={{ background: '#112240', color: '#fff' }}>{s}</option>)}
                </select>
              </div>

              {[
                { label: 'Password *', key: 'password', placeholder: '8+ characters' },
                { label: 'Confirm Password *', key: 'confirm', placeholder: 'Repeat password' },
              ].map((field) => (
                <div className="form-group" key={field.key}>
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>{field.label}</label>
                  <input className="form-input" type="password" value={form[field.key]} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))} placeholder={field.placeholder} required style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                </div>
              ))}

              <button type="submit" disabled={loading}
                style={{ width: '100%', marginTop: 8, padding: '15px', background: loading ? 'rgba(201,146,26,0.5)' : 'var(--gold)', color: 'var(--navy)', fontFamily: "'Barlow Condensed'", fontSize: 14, fontWeight: 800, letterSpacing: 3, border: 'none', borderRadius: 8, cursor: loading ? 'default' : 'pointer', transition: 'all 0.2s' }}>
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT →'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
            <p style={{ textAlign: 'center', marginTop: 12, fontFamily: "'Barlow Condensed'", fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>
              Already have an account?{' '}
              <Link href="/auth/login" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 700 }}>SIGN IN</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}


═══════════════════════════════════════════════════════════
FILE 39: pages/auth/forgot-password.js
═══════════════════════════════════════════════════════════

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