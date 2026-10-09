import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ORDINALS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

export default function PrayerPage() {
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(null); // charge number being confirmed
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/user/progress')
      .then((r) => r.json())
      .then((d) => setCompleted(d.user?.prayerChargesCompleted || 0))
      .catch(() => toast.error('Could not load your prayer progress'))
      .finally(() => setLoading(false));
  }, []);

  async function confirmCharge() {
    setSaving(true);
    try {
      const res = await fetch('/api/user/progress', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prayerCharge: confirming }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save');
      setCompleted(data.user.prayerChargesCompleted);
      toast.success(
        confirming === 6
          ? 'All six prayer charges completed. God be praised!'
          : `Prayer charge ${confirming} complete. Charge ${confirming + 1} is now open.`
      );
      setConfirming(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout title="Prayer Charges">
      <div className="head">
        <div>
          <div className="pg-s">SIX CHARGES · 10 HOURS EACH · 60 HOURS TOTAL</div>
        </div>
        <div className="count">
          <strong>{completed}</strong>/6 <span>COMPLETED</span>
        </div>
      </div>

      {loading ? (
        <div className="empty">Loading…</div>
      ) : (
        <div className="grid">
          {ORDINALS.map((name, i) => {
            const n = i + 1;
            const done = n <= completed;
            const open = n === completed + 1;
            const locked = n > completed + 1;
            return (
              <div key={n} className={`card ${done ? 'done' : ''} ${open ? 'open' : ''} ${locked ? 'locked' : ''}`}>
                <div className="num">{n}</div>
                <div className="title">Prayer Charge {n}</div>
                <div className="sub">10 hours of prayer</div>

                {done && <div className="state">COMPLETED</div>}
                {locked && <div className="state lockedtxt">🔒 LOCKED</div>}
                {open && (
                  <button className="btn" onClick={() => setConfirming(n)}>
                    I HAVE FINISHED {name.toUpperCase()} PRAYER CHARGE
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {confirming && (
        <div className="overlay" onClick={() => !saving && setConfirming(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you have charged for the {ORDINALS[confirming - 1]} 10 hours?</h3>
            <p className="small">
              Don't lie — it's an app, but in reality it's between God and you.
            </p>
            <div className="actions">
              <button className="btn" disabled={saving} onClick={confirmCharge}>
                {saving ? 'SAVING…' : 'YES, I HAVE'}
              </button>
              <button className="btn ghost" disabled={saving} onClick={() => setConfirming(null)}>
                NO, I HAVE NOT
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .head { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
        .count { font-size: 14px; color: var(--mid); }
        .count strong { font-size: 28px; color: var(--gold); }
        .count span { font-size: 9px; letter-spacing: 2px; margin-left: 4px; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .card { background: #fff; border: 1px solid #e7e7e7; border-radius: 14px; padding: 24px; display: flex; flex-direction: column; gap: 6px; }
        .card.open { border-color: var(--gold); box-shadow: 0 8px 30px rgba(201,146,26,0.12); }
        .card.done { background: #faf8ef; }
        .card.locked { opacity: 0.5; }
        .num { width: 42px; height: 42px; border-radius: 50%; background: var(--navy); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 8px; }
        .done .num { background: var(--gold); color: var(--navy); }
        .title { font-size: 16px; font-weight: 700; color: var(--navy); }
        .sub { font-size: 12px; color: #888; margin-bottom: 12px; }
        .state { font-size: 10px; font-weight: 800; letter-spacing: 2px; color: #39884a; }
        .lockedtxt { color: #999; }
        .btn { border: 0; background: var(--navy); color: #fff; padding: 12px 14px; border-radius: 7px; font-size: 10px; font-weight: 700; letter-spacing: 0.8px; cursor: pointer; }
        .btn:disabled { opacity: 0.6; }
        .btn.ghost { background: transparent; color: var(--mid); border: 1px solid #d8d8d8; }
        .empty { padding: 50px; text-align: center; color: #888; }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .modal { background: #fff; border-radius: 14px; max-width: 440px; width: 100%; padding: 30px; text-align: center; }
        .modal h3 { font-size: 17px; color: var(--navy); line-height: 1.5; margin-bottom: 8px; }
        .small { font-size: 10px; color: #999; font-style: italic; margin-bottom: 22px; }
        .actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </DashboardLayout>
  );
}