import Head from 'next/head';

export default function DashboardPage({
  title,
  eyebrow,
  description,
  children,
}) {
  return (
    <>
      <Head>
        <title>{title} | COLIG Leadership Foundation School</title>
      </Head>

      <main className="dashboard-page">
        <div className="dashboard-container">
          {eyebrow && <p className="dashboard-eyebrow">{eyebrow}</p>}

          <h1>{title}</h1>

          {description && (
            <p className="dashboard-description">{description}</p>
          )}

          <div className="dashboard-content">{children}</div>
        </div>

        <style jsx>{`
          .dashboard-page {
            min-height: 100vh;
            background: #000000;
            color: #111111;
            padding: 50px;
          }

          .dashboard-container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .dashboard-eyebrow {
            margin: 0 0 10px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #777777;
          }

          h1 {
            margin: 0;
            font-family: 'Playfair Display', serif;
            font-size: clamp(36px, 5vw, 64px);
            line-height: 1;
            color: #111111;
          }

          .dashboard-description {
            max-width: 680px;
            margin: 18px 0 0;
            color: #555555;
            font-size: 16px;
            line-height: 1.7;
          }

          .dashboard-content {
            margin-top: 45px;
          }

          @media (max-width: 768px) {
            .dashboard-page {
              padding: 35px 20px;
            }
          }
        `}</style>
      </main>
    </>
  );
}