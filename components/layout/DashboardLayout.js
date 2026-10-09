import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const NAV_ITEMS = [
  { label: 'HOME',            href: '/dashboard' },
  { label: 'PROFILE',         href: '/dashboard/profile' },
  { label: 'CURRICULUM MAP',  href: '/dashboard/curriculum' },
  { label: 'PRAYER LOG',      href: '/dashboard/prayer' },
   { label: 'SERMON PROJECT',  href: '/dashboard/sermon-project' },
  { label: 'TESTIMONY DIARY', href: '/dashboard/testimony-diary' },
  { label: 'GRADES',          href: '/dashboard/grades' },
  { label: 'ACCOMPLISHMENT',  href: '/dashboard/accomplishment' },
  { label: 'JOIN COMMUNITY',  href: '/dashboard/community' },
];

export default function DashboardLayout({ title, children }) {
  const router = useRouter();

  function isActive(href) {
    if (href === '/dashboard') return router.pathname === '/dashboard';
    return router.pathname.startsWith(href);
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} · COLIG Foundation` : 'COLIG Foundation'}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="dl-shell">
        <aside className="dl-side">
          <div className="dl-brand" >
            <div className="dl-brand-name" cursor="pointer">
              COLIG
            </div>
            <div className="dl-brand-sub">Leadership Foundation School</div>
          </div>

          <nav className="dl-nav">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} legacyBehavior>
                <a className={`dl-nav-item${isActive(item.href) ? ' dl-nav-item-active' : ''}`}>
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          <button className="dl-signout" onClick={() => signOut({ callbackUrl: '/' })}>
            SIGN OUT
          </button>
        </aside>

        <main className="dl-main">
          {title && <h1 className="dl-title">{title}</h1>}
          <div className="dl-content">{children}</div>
        </main>
      </div>

      <style jsx global>{`
        :root {
          --navy: #0a1628;
          --gold: #c9921a;
          --gold-light: #e8b84b;
          --cream: #faf8f3;
          --txt: #1a1a2e;
          --mid: #4a5568;
          --gb: #4caf50;
          --pl: #9333ea;
        }
        body,
        button,
        input,
        textarea,
        select {
          font-family: 'Montserrat', sans-serif !important;
        }
      `}</style>

      <style jsx>{`
        .dl-shell {
          display: flex;
          min-height: 100vh;
          background: var(--cream);
        }

        .dl-side {
          width: 240px;
          flex-shrink: 0;
          background: var(--navy);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .dl-brand {
          padding: 28px 24px 22px;
          border-bottom: 1px solid rgba(201, 146, 26, 0.16);
        }
        .dl-brand-name {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #fff;
        }
        .dl-brand-sub {
          font-size: 10px;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.35);
          margin-top: 4px;
        }

        .dl-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 14px 0;
          overflow-y: auto;
        }

        .dl-nav-item {
          display: block;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.55);
          padding: 13px 24px;
          border-left: 3px solid transparent;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .dl-nav-item:hover {
          background: rgba(255, 255, 255, 0.04);
          color: #fff;
        }
        .dl-nav-item-active {
          background: rgba(201, 146, 26, 0.1);
          border-left-color: var(--gold);
          color: var(--gold);
        }

        .dl-signout {
          margin: 16px 20px 24px;
          padding: 11px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .dl-signout:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        .dl-main {
          flex: 1;
          padding: 36px 44px;
          max-width: 1160px;
        }

        .dl-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 22px;
        }

        @media (max-width: 900px) {
          .dl-shell {
            flex-direction: column;
          }
          .dl-side {
            width: 100%;
            height: auto;
            position: relative;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
          }
          .dl-brand {
            width: 100%;
            border-bottom: none;
          }
          .dl-nav {
            flex-direction: row;
            flex-wrap: wrap;
            padding: 6px 12px 14px;
          }
          .dl-nav-item {
            border-left: none;
            border-bottom: 2px solid transparent;
            padding: 8px 10px;
          }
          .dl-nav-item-active {
            border-bottom-color: var(--gold);
          }
          .dl-signout {
            margin: 0 12px 14px auto;
          }
          .dl-main {
            padding: 24px 20px;
          }
        }
      `}</style>
    </>
  );
}