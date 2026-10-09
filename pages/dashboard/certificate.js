import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ColigCertificate from '../../components/certificate/ColigCertificate';

export default function CertificatePage() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth/login');
    if (status !== 'authenticated') return;
    fetch('/api/certificate')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ eligible: false }))
      .finally(() => setLoading(false));
  }, [status, router]);

  return (
    <>
      <Head><title>Certificate | COLIG Leadership Foundation School</title></Head>

      <div className="bar no-print">
        <Link href="/dashboard/accomplishment" legacyBehavior><a>← BACK TO DASHBOARD</a></Link>
        {data?.eligible && <button onClick={() => window.print()}>PRINT / SAVE AS PDF</button>}
      </div>

      {loading && <div className="msg no-print">Loading…</div>}

      {!loading && data && !data.eligible && (
        <div className="msg no-print">
          🔒 Your certificate unlocks when you pass the Final Exam.
          <br />
          <Link href="/dashboard/curriculum" legacyBehavior><a className="go">GO TO CURRICULUM →</a></Link>
        </div>
      )}

      {data?.eligible && (
        <ColigCertificate
          studentName={data.studentName}
          completionDate={data.completionDate}
          certificateNumber={data.certificateNumber}
        />
      )}

      <style jsx>{`
        .bar { display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background: #0a1628; }
        .bar a { color: #fff; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 1px; }
        .bar button { background: #c9921a; color: #0a1628; border: none; padding: 10px 18px; border-radius: 6px; font-size: 11px; font-weight: 800; letter-spacing: 1px; cursor: pointer; }
        .msg { padding: 80px 20px; text-align: center; color: #555; line-height: 2; }
        .go { color: #c9921a; font-weight: 800; font-size: 12px; letter-spacing: 1px; text-decoration: none; }
      `}</style>
    </>
  );
}