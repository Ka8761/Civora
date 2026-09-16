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
    fetch('/api/user/progress').then(r => r.json()).then(d => {
      if (d.user) setForm({ name: d.user.name || '', phone: d.user.phone || '', state: d.user.state || '' });
    });
  }, []);

  async function save(e) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/user/progress', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    toast.success('✅ Profile updated!');
  }

  return (
    <DashboardLayout title="Profile">
      <div style={{ maxWidth: 580 }}>
        {/* Avatar card */}
        <div className="wc" style={{ marginBottom: 16 }}>
          <div className="wcb">
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 900, color: 'var(--gold)', flexShrink: 0 }}>
                {session?.user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>{session?.user?.name}</div>
                <div style={{ fontSize: 13, color: '#9a9a9a', marginTop: 3 }}>{session?.user?.email}</div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: 'var(--gold)', marginTop: 7, fontWeight: 700 }}>FOUNDATION STUDENT · CC ORIENTATION</div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit form */}
        <div className="wc">
          <div className="wch"><div className="wct">Edit Profile</div></div>
          <div className="wcb">
            <form onSubmit={save}>
              <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>FULL NAME</label>
              <input className="fi" type="text" required
                style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 13 }}
                value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />

              <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>EMAIL ADDRESS</label>
              <input className="fi" type="email" disabled value={session?.user?.email || ''}
                style={{ background: '#f5f5f5', borderColor: '#e0e0e0', marginBottom: 4 }} />
              <div style={{ fontSize: 11, color: '#9a9a9a', fontStyle: 'italic', marginBottom: 13 }}>Email cannot be changed. Contact support if needed.</div>

              <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>PHONE NUMBER</label>
              <input className="fi" type="tel" placeholder="+234 000 000 0000"
                style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 13 }}
                value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />

              <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>STATE / LOCATION</label>
              <input className="fi" type="text" placeholder="e.g. Lagos, Nigeria"
                style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 16 }}
                value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} />

              <button type="submit" className="bs bs-g" disabled={loading}>
                {loading ? 'SAVING…' : 'SAVE CHANGES'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
