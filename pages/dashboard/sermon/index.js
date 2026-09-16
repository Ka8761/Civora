import DashboardPage from '../../../components/dashboard/DashboardPage';
import Link from 'Next/Link'

const categories = [
  'Faith',
  'The Word',
  'Prayer',
  'Holy Spirit',
  'Leadership',
  'Ministry',
];

export default function SermonProjectPage() {
  return (
    <DashboardPage
      eyebrow="Sermon Project"
      title="Sermon Project"
      description="FAITH COMES BY HEARING AND HEARING BY THE WORD."
    >
      <div className="hero-card">
        <div>
          <span>YOUR PROGRESS</span>
          <strong>0 / 61 COMPLETED</strong>
        </div>

        <div className="lock">
          🔒
          <small>61 MORE TO UNLOCK FINAL EXAM</small>
        </div>
      </div>

      <div className="categories">
        {categories.map((category, index) => (
          <div className="category" key={category}>
            <div className="icon">{index + 1}</div>
            <h2>{category}</h2>
            <p>View sermons in this section.</p>
            <Link href="/dashboard/sermon/library.js">
  OPEN LIBRARY
</Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hero-card {
          padding: 35px;
          background: #111;
          color: #fff;
          border-radius: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }

        .hero-card span {
          display: block;
          font-size: 11px;
          color: #aaa;
          letter-spacing: 2px;
        }

        .hero-card strong {
          display: block;
          margin-top: 10px;
          font-size: 28px;
        }

        .lock {
          text-align: center;
          font-size: 30px;
        }

        .lock small {
          display: block;
          font-size: 10px;
          color: #aaa;
          margin-top: 5px;
        }

        .categories {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-top: 20px;
        }

        .category {
          padding: 25px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid #ddd;
          border-radius: 18px;
        }

        .icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #111;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        h2 {
          color: #111;
          margin: 20px 0 8px;
        }

        p {
          color: #666;
        }

        button {
          border: 0;
          background: #111;
          color: #fff;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
        }

        @media (max-width: 850px) {
          .categories {
            grid-template-columns: 1fr;
          }

          .hero-card {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </DashboardPage>
  );
}