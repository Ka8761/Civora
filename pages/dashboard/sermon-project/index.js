import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { TOTAL_SERMONS } from '../../../lib/curriculumData';

const SECTIONS = [
  { number: 1, name: 'Faith' },
  { number: 2, name: 'The Word' },
  { number: 3, name: 'Prayer' },
  { number: 4, name: 'The Holy Spirit' },
  { number: 5, name: 'Leadership' },
  { number: 6, name: 'Ministry' },
];

export default function SermonProjectPage() {
  const [sermons, setSermons] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sermons')
      .then((r) => r.json())
      .then((d) => {
        setSermons(d.sermons || []);
        setCompletedIds(d.completedIds || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const done = completedIds.length;
  const remaining = Math.max(TOTAL_SERMONS - done, 0);

  return (
    <DashboardLayout title="Sermon Project">
      <p className="verse">FAITH COMES BY HEARING AND HEARING BY THE WORD.</p>

      <div className="hero-card">
        <div>
          <span>YOUR PROGRESS</span>
          <strong>{done} / {TOTAL_SERMONS} COMPLETED</strong>
        </div>
        <div className="lock">
          {remaining > 0 ? '🔒' : '🔓'}
          <small>{remaining > 0 ? `${remaining} MORE TO UNLOCK FINAL EXAM` : 'FINAL EXAM REQUIREMENT MET'}</small>
        </div>
      </div>

      <div className="categories">
        {SECTIONS.map((s) => {
          const list = sermons.filter((x) => Number(x.section) === s.number);
          const heard = list.filter((x) => completedIds.includes(x.number)).length;
          return (
            <div className="category" key={s.number}>
              <div className="icon">{s.number}</div>
              <h2>{s.name}</h2>
              <p>
                {loading ? 'Loading…' : list.length ? `${heard} of ${list.length} heard` : 'No sermons added yet'}
              </p>
              <Link href={`/dashboard/sermon-project/library?section=${s.number}`} legacyBehavior>
                <a className="open">OPEN LIBRARY</a>
              </Link>
            </div>
          );
        })}
      </div>

      <Link href="/dashboard/sermon-project/library" legacyBehavior>
        <a className="all">VIEW ALL SERMONS →</a>
      </Link>

      <style jsx>{`
        .verse { font-size: 11px; letter-spacing: 2px; color: var(--gold); font-weight: 700; margin-bottom: 18px; }
        .hero-card { padding: 30px; background: var(--navy); color: #fff; border-radius: 18px; display: flex; justify-content: space-between; align-items: center; gap: 30px; }
        .hero-card span { display: block; font-size: 11px; color: #aaa; letter-spacing: 2px; }
        .hero-card strong { display: block; margin-top: 10px; font-size: 26px; }
        .lock { text-align: center; font-size: 30px; }
        .lock small { display: block; font-size: 10px; color: #aaa; margin-top: 5px; }
        .categories { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px; }
        .category { padding: 24px; background: #fff; border: 1px solid #e7e7e7; border-radius: 16px; }
        .icon { width: 40px; height: 40px; border-radius: 50%; background: var(--navy); color: #fff; display: flex; justify-content: center; align-items: center; font-weight: 800; }
        h2 { color: var(--navy); margin: 16px 0 6px; font-size: 18px; }
        p { color: #777; font-size: 13px; margin-bottom: 16px; }
        .open { display: inline-block; background: var(--navy); color: #fff; padding: 11px 15px; border-radius: 7px; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-decoration: none; }
        .all { display: inline-block; margin-top: 22px; color: var(--gold); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-decoration: none; }
        @media (max-width: 850px) {
          .categories { grid-template-columns: 1fr; }
          .hero-card { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </DashboardLayout>
  );
}