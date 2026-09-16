import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function TestimonyPage() {
  const { data: session } = useSession();
  const [list,  setList]  = useState([
    { _id: '1', title: 'Fear Lifted Off Me', text: 'I had been struggling with fear and anxiety for years. The lesson on New Birth and walking in the Spirit completely transformed my perspective. I am no longer a slave to fear — I am a child of God.', author: 'ADENIKE O.', date: '2025-08-20' },
    { _id: '2', title: 'Three Prayers Answered', text: 'The Prayer Log held me accountable. I started writing prayers in July and by month end, three had been answered visibly. God is faithful.', author: 'EMEKA J.', date: '2025-08-15' },
  ]);
  const [form,  setForm]  = useState({ title: '', text: '' });
  const [loading,setLoading]=useState(false);

  function handleAdd(e) {
    e.preventDefault();
    if (!form.title || !form.text) { toast.error('Fill in both fields'); return; }
    const entry = {
      _id: Date.now().toString(),
      title: form.title, text: form.text,
      author: session?.user?.name?.toUpperCase() || 'YOU',
      date: new Date().toISOString(),
    };
    setList(l => [entry, ...l]);
    setForm({ title: '', text: '' });
    toast.success('✍️ Testimony saved!');
  }

  return (
    <DashboardLayout title="Testimony Diary">
      <div style={{ marginBottom: 16 }}>
        <div className="pg-t">Testimony Diary</div>
        <div className="pg-s">COLIG FOUNDATION · STUDENT PORTAL</div>
      </div>

      {/* Form */}
      <div className="prform" style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Playfair Display'", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 13 }}>Write a Testimony ✍️</div>
        <form onSubmit={handleAdd}>
          <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>TITLE</label>
          <input className="fi" type="text" required placeholder="Give your testimony a title…"
            style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 11 }}
            value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
          <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>YOUR TESTIMONY</label>
          <textarea className="rta" required placeholder="Share what God has done in your life…"
            style={{ minHeight: 110, marginBottom: 12 }}
            value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="submit" className="bs bs-g">SAVE TESTIMONY →</button>
            <button type="button" className="bs bs-o" onClick={() => toast.success('📤 Shared with community!')}>SHARE WITH COMMUNITY</button>
          </div>
        </form>
      </div>

      {/* List */}
      {list.map(t => (
        <div key={t._id} className="tsit">
          <div className="tsiq">"</div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, letterSpacing: 1, color: 'var(--gold)', marginBottom: 8 }}>{t.title}</div>
          <div className="tsi-tx">{t.text}</div>
          <div className="tsi-au">— {t.author}</div>
          <div className="tsi-dt">{format(new Date(t.date), 'MMMM yyyy')}</div>
        </div>
      ))}
    </DashboardLayout>
  );
}
