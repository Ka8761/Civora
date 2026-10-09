import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function TestimonyPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: '', text: '', showOnHome: false });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonies', { cache: 'no-store' })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || 'Could not load your testimonies');
        return d;
      })
      .then((d) => setList(d.testimonies || []))
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.text.trim()) return toast.error('Fill in both fields');
    setSaving(true);
    try {
      const res = await fetch('/api/testimonies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save');
      setList((l) => [data.testimony, ...l]);
      setForm({ title: '', text: '', showOnHome: false });
      toast.success(form.showOnHome ? 'Saved and live on the home page.' : 'Testimony saved.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function setHome(t, next) {
    setList((l) => l.map((x) => (x._id === t._id ? { ...x, showOnHome: next } : x)));
    try {
      const res = await fetch('/api/testimonies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: t._id, showOnHome: next }),
      });
      if (!res.ok) throw new Error();
      toast.success(next ? 'Now live on the home page.' : 'Removed from the home page.');
    } catch {
      setList((l) => l.map((x) => (x._id === t._id ? { ...x, showOnHome: !next } : x)));
      toast.error('Could not update — try again');
    }
  }

  function removeFromHome(t) {
    if (window.confirm('Remove this testimony from the home page? It will stay saved in your diary.')) {
      setHome(t, false);
    }
  }

  return (
    <DashboardLayout title="Testimony Diary">
      <div style={{ marginBottom: 16 }}>
        <div className="pg-t">Testimony Diary</div>
        <div className="pg-s">COLIG FOUNDATION · STUDENT PORTAL</div>
      </div>

      <div className="prform" style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Playfair Display'", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 13 }}>
          Write a Testimony ✍️
        </div>
        <form onSubmit={handleAdd}>
          <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>TITLE</label>
          <input className="fi" type="text" required placeholder="Give your testimony a title…"
            style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 11 }}
            value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
          <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>YOUR TESTIMONY</label>
          <textarea className="rta" required placeholder="Share what God has done in your life…"
            style={{ minHeight: 110, marginBottom: 12 }}
            value={form.text} onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--mid)', marginBottom: 14, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.showOnHome}
              onChange={(e) => setForm((p) => ({ ...p, showOnHome: e.target.checked }))} />
            Also show this on the school home page
          </label>
          <button type="submit" className="bs bs-g" disabled={saving}>
            {saving ? 'SAVING…' : 'SAVE TESTIMONY →'}
          </button>
        </form>
      </div>

      {loading && <div style={{ color: '#888', padding: 20 }}>Loading…</div>}
      {!loading && list.length === 0 && <div style={{ color: '#888', padding: 20 }}>You haven't written a testimony yet.</div>}

      {list.map((t) => (
        <div key={t._id} className="tsit">
          <div className="tsiq">"</div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, letterSpacing: 1, color: 'var(--gold)', marginBottom: 8 }}>
            {t.title}
          </div>
          <div className="tsi-tx">{t.text}</div>
          <div className="tsi-au">— {t.authorName}</div>
          <div className="tsi-dt">{format(new Date(t.createdAt), 'MMMM yyyy')}</div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
            {t.showOnHome ? (
              <>
                <Link href="/#testimonies" legacyBehavior>
                  <a
                    className="bs bs-g"
                    style={{ fontSize: 10, padding: '9px 16px', textDecoration: 'none', display: 'inline-block' }}
                  >
                    LIVE ON HOME PAGE ↗
                  </a>
                </Link>
                <button
                  className="bs bs-o"
                  style={{ fontSize: 10, padding: '9px 16px', color: '#b91c1c', borderColor: '#b91c1c' }}
                  onClick={() => removeFromHome(t)}
                >
                  DELETE FROM HOME PAGE
                </button>
              </>
            ) : (
              <button className="bs bs-o" style={{ fontSize: 10, padding: '9px 16px' }} onClick={() => setHome(t, true)}>
                SHOW ON HOME PAGE
              </button>
            )}
          </div>
        </div>
      ))}
    </DashboardLayout>
  );
}