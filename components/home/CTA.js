import Link from 'next/link';

export default function CTA() {
  return (
    <section className="band">
      <div className="band-inner">

        <div className="band-tag">
          Ready to Begin?
        </div>

        <h2>
          Enrol in COLIG Leadership Foundation School{' '}
          <em>Today</em>
        </h2>

        <p>
          Join believers across the nation being equipped, grounded,
          and sent. Your journey starts here — free of charge.
        </p>

        <div className="cta-row">
          <Link href="/auth/signup" className="cta-g">
            CREATE ACCOUNT →
          </Link>

          <Link href="/auth/login" className="cta-o">
            STUDENT LOGIN
          </Link>
        </div>

      </div>

      <style jsx>{`
        .band {
          background: linear-gradient(
            135deg,
            #0a1628 0%,
            #1a0a3a 100%
          );
          padding: 80px 60px;
          text-align: center;
          border-top: 1px solid rgba(201, 146, 26, 0.14);
        }

        .band-inner {
          max-width: 640px;
          margin: 0 auto;
        }

        .band-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          letter-spacing: 4px;
          font-weight: 700;
          color: rgba(201, 146, 26, 0.7);
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 44px);
          font-weight: 900;
          color: #fff;
          margin-bottom: 14px;
        }

        h2 em {
          color: #c9921a;
          font-style: italic;
        }

        p {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.48);
          max-width: 500px;
          margin: 0 auto 32px;
          line-height: 1.8;
        }

        .cta-row {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-g,
        .cta-o {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 3px;
          border-radius: 3px;
          transition: all 0.2s;
        }

        .cta-g {
          background: #c9921a;
          color: #0a1628;
          padding: 15px 36px;
        }

        .cta-g:hover {
          background: #e8b84b;
          transform: translateY(-2px);
        }

        .cta-o {
          background: transparent;
          border: 2px solid rgba(201, 146, 26, 0.5);
          color: #c9921a;
          padding: 13px 36px;
        }

        .cta-o:hover {
          background: rgba(201, 146, 26, 0.08);
        }

        @media (max-width: 900px) {
          .band {
            padding: 60px 22px;
          }
        }
      `}</style>
    </section>
  );
}