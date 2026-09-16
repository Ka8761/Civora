import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function PrayerPage() {
  const [prayers,  setPrayers]  = useState([]);
  const [form,     setForm]     = useState({ title: '', text: '' });
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    fetch('/api/prayer').then(r => r.json()).then(d => setPrayers(d.prayers || []));
  }, []);

  async function addPrayer(e) {
    e.preventDefault();
    if (!form.title || !form.text) { toast.error('Fill in both fields'); return; }
    setLoading(true);
    const res  = await fetch('/api/prayer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    setPrayers(p => [data.prayer, ...p]);
    setForm({ title: '', text: '' });
    setLoading(false);
    toast.success('🙏 Prayer logged!');
  }

  async function markAnswered(id) {
    await fetch('/api/prayer', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setPrayers(p => p.map(x => x._id === id ? { ...x, answered: true } : x));
    toast.success('🙌 Praise God — marked as answered!');
  }

  return (
    <DashboardLayout title="Prayer Log">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="pg-t">Prayer Log</div>
          <div className="pg-s">COLIG FOUNDATION · STUDENT PORTAL</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="sc" style={{ padding: '13px 18px', minWidth: 90, textAlign: 'center' }}>
            <div className="sc-l">REQUESTS</div>
            <div className="sc-v" style={{ fontSize: 22, color: 'var(--pl)' }}>{prayers.length}</div>
          </div>
          <div className="sc" style={{ padding: '13px 18px', minWidth: 90, textAlign: 'center' }}>
            <div className="sc-l">ANSWERED</div>
            <div className="sc-v" style={{ fontSize: 22, color: 'var(--gb)' }}>{prayers.filter(p => p.answered).length}</div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="prform">
        <div style={{ fontFamily: "'Playfair Display'", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 13 }}>Add New Prayer Request 🙏</div>
        <form onSubmit={addPrayer}>
          <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>PRAYER TITLE</label>
          <input className="fi" type="text" required placeholder="e.g. Healing for my father"
            style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 11 }}
            value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
          <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>YOUR PRAYER</label>
          <textarea className="rta" required placeholder="Write your prayer request here…" style={{ marginBottom: 12 }}
            value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))} />
          <button type="submit" className="bs bs-g" disabled={loading}>
            {loading ? 'SAVING…' : 'LOG PRAYER →'}
          </button>
        </form>
      </div>

      {/* List */}
      {prayers.map(p => (
        <div key={p._id} className="prit">
          <div className="pi-i">🙏</div>
          <div style={{ flex: 1 }}>
            <div className="pi-t">{p.title}</div>
            <div className="pi-tx">{p.text}</div>
            <div className="pi-dt">{format(new Date(p.createdAt), 'd MMM yyyy')}</div>
            {p.answered ? (
              <div className="pi-ans">✓ ANSWERED</div>
            ) : (
              <button className="bs" style={{ marginTop: 8, padding: '5px 12px', fontSize: 10, background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.3)', color: 'var(--gb)', cursor: 'pointer', borderRadius: 20, letterSpacing: 1, fontFamily: "'Barlow Condensed'", fontWeight: 700 }}
                onClick={() => markAnswered(p._id)}>
                MARK ANSWERED 🙌
              </button>
            )}
          </div>
        </div>
      ))}
    </DashboardLayout>
  );
}