import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const SECTIONS = [
  { number: 1, name: 'Faith' },
  { number: 2, name: 'The Word' },
  { number: 3, name: 'Prayer' },
  { number: 4, name: 'The Holy Spirit' },
  { number: 5, name: 'Leadership' },
  { number: 6, name: 'Ministry' },
];

export default function SermonLibrary() {
  const router = useRouter();
  const [sermons, setSermons] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [playingId, setPlayingId] = useState(null);

  const sectionFilter = router.query.section ? Number(router.query.section) : null;

  useEffect(() => {
    let mounted = true;
    fetch('/api/sermons')
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        if (!mounted) return;
        setSermons(d.sermons || []);
        setCompletedIds(d.completedIds || []);
      })
      .catch(() => mounted && setError('Unable to load the sermon library right now.'))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const markHeard = useCallback(async (sermon) => {
    if (completedIds.includes(sermon.number)) return;
    try {
      const res = await fetch('/api/user/progress', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sermonId: sermon.number }),
      });
      if (!res.ok) throw new Error();
      const d = await res.json();
      setCompletedIds(d.user.completedSermonIds || []);
      toast.success('Sermon marked as heard');
    } catch {
      toast.error('Could not save — try again');
    }
  }, [completedIds]);

  const visibleSections = SECTIONS.filter((s) => !sectionFilter || s.number === sectionFilter);

  return (
    <DashboardLayout title="Sermon Library">
      <Link href="/dashboard/sermon-project" legacyBehavior>
        <a className="back">← BACK TO SERMON PROJECT</a>
      </Link>

      <div className="tabs">
        <Link href="/dashboard/sermon-project/library" legacyBehavior>
          <a className={`tab ${!sectionFilter ? 'on' : ''}`}>ALL</a>
        </Link>
        {SECTIONS.map((s) => (
          <Link key={s.number} href={`/dashboard/sermon-project/library?section=${s.number}`} legacyBehavior>
            <a className={`tab ${sectionFilter === s.number ? 'on' : ''}`}>{s.name.toUpperCase()}</a>
          </Link>
        ))}
      </div>

      {loading && <div className="box">Loading sermons…</div>}
      {error && <div className="box err">{error}</div>}

      {!loading && !error && sermons.length === 0 && (
        <div className="box">
          <strong>No sermons found yet.</strong>
          <p>
            Put your audio files in <code>public/audio</code> named like <code>faith-01.mp3</code>,{' '}
            <code>the-word-02.mp3</code>, <code>prayer-03.mp3</code>, <code>holy-spirit-01.mp3</code>,{' '}
            <code>leadership-01.mp3</code>, <code>ministry-01.mp3</code>, then open{' '}
            <code>/api/sermons?sync=1</code> once.
          </p>
        </div>
      )}

      {!loading && !error && sermons.length > 0 &&
        visibleSections.map((section) => {
          const list = sermons
            .filter((s) => Number(s.section) === section.number)
            .sort((a, b) => Number(a.order) - Number(b.order));
          if (!list.length) return null;
          return (
            <section key={section.number} className="sec">
              <div className="sec-head">
                <div className="sec-num">0{section.number}</div>
                <h2>{section.name}</h2>
                <span>{list.length} {list.length === 1 ? 'MESSAGE' : 'MESSAGES'}</span>
              </div>

              {list.map((sermon) => {
                const id = sermon._id;
                const heard = completedIds.includes(sermon.number);
                const playing = playingId === id;
                return (
                  <article key={id} className={`card ${playing ? 'active' : ''}`}>
                    <div className="row">
                      <div className="n">{String(sermon.order).padStart(2, '0')}</div>
                      <div className="info">
                        <h3>{sermon.title}</h3>
                        {sermon.speaker && <div className="meta">{sermon.speaker}</div>}
                        {sermon.scripture && <div className="scr">{sermon.scripture}</div>}
                        {heard && <div className="heard">HEARD</div>}
                      </div>
                      <div className="acts">
                        <button className={`play ${playing ? 'stop' : ''}`} onClick={() => setPlayingId(playing ? null : id)}>
                          {playing ? 'STOP' : 'PLAY'}
                        </button>
                        {!heard && (
                          <button className="mark" onClick={() => markHeard(sermon)}>MARK HEARD</button>
                        )}
                        <a className="dl" href={sermon.audioUrl} download>DOWNLOAD</a>
                      </div>
                    </div>
                    {playing && (
                      <audio
                        className="player"
                        src={sermon.audioUrl}
                        controls
                        autoPlay
                        onEnded={() => { markHeard(sermon); setPlayingId(null); }}
                      />
                    )}
                  </article>
                );
              })}
            </section>
          );
        })}

      <style jsx>{`
        .back { display: inline-block; color: #64748b; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-bottom: 16px; }
        .back:hover { color: var(--gold); }
        .tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 22px; }
        .tab { padding: 8px 14px; border-radius: 20px; border: 1px solid #e0e0e0; color: var(--mid); font-size: 10px; font-weight: 700; letter-spacing: 1px; text-decoration: none; }
        .tab.on { background: var(--gold); border-color: var(--gold); color: var(--navy); }
        .box { text-align: center; padding: 50px 24px; border: 1px solid #e5e7eb; border-radius: 12px; background: #fff; color: #64748b; font-size: 14px; line-height: 1.7; }
        .box strong { color: var(--navy); font-size: 18px; }
        .box code { background: #f3f4f6; padding: 1px 6px; border-radius: 4px; font-size: 12px; }
        .err { color: #b91c1c; }
        .sec { margin-bottom: 34px; }
        .sec-head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .sec-num { width: 44px; height: 44px; border: 1px solid var(--gold); color: var(--gold); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; }
        .sec-head h2 { font-size: 21px; color: var(--navy); }
        .sec-head span { margin-left: auto; font-size: 10px; font-weight: 800; letter-spacing: 1px; color: #64748b; }
        .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px; margin-bottom: 10px; transition: border-color .2s; }
        .card.active, .card:hover { border-color: var(--gold); }
        .row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .n { width: 42px; height: 42px; border-radius: 50%; background: var(--navy); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; flex-shrink: 0; }
        .info { flex: 1; min-width: 180px; }
        h3 { font-size: 16px; color: var(--navy); }
        .meta { font-size: 12px; color: #64748b; margin-top: 3px; }
        .scr { font-size: 11px; color: var(--gold); font-style: italic; margin-top: 4px; }
        .heard { display: inline-block; margin-top: 6px; font-size: 9px; font-weight: 800; letter-spacing: 1.5px; color: #39884a; }
        .acts { display: flex; gap: 8px; flex-wrap: wrap; }
        .play, .mark, .dl { height: 36px; padding: 0 14px; border-radius: 5px; font-size: 9px; font-weight: 800; letter-spacing: 0.8px; cursor: pointer; display: inline-flex; align-items: center; text-decoration: none; }
        .play { background: var(--gold); border: 1px solid var(--gold); color: #fff; }
        .play.stop { background: var(--navy); border-color: var(--navy); }
        .mark { background: transparent; border: 1px solid #39884a; color: #39884a; }
        .dl { border: 1px solid #dbe1e8; color: var(--navy); }
        .player { width: 100%; height: 42px; margin-top: 12px; }
      `}</style>
    </DashboardLayout>
  );
}