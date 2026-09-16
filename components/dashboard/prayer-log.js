import DashboardPage from './DashboardPage';

export default function PrayerLogPage() {
  return (
    <DashboardPage
      eyebrow="Spiritual Journal"
      title="Prayer Log"
      description="Keep a private record of your prayers, things you are trusting God for, and answered prayers."
    >
      <div className="actions">
        <button>+ NEW PRAYER</button>
      </div>

      <div className="empty">
        <div>🙏</div>
        <h2>No prayer entries yet</h2>
        <p>Your prayer journal will appear here.</p>
      </div>

      <style jsx>{`
        .actions {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }

        button {
          background: #111;
          color: #fff;
          border: none;
          padding: 14px 20px;
          border-radius: 9px;
          font-weight: 700;
          cursor: pointer;
        }

        .empty {
          padding: 70px 20px;
          text-align: center;
          border: 1px dashed #ccc;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.5);
        }

        .empty div {
          font-size: 40px;
        }

        h2 {
          color: #111;
        }

        p {
          color: #777;
        }
      `}</style>
    </DashboardPage>
  );
}