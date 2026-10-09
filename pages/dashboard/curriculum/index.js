import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import CurriculumSidebar from '../../../components/curriculum/CurriculumSidebar';
import LessonView from '../../../components/curriculum/LessonView';

export default function CurriculumPage() {
  const { status } = useSession();
  const router = useRouter();

  const [curriculum, setCurriculum] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (forceKey) => {
    try {
      const res = await fetch('/api/curriculum');
      if (!res.ok) throw new Error('Failed to load curriculum');
      const data = await res.json();
      setCurriculum(data.curriculum || []);
      setActiveKey((prev) => {
        const wanted = forceKey || prev || data.currentModule;
        const found = (data.curriculum || []).find((c) => c.key === wanted && c.unlocked);
        return found ? wanted : data.currentModule;
      });
      setError('');
    } catch (e) {
      setError('Could not load the curriculum. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth/login');
    if (status === 'authenticated') load();
  }, [status, load, router]);

  async function handleComplete(key, nextKey, meta = {}) {
    setBusy(true);
    try {
      const res = await fetch('/api/user/progress', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: key, ...meta }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || 'Could not save your progress');
      }
      await load(nextKey || key);
      toast.success(nextKey ? 'Session complete — next one unlocked!' : 'Congratulations! You finished the curriculum.');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  const active = curriculum.find((c) => c.key === activeKey);

  return (
    <DashboardLayout title="Curriculum Map">
      {loading && <div className="cur-msg">Loading curriculum…</div>}
      {!loading && error && <div className="cur-msg cur-err">{error}</div>}

      {!loading && !error && (
        <div className="cur-grid">
          <CurriculumSidebar curriculum={curriculum} activeKey={activeKey} onSelect={setActiveKey} />

          <div className="cur-main">
            {active && active.unlocked ? (
                            <LessonView
                key={active.key}
                lessonKey={active.key}
                course={active}
                busy={busy}
                onComplete={handleComplete}
                onExamPassed={() => load('final')}
              />
            ) : (
              <div className="cur-msg">
                🔒 Complete the previous course to unlock this one.
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .cur-grid { display: grid; grid-template-columns: 280px 1fr; gap: 22px; align-items: start; }
        .cur-main { background: #fff; border: 1px solid #ececec; border-radius: 14px; padding: 26px; min-height: 360px; }
        .cur-msg { padding: 40px; text-align: center; color: var(--mid); background: #fff; border: 1px solid #ececec; border-radius: 14px; }
        .cur-err { color: #b91c1c; }
        @media (max-width: 900px) { .cur-grid { grid-template-columns: 1fr; } }
      `}</style>
    </DashboardLayout>
  );
}