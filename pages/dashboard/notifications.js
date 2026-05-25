import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

const TYPE_CONFIG = {
  success: { bg: 'rgba(31,107,59,0.08)', border: 'rgba(31,107,59,0.22)' },
  harvest: { bg: 'rgba(15,47,29,0.08)', border: 'rgba(15,47,29,0.22)' },
  warning: { bg: 'rgba(0,0,0,0.04)', border: 'rgba(0,0,0,0.12)' },
  info: { bg: 'rgba(15,47,29,0.06)', border: 'rgba(15,47,29,0.18)' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notifications')
      .then((r) => r.json())
      .then((d) => {
        setNotifications(d.notifications || []);
        setLoading(false);
      });
  }, []);

  const markAllRead = async () => {
    await fetch('/api/notifications', { method: 'PATCH' });
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <>
      <Head>
        <title>Notifications — CIVORA FARMS</title>
      </Head>

      <DashboardLayout title="Notifications">
        <div style={{ maxWidth: 700 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {unread > 0 && (
                <div style={{ background: '#0f2f1d', color: '#fff', fontSize: 11, fontWeight: 800, letterSpacing: 1, padding: '4px 12px', borderRadius: 20 }}>
                  {unread} UNREAD
                </div>
              )}
            </div>

            {unread > 0 && (
              <button
                onClick={markAllRead}
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  color: '#1f6b3b',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                MARK ALL READ
              </button>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 80, color: '#6f7a75' }}>Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: 12, padding: 80, textAlign: 'center', border: '1px solid #e8ece9' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0b1f14' }}>No notifications yet</div>
              <p style={{ fontSize: 14, color: '#6f7a75', marginTop: 8, lineHeight: 1.6 }}>
                You&apos;ll receive updates about your investments, farm progress, and payouts here.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {notifications.map((notif, i) => {
                const cfg = TYPE_CONFIG[notif.type] || TYPE_CONFIG.info;
                return (
                  <motion.div
                    key={notif._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      background: notif.read ? '#fff' : cfg.bg,
                      border: `1px solid ${notif.read ? '#e8ece9' : cfg.border}`,
                      borderRadius: 10,
                      padding: '20px 24px',
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, gap: 12, flexWrap: 'wrap' }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#0b1f14' }}>
                          {notif.title}
                        </div>
                        <div style={{ fontSize: 10, letterSpacing: 2, color: '#6f7a75', flexShrink: 0 }}>
                          {new Date(notif.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: '#44514b', lineHeight: 1.7 }}>
                        {notif.message}
                      </div>
                    </div>

                    {!notif.read && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1f6b3b', flexShrink: 0, marginTop: 8 }} />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}