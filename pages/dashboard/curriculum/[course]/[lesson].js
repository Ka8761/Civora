import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DashboardPage from '../../../components/dashboard/DashboardPage';
import CurriculumSidebar from '../../../components/curriculum/CurriculumSidebar';

export default function CoursePage() {
  const router = useRouter();
  const { course } = router.query;

  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] =
    useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!course) return;

    let mounted = true;

    Promise.all([
      fetch('/api/curriculum/courses').then((r) =>
        r.json()
      ),
      fetch(`/api/curriculum/courses/${course}`).then(
        (r) => r.json()
      ),
    ])
      .then(([courseData, currentData]) => {
        if (!mounted) return;

        setCourses(courseData.courses || []);
        setCurrentCourse(currentData.course || null);
        setLoading(false);
      })
      .catch(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [course]);

  if (loading) {
    return (
      <DashboardPage
        eyebrow="Curriculum"
        title="Loading Course..."
      >
        <div className="loading">
          Loading course...
        </div>
      </DashboardPage>
    );
  }

  if (!currentCourse) {
    return (
      <DashboardPage
        eyebrow="Curriculum"
        title="Course Not Found"
      >
        <Link href="/dashboard/curriculum">
          <button className="back">
            ← BACK TO CURRICULUM
          </button>
        </Link>

        <style jsx>{`
          .back {
            padding: 12px 16px;
            border: 0;
            border-radius: 7px;
            background: #0a1628;
            color: #fff;
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
            font-size: 9px;
            font-weight: 700;
          }
        `}</style>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      eyebrow={currentCourse.code}
      title={currentCourse.title}
      description={
        currentCourse.description ||
        currentCourse.subtitle ||
        ''
      }
    >
      <div className="layout">

        <CurriculumSidebar courses={courses} />

        <main className="content">

          <div className="course-header">
            <span>
              {currentCourse.code}
            </span>

            <h2>
              {currentCourse.title}
            </h2>

            <p>
              {currentCourse.description ||
                currentCourse.subtitle}
            </p>

            <div className="progress">
              <div>
                COURSE PROGRESS
              </div>

              <strong>
                {currentCourse.progress || 0}%
              </strong>
            </div>

            <div className="bar">
              <div
                style={{
                  width: `${currentCourse.progress || 0}%`,
                }}
              />
            </div>
          </div>

          <div className="lessons-title">
            COURSE CONTENT
          </div>

          <div className="lessons">

            {(currentCourse.lessons || []).map(
              (lesson, index) => {
                const locked =
                  lesson.locked === true ||
                  lesson.status === 'locked';

                const completed =
                  lesson.completed === true ||
                  lesson.status === 'completed';

                return (
                  <Link
                    key={
                      lesson._id ||
                      lesson.slug ||
                      index
                    }
                    href={
                      locked
                        ? '#'
                        : `/dashboard/curriculum/${course}/${lesson.slug}`
                    }
                    className={`lesson ${
                      locked ? 'locked' : ''
                    }`}
                    onClick={(event) => {
                      if (locked) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <div className="lesson-number">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="lesson-info">
                      <div className="lesson-type">
                        {formatType(lesson.type)}
                      </div>

                      <h3>
                        {lesson.title}
                      </h3>

                      {lesson.description && (
                        <p>
                          {lesson.description}
                        </p>
                      )}
                    </div>

                    <div className="lesson-status">
                      {completed
                        ? '✓ COMPLETE'
                        : locked
                        ? '🔒 LOCKED'
                        : 'START →'}
                    </div>
                  </Link>
                );
              }
            )}

          </div>

        </main>

      </div>

      <style jsx>{`
        .layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 25px;
          font-family: 'Montserrat', sans-serif;
        }

        .course-header {
          padding: 25px;
          background: #0a1628;
          border-radius: 15px;
          color: #fff;
        }

        .course-header > span {
          color: #c9921a;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .course-header h2 {
          margin: 7px 0;
          font-size: 23px;
        }

        .course-header p {
          max-width: 650px;
          margin: 0;
          color: #b9c0ca;
          font-size: 10px;
          line-height: 1.7;
        }

        .progress {
          display: flex;
          justify-content: space-between;
          margin-top: 22px;
          color: #aaa;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .progress strong {
          color: #c9921a;
        }

        .bar {
          height: 5px;
          margin-top: 7px;
          overflow: hidden;
          border-radius: 20px;
          background: rgba(255,255,255,.15);
        }

        .bar div {
          height: 100%;
          background: #c9921a;
          border-radius: 20px;
        }

        .lessons-title {
          margin: 25px 0 12px;
          color: #c9921a;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .lessons {
          display: grid;
          gap: 9px;
        }

        .lesson {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 17px;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 11px;
          text-decoration: none;
        }

        .lesson:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,.04);
        }

        .lesson.locked {
          opacity: .55;
        }

        .lesson-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border-radius: 9px;
          background: #f7f2e4;
          color: #c9921a;
          font-size: 10px;
          font-weight: 800;
        }

        .lesson-info {
          flex: 1;
        }

        .lesson-type {
          color: #c9921a;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .lesson h3 {
          margin: 4px 0;
          color: #0a1628;
          font-size: 12px;
        }

        .lesson p {
          margin: 0;
          color: #888;
          font-size: 9px;
        }

        .lesson-status {
          color: #999;
          font-size: 8px;
          font-weight: 700;
          white-space: nowrap;
        }

        .loading {
          padding: 35px;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          color: #777;
          font-size: 10px;
        }

        @media (max-width: 850px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .lesson-status {
            display: none;
          }
        }
      `}</style>
    </DashboardPage>
  );
}

function formatType(type) {
  if (!type) return 'LESSON';

  return type
    .replace(/-/g, ' ')
    .toUpperCase();
}