import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import CurriculumSidebar from '../../../components/curriculum/CurriculumSidebar';
import LessonView from '../../../components/curriculum/LessonView';

export default function CurriculumPage() {
  const { data: session } = useSession();
  const [activeLesson,     setActiveLesson]     = useState('cc-overview');
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    fetch('/api/user/progress').then(r => r.json()).then(d => {
      setCompletedLessons(d.user?.completedLessons || []);
    });
  }, []);

  async function handleComplete(lessonKey, nextKey) {
    const updated = completedLessons.includes(lessonKey)
      ? completedLessons
      : [...completedLessons, lessonKey];
    setCompletedLessons(updated);

    await fetch('/api/user/progress', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completedLessons: updated }),
    });

    if (nextKey) setActiveLesson(nextKey);
    toast.success('✅ Lesson saved!');
  }

  return (
    <DashboardLayout title="Curriculum Map">
      <div className="cl">
        <CurriculumSidebar
          activeLesson={activeLesson}
          completedLessons={completedLessons}
          onSelect={setActiveLesson}
        />
        <div className="con">
          <LessonView
            lessonKey={activeLesson}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
