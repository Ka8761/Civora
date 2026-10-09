import { useEffect, useState } from 'react';

export default function ColigCertificate({
  studentName,
  completionDate,
  certificateNumber,
  artwork = '/images/colig-certificate.png',
}) {
  const [art, setArt] = useState('checking'); // 'checking' | 'yes' | 'no'

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setArt('yes');
    img.onerror = () => setArt('no');
    img.src = artwork;
  }, [artwork]);

  return (
    <main className="certificate-page">
      <section className="certificate" aria-label="COLIG Certificate of Completion">
        {art === 'yes' && (
          <>
            <img src={artwork} alt="" className="certificate-art" />
            <div className="student-name" title={studentName}>{studentName}</div>
            <div className="date-patch" aria-hidden="true" />
            <div className="completion-copy">
              for completing the COLIG Leadership Foundation School on
              <span>{completionDate}</span>
            </div>
          </>
        )}

        {art === 'no' && (
          <>
            <div className="cc-frame" />
            <div className="cc-frame-inner" />
            <i className="cc-corner tl" /><i className="cc-corner tr" />
            <i className="cc-corner bl" /><i className="cc-corner br" />

            <div className="cc-content">
              <div className="cc-brand">COLIG</div>
              <div className="cc-brand-sub">LEADERSHIP FOUNDATION SCHOOL</div>

              <svg className="cc-seal" viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                  <linearGradient id="cc-gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff1a8" />
                    <stop offset="50%" stopColor="#e6b422" />
                    <stop offset="100%" stopColor="#9a6d0a" />
                  </linearGradient>
                </defs>
                <polygon
                  points="50,2 58,12 70,6 74,19 87,18 86,31 98,36 91,47 99,58 88,64 91,77 78,78 74,91 62,86 50,98 38,86 26,91 22,78 9,77 12,64 1,58 9,47 2,36 14,31 13,18 26,19 30,6 42,12"
                  fill="url(#cc-gold)"
                />
                <circle cx="50" cy="50" r="31" fill="none" stroke="#7a5408" strokeWidth="1.5" />
                <polygon
                  points="50,30 55,43 69,44 58,53 62,67 50,59 38,67 42,53 31,44 45,43"
                  fill="#7a5408"
                />
              </svg>

              <h1 className="cc-title">CERTIFICATE OF COMPLETION</h1>
              <div className="cc-line">This is to certify that</div>
              <div className="cc-name" title={studentName}>{studentName}</div>
              <div className="cc-rule" />
              <div className="cc-line">
                has successfully completed the Leadership Foundation Programme,
                including all course modules and the Final Examination, on
              </div>
              <div className="cc-date">{completionDate}</div>

              <div className="cc-sign-row">
                <div className="cc-sign"><span /><small>SCHOOL DIRECTOR</small></div>
                <div className="cc-sign"><span /><small>REGISTRAR</small></div>
              </div>

              {certificateNumber && <div className="cc-number">Certificate No. {certificateNumber}</div>}
            </div>
          </>
        )}
      </section>

      <style jsx global>{`
        .certificate-page * { box-sizing: border-box; }
        .certificate-page { width: 100%; padding: 24px; background: #f1f1f1; }
        .certificate {
          position: relative; width: min(100%, 1536px); aspect-ratio: 3 / 2;
          margin: 0 auto; overflow: hidden; background: #f8f7f4; color: #080808;
          font-family: Arial, Helvetica, sans-serif;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }
        .certificate-art { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; z-index: 0; }

        .student-name {
          position: absolute; z-index: 2; left: 18.1%; top: 61.2%; width: 63.5%; min-height: 3.1%;
          display: flex; align-items: center; justify-content: center; padding: 0 1.5%;
          color: #080808; font-size: clamp(14px, 2vw, 30px); line-height: 1.15; font-weight: 600;
          text-align: center; overflow-wrap: anywhere;
        }
        .date-patch { position: absolute; z-index: 1; left: 36%; top: 65.8%; width: 28.5%; height: 5.3%; background: rgba(248, 247, 244, 0.98); }
        .completion-copy {
          position: absolute; z-index: 2; left: 20%; top: 65.8%; width: 60%; color: #080808;
          font-size: clamp(10px, 1.55vw, 23px); line-height: 1.45; font-weight: 500; text-align: center;
        }
        .completion-copy span { display: block; font-weight: 700; }

        /* ---- code-built design (used when no artwork image is present) ---- */
        .cc-frame { position: absolute; inset: 2.4%; border: clamp(4px, 0.6vw, 9px) solid #0a1628; }
        .cc-frame-inner { position: absolute; inset: 3.8%; border: 2px solid #c9921a; }
        .cc-corner { position: absolute; width: 2.2%; aspect-ratio: 1; background: #c9921a; transform: rotate(45deg); }
        .cc-corner.tl { left: 3.2%; top: 4.8%; } .cc-corner.tr { right: 3.2%; top: 4.8%; }
        .cc-corner.bl { left: 3.2%; bottom: 4.8%; } .cc-corner.br { right: 3.2%; bottom: 4.8%; }
        .cc-content {
          position: absolute; inset: 7% 10%; display: flex; flex-direction: column;
          align-items: center; justify-content: space-between; text-align: center;
        }
        .cc-brand { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(18px, 3vw, 46px); letter-spacing: 0.25em; color: #0a1628; }
        .cc-brand-sub { font-size: clamp(6px, 0.95vw, 14px); letter-spacing: 0.4em; color: #c9921a; font-weight: 700; margin-top: -0.4%; }
        .cc-seal { width: clamp(36px, 7%, 110px); height: auto; aspect-ratio: 1; }
        .cc-title { font-family: 'Playfair Display', serif; font-weight: 800; font-size: clamp(14px, 2.9vw, 44px); letter-spacing: 0.12em; color: #0a1628; margin: 0; }
        .cc-line { font-size: clamp(8px, 1.3vw, 19px); color: #333; line-height: 1.6; max-width: 80%; }
        .cc-name { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; font-size: clamp(18px, 4vw, 60px); color: #0a1628; line-height: 1.1; max-width: 90%; overflow-wrap: anywhere; }
        .cc-rule { width: 30%; height: 2px; background: linear-gradient(90deg, transparent, #c9921a, transparent); }
        .cc-date { font-size: clamp(10px, 1.7vw, 25px); font-weight: 700; color: #0a1628; }
        .cc-sign-row { display: flex; gap: 14%; width: 70%; justify-content: center; }
        .cc-sign { flex: 1; text-align: center; }
        .cc-sign span { display: block; height: 1px; background: #0a1628; margin-bottom: 6px; }
        .cc-sign small { font-size: clamp(6px, 0.85vw, 12px); letter-spacing: 0.25em; color: #555; font-weight: 700; }
        .cc-number { font-size: clamp(6px, 0.8vw, 11px); letter-spacing: 0.2em; color: #888; }

        @media (max-width: 700px) {
          .certificate-page { padding: 8px; }
          .student-name { font-size: clamp(8px, 2vw, 14px); }
          .completion-copy { font-size: clamp(6px, 1.45vw, 10px); }
        }

        @media print {
          @page { size: landscape; margin: 0; }
          .no-print { display: none !important; }
          .certificate-page { padding: 0; background: white; }
          .certificate {
            width: 100vw; height: 66.6667vw; max-width: none; margin: 0; box-shadow: none;
            print-color-adjust: exact; -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </main>
  );
}