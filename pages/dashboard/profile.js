import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ name: '', phone: '', state: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/user/profile')
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setForm({ name: d.user.name || '', phone: d.user.phone || '', state: d.user.state || '' });
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Profile — CIVORA FARMS</title>
      </Head>

      <DashboardLayout title="My Profile">
        <div style={{ maxWidth: 600 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, border: '1px solid #e8ece9', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#0b1f14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0b1f14' }}>{session?.user?.name}</div>
              <div style={{ fontSize: 13, color: '#6f7a75', marginTop: 4, wordBreak: 'break-word' }}>{session?.user?.email}</div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: '#1f6b3b', marginTop: 8, fontWeight: 700 }}>
                CIVORA INVESTOR
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 12, padding: 32, border: '1px solid #e8ece9' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#0b1f14', marginBottom: 24 }}>
              Edit Profile
            </div>

            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' },
              { label: 'Phone / WhatsApp', key: 'phone', type: 'tel', placeholder: '+234 000 000 0000' },
              { label: 'State of Residence', key: 'state', type: 'text', placeholder: 'e.g. Kaduna' },
            ].map((f) => (
              <div key={f.key} className="form-group">
                <label className="form-label" style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#0b1f14', marginBottom: 8 }}>
                  {f.label}
                </label>
                <input
                  className="form-input"
                  type={f.type}
                  value={form[f.key]}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{
                    width: '100%',
                    border: '1px solid #dfe5e1',
                    borderRadius: 10,
                    padding: '14px 16px',
                    marginBottom: 18,
                    fontFamily: 'Montserrat, sans-serif',
                    outline: 'none',
                  }}
                />
              </div>
            ))}

            <div className="form-group">
              <label className="form-label" style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#0b1f14', marginBottom: 8 }}>
                Email Address
              </label>
              <input
                className="form-input"
                type="email"
                value={session?.user?.email || ''}
                disabled
                style={{
                  width: '100%',
                  border: '1px solid #dfe5e1',
                  borderRadius: 10,
                  padding: '14px 16px',
                  marginBottom: 8,
                  fontFamily: 'Montserrat, sans-serif',
                  opacity: 0.6,
                  cursor: 'not-allowed',
                  background: '#f7f9f8',
                }}
              />
              <div style={{ fontSize: 12, color: '#6f7a75', marginBottom: 20 }}>
                Email cannot be changed. Contact support if needed.
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              style={{
                padding: '13px 32px',
                background: loading ? '#6a776f' : '#0f2f1d',
                color: '#fff',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 3,
                border: 'none',
                borderRadius: 8,
                cursor: loading ? 'default' : 'pointer',
              }}
            >
              {loading ? 'SAVING...' : 'SAVE CHANGES'}
            </button>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}