import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

export default function AdminInvestments() {
  const { data: session } = useSession();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({ roiPercent: '', status: '', notes: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user?.role !== 'admin') return;
    fetch('/api/admin/investments')
      .then(r => r.json())
      .then(d => { setInvestments(d.investments || []); setLoading(false); });
  }, [session]);

  const openEdit = (inv) => {
    setEditModal(inv);
    setEditForm({ roiPercent: inv.roiPercent || '', status: inv.status, notes: inv.notes || '' });
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/update-roi', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ investmentId: editModal._id, ...editForm, roiPercent: parseFloat(editForm.roiPercent) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setInvestments(prev => prev.map(i => i._id === editModal._id ? { ...i, ...data.investment } : i));
      setEditModal(null);
      toast.success('Investment updated! User will be notified.');
    } catch (err) {
      toast.error(err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

const rowStyle = {
  display: 'grid',
  gridTemplateColumns:
    typeof window !== 'undefined' && window.innerWidth <= 768
      ? '1fr'
      : '2fr 1.5fr 1fr 1fr 1fr 1fr',
  gap: 12,
  alignItems: 'center',
  padding: '14px 20px',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
};
  return (
    <>
      <Head><title>Manage Investments — CIVORA FARMS Admin</title></Head>
      <AdminLayout title="Manage Investments">

        {/* Table */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'auto' }}>
          {/* Header */}
          <div style={{ ...rowStyle, background: 'rgba(201,146,26,0.06)', borderBottom: '1px solid rgba(201,146,26,0.15)' }}>
            {['INVESTOR', 'CROP / TIER', 'AMOUNT', 'ROI %', 'STATUS', 'ACTION'].map((h, i) => (
              <div key={i} style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: 'rgba(201,146,26,0.7)', fontWeight: 700 }}>{h}</div>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading investments...</div>
          ) : investments.length === 0 ? (
            <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>No investments yet.</div>
          ) : investments.map((inv, i) => (
            <motion.div key={inv._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              style={{ ...rowStyle, background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: 1 }}>{inv.userId?.name || '—'}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{inv.userId?.email}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 700, color: 'var(--gold)', letterSpacing: 1 }}>{inv.crop}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{inv.tier} Tier</div>
              </div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 14, fontWeight: 700, color: '#fff' }}>₦{inv.amount?.toLocaleString()}</div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontWeight: 700, color: inv.roiPercent > 0 ? '#4caf50' : 'rgba(255,255,255,0.3)' }}>
                {inv.roiPercent > 0 ? `${inv.roiPercent}%` : 'TBD'}
              </div>
              <div>
                <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, fontWeight: 700, letterSpacing: 2, padding: '4px 10px', borderRadius: 20, background: inv.status === 'active' ? 'rgba(76,175,80,0.15)' : inv.status === 'harvested' ? 'rgba(201,146,26,0.15)' : 'rgba(255,255,255,0.08)', color: inv.status === 'active' ? '#4caf50' : inv.status === 'harvested' ? 'var(--gold)' : 'rgba(255,255,255,0.5)' }}>
                  {inv.status?.toUpperCase()}
                </span>
              </div>
              <button onClick={() => openEdit(inv)}
                style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: '8px 16px', background: 'rgba(201,146,26,0.1)', border: '1px solid rgba(201,146,26,0.3)', borderRadius: 6, color: 'var(--gold)', cursor: 'pointer' }}>
                EDIT ROI
              </button>
            </motion.div>
          ))}
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {editModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24 }}
              onClick={(e) => { if (e.target === e.currentTarget) setEditModal(null); }}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                style={{ background: '#0a1628', border: '1px solid rgba(201,146,26,0.25)', borderRadius: 16, padding: 40, width: '100%', maxWidth: 480 }}
              >
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 3, color: 'rgba(201,146,26,0.7)', marginBottom: 8 }}>ADMIN · EDIT INVESTMENT</div>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                  {editModal.userId?.name} — {editModal.crop}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>
                  Amount: ₦{editModal.amount?.toLocaleString()} · {editModal.tier} Tier
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>ROI Percentage (%)</label>
                  <input className="form-input" type="number" step="0.1" min="0" max="100" value={editForm.roiPercent}
                    onChange={e => setEditForm(p => ({ ...p, roiPercent: e.target.value }))}
                    placeholder="e.g. 24.5"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff' }} />
                  {editForm.roiPercent > 0 && (
                    <div style={{ fontSize: 12, color: '#4caf50', marginTop: 6 }}>
                      Investor receives: ₦{(editModal.amount * (1 + parseFloat(editForm.roiPercent) / 100)).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Investment Status</label>
                  <select className="form-select" value={editForm.status} onChange={e => setEditForm(p => ({ ...p, status: e.target.value }))}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff' }}>
                    <option value="pending" style={{ background: '#0a1628' }}>Pending</option>
                    <option value="active" style={{ background: '#0a1628' }}>Active</option>
                    <option value="harvested" style={{ background: '#0a1628' }}>Harvested</option>
                    <option value="cancelled" style={{ background: '#0a1628' }}>Cancelled</option>
                  </select>
                </div>

                {editForm.status === 'harvested' && (
                  <div style={{ background: 'rgba(201,146,26,0.08)', border: '1px solid rgba(201,146,26,0.2)', borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 12, color: 'rgba(201,146,26,0.8)', lineHeight: 1.65 }}>
                    ⚠️ Setting status to "Harvested" will automatically notify the investor and schedule their bank payout.
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Admin Notes (optional)</label>
                  <textarea className="form-textarea" value={editForm.notes} onChange={e => setEditForm(p => ({ ...p, notes: e.target.value }))} placeholder="Internal notes about this investment..."
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff', minHeight: 80 }} />
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                  <button onClick={() => setEditModal(null)}
                    style={{ flex: 1, padding: '13px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.6)', fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: 'pointer' }}>
                    CANCEL
                  </button>
                  <button onClick={saveEdit} disabled={saving}
                    style={{ flex: 2, padding: '13px', background: saving ? 'rgba(201,146,26,0.5)' : 'var(--gold)', border: 'none', borderRadius: 8, color: 'var(--navy)', fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, letterSpacing: 2, cursor: saving ? 'default' : 'pointer' }}>
                    {saving ? 'SAVING...' : 'SAVE & NOTIFY INVESTOR'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AdminLayout>
    </>
  );
}
