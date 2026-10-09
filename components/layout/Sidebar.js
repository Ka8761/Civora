import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const NAV = [
  { href: '/dashboard',              icon: '🏠', label: 'HOME' },
  { href: '/dashboard/profile',      icon: '👤', label: 'PROFILE' },
  { href: '/dashboard/curriculum',   icon: '📖', label: 'CURRICULUM MAP' },
  { href: '/dashboard/sermon',       icon: '🎙️', label: 'SERMON PROJECT' },
  { href: '/dashboard/prayer',       icon: '🙏', label: 'PRAYER LOG' },
  { href: '/dashboard/testimony',    icon: '✍️', label: 'TESTIMONY DIARY' },
  { href: '/dashboard/grades',       icon: '📊', label: 'GRADES' },
  { href: '/dashboard/accomplishment',icon: '🏆', label: 'ACCOMPLISHMENT' },
  { href: '/dashboard/community',    icon: '🤝', label: 'JOIN COMMUNITY' },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <aside className="dash-sidebar">
      {/* Logo */}
      <div className="sb-logo">
        <div className="sb-ln">COLIG FOUNDATION</div>
        <div className="sb-ls">LEADERSHIP FOUNDATION SCHOOL</div>
      </div>

      {/* User */}
      {session && (
        <div className="sb-user">
          <div className="sb-av">{session.user.name?.charAt(0).toUpperCase()}</div>
          <div>
            <div className="sb-un">{session.user.name}</div>
            <div className="sb-ur">Foundation Student</div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="sb-nav">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`ni ${router.pathname === item.href ? 'active' : ''}`}
          >
            <span className="ni-i">{item.icon}</span>
            <span className="ni-l">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div className="sb-bot">
        <button
          className="ni so"
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => signOut({ callbackUrl: '/' })}
        >
 
          <span className="ni-l">SIGN OUT</span>
        </button>
      </div>
    </aside>
  );
}

