import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const STATES = [
  'Kaduna','Abuja (FCT)','Lagos','Kano','Katsina','Sokoto','Zamfara',
  'Niger','Plateau','Nasarawa','Bauchi','Gombe','Adamawa','Taraba',
  'Borno','Yobe','Jigawa','Kebbi','Kwara','Kogi','Benue','Rivers',
  'Delta','Enugu','Anambra','Imo','Abia','Ogun','Oyo','Osun','Ondo',
  'Ekiti','Cross River','Akwa Ibom','Bayelsa','Edo','Outside Nigeria'
];

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    password: '',
    confirm: '',
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }

    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          state: form.state,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      toast.success('Account created! Signing you in...');

      await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      router.push('/dashboard');

    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);

    await signIn('google', {
      callbackUrl: '/dashboard',
    });
  };

  return (
    <>
      <Head>
        <title>Create Account — CIVORA FARMS</title>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <div
        style={{
          minHeight: '100vh',
          background:
            'linear-gradient(180deg, #04130d 0%, #0b2419 45%, #163828 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* BACKGROUND */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <div className="hero-bg-glow" />
          <div className="hero-bg-glow2" />
          <div className="hero-dots" />
        </div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            width: '100%',
            maxWidth: 500,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* LOGO */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 24,
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(24px, 6vw, 30px)',
                  fontWeight: 900,
                  letterSpacing: 4,
                  color: 'var(--gold)',
                }}
              >
                CIVORA FARMS
              </div>

              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10,
                  letterSpacing: 4,
                  color: 'rgba(255,255,255,0.35)',
                  marginTop: 6,
                }}
              >
                CREATE YOUR INVESTOR ACCOUNT
              </div>
            </Link>
          </div>

          {/* FORM BOX */}
          <div
            style={{
              background: 'rgba(7, 28, 20, 0.72)',
              border: '1px solid rgba(76, 175, 80, 0.18)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderRadius: 22,
              padding: '32px 28px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
            }}
          >
            {/* HEADING */}
            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(26px, 6vw, 32px)',
                fontWeight: 900,
                color: '#fff',
                marginBottom: 8,
                lineHeight: 1.1,
              }}
            >
              Start Investing
            </h1>

            <p
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.58)',
                marginBottom: 28,
                lineHeight: 1.7,
              }}
            >
              Join thousands of Nigerian investors growing wealth through
              farmland opportunities.
            </p>

            {/* GOOGLE BUTTON */}
            <button
              onClick={handleGoogle}
              disabled={googleLoading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                padding: '15px 18px',
                cursor: 'pointer',
                marginBottom: 22,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: '#ffffff',
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                  fill="#34A853"
                />
                <path
                  d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                  fill="#EA4335"
                />
              </svg>

              {googleLoading
                ? 'Connecting...'
                : 'Continue with Google'}
            </button>

            {/* DIVIDER */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: 'rgba(255,255,255,0.08)',
                }}
              />

              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10,
                  letterSpacing: 3,
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                OR
              </span>

              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: 'rgba(255,255,255,0.08)',
                }}
              />
            </div>

            {/* FORM */}
            <form onSubmit={handleSignup}>
              {[
                {
                  label: 'Full Name *',
                  key: 'name',
                  type: 'text',
                  placeholder: 'Your full name',
                },
                {
                  label: 'Email Address *',
                  key: 'email',
                  type: 'email',
                  placeholder: 'your@email.com',
                },
                {
                  label: 'Phone / WhatsApp *',
                  key: 'phone',
                  type: 'tel',
                  placeholder: '+234 000 000 0000',
                },
              ].map((field) => (
                <div
                  key={field.key}
                  style={{
                    marginBottom: 18,
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      marginBottom: 8,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 2,
                      color: 'rgba(255,255,255,0.65)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {field.label}
                  </label>

                  <input
                    type={field.type}
                    required
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        [field.key]: e.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      height: 54,
                      borderRadius: 14,
                      border: '1.5px solid rgba(76, 175, 80, 0.14)',
                      background: 'rgba(255,255,255,0.04)',
                      padding: '0 16px',
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: "'Montserrat', sans-serif",
                      outline: 'none',
                    }}
                  />
                </div>
              ))}

              {/* STATE */}
              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 8,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 2,
                    color: 'rgba(255,255,255,0.65)',
                    textTransform: 'uppercase',
                  }}
                >
                  State of Residence
                </label>

                <select
                  value={form.state}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      state: e.target.value,
                    }))
                  }
                  style={{
                    width: '100%',
                    height: 54,
                    borderRadius: 14,
                    border: '1.5px solid rgba(76, 175, 80, 0.14)',
                    background: 'rgba(255,255,255,0.04)',
                    padding: '0 16px',
                    color: form.state
                      ? '#fff'
                      : 'rgba(255,255,255,0.4)',
                    fontSize: 14,
                    fontFamily: "'Montserrat', sans-serif",
                    outline: 'none',
                  }}
                >
                  <option value="">Select your state...</option>

                  {STATES.map((s) => (
                    <option
                      key={s}
                      style={{
                        background: '#163828',
                        color: '#fff',
                      }}
                    >
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* PASSWORDS */}
              {[
                {
                  label: 'Password *',
                  key: 'password',
                  placeholder: '8+ characters',
                },
                {
                  label: 'Confirm Password *',
                  key: 'confirm',
                  placeholder: 'Repeat password',
                },
              ].map((field) => (
                <div
                  key={field.key}
                  style={{
                    marginBottom: 18,
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      marginBottom: 8,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 2,
                      color: 'rgba(255,255,255,0.65)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {field.label}
                  </label>

                  <input
                    type="password"
                    required
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        [field.key]: e.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      height: 54,
                      borderRadius: 14,
                      border: '1.5px solid rgba(76, 175, 80, 0.14)',
                      background: 'rgba(255,255,255,0.04)',
                      padding: '0 16px',
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: "'Montserrat', sans-serif",
                      outline: 'none',
                    }}
                  />
                </div>
              ))}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  height: 56,
                  marginTop: 8,
                  borderRadius: 14,
                  border: 'none',
                  cursor: loading ? 'default' : 'pointer',
                  background: loading
                    ? 'rgba(76, 175, 80, 0.45)'
                    : 'linear-gradient(135deg, #2d6a35 0%, #4caf50 45%, #d4af37 100%)',
                  color: '#ffffff',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: 2,
                  transition: 'all 0.2s ease',
                }}
              >
                {loading
                  ? 'CREATING ACCOUNT...'
                  : 'CREATE ACCOUNT →'}
              </button>
            </form>

            {/* FOOTER */}
            <p
              style={{
                textAlign: 'center',
                marginTop: 20,
                fontSize: 11,
                color: 'rgba(255,255,255,0.32)',
                lineHeight: 1.7,
              }}
            >
              By signing up, you agree to our Terms of Service and
              Privacy Policy.
            </p>

            <p
              style={{
                textAlign: 'center',
                marginTop: 14,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 12,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: 1,
              }}
            >
              Already have an account?{' '}
              <Link
                href="/auth/login"
                style={{
                  color: 'var(--gold)',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                SIGN IN
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getSession } = await import('next-auth/react');

  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}