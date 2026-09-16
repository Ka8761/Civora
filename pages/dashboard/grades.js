import DashboardLayout from '../../components/layout/DashboardLayout';

const ROWS = [
  { module: 'CC Orientation',        kc: '95%',  ref: 'Submitted', status: 'IN PROGRESS', grade: 'A', done: true },
  { module: 'C2 New Birth 🔒',       kc: '—',    ref: '—',         status: 'LOCKED',      grade: '—', done: false },
  { module: 'C3 Spiritual Milk 🔒',  kc: '—',    ref: '—',         status: 'LOCKED',      grade: '—', done: false },
  { module: 'C4 Growing in Love 🔒', kc: '—',    ref: '—',         status: 'LOCKED',      grade: '—', done: false },
  { module: 'C5 Stewardship 🔒',     kc: '—',    ref: '—',         status: 'LOCKED',      grade: '—', done: false },
  { module: 'C6 COLIG Cultures 🔒',  kc: '—',    ref: '—',         status: 'LOCKED',      grade: '—', done: false },
  { module: '🏁 Final Exam',          kc: '—',    ref: '—',         status: 'LOCKED',      grade: '—', done: false },
];

export default function GradesPage() {
  return (
    <DashboardLayout title="Grades">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div><div className="pg-t">My Grades</div><div className="pg-s">COLIG FOUNDATION · ACADEMIC RECORD</div></div>
        <span className="tag tgg" style={{ fontSize: 11, padding: '8px 16px' }}>OVERALL: A (95%)</span>
      </div>

      <div className="g3" style={{ marginBottom: 20 }}>
        <div className="sc"><div className="sc-i">📝</div><div className="sc-l">LESSONS DONE</div><div className="sc-v" style={{ color: 'var(--gold)' }}>1<span style={{ fontSize: 15, color: '#9a9a9a' }}>/24</span></div><div className="sc-s">Of total lessons</div></div>
        <div className="sc"><div className="sc-i">✅</div><div className="sc-l">AVG SCORE</div><div className="sc-v" style={{ color: 'var(--gb)' }}>95%</div><div className="sc-s">Knowledge checks</div></div>
        <div className="sc"><div className="sc-i">🏁</div><div className="sc-l">FINAL EXAM</div><div className="sc-v" style={{ color: '#ccc', fontSize: 16, fontFamily: "'Barlow Condensed'", fontWeight: 800 }}>LOCKED</div><div className="sc-s">Complete all modules</div></div>
      </div>

      <div className="wc">
        <div className="wch"><div className="wct">Grade Breakdown by Module</div></div>
        <table className="gtbl">
          <thead>
            <tr><th>MODULE</th><th>KNOWLEDGE CHECK</th><th>REFLECTION</th><th>STATUS</th><th>GRADE</th></tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={i}>
                <td><strong>{row.module}</strong></td>
                <td style={{ color: row.done ? 'var(--mid)' : '#ccc' }}>{row.kc}</td>
                <td style={{ color: row.done ? 'var(--mid)' : '#ccc' }}>{row.ref}</td>
                <td><span className={`tag ${row.done ? 'tg' : 'tgl'}`}>{row.status}</span></td>
                <td><span className={`gb2 ${row.done ? 'ga' : 'gp'}`}>{row.grade}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
