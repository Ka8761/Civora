import { useEffect, useState } from 'react';
import Head from 'next/head';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    bankName: '',
    bankAccountNumber: '',
    bankAccountName: '',
    emailNotifications: true,
    whatsappNotifications: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/user/profile')
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setSettings({
            bankName: d.user.bankName || '',
            bankAccountNumber: d.user.bankAccountNumber || '',
            bankAccountName: d.user.bankAccountName || '',
            emailNotifications: d.user.emailNotifications ?? true,
            whatsappNotifications: d.user.whatsappNotifications ?? true,
          });
        }
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error();
      toast.success('Settings saved!');
    } catch {
      toast.error('Save failed');
    } finally {
      setLoading(false);
    }
  };

  const sectionStyle = {
    background: '#fff',
    borderRadius: 12,
    padding: 32,
    border: '1px solid #e8ece9',
    marginBottom: 20,
  };

  const sectionTitle = {
    fontSize: 18,
    fontWeight: 800,
    color: '#0b1f14',
    marginBottom: 6,
  };

  const sectionSub = {
    fontSize: 13,
    color: '#6f7a75',
    marginBottom: 24,
    lineHeight: 1.6,
  };

  return (
    <>
      <Head>
        <title>Settings — CIVORA FARMS</title>
      </Head>

      <DashboardLayout title="Settings">
        <div style={{ maxWidth: 640 }}>
          <div style={sectionStyle}>
            <div style={sectionTitle}>Bank / Payout Account</div>
            <div style={sectionSub}>
              This is where your harvest returns will be transferred. Please ensure details are accurate.
            </div>

            {[
              { label: 'Bank Name', key: 'bankName', placeholder: 'e.g. Zenith Bank, GTBank, Access Bank' },
              { label: 'Account Number', key: 'bankAccountNumber', placeholder: '10-digit NUBAN account number' },
              { label: 'Account Name', key: 'bankAccountName', placeholder: 'Must match your bank records exactly' },
            ].map((f) => (
              <div key={f.key} className="form-group">
                <label className="form-label" style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#0b1f14', marginBottom: 8 }}>
                  {f.label}
                </label>
                <input
                  className="form-input"
                  value={settings[f.key]}
                  onChange={(e) => setSettings((p) => ({ ...p, [f.key]: e.target.value }))}
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

            <div style={{ background: 'rgba(15,47,29,0.06)', border: '1px solid rgba(15,47,29,0.18)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 12, color: '#44514b', lineHeight: 1.7 }}>
              Returns are paid within 14 business days of harvest confirmation. Ensure your bank details are correct before harvest date.
            </div>
          </div>

          <div style={sectionStyle}>
            <div style={sectionTitle}>Notification Preferences</div>
            <div style={sectionSub}>
              Choose how you want to receive farm updates and payment alerts.
            </div>

            {[
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive farm updates, ROI reports, and payment confirmations via email.' },
              { key: 'whatsappNotifications', label: 'WhatsApp Notifications', desc: 'Get monthly farm photos, harvest alerts, and support messages on WhatsApp.' },
            ].map((pref) => (
              <div
                key={pref.key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid #f0f2f0',
                  gap: 16,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 1, color: '#0b1f14', marginBottom: 2 }}>
                    {pref.label}
                  </div>
                  <div style={{ fontSize: 12, color: '#6f7a75', lineHeight: 1.6 }}>
                    {pref.desc}
                  </div>
                </div>

                <button
                  onClick={() => setSettings((p) => ({ ...p, [pref.key]: !p[pref.key] }))}
                  style={{
                    width: 48,
                    height: 26,
                    borderRadius: 13,
                    border: 'none',
                    cursor: 'pointer',
                    background: settings[pref.key] ? '#1f6b3b' : '#d7ddd9',
                    position: 'relative',
                    flexShrink: 0,
                    transition: 'background 0.2s',
                    marginLeft: 20,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      position: 'absolute',
                      top: 3,
                      left: settings[pref.key] ? 25 : 3,
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              padding: '14px 40px',
              background: loading ? '#6a776f' : '#0f2f1d',
              color: '#fff',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 3,
              border: 'none',
              borderRadius: 8,
              cursor: loading ? 'default' : 'pointer',
            }}
          >
            {loading ? 'SAVING...' : 'SAVE ALL SETTINGS'}
          </button>
        </div>
      </DashboardLayout>
    </>
  );
}