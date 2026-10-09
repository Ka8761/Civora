import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Medal from '../../components/accomplishments/Medal';
import { TOTAL_SERMONS, TOTAL_PRAYER_CHARGES } from '../../lib/curriculumData';

// Adjust these thresholds to taste
const WORD_SEEKER_MODULES = 3;   // finish CC, C2, C3
const FAITH_HEARER_SERMONS = 20; // sermons heard

export default function AccomplishmentPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [showCert, setShowCert] = useState(false);

  useEffect(() => {
    fetch('/api/user/progress').then((r) => r.json()).then((d) => setUser(d.user || null)).catch(() => {});
  }, []);

  const modules = user?.completedModules || [];
  const sermons = user?.sermonsCompleted || 0;
  const charges = user?.prayerChargesCompleted || 0;
  const finalDone = modules.includes('final');
  const leader = finalDone && sermons >= TOTAL_SERMONS && charges >= TOTAL_PRAYER_CHARGES;

  const MEDALS = [
    { id: 'enrolled', label: 'Enrolled', tier: 'bronze', earned: true },
    { id: 'first', label: 'First Lesson', tier: 'bronze', earned: modules.length >= 1 },
    { id: 'word', label: 'Word Seeker', tier: 'silver', earned: modules.length >= WORD_SEEKER_MODULES },
    { id: 'faith', label: 'Faith Hearer', tier: 'silver', earned: sermons >= FAITH_HEARER_SERMONS },
    { id: 'grad', label: 'Graduate', tier: 'gold', earned: finalDone },
    { id: 'leader', label: 'Leader', tier: 'crown', earned: leader },
  ];

  const MILESTONES = [
    { l: 'Account Created', done: true },
    { l: 'CC Orientation Complete', done: modules.includes('cc') },
    { l: 'All 61 Sermons Heard', val: `${sermons}/${TOTAL_SERMONS}`, done: sermons >= TOTAL_SERMONS },
    { l: 'All 6 Prayer Charges', val: `${charges}/${TOTAL_PRAYER_CHARGES}`, done: charges >= TOTAL_PRAYER_CHARGES },
    { l: 'Final Exam Passed', done: finalDone },
    { l: 'Certificate Issued', done: !!user?.certificateIssued },
  ];

  const earnedCount = MEDALS.filter((m) => m.earned).length;
  const today = new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });
  const certNum = useMemo(() => `COLIG-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`, []);

  return (
    <DashboardLayout title="Accomplishments">
      <div style={{ marginBottom: 16 }}>
        <div className="pg-t">Accomplishments</div>
        <div className="pg-s">COLIG FOUNDATION · STUDENT ACHIEVEMENTS</div>
      </div>

      <div className="g2" style={{ marginBottom: 20 }}>
        <div className="wc">
          <div className="wch">
            <div className="wct">Medals Earned</div>
            <span className="tag tgg">{earnedCount}/6 EARNED</span>
          </div>
          <div className="wcb">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, textAlign: 'center' }}>
              {MEDALS.map((m) => (
                <div key={m.id}>
                  <Medal id={m.id} tier={m.tier} earned={m.earned} />
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--navy)', marginTop: 6 }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: 10, color: m.earned ? 'var(--gb)' : '#bbb', marginTop: 2 }}>
                    {m.earned ? 'Earned' : '🔒 Locked'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="wc">
          <div className="wch"><div className="wct">Completion Milestones</div></div>
          <div className="wcb">
            {MILESTONES.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < MILESTONES.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                <div style={{ fontSize: 13, color: m.done ? 'var(--navy)' : '#bbb' }}>{m.l}</div>
                <span className={`tag ${m.done ? 'tgg' : 'tgl'}`}>{m.done ? 'DONE' : m.val || 'PENDING'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!showCert ? (
        <div className="cert-locked">
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 21, fontWeight: 700, color: 'var(--navy)', marginBottom: 7 }}>Certificate of Completion</div>
          <div style={{ fontSize: 13, color: '#9a9a9a', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 14px' }}>
            Complete all six course modules, listen to all 61 sermons, finish the six prayer charges, and pass the Final Exam to receive your official COLIG Leadership Foundation School certificate.
          </div>
          {!leader && (
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: '#bbb', marginBottom: 14 }}>
              🔒 LOCKED — COMPLETE ALL REQUIREMENTS TO UNLOCK
            </div>
          )}
          <button
            className="bs bs-g"
            onClick={() => {
              setShowCert(true);
              toast.success(leader ? 'Certificate ready!' : 'Certificate preview generated!');
            }}
          >
            {leader ? 'VIEW CERTIFICATE →' : 'PREVIEW CERTIFICATE →'}
          </button>
        </div>
      ) : (
        <div className="certprev">
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 5, color: 'rgba(201,146,26,0.68)', marginBottom: 6 }}>COLIG LEADERSHIP FOUNDATION SCHOOL</div>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 13, color: 'rgba(255,255,255,0.48)', marginBottom: 18 }}>This is to certify that</div>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 34, fontWeight: 900, color: 'var(--gold)', marginBottom: 6 }}>{session?.user?.name || 'Your Name'}</div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, letterSpacing: 3, color: 'rgba(255,255,255,0.48)', marginBottom: 20 }}>LEADERSHIP FOUNDATION PROGRAMME</div>
          <div style={{ width: 100, height: 2, background: 'linear-gradient(90deg,transparent,var(--gold),transparent)', margin: '0 auto 20px' }} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto 20px' }}>
            has successfully completed all six course modules, the Sermon Project comprising 61 messages, and the Final Assessment.
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 18 }}>
            {['STUDENT SIGNATURE', 'SCHOOL DIRECTOR'].map((lbl) => (
              <div key={lbl} style={{ textAlign: 'center' }}>
                <div style={{ width: 100, height: 1, background: 'rgba(201,146,26,0.4)', margin: '8px auto 4px' }} />
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.28)' }}>{lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.24)' }}>
            Issued: {today} · Certificate No. {certNum}
          </div>
          <button
            onClick={() => window.print()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,146,26,0.12)', border: '1px solid rgba(201,146,26,0.3)', borderRadius: 8, padding: '10px 18px', marginTop: 18, cursor: 'pointer', fontFamily: "'Barlow Condensed'", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--gold)' }}
          >
            PRINT / SAVE AS PDF
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}