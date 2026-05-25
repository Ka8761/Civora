import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatsWidget from '../../components/dashboard/StatsWidget';
import PortfolioChart from '../../components/dashboard/PortfolioChart';
import ReturnsGraph from '../../components/dashboard/ReturnsGraph';
import InvestmentCard from '../../components/dashboard/InvestmentCard';

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const [investments, setInvestments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.query.success) {
      toast.success('Investment confirmed! Welcome to your farm.', {
        duration: 5000,
      });
    }
  }, [router.query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invRes, notifRes] = await Promise.all([
          fetch('/api/investments'),
          fetch('/api/notifications'),
        ]);

        const [invData, notifData] = await Promise.all([
          invRes.json(),
          notifRes.json(),
        ]);

        setInvestments(invData.investments || []);
        setNotifications(notifData.notifications || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalInvested = investments.reduce(
    (sum, inv) => sum + (inv.amount || 0),
    0
  );

  const totalProjected = investments.reduce(
    (sum, inv) => sum + (inv.projectedReturn || inv.amount || 0),
    0
  );

  const activeInvestments = investments.filter(
    (inv) => inv.status === 'active'
  ).length;

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const chartData = investments.map((inv) => ({
    month: new Date(inv.startDate).toLocaleString('default', {
      month: 'short',
    }),
    invested: totalInvested,
    value: totalProjected,
  }));

  return (
    <>
      <Head>
        <title>Dashboard — CIVORA FARMS</title>
      </Head>

      <DashboardLayout
        title={`Welcome back, ${
          session?.user?.name?.split(' ')[0] || 'Investor'
        }`}
      >
        {/* STATS */}

        <div
          className="dash-stats-grid"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              flex: '1 1 calc(50% - 8px)',
              minWidth: 0,
            }}
          >
            <StatsWidget
              icon=""
              label="TOTAL INVESTED"
              value={`₦${totalInvested.toLocaleString()}`}
              sub="Across all farms"
              color="#0f2f1d"
              delay={0}
            />
          </div>

          <div
            style={{
              flex: '1 1 calc(50% - 8px)',
              minWidth: 0,
            }}
          >
            <StatsWidget
              icon=""
              label="PROJECTED VALUE"
              value={`₦${totalProjected.toLocaleString()}`}
              sub="At harvest"
              color="#1f6b3b"
              delay={0.1}
            />
          </div>

          <div
            style={{
              flex: '1 1 calc(50% - 8px)',
              minWidth: 0,
            }}
          >
            <StatsWidget
              icon=""
              label="ACTIVE FARMS"
              value={activeInvestments.toString()}
              sub={`${investments.length} total investments`}
              color="#0b1f14"
              delay={0.2}
            />
          </div>

          <div
            style={{
              flex: '1 1 calc(50% - 8px)',
              minWidth: 0,
            }}
          >
            <StatsWidget
              icon=""
              label="NOTIFICATIONS"
              value={unreadNotifs.toString()}
              sub="Unread messages"
              color={unreadNotifs > 0 ? '#1f6b3b' : '#6f7a75'}
              delay={0.3}
            />
          </div>
        </div>

        {/* PORTFOLIO + QUICK ACTIONS */}

        <div
          className="dash-two-col"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            marginBottom: 28,
          }}
        >
          <PortfolioChart data={chartData} />

          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: '28px 24px',
              border: '1px solid #e8ece9',
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                color: '#1f6b3b',
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              QUICK ACTIONS
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: '#0b1f14',
                marginBottom: 20,
              }}
            >
              Grow Your Portfolio
            </div>

            {[
              {
                href: '/invest',
                label: 'Make New Investment',
                desc: 'Browse available farm slots',
              },
              {
                href: '/dashboard/investments',
                label: 'View All Investments',
                desc: 'Track your farm progress',
              },
              {
                href: '/dashboard/settings',
                label: 'Update Bank Details',
                desc: 'Set payout account',
              },
              {
                href: '/news',
                label: 'Latest Farm News',
                desc: 'Market insights and updates',
              },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  borderBottom:
                    i < 3 ? '1px solid #f0f2f0' : 'none',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#0b1f14',
                    marginBottom: 2,
                  }}
                >
                  {item.label}
                </div>

                <div
                  style={{
                    fontSize: 11,
                    color: '#6f7a75',
                  }}
                >
                  {item.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RETURNS GRAPH */}

        {investments.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <ReturnsGraph investments={investments} />
          </div>
        )}

        {/* RECENT INVESTMENTS */}

        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
              gap: 6,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: '#0b1f14',
              }}
            >
              Recent Investments
            </div>

            <Link
              href="/dashboard/investments"
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                color: '#1f6b3b',
                textDecoration: 'none',
              }}
            >
              VIEW ALL →
            </Link>
          </div>

          {loading ? (
            <div
              style={{
                textAlign: 'center',
                padding: 60,
                color: '#6f7a75',
              }}
            >
              Loading investments...
            </div>
          ) : investments.length === 0 ? (
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 60,
                textAlign: 'center',
                border: '1px solid #e8ece9',
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#0b1f14',
                  marginBottom: 10,
                }}
              >
                No investments yet
              </div>

              <p
                style={{
                  fontSize: 14,
                  color: '#6f7a75',
                  marginBottom: 24,
                }}
              >
                Make your first investment and start growing your
                wealth with real farmland.
              </p>

              <Link
                href="/invest"
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 2,
                  color: '#fff',
                  background: '#0f2f1d',
                  padding: '14px 28px',
                  borderRadius: 8,
                  textDecoration: 'none',
                }}
              >
                INVEST NOW →
              </Link>
            </div>
          ) : (
            <div
              className="dash-card-grid"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {investments.slice(0, 2).map((inv, i) => (
                <InvestmentCard
                  key={inv._id}
                  investment={inv}
                  delay={i * 0.1}
                />
              ))}
            </div>
          )}
        </div>

        {/* NOTIFICATIONS */}

        {notifications.length > 0 && (
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #e8ece9',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #f0f2f0',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 6,
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#0b1f14',
                }}
              >
                Recent Notifications
              </div>

              <Link
                href="/dashboard/notifications"
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  color: '#1f6b3b',
                  textDecoration: 'none',
                }}
              >
                VIEW ALL →
              </Link>
            </div>

            {notifications.slice(0, 4).map((notif, i) => (
              <div
                key={notif._id}
                style={{
                  padding: '16px 24px',
                  borderBottom:
                    i < 3 ? '1px solid #f8faf8' : 'none',
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  background: notif.read ? '#fff' : '#f7fbf8',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: '#0b1f14',
                      marginBottom: 2,
                    }}
                  >
                    {notif.title}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: '#6f7a75',
                      lineHeight: 1.5,
                    }}
                  >
                    {notif.message}
                  </div>
                </div>

                {!notif.read && (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#1f6b3b',
                      flexShrink: 0,
                      marginTop: 6,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* RESPONSIVE */}

        <style jsx>{`
          @media (max-width: 768px) {
            .dash-stats-grid {
              gap: 12px !important;
            }

            .dash-two-col {
              gap: 16px !important;
            }

            .dash-card-grid {
              gap: 14px !important;
            }
          }
        `}</style>
      </DashboardLayout>
    </>
  );
}