// import { useState } from 'react';
// import toast from 'react-hot-toast';

// const LESSONS = {
//   'cc-overview': {
//     tag: 'CC ORIENTATION · OVERVIEW · LESSON 1 OF 4',
//     title: 'Welcome to COLIG Leadership Foundation School',
//     type: 'overview',
//     body: `Welcome, beloved student. You have made a great decision to begin this journey of intentional discipleship and servant leadership training.

// The COLIG Leadership Foundation School is a structured programme designed to equip you with:
// - Sound biblical doctrine and a deep understanding of Scripture
// - A personal discipline of prayer, study, and daily reflection
// - The character and competence required for servant leadership
// - A strong community of accountability with fellow believers

// This orientation module (CC) introduces you to the school's vision, structure, and expectations. Complete every lesson, knowledge check, and reflection before proceeding to C2.`,
//     next: 'cc-video',
//   },
//   'cc-video': {
//     tag: 'CC ORIENTATION · VIDEO LESSON · LESSON 2 OF 4',
//     title: 'Introduction to COLIG Leadership Foundation School',
//     type: 'video',
//     duration: '22 minutes',
//     next: 'cc-knowledge',
//   },
//   'cc-knowledge': {
//     tag: 'CC ORIENTATION · KNOWLEDGE CHECK · LESSON 3 OF 4',
//     title: 'Test Your Understanding',
//     type: 'knowledge',
//     questions: [
//       {
//         q: '1. What is the primary aim of COLIG Leadership Foundation School?',
//         options: [
//           { k: 'A', text: 'To equip believers with sound doctrine, spiritual discipline, and servant leadership', correct: true },
//           { k: 'B', text: 'To train pastors for church planting only', correct: false },
//           { k: 'C', text: 'To provide secular leadership skills', correct: false },
//           { k: 'D', text: 'To replace church membership', correct: false },
//         ],
//       },
//       {
//         q: '2. According to Romans 10:17, faith comes by:',
//         options: [
//           { k: 'A', text: 'Fasting and prayer alone', correct: false },
//           { k: 'B', text: 'Hearing, and hearing by the Word of God', correct: true },
//           { k: 'C', text: 'Good works and service', correct: false },
//           { k: 'D', text: 'Church attendance alone', correct: false },
//         ],
//       },
//       {
//         q: '3. How many course modules does the Foundation School have?',
//         options: [
//           { k: 'A', text: '4', correct: false },
//           { k: 'B', text: '5', correct: false },
//           { k: 'C', text: '6 — CC, C2, C3, C4, C5, C6', correct: true },
//           { k: 'D', text: '8', correct: false },
//         ],
//       },
//     ],
//     next: 'cc-reflection',
//   },
//   'cc-reflection': {
//     tag: 'CC ORIENTATION · REFLECTION · LESSON 4 OF 4',
//     title: 'Personal Reflection',
//     type: 'reflection',
//     prompts: [
//       'What specific area of your life do you believe God is calling you to grow in through this school? How does servant leadership apply to where you are right now?',
//       'What was the most impactful thing from the CC Orientation? How will you apply it this week?',
//       'Write a short prayer committing yourself to this journey of discipleship.',
//     ],
//     next: null,
//     completesChapter: true,
//   },
// };

// export default function LessonView({ lessonKey, onComplete }) {
//   const lesson = LESSONS[lessonKey];
//   const [answers, setAnswers] = useState({});
//   const [reflections, setReflections] = useState({});

//   if (!lesson) {
//     return (
//       <div className="lc">
//         <div style={{ padding: '60px', textAlign: 'center' }}>
//           <div style={{ fontSize: 46, marginBottom: 13 }}>🔒</div>
//           <div style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 7 }}>
//             Module Locked
//           </div>
//           <p style={{ fontSize: 14, color: 'var(--mid)', maxWidth: 340, margin: '0 auto', lineHeight: 1.7 }}>
//             Complete <strong>CC Orientation</strong> to unlock this module.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   function pickAnswer(qIdx, correct) {
//     setAnswers(a => ({ ...a, [qIdx]: correct }));
//     if (correct) toast.success('✅ Correct!');
//     else toast.error('❌ Not quite — try again');
//   }

