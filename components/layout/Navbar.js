import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [curriculumOpen, setCurriculumOpen] = useState(false);
  const [sermonOpen, setSermonOpen] = useState(false);

  /*
   * PUBLIC NAVIGATION
   */
  const publicLinks = [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/about',
      label: 'About Us',
    },
    {
      href: '/leadership-school',
      label: 'Leadership School',
    },
    {
      href: '/sermons',
      label: 'Sermons',
    },
    {
      href: '/contact',
      label: 'Contact',
    },
  ];

  /*
   * MAIN STUDENT SIDEBAR
   */
  const studentLinks = [
    {
      href: '/dashboard',
      label: 'Home',
      icon: '⌂',
    },
    {
      href: '/dashboard/profile',
      label: 'Profile',
      icon: '○',
    },
    {
      href: '/dashboard/curriculum',
      label: 'Curriculum Map',
      icon: '▦',
      special: 'curriculum',
    },
    {
      href: '/dashboard/sermon-project',
      label: 'Sermon Project',
      icon: '◉',
      special: 'sermon',
    },
    {
      href: '/dashboard/prayer-log',
      label: 'Prayer Log',
      icon: '✦',
    },
    {
      href: '/dashboard/testimony-diary',
      label: 'Testimony Diary',
      icon: '✎',
    },
    {
      href: '/dashboard/grades',
      label: 'Grades',
      icon: '▤',
    },
    {
      href: '/dashboard/accomplishments',
      label: 'Accomplishments',
      icon: '★',
    },
    {
      href: '/dashboard/community',
      label: 'Join Community',
      icon: '♧',
    },
  ];

  /*
   * WHEN INSIDE CURRICULUM
   */
  const curriculumItems = [
    {
      id: 'orientation',
      title: 'Orientation',
      subtitle: 'Welcome to Leadership Foundation School',
      locked: false,
      lessons: [
        'Welcome & Introduction',
        'How the School Works',
        'Learning Guidelines',
        'Spiritual Growth Framework',
      ],
    },
    {
      id: 'c1',
      title: 'C1 — Foundations',
      subtitle: 'The Foundation of Your Faith',
      locked: false,
      lessons: [
        'Overview',
        'Video Lesson',
        'Knowledge Check',
        'Reflection',
      ],
    },
    {
      id: 'c2',
      title: 'C2 — New Birth',
      subtitle: 'Understanding the New Birth',
      locked: true,
      lessons: [
        'Overview',
        'Video Lesson',
        'Knowledge Check',
        'Reflection',
      ],
    },
    {
      id: 'c3',
      title: 'C3 — Spiritual Milk',
      subtitle: 'Growing in the Word',
      locked: true,
      lessons: [
        'Overview',
        'Video Lesson',
        'Knowledge Check',
        'Reflection',
      ],
    },
    {
      id: 'c4',
      title: 'C4 — Prayer & Fellowship',
      subtitle: 'Developing a Life of Prayer',
      locked: true,
      lessons: [
        'Overview',
        'Video Lesson',
        'Knowledge Check',
        'Reflection',
      ],
    },
    {
      id: 'c5',
      title: 'C5 — Leadership',
      subtitle: 'Understanding Spiritual Leadership',
      locked: true,
      lessons: [
        'Overview',
        'Video Lesson',
        'Knowledge Check',
        'Reflection',
      ],
    },
    {
      id: 'c6',
      title: 'C6 — Ministry & Service',
      subtitle: 'Serving With Purpose',
      locked: true,
      lessons: [
        'Overview',
        'Video Lesson',
        'Knowledge Check',
        'Reflection',
      ],
    },
    {
      id: 'final',
      title: 'Final Assessment',
      subtitle: 'Complete your Leadership Foundation journey',
      locked: true,
      lessons: [
        'Final Review',
        'Final Examination',
        'Certificate Generation',
      ],
    },
  ];

  /*
   * SERMON PROJECT
   */
  const sermonSections = [
    {
      id: 1,
      title: 'Faith',
      description: 'Building your understanding of faith',
    },
    {
      id: 2,
      title: 'The Word',
      description: 'Understanding Scripture',
    },
    {
      id: 3,
      title: 'Prayer',
      description: 'Growing in prayer',
    },
    {
      id: 4,
      title: 'The Holy Spirit',
      description: 'Understanding the work of the Spirit',
    },
    {
      id: 5,
      title: 'Leadership',
      description: 'Growing as a spiritual leader',
    },
    {
      id: 6,
      title: 'Ministry',
      description: 'Serving and impacting others',
    },
  ];

  const isActive = (href) => {
    return router.pathname === href;
  };

  /*
   * =========================================================
   * LOGGED-IN SIDEBAR
   * =========================================================
   */

  if (session) {
    return (
      <>
        <style jsx>{`
          .student-sidebar {
            width: 260px;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 100;
            background: rgba(10, 18, 15, 0.94);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-right: 1px solid rgba(255, 255, 255, 0.07);
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }

          .student-main {
            margin-left: 260px;
            min-height: 100vh;
          }

          .sidebar-link {
            display: flex;
            align-items: center;
            gap: 14px;
            width: 100%;
            padding: 13px 20px;
            color: rgba(255, 255, 255, 0.62);
            text-decoration: none;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            transition: all 0.2s ease;
            border-left: 2px solid transparent;
          }

          .sidebar-link:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.035);
          }

          .sidebar-link.active {
            color: #c9921a;
            background: rgba(201, 146, 26, 0.08);
            border-left-color: #c9921a;
          }

          .sidebar-icon {
            width: 24px;
            text-align: center;
            font-size: 16px;
            opacity: 0.9;
          }

          .mobile-header {
            display: none;
          }

          @media (max-width: 900px) {
            .student-sidebar {
              transform: translateX(-100%);
              transition: transform 0.3s ease;
            }

            .student-sidebar.mobile-open {
              transform: translateX(0);
            }

            .student-main {
              margin-left: 0;
            }

            .mobile-header {
              height: 64px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 18px;
              background: rgba(10, 18, 15, 0.96);
              backdrop-filter: blur(20px);
              border-bottom: 1px solid rgba(255, 255, 255, 0.07);
              position: sticky;
              top: 0;
              z-index: 90;
            }

            .mobile-menu-button {
              background: none;
              border: none;
              color: #fff;
              font-size: 25px;
              cursor: pointer;
            }
          }
        `}</style>

        {/* MOBILE HEADER */}
        <div className="mobile-header">
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#fff',
              fontWeight: 700,
              fontSize: 17,
            }}
          >
            COLIG
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? '×' : '☰'}
          </button>
        </div>

        {/* SIDEBAR */}
        <aside
          className={`student-sidebar ${
            mobileOpen ? 'mobile-open' : ''
          }`}
        >
          {/* LOGO */}
          <div
            style={{
              padding: '28px 22px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <Link
              href="/dashboard"
              style={{
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 21,
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: 1,
                }}
              >
                COLIG
              </div>

              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10,
                  color: '#c9921a',
                  letterSpacing: 2,
                  marginTop: 3,
                }}
              >
                LEADERSHIP FOUNDATION SCHOOL
              </div>
            </Link>
          </div>

          {/* STUDENT */}
          <div
            style={{
              padding: '18px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt=""
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: '#c9921a',
                  color: '#07110c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 800,
                }}
              >
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <div
              style={{
                minWidth: 0,
              }}
            >
              <div
                style={{
                  color: '#fff',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {session.user.name || 'Student'}
              </div>

              <div
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10,
                  letterSpacing: 1,
                  marginTop: 2,
                }}
              >
                STUDENT
              </div>
            </div>
          </div>

          {/* MAIN NAV */}
          <div
            style={{
              padding: '18px 0',
              flex: 1,
            }}
          >
            <div
              style={{
                padding: '0 20px 10px',
                color: 'rgba(255,255,255,0.25)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 2.5,
              }}
            >
              MY SCHOOL
            </div>

            {studentLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`sidebar-link ${
                  isActive(item.href) ? 'active' : ''
                }`}
              >
                <span className="sidebar-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* SIGN OUT */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.07)',
              padding: '14px 0',
            }}
          >
            <button
              onClick={() =>
                signOut({
                  callbackUrl: '/',
                })
              }
              className="sidebar-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'rgba(239,68,68,0.8)',
              }}
            >
              <span className="sidebar-icon">↪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT WRAPPER */}
        <div className="student-main">
          {/* This empty wrapper allows dashboard pages to sit beside sidebar */}
        </div>
      </>
    );
  }

  /*
   * =========================================================
   * PUBLIC NAVBAR
   * =========================================================
   */

  return (
    <>
      <style jsx>{`
        .public-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;

          /* MUCH MORE TRANSPARENT */
          background: rgba(7, 17, 12, 0.22);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .public-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 78px;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .public-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .public-link {
          /* WHITE DESKTOP NAVBAR TEXT */
          color: #ffffff;

          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: 0.2s ease;
        }

        .public-link:hover {
          color: #c9921a;
        }

        .public-login {
          /* WHITE LOGIN TEXT */
          color: #ffffff;

          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .public-signup {
          color: #ffffff;
          background: #c9921a;
          padding: 10px 18px;
          border-radius: 6px;
          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        @media (max-width: 850px) {
          .public-links {
            display: none;
          }

          .public-nav-inner {
            height: 68px;
          }
        }
      `}</style>

      <header className="public-nav">
        <div className="public-nav-inner">

          <Link
            href="/"
            style={{
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 800,
                color: '#fff',
                letterSpacing: 1,
              }}
            >
              COLIG
            </div>

            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 9,
                color: '#c9921a',
                letterSpacing: 2,
                marginTop: 2,
              }}
            >
              LEADERSHIP FOUNDATION SCHOOL
            </div>
          </Link>

          <nav className="public-links">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="public-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
            }}
          >
            <Link
              href="/auth/login"
              className="public-login"
            >
              LOGIN
            </Link>

            <Link
              href="/auth/signup"
              className="public-signup"
            >
              JOIN SCHOOL
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}