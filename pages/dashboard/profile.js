import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'head';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ name: '', phone: '', state: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/user/profile')
      .then(r => r.json())
      .then(d => {
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
      <Head><title>Profile — CIVORA FARMS</title></Head>
      <DashboardLayout title="My Profile">
        <div style={{ maxWidth: 600 }}>
          {/* Avatar */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, border: '1px solid #e8e8e8', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 900, color: 'var(--gold)', flexShrink: 0 }}>
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, color: 'var(--navy)' }}>{session?.user?.name}</div>
              <div style={{ fontSize: 13, color: '#9a9a9a', marginTop: 4 }}>{session?.user?.email}</div>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: 'var(--gold)', marginTop: 8, fontWeight: 700 }}>
                CIVORA INVESTOR
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, border: '1px solid #e8e8e8' }}>
            <div style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 24 }}>Edit Profile</div>
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' },
              { label: 'Phone / WhatsApp', key: 'phone', type: 'tel', placeholder: '+234 000 000 0000' },
              { label: 'State of Residence', key: 'state', type: 'text', placeholder: 'e.g. Kaduna' },
            ].map((f) => (
              <div key={f.key} className="form-group">
                <label className="form-label">{f.label}</label>
                <input className="form-input" type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} />
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" value={session?.user?.email || ''} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
              <div className="form-disclaimer">Email cannot be changed. Contact support if needed.</div>
            </div>
            <button onClick={handleSave} disabled={loading}
              style={{ padding: '13px 32px', background: loading ? 'rgba(10,22,40,0.5)' : 'var(--navy)', color: '#fff', fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, letterSpacing: 3, border: 'none', borderRadius: 8, cursor: loading ? 'default' : 'pointer' }}>
              {loading ? 'SAVING...' : 'SAVE CHANGES'}
            </button>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

