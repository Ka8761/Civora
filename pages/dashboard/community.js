import { useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

const INITIAL_POSTS = [
  { id: 1, name: 'TUNDE A.', bg: 'var(--navy)', text: 'Just completed the CC Overview lesson. The section on the vision of COLIG really stirred something in my spirit. I feel like God placed me here intentionally for this season. Who else feels this way?', time: '2 hours ago · CC Orientation', likes: 12 },
  { id: 2, name: 'CHIOMA B.', bg: '#6b21a8', text: "Sermon 1 really blessed me — 'The just shall live by faith.' I had to pause it three times to write notes. Faith really does come by hearing! Don't skip the Sermon Project.", time: 'Yesterday · Sermon Project', likes: 27 },
  { id: 3, name: 'EMEKA S.', bg: '#4caf50', text: 'A prayer I logged 3 weeks ago has been answered! I prayed for a job and yesterday I got a call. God is faithful — He keeps His Word. Please join me in praise! 🙌', time: '2 days ago · Prayer Log', likes: 54 },
];

export default function CommunityPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [text,  setText]  = useState('');

  function addPost() {
    if (!text.trim()) { toast.error('Write something first'); return; }
    setPosts(p => [{
      id: Date.now(),
      name: session?.user?.name?.toUpperCase() || 'YOU',
      bg: 'var(--navy)',
      text, time: 'Just now', likes: 0,
    }, ...p]);
    setText('');
    toast.success('✅ Posted to the community!');
  }

  function likePost(id) {
    setPosts(p => p.map(x => x.id === id ? { ...x, likes: x.likes + 1 } : x));
  }

  return (
    <DashboardLayout title="Community">
      {/* Header */}
      <div className="com-h">
        <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 4, color: 'rgba(201,146,26,0.68)', marginBottom: 8 }}>STUDENT COMMUNITY</div>
        <div style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 7 }}>The Foundation Family 🤝</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.46)', maxWidth: 460, margin: '0 auto 16px' }}>
          Connect with fellow students. Share revelations, prayer requests, and testimonies. Iron sharpens iron.
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[{ v: '142', l: 'STUDENTS' }, { v: '38', l: 'ONLINE NOW' }].map(s => (
            <div key={s.l} style={{ background: 'rgba(201,146,26,0.15)', border: '1px solid rgba(201,146,26,0.3)', borderRadius: 10, padding: '11px 18px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, color: 'var(--gold)' }}>{s.v}</div>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.38)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Post box */}
      <div className="prform" style={{ marginBottom: 13 }}>
        <textarea className="rta" placeholder="Share a thought, revelation, or encouragement with your cohort…"
          style={{ minHeight: 75, marginBottom: 11 }}
          value={text} onChange={e => setText(e.target.value)} />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="bs bs-g" onClick={addPost}>POST →</button>
          <button className="bs bs-o" onClick={() => toast.success('🙏 Prayer request shared!')}>SHARE PRAYER REQUEST</button>
        </div>
      </div>

      {/* Posts */}
      {posts.map(p => (
        <div key={p.id} className="pc">
          <div className="pa">
            <div className="pa-av" style={{ background: p.bg }}>{p.name.charAt(0)}</div>
            <div><div className="pa-n">{p.name}</div><div className="pa-t">{p.time}</div></div>
          </div>
          <div className="ptxt">{p.text}</div>
          <div className="pacts">
            <button className="pab" onClick={() => likePost(p.id)}>❤ {p.likes}</button>
            <button className="pab" onClick={() => toast.success('💬 Reply coming soon!')}>💬 Reply</button>
            <button className="pab" onClick={() => toast.success('🙏 Amen!')}>🙏 Amen</button>
          </div>
        </div>
      ))}
    </DashboardLayout>
  );
}

