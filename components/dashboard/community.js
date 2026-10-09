import { useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

// ============================================
// COMMUNITY INVITATION LINKS
// Paste your real invitation links below.
// ============================================

const WHATSAPP_COMMUNITY_LINK = ''; // Paste WhatsApp invite link here
const TELEGRAM_COMMUNITY_LINK = 'https://t.me/Cityoflightglobaltg'; // Paste Telegram invite link here

// ============================================
// INITIAL COMMUNITY POSTS
// ============================================

const INITIAL_POSTS = [
  {
    id: 1,
    name: 'TUNDE A.',
    bg: 'var(--navy)',
    text: 'Just completed the CC Overview lesson. The section on the vision of COLIG really stirred something in my spirit. I feel like God placed me here intentionally for this season. Who else feels this way?',
    time: '2 hours ago · CC Orientation',
    likes: 12,
  },
  {
    id: 2,
    name: 'CHIOMA B.',
    bg: '#6b21a8',
    text: "Sermon 1 really blessed me — 'The just shall live by faith.' I had to pause it three times to write notes. Faith really does come by hearing! Don't skip the Sermon Project.",
    time: 'Yesterday · Sermon Project',
    likes: 27,
  },
  {
    id: 3,
    name: 'EMEKA S.',
    bg: '#4caf50',
    text: 'A prayer I logged 3 weeks ago has been answered! I prayed for a job and yesterday I got a call. God is faithful — He keeps His Word. Please join me in praise! 🙌',
    time: '2 days ago · Prayer Log',
    likes: 54,
  },
];

// ============================================
// COMMUNITY PAGE
// ============================================

export default function CommunityPage() {
  const { data: session } = useSession();

  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [text, setText] = useState('');

  // Add a new community post
  function addPost() {
    if (!text.trim()) {
      toast.error('Write something first');
      return;
    }

    setPosts((previousPosts) => [
      {
        id: Date.now(),
        name: session?.user?.name?.toUpperCase() || 'YOU',
        bg: 'var(--navy)',
        text: text.trim(),
        time: 'Just now',
        likes: 0,
      },
      ...previousPosts,
    ]);

    setText('');
    toast.success('✅ Posted to the community!');
  }

  // Like a post
  function likePost(id) {
    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        post.id === id
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  }

  // Open WhatsApp community
  function joinWhatsApp() {
    if (!WHATSAPP_COMMUNITY_LINK.trim()) {
      toast.error('WhatsApp community link has not been added yet.');
      return;
    }

    window.open(
      WHATSAPP_COMMUNITY_LINK,
      '_blank',
      'noopener,noreferrer'
    );
  }

  // Open Telegram community
  function joinTelegram() {
    if (!TELEGRAM_COMMUNITY_LINK.trim()) {
      toast.error('Telegram community link has not been added yet.');
      return;
    }

    window.open(
      TELEGRAM_COMMUNITY_LINK,
      '_blank',
      'noopener,noreferrer'
    );
  }

  return (
    <DashboardLayout title="Community">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="com-h">
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 9,
            letterSpacing: 4,
            color: 'rgba(201,146,26,0.68)',
            marginBottom: 8,
          }}
        >
          STUDENT COMMUNITY
        </div>

        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            fontWeight: 900,
            color: '#fff',
            marginBottom: 7,
          }}
        >
          The Foundation Family 🤝
        </div>

        <div
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.46)',
            maxWidth: 460,
            margin: '0 auto 16px',
          }}
        >
          Connect with fellow students. Share revelations,
          prayer requests, and testimonies. Iron sharpens iron.
        </div>

        <div
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {[
            { v: '142', l: 'STUDENTS' },
            { v: '38', l: 'ONLINE NOW' },
          ].map((item) => (
            <div
              key={item.l}
              style={{
                background: 'rgba(201,146,26,0.15)',
                border: '1px solid rgba(201,146,26,0.3)',
                borderRadius: 10,
                padding: '11px 18px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--gold)',
                }}
              >
                {item.v}
              </div>

              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 9,
                  letterSpacing: 2,
                  color: 'rgba(255,255,255,0.38)',
                }}
              >
                {item.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================
          WHATSAPP & TELEGRAM COMMUNITY CARDS
          Displayed above the post box
      ======================================== */}

      <div className="community-links">

        {/* WHATSAPP COMMUNITY CARD */}

        <div className="community-link-card whatsapp-card">
          <div className="community-logo whatsapp-logo">
            <svg
              viewBox="0 0 24 24"
              width="38"
              height="38"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.88c0 2.1.55 4.15 1.59 5.96L.12 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.47-8.44ZM12.1 21.77a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.83 9.83 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89a9.82 9.82 0 0 1 7.01 2.91 9.82 9.82 0 0 1 2.9 7.01c0 5.45-4.44 9.89-9.89 9.89Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
            </svg>
          </div>

          <div className="community-link-info">
            <div className="community-platform">
              WHATSAPP COMMUNITY
            </div>

            <h3>Join the Foundation Family</h3>

            <p>
              Connect with fellow students, share testimonies,
              encourage one another, and grow together in faith.
            </p>

            <button
              type="button"
              className="community-join whatsapp-join"
              onClick={joinWhatsApp}
            >
              JOIN WHATSAPP COMMUNITY ↗
            </button>
          </div>
        </div>

        {/* TELEGRAM COMMUNITY CARD */}

        <div className="community-link-card telegram-card">
          <div className="community-logo telegram-logo">
            <svg
              viewBox="0 0 24 24"
              width="38"
              height="38"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M22.05 2.15 1.95 9.9c-1.37.55-1.36 1.31-.25 1.65l5.16 1.61 1.98 6.06c.24.67.12.94.82.94.55 0 .8-.25 1.11-.55l2.5-2.43 5.2 3.84c.96.53 1.65.26 1.89-.89l3.41-16.06c.35-1.41-.54-2.05-1.72-1.48ZM8.2 12.8l11.33-7.15c.56-.34 1.08-.16.66.22l-9.37 8.46-.36 3.85L8.2 12.8Z" />
            </svg>
          </div>

          <div className="community-link-info">
            <div className="community-platform">
              TELEGRAM COMMUNITY
            </div>

            <h3>Stay Connected & Equipped</h3>

            <p>
              Receive community updates, join meaningful conversations,
              and stay connected with the COLIG family.
            </p>

            <button
              type="button"
              className="community-join telegram-join"
              onClick={joinTelegram}
            >
              JOIN TELEGRAM COMMUNITY ↗
            </button>
          </div>
        </div>

      </div>

      {/* ========================================
          CREATE A COMMUNITY POST
      ======================================== */}

      <div className="prform" style={{ marginBottom: 13 }}>
        <textarea
          className="rta"
          placeholder="Share a thought, revelation, or encouragement with your cohort…"
          style={{ minHeight: 75, marginBottom: 11 }}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            className="bs bs-g"
            onClick={addPost}
          >
            POST →
          </button>

          <button
            type="button"
            className="bs bs-o"
            onClick={() =>
              toast.success('🙏 Prayer request shared!')
            }
          >
            SHARE PRAYER REQUEST
          </button>
        </div>
      </div>

      {/* ========================================
          COMMUNITY POSTS
      ======================================== */}

      {posts.map((post) => (
        <div key={post.id} className="pc">

          <div className="pa">
            <div
              className="pa-av"
              style={{ background: post.bg }}
            >
              {post.name.charAt(0)}
            </div>

            <div>
              <div className="pa-n">{post.name}</div>
              <div className="pa-t">{post.time}</div>
            </div>
          </div>

          <div className="ptxt">{post.text}</div>

          <div className="pacts">
            <button
              type="button"
              className="pab"
              onClick={() => likePost(post.id)}
            >
              ❤ {post.likes}
            </button>

            <button
              type="button"
              className="pab"
              onClick={() => toast.success('💬 Reply coming soon!')}
            >
              💬 Reply
            </button>

            <button
              type="button"
              className="pab"
              onClick={() => toast.success('🙏 Amen!')}
            >
              🙏 Amen
            </button>
          </div>

        </div>
      ))}

      {/* ========================================
          COMMUNITY CARD STYLES
      ======================================== */}

      <style jsx>{`
        .community-links {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin: 22px 0;
        }

        .community-link-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 24px 20px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid rgba(10, 22, 40, 0.08);
          box-shadow: 0 5px 18px rgba(10, 22, 40, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .community-link-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(10, 22, 40, 0.1);
        }

        .community-logo {
          flex-shrink: 0;
          width: 58px;
          height: 58px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .whatsapp-logo {
          background: #e7f8ed;
          color: #25d366;
        }

        .telegram-logo {
          background: #e5f4fc;
          color: #229ed9;
        }

        .community-link-info {
          flex: 1;
          min-width: 0;
        }

        .community-platform {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 7px;
        }

        .whatsapp-card .community-platform {
          color: #1a9d50;
        }

        .telegram-card .community-platform {
          color: #1685bc;
        }

        .community-link-info h3 {
          margin: 0 0 8px;
          color: #0a1628;
          font-size: 16px;
          font-weight: 800;
          line-height: 1.4;
        }

        .community-link-info p {
          margin: 0 0 17px;
          color: #647084;
          font-size: 12px;
          line-height: 1.7;
        }

        .community-join {
          display: inline-block;
          border: none;
          text-decoration: none;
          text-align: center;
          font-family: inherit;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.5px;
          padding: 12px 14px;
          border-radius: 7px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
        }

        .community-join:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .whatsapp-join {
          background: #25d366;
          color: #fff;
        }

        .telegram-join {
          background: #229ed9;
          color: #fff;
        }

        @media (max-width: 1000px) {
          .community-links {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 420px) {
          .community-link-card {
            gap: 12px;
            padding: 18px 14px;
          }

          .community-logo {
            width: 46px;
            height: 46px;
          }

          .community-logo svg {
            width: 30px;
            height: 30px;
          }

          .community-link-info h3 {
            font-size: 14px;
          }

          .community-join {
            font-size: 9px;
            padding: 11px 10px;
          }
        }
      `}</style>

    </DashboardLayout>
  );
}
