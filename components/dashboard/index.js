import DashboardPage from './DashboardPage';

export default function DashboardHome() {
  return (
    <DashboardPage
      eyebrow="Student Dashboard"
      title="Welcome to Leadership Foundation School"
      description="Your journey of learning, spiritual growth, leadership development and service begins here."
    >
      <div className="grid">
        <div className="card large">
          <span>YOUR PROGRESS</span>
          <strong>0%</strong>
          <p>Overall curriculum progress</p>
        </div>

        <div className="card">
          <span>SERMON PROJECT</span>
          <strong>0 / 61</strong>
          <p>Sermons completed</p>
        </div>

        <div className="card">
          <span>CURRICULUM</span>
          <strong>Orientation</strong>
          <p>Your current learning stage</p>
        </div>

        <div className="card">
          <span>CERTIFICATE</span>
          <strong>Locked</strong>
          <p>Complete the school requirements to receive your certificate.</p>
        </div>
      </div>

      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .card {
          padding: 30px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid #dddddd;
          border-radius: 18px;
        }

        .large {
          grid-column: span 2;
        }

        span {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #777777;
        }

        strong {
          display: block;
          margin-top: 15px;
          font-size: 30px;
          color: #111111;
        }

        p {
          margin: 8px 0 0;
          color: #666666;
        }

        @media (max-width: 700px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .large {
            grid-column: span 1;
          }
        }
      `}</style>
    </DashboardPage>
  );
}