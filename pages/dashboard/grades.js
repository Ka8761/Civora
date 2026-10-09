import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function GradesPage() {
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/grades')
      .then((r) => r.json())
      .then((d) => {
        setRows(d.rows || []);
        setSummary(d.summary || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const s = summary || { lessonsDone: 0, totalLessons: 6, avgScore: 0, overallGrade: '—', finalExamLocked: true };

  return (
    <DashboardLayout title="Grades">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="pg-t">My Grades</div>
          <div className="pg-s">COLIG FOUNDATION · ACADEMIC RECORD</div>
        </div>
        <span className="tag tgg" style={{ fontSize: 11, padding: '8px 16px' }}>
          OVERALL: {s.overallGrade}{s.avgScore ? ` (${s.avgScore}%)` : ''}
        </span>
      </div>

      <div className="g3" style={{ marginBottom: 20 }}>
        <div className="sc">
          <div className="sc-l">SESSIONS DONE</div>
          <div className="sc-v" style={{ color: 'var(--gold)' }}>
            {s.lessonsDone}<span style={{ fontSize: 15, color: '#9a9a9a' }}>/{s.totalLessons}</span>
          </div>
          <div className="sc-s">Of total sessions</div>
        </div>
        <div className="sc">
          <div className="sc-l">AVG SCORE</div>
          <div className="sc-v" style={{ color: 'var(--gb)' }}>{s.avgScore ? `${s.avgScore}%` : '—'}</div>
          <div className="sc-s">Knowledge checks</div>
        </div>
        <div className="sc">
          <div className="sc-i">🏁</div>
          <div className="sc-l">FINAL EXAM</div>
          <div className="sc-v" style={{ color: s.finalExamLocked ? '#ccc' : 'var(--gb)', fontSize: 16, fontFamily: "'Barlow Condensed'", fontWeight: 800 }}>
            {s.finalExamLocked ? '🔒 LOCKED' : s.finalExamDone ? 'COMPLETE' : 'OPEN'}
          </div>
          <div className="sc-s">{s.finalExamLocked ? 'Complete all modules' : 'Ready'}</div>
        </div>
      </div>

      <div className="wc">
        <div className="wch"><div className="wct">Grade Breakdown by Module</div></div>
        <table className="gtbl">
          <thead>
            <tr><th>MODULE</th><th>KNOWLEDGE CHECK</th><th>REFLECTION</th><th>STATUS</th><th>GRADE</th></tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} style={{ padding: 20, color: '#999' }}>Loading…</td></tr>}
            {rows.map((row) => {
              const locked = row.status === 'LOCKED';
              return (
                <tr key={row.key}>
                  <td>
                    <strong>
                      {row.key === 'final' ? '🏁 ' : ''}{row.module}{locked ? ' 🔒' : ''}
                    </strong>
                  </td>
                  <td style={{ color: row.done ? 'var(--mid)' : '#ccc' }}>{row.knowledgeCheck}</td>
                  <td style={{ color: row.done ? 'var(--mid)' : '#ccc' }}>{row.reflection}</td>
                  <td><span className={`tag ${row.done ? 'tg' : 'tgl'}`}>{row.status}</span></td>
                  <td><span className={`gb2 ${row.done ? 'ga' : 'gp'}`}>{row.grade}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}