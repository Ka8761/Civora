import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function FinalExam({ course, onPassed }) {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch('/api/final-exam')
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || 'Could not load the exam');
        return d;
      })
      .then((d) => {
        setExam(d);
        setAnswers(new Array(d.questions.length).fill(null));
      })
      .catch((e) => setError(e.message));
  }, []);

  async function submit() {
    setBusy(true);
    try {
      const res = await fetch('/api/final-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'Could not submit');
      setResult(d);
      if (d.passed) {
        toast.success('You passed the final exam!');
        onPassed && onPassed();
      } else {
        toast.error(`Score ${d.score}%. You need ${d.passingScore}% — try again.`);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  function retake() {
    setResult(null);
    setAnswers(new Array(exam.questions.length).fill(null));
  }

  if (error) return <div className="fe-msg">🔒 {error}</div>;
  if (!exam) return <div className="fe-msg">Loading exam…</div>;

  if (result?.passed || (exam.passed && !result)) {
    return (
      <div className="fe-msg">
        <h2>Final Exam Passed</h2>
        <p>
          {result ? `Your score: ${result.score}%` : exam.bestScore != null ? `Your best score: ${exam.bestScore}%` : ''}
        </p>
        <Link href="/dashboard/certificate" legacyBehavior>
          <a className="fe-btn">GET YOUR CERTIFICATE →</a>
        </Link>
        <style jsx>{styles}</style>
      </div>
    );
  }

  if (result && !result.passed) {
    return (
      <div className="fe-msg">
        <h2>Not yet</h2>
        <p>You scored {result.score}% ({result.correct}/{result.total}). The pass mark is {result.passingScore}%.</p>
        <button className="fe-btn" onClick={retake}>TRY AGAIN</button>
        <style jsx>{styles}</style>
      </div>
    );
  }

  const allAnswered = answers.every((a) => a !== null);

  return (
    <div>
      <div className="fe-eyebrow">CAPSTONE</div>
      <h2 className="fe-title">{course?.title || 'Final Exam'}</h2>
      <p className="fe-sub">Pass mark: {exam.passingScore}%. Answer every question, then submit.</p>

      {exam.questions.map((q, qi) => (
        <div key={q.id} className="fe-q">
          <div className="fe-qt">{qi + 1}. {q.q}</div>
          {q.options.map((opt, oi) => (
            <label key={oi} className={`fe-opt ${answers[qi] === oi ? 'on' : ''}`}>
              <input
                type="radio"
                name={`q${qi}`}
                checked={answers[qi] === oi}
                onChange={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      ))}

      <button className="fe-btn" disabled={!allAnswered || busy} onClick={submit}>
        {busy ? 'SUBMITTING…' : 'SUBMIT FINAL EXAM'}
      </button>
      <style jsx>{styles}</style>
    </div>
  );
}

const styles = `
  .fe-msg { padding: 40px 20px; text-align: center; color: var(--mid); }
  .fe-msg h2 { color: var(--navy); margin-bottom: 8px; }
  .fe-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 2px; color: var(--gold); margin-bottom: 6px; }
  .fe-title { font-size: 20px; font-weight: 700; color: var(--navy); }
  .fe-sub { font-size: 13px; color: var(--mid); margin: 6px 0 22px; }
  .fe-q { background: #fff; border: 1px solid #ececec; border-radius: 10px; padding: 18px; margin-bottom: 14px; }
  .fe-qt { font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 10px; }
  .fe-opt { display: flex; gap: 10px; align-items: center; padding: 10px 12px; border: 1px solid #e5e5e5; border-radius: 8px; margin-bottom: 8px; cursor: pointer; font-size: 13px; color: var(--txt); }
  .fe-opt.on { border-color: var(--gold); background: #faf6ea; }
  .fe-btn { display: inline-block; margin-top: 10px; border: none; background: var(--gold); color: var(--navy); padding: 12px 22px; border-radius: 6px; font-size: 11px; font-weight: 800; letter-spacing: 1px; cursor: pointer; text-decoration: none; }
  .fe-btn:disabled { opacity: 0.5; cursor: not-allowed; }
`;