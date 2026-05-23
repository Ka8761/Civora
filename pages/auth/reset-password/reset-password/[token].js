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


═══════════════════════════════════════════════════════════
FILE 41: pages/api/auth/[...nextauth].js
═══════════════════════════════════════════════════════════

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email.toLowerCase() });
        if (!user || !user.password) return null;
        const valid = await user.comparePassword(credentials.password);
        if (!valid) return null;
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        await connectDB();
        const existing = await User.findOne({ email: user.email });
        if (!existing) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: 'google',
            emailVerified: true,
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.phone = dbUser.phone;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);


═══════════════════════════════════════════════════════════
FILE 42: pages/api/auth/signup.js
═══════════════════════════════════════════════════════════

import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { sendWelcomeEmail } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectDB();

  const { name, email, phone, state, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password are required' });

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(400).json({ error: 'An account with this email already exists' });

  try {
    const user = await User.create({ name, email: email.toLowerCase(), phone, state, password, provider: 'credentials' });
    await sendWelcomeEmail(email, name).catch(console.error);
    return res.status(201).json({ success: true, userId: user._id.toString() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create account' });
  }
}


═══════════════════════════════════════════════════════════
FILE 43: pages/api/auth/forgot-password.js
═══════════════════════════════════════════════════════════

import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { generateToken, sendPasswordResetEmail } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectDB();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const user = await User.findOne({ email: email.toLowerCase() });

  // Always return 200 to prevent email enumeration
  if (!user) return res.status(200).json({ success: true });

  const token = generateToken();
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
  await user.save();

  try {
    await sendPasswordResetEmail(user.email, token, user.name);
  } catch (err) {
    console.error('Email failed:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }

  return res.status(200).json({ success: true });
}