//   function submitReflection() {
//     const filled = Object.values(reflections).filter(v => v.trim().length > 20);
//     if (filled.length < (lesson.prompts?.length || 0)) {
//       toast.error('Please complete all reflection prompts');
//       return;
//     }
//     toast.success('🎉 ' + (lesson.completesChapter ? 'CC Orientation Complete! C2 is now unlocked.' : 'Reflection saved!'));
//     if (onComplete) onComplete(lessonKey);
//   }

//   return (
//     <div className="lc">
//       {/* Video type */}
//       {lesson.type === 'video' && (
//         <div className="lc-vid">
//           <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: 'rgba(201,146,26,0.7)', marginBottom: 8 }}>{lesson.tag}</div>
//           <button
//             style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--gold)', border: 'none', fontSize: 22, cursor: 'pointer', transition: 'transform .2s' }}
//             onClick={() => toast.success('▶ Playing: ' + lesson.title)}
//           >▶</button>
//           <div style={{ fontFamily: "'Playfair Display'", fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>{lesson.title}</div>
//           <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.34)' }}>Duration: {lesson.duration} · HD Video</div>
//         </div>
//       )}

//       {/* Meta */}
//       <div className="lc-meta">
//         <div className="lc-tag">{lesson.tag}</div>
//         <div className="lc-title">{lesson.title}</div>
//       </div>

//       {/* Overview body */}
//       {lesson.type === 'overview' && (
//         <div className="lc-body">
//           {lesson.body.split('\n').map((line, i) => {
//             if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: 18 }}>{line.slice(2)}</li>;
//             if (line.trim() === '') return <br key={i} />;
//             return <p key={i} style={{ marginBottom: 11 }}>{line}</p>;
//           })}
//         </div>
//       )}

//       {/* Knowledge check */}
//       {lesson.type === 'knowledge' && (
//         <div style={{ padding: '16px 20px' }}>
//           {lesson.questions.map((q, qi) => (
//             <div key={qi} className="kcq">
//               <div className="kcqt">{q.q}</div>
//               <div className="kcops">
//                 {q.options.map((opt, oi) => (
//                   <div
//                     key={oi}
//                     className={`kcop ${answers[qi] === true && opt.correct ? 'cor' : answers[qi] === false && !opt.correct && answers[qi] !== undefined ? '' : ''}`}
//                     onClick={() => pickAnswer(qi, opt.correct)}
//                   >
//                     <div className="kl">{opt.k}</div>
//                     <div className="ktxt">{opt.text}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Reflection */}
//       {lesson.type === 'reflection' && (
//         <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
//           {lesson.prompts.map((prompt, pi) => (
//             <div key={pi} className="rb">
//               <div className="rp">"{prompt}"</div>
//               <textarea
//                 className="rta"
//                 placeholder="Write your reflection here (minimum 100 words)…"
//                 value={reflections[pi] || ''}
//                 onChange={e => setReflections(r => ({ ...r, [pi]: e.target.value }))}
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Actions */}
//       <div className="lc-acts">
//         {lesson.next && (
//           <button className="bs bs-g" onClick={() => onComplete && onComplete(lessonKey, lesson.next)}>
//             NEXT LESSON →
//           </button>
//         )}
//         {lesson.type === 'reflection' && (
//           <button className="bs bs-g" onClick={submitReflection}>
//             SUBMIT & COMPLETE →
//           </button>
//         )}
//         {lesson.type !== 'reflection' && lesson.type !== 'knowledge' && (
//           <button className="bs bs-o" onClick={() => { toast.success('Marked complete!'); onComplete && onComplete(lessonKey); }}>
//             MARK COMPLETE
//           </button>
//         )}
//         {lesson.type === 'knowledge' && (
//           <button className="bs bs-gr" onClick={() => { toast.success('Score submitted: 95%!'); onComplete && onComplete(lessonKey); }}>
//             SUBMIT ANSWERS
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import toast from 'react-hot-toast';
import { getCourseByKey, getNextCourseKey } from '../../lib/curriculumData';

/**
 * Props:
 *  - lessonKey: string, current active course/lesson key ('cc','c2',...,'final')
 *  - onComplete: (lessonKey, nextKey) => void   // parent auto-advances activeLesson to nextKey
 *
 * Every step that requires user input (Knowledge Check, Personal Reflection)
 * gets a Skip button beside its Submit/Complete button. Skip moves the
 * student forward without requiring the field to be filled in.
 */
export default function LessonView({ lessonKey, onComplete }) {
  const course = getCourseByKey(lessonKey);
  const nextKey = getNextCourseKey(lessonKey);

  const [reflection, setReflection] = useState('');
  const [knowledgeAnswer, setKnowledgeAnswer] = useState('');

  function finishLesson(meta = {}) {
    onComplete(lessonKey, nextKey);
    if (meta.skipped) {
      toast('⏭️ Skipped — moving to the next session'.replace('⏭️ ', ''));
    }
  }

  function handleReflectionSubmit(e) {
    e.preventDefault();
    if (!reflection.trim()) {
      toast.error('Write a short reflection, or use Skip.');
      return;
    }
    finishLesson();
    toast.success('Reflection saved!');
  }

  function handleReflectionSkip() {
    setReflection('');
    finishLesson({ skipped: true });
  }

  function handleKnowledgeSubmit(e) {
    e.preventDefault();
    if (!knowledgeAnswer.trim()) {
      toast.error('Answer the check, or use Skip.');
      return;
    }
    toast.success('Knowledge check submitted!');
  }

  function handleKnowledgeSkip() {
    setKnowledgeAnswer('');
    toast('Knowledge check skipped.');
  }

  if (!course) {
    return <div className="lv-empty">Select a session to begin.</div>;
  }

  return (
    <div className="lv">
      <div className="lv-head">
        <div className="lv-eyebrow">{course.type === 'final-assessment' ? 'CAPSTONE' : 'SESSION'}</div>
        <h2 className="lv-title">{course.title}</h2>
        {course.subtitle && <p className="lv-sub">{course.subtitle}</p>}
      </div>

      <div className="lv-body">
        <p>{course.description || 'Lesson content goes here.'}</p>
      </div>

      {/* Knowledge Check */}
      <div className="lv-section">
        <div className="lv-section-title">Knowledge Check</div>
        <form onSubmit={handleKnowledgeSubmit}>
          <textarea
            className="lv-textarea"
            placeholder="Answer the knowledge check question…"
            value={knowledgeAnswer}
            onChange={(e) => setKnowledgeAnswer(e.target.value)}
          />
          <div className="lv-actions">
            <button type="submit" className="lv-btn lv-btn-primary">SUBMIT</button>
            <button type="button" className="lv-btn lv-btn-skip" onClick={handleKnowledgeSkip}>
              SKIP
            </button>
          </div>
        </form>
      </div>

      {/* Personal Reflection */}
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
            <button type="submit" className="lv-btn lv-btn-primary">
              SUBMIT &amp; COMPLETE
            </button>
            <button type="button" className="lv-btn lv-btn-skip" onClick={handleReflectionSkip}>
              SKIP
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .lv-empty {
          padding: 40px;
          text-align: center;
          color: var(--mid);
        }
        .lv-head {
          margin-bottom: 18px;
        }
        .lv-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--gold);
          margin-bottom: 6px;
        }
        .lv-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--navy);
        }
        .lv-sub {
          font-size: 13px;
          color: var(--mid);
          margin-top: 4px;
        }
        .lv-body {
          font-size: 14px;
          color: var(--mid);
          line-height: 1.8;
          margin-bottom: 24px;
        }
        .lv-section {
          background: #fff;
          border: 1px solid #ececec;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 18px;
        }
        .lv-section-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 12px;
        }
        .lv-textarea {
          width: 100%;
          min-height: 100px;
          resize: vertical;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 12px;
          font-size: 13px;
          color: var(--txt);
          margin-bottom: 12px;
        }
        .lv-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .lv-btn {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 11px 22px;
          border-radius: 6px;
          cursor: pointer;
          border: none;
        }
        .lv-btn-primary {
          background: var(--gold);
          color: var(--navy);
        }
        .lv-btn-primary:hover {
          background: #e8b84b;
        }
        .lv-btn-skip {
          background: transparent;
          border: 1px solid #d8d8d8;
          color: var(--mid);
        }
        .lv-btn-skip:hover {
          border-color: var(--gold);
          color: var(--gold);
        }
      `}</style>
    </div>
  );
}