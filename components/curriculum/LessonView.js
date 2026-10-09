import { useState } from 'react';
import toast from 'react-hot-toast';
import { getCourseByKey, getNextCourseKey } from '../../lib/curriculumData';
import FinalExam from './FinalExam';

/**
 * Props:
 *  lessonKey  'cc' | 'c2' | ... | 'final'
 *  course     course object from /api/curriculum (optional)
 *  busy       true while the parent is saving
 *  onComplete (lessonKey, nextKey, meta) => Promise
 *
 * Knowledge Check and Personal Reflection each have a Submit and a Skip button.
 */
export default function LessonView({ lessonKey, course: apiCourse, busy = false, onComplete, onExamPassed }) {
  const course = apiCourse || getCourseByKey(lessonKey);
  const nextKey = getNextCourseKey(lessonKey);

  const [reflection, setReflection] = useState('');
  const [knowledgeAnswer, setKnowledgeAnswer] = useState('');
  const [knowledge, setKnowledge] = useState(null); // 'submitted' | 'skipped' | null

  if (!course) return <div className="lv-empty">Select a session to begin.</div>;
  if (lessonKey === 'final') return <FinalExam course={course} onPassed={onExamPassed} />;

  function handleKnowledgeSubmit(e) {
    e.preventDefault();
    if (!knowledgeAnswer.trim()) return toast.error('Answer the check, or use Skip.');
    setKnowledge('submitted');
    toast.success('Knowledge check saved.');
  }

  function handleKnowledgeSkip() {
    setKnowledgeAnswer('');
    setKnowledge('skipped');
    toast('Knowledge check skipped.');
  }

  function handleReflectionSubmit(e) {
    e.preventDefault();
    if (!reflection.trim()) return toast.error('Write a short reflection, or use Skip.');
    onComplete(lessonKey, nextKey, { knowledge: knowledge || 'skipped', reflection: 'submitted' });
  }

  function handleReflectionSkip() {
    setReflection('');
    onComplete(lessonKey, nextKey, { knowledge: knowledge || 'skipped', reflection: 'skipped' });
  }

  const done = course.completed;

  return (
    <div className="lv">
      <div className="lv-head">
        <div className="lv-eyebrow">
          {course.type === 'final-assessment' ? 'CAPSTONE' : 'SESSION'}
          {done && ' · COMPLETED'}
        </div>
        <h2 className="lv-title">{course.title}</h2>
        {course.subtitle && <p className="lv-sub">{course.subtitle}</p>}
      </div>

      <div className="lv-body">
        <p>{course.description || 'Lesson content goes here.'}</p>
      </div>

      <div className="lv-section">
        <div className="lv-section-title">
          Knowledge Check {knowledge === 'submitted' && '— saved'}{knowledge === 'skipped' && '— skipped'}
        </div>
        <form onSubmit={handleKnowledgeSubmit}>
          <textarea
            className="lv-textarea"
            placeholder="Answer the knowledge check question…"
            value={knowledgeAnswer}
            onChange={(e) => setKnowledgeAnswer(e.target.value)}
          />
          <div className="lv-actions">
            <button type="submit" className="lv-btn lv-btn-primary">SUBMIT</button>
            <button type="button" className="lv-btn lv-btn-skip" onClick={handleKnowledgeSkip}>SKIP</button>
          </div>
        </form>
      </div>

      <div className="lv-section">
        <div className="lv-section-title">Personal Reflection</div>
        <form onSubmit={handleReflectionSubmit}>
          <textarea
            className="lv-textarea"
            placeholder="What is God speaking to you through this session?"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          />
          <div className="lv-actions">
            <button type="submit" disabled={busy} className="lv-btn lv-btn-primary">
              {busy ? 'SAVING…' : 'SUBMIT & COMPLETE'}
            </button>
            <button type="button" disabled={busy} className="lv-btn lv-btn-skip" onClick={handleReflectionSkip}>
              SKIP
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .lv-empty { padding: 40px; text-align: center; color: var(--mid); }
        .lv-head { margin-bottom: 18px; }
        .lv-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 2px; color: var(--gold); margin-bottom: 6px; }
        .lv-title { font-size: 20px; font-weight: 700; color: var(--navy); }
        .lv-sub { font-size: 13px; color: var(--mid); margin-top: 4px; }
        .lv-body { font-size: 14px; color: var(--mid); line-height: 1.8; margin-bottom: 24px; }
        .lv-section { background: #fff; border: 1px solid #ececec; border-radius: 10px; padding: 20px; margin-bottom: 18px; }
        .lv-section-title { font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 12px; }
        .lv-textarea { width: 100%; min-height: 100px; resize: vertical; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; font-size: 13px; color: var(--txt); margin-bottom: 12px; }
        .lv-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .lv-btn { font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 11px 22px; border-radius: 6px; cursor: pointer; border: none; }
        .lv-btn:disabled { opacity: 0.6; cursor: wait; }
        .lv-btn-primary { background: var(--gold); color: var(--navy); }
        .lv-btn-primary:hover:not(:disabled) { background: #e8b84b; }
        .lv-btn-skip { background: transparent; border: 1px solid #d8d8d8; color: var(--mid); }
        .lv-btn-skip:hover:not(:disabled) { border-color: var(--gold); color: var(--gold); }
      `}</style>
    </div>
  );
}