import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { redirect } = router.query;

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

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
    await signIn('google', {
      callbackUrl: redirect || '/dashboard',
    });
  };

  return (
    <>
      <Head>
        <title>Login — CIVORA FARMS</title>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <div
        style={{
          minHeight: '100dvh',
          width: '100vw',
          background: '#071a12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          position: 'relative',
          overflowY: 'auto',
          overflowX: 'hidden',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        <div
          style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <div className="hero-bg-glow" />
          <div className="hero-bg-glow2" />
          <div className="hero-dots" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            maxWidth: 440,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: 30,
            }}
          >
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: 3,
                  color: '#ffffff',
                }}
              >
                CIVORA FARMS
              </div>

              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 3,
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: 5,
                }}
              >
                INVESTOR PORTAL
              </div>
            </Link>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              padding: '32px 24px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
            }}
          >
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: 8,
              }}
            >
              Welcome Back
            </h1>

            <p
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 28,
              }}
            >
              Sign in to continue
            </p>

            <button
              onClick={handleGoogle}
              disabled={googleLoading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                background: '#ffffff',
                border: 'none',
                borderRadius: 10,
                padding: '14px',
                cursor: 'pointer',
                marginBottom: 24,
                fontSize: 14,
                fontWeight: 600,
                color: '#111',
              }}
            >
              {googleLoading
                ? 'Connecting...'
                : 'Continue with Google'}
            </button>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 8,
                    color: '#ffffff',
                    fontSize: 14,
                  }}
                >
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      email: e.target.value,
                    }))
                  }
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#ffffff',
                    outline: 'none',
                    fontSize: 14,
                  }}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 8,
                    color: '#ffffff',
                    fontSize: 14,
                  }}
                >
                  Password
                </label>

                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#ffffff',
                    outline: 'none',
                    fontSize: 14,
                  }}
                />
              </div>

              <div
                style={{
                  textAlign: 'right',
                  marginBottom: 22,
                }}
              >
                <Link
                  href="/auth/forgot-password"
                  style={{
                    color: '#7fffb0',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: loading
                    ? '#166b47'
                    : '#1f8f5f',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {loading
                  ? 'SIGNING IN...'
                  : 'SIGN IN'}
              </button>
            </form>

            <p
              style={{
                textAlign: 'center',
                marginTop: 24,
                color: 'rgba(255,255,255,0.7)',
                fontSize: 14,
              }}
            >
              Don&apos;t have an account?{' '}

              <Link
                href="/auth/signup"
                style={{
                  color: '#7fffb0',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}