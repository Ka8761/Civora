import DashboardPage from './DashboardPage';

const courses = [
  {
    code: 'ORIENTATION',
    title: 'Orientation',
    description: 'Welcome and introduction to Leadership Foundation School.',
    unlocked: true,
  },
  {
    code: 'C2',
    title: 'New Birth',
    description: 'Understanding the foundation of the Christian life.',
    unlocked: false,
  },
  {
    code: 'C3',
    title: 'Spiritual Milk',
    description: 'Growing through the Word and spiritual disciplines.',
    unlocked: false,
  },
  {
    code: 'C4',
    title: 'Prayer & Fellowship',
    description: 'Developing a consistent life of prayer and fellowship.',
    unlocked: false,
  },
  {
    code: 'C5',
    title: 'Leadership',
    description: 'Learning the principles and responsibility of leadership.',
    unlocked: false,
  },
  {
    code: 'C6',
    title: 'Ministry & Service',
    description: 'Preparing for service, ministry and influence.',
    unlocked: false,
  },
];

export default function CurriculumPage() {
  return (
    <DashboardPage
      eyebrow="Leadership Foundation School"
      title="Curriculum Map"
      description="Follow the curriculum step by step. Each stage becomes available as you complete the previous requirement."
    >
      <div className="list">
        {courses.map((course, index) => (
          <div
            className={`course ${course.unlocked ? 'active' : 'locked'}`}
            key={course.code}
          >
            <div className="number">
              {index + 1}
            </div>

            <div className="info">
              <span>{course.code}</span>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </div>

            <div className="status">
              {course.unlocked ? 'OPEN' : '🔒 LOCKED'}
            </div>
          </div>
        ))}

        <div className="assessment">
          <div>
            <span>FINAL ASSESSMENT</span>
            <h2>Final Examination</h2>
            <p>
              Complete all required curriculum stages before taking the final
              examination.
            </p>
          </div>

          <strong>🔒</strong>
        </div>
      </div>

      <style jsx>{`
        .list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .course {
          display: flex;
          align-items: center;
          gap: 25px;
          padding: 25px;
          border: 1px solid #ddd;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.65);
        }

        .course.locked {
          opacity: 0.55;
        }

        .number {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #111;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .info {
          flex: 1;
        }

        .info span,
        .assessment span {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #888;
        }

        h2 {
          margin: 5px 0;
          color: #111;
        }

        p {
          margin: 0;
          color: #666;
          line-height: 1.6;
        }

        .status {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #111;
        }

        .assessment {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px;
          margin-top: 15px;
          border-radius: 20px;
          background: #111;
          color: #fff;
        }

        .assessment h2 {
          color: #fff;
        }

        .assessment p,
        .assessment span {
          color: #bbb;
        }

        .assessment strong {
          font-size: 30px;
        }

        @media (max-width: 700px) {
          .course {
            align-items: flex-start;
          }

          .status {
            display: none;
          }
        }
      `}</style>
    </DashboardPage>
  );
}