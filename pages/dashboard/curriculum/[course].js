import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '../../components/layout/DashboardLayout';

const MODULES = [
  { l: 'CC Orientation', p: 12, lk: false },
  { l: 'C2 New Birth', p: 0, lk: true },
  { l: 'C3 Spiritual Milk', p: 0, lk: true },
  { l: 'C4 Growing in Love', p: 0, lk: true },
  { l: 'C5 Stewardship', p: 0, lk: true },
  { l: 'C6 COLIG Cultures', p: 0, lk: true },
];

export default function DashboardHome() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetch('/api/user/progress')
      .then((response) => response.json())
      .then((data) => {
        if (mounted) {
          setUser(data.user || null);
        }
      })
      .catch(() => {
        if (mounted) {
          setUser(null);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const firstName =
    session?.user?.name?.split(' ')[0] || 'Student';

  const sermonsDone =
    user?.completedSermons?.length ||
    user?.completedLessons?.length ||
    0;

  const lessonsDone =
    user?.completedLessons?.length || 0;

  const prayerHours =
    user?.prayerHoursLogged || 0;

  const overallProgress =
    user?.overallProgress ?? 12;

  return (
    <DashboardLayout title="Dashboard">
      <div className="dashboard-home">

        {/* Welcome Banner */}
        <section className="wb">
          <div className="wb-g" />

          <div className="wb-content">
            <div className="wb-eyebrow">
              WELCOME BACK
            </div>

            <h1 className="wb-title">
              Good to see you, {firstName} 👋
            </h1>

            <p className="wb-subtitle">
              You're on your discipleship journey. Keep pressing
              forward — every lesson brings you closer to your
              certificate.
            </p>

            <Link href="/dashboard/curriculum">
              <button className="bs bs-g">
                CONTINUE LEARNING →
              </button>
            </Link>
          </div>

          <div className="wb-b">
            <div className="wb-bv">
              {overallProgress}%
            </div>

            <div className="wb-bl">
              COMPLETED
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="g4">

          <div className="sc">
            <div className="sc-i">📖</div>

            <div className="sc-l">
              CURRENT MODULE
            </div>

            <div className="sc-v module-name">
              CC Orientation
            </div>

            <div className="sc-s">
              Overview in progress
            </div>
          </div>

          <div className="sc">
            <div className="sc-i">🎙️</div>

            <div className="sc-l">
              SERMONS HEARD
            </div>

            <div className="sc-v gold">
              {sermonsDone}
              <span>/61</span>
            </div>

            <div className="sc-s">
              Complete all to unlock exam
            </div>
          </div>

          <div className="sc">
            <div className="sc-i">🙏</div>

            <div className="sc-l">
              PRAYER HOURS
            </div>

            <div className="sc-v purple">
              {prayerHours}
            </div>

            <div className="sc-s">
              of 12 required hours
            </div>
          </div>

          <div className="sc">
            <div className="sc-i">📊</div>

            <div className="sc-l">
              CURRENT GRADE
            </div>

            <div className="sc-v green">
              A
            </div>

            <div className="sc-s">
              Knowledge check: 95%
            </div>
          </div>

        </section>

        {/* Progress + Quick Actions */}
        <section className="g32">

          {/* Module Progress */}
          <div className="wc">
            <div className="wch">
              <div className="wct">
                Module Progress
              </div>

              <span className="tag">
                CC ORIENTATION
              </span>
            </div>

            <div className="wcb">

              {MODULES.map((module, index) => (
                <div
                  key={index}
                  className="module-row"
                >
                  <div className="module-top">
                    <span
                      className={
                        module.lk
                          ? 'module-label locked'
                          : 'module-label'
                      }
                    >
                      {module.l}

                      {module.lk && (
                        <span className="lock">
                          🔒
                        </span>
                      )}
                    </span>

                    <span
                      className={
                        module.p > 0
                          ? 'module-percent active'
                          : 'module-percent'
                      }
                    >
                      {module.p}%
                    </span>
                  </div>

                  <div className="pw">
                    <div
                      className="pf"
                      style={{
                        width: `${module.p}%`,
                      }}
                    />
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Quick Actions */}
          <div className="wc">

            <div className="wch">
              <div className="wct">
                Quick Actions
              </div>
            </div>

            <div className="quick-actions">

              <QuickAction
                icon="📖"
                label="Continue Lesson"
                sub="CC Overview"
                href="/dashboard/curriculum"
              />

              <QuickAction
                icon="🎙️"
                label="Sermon Project"
                sub={`${sermonsDone}/61 complete`}
                href="/dashboard/sermon-project"
              />

              <QuickAction
                icon="🙏"
                label="Log a Prayer"
                sub="Add new request"
                href="/dashboard/prayer-log"
              />

              <QuickAction
                icon="✍️"
                label="Write Testimony"
                sub="Journal entry"
                href="/dashboard/testimony-diary"
              />

            </div>

          </div>

        </section>

        {/* Additional Progress */}
        <section className="bottom-card">

          <div>
            <div className="bottom-eyebrow">
              YOUR FOUNDATION
            </div>

            <h2>
              Keep building your foundation.
            </h2>

            <p>
              You have completed {lessonsDone} lessons so far.
              Continue through the curriculum and complete each
              requirement to progress toward your certificate.
            </p>
          </div>

          <Link href="/dashboard/curriculum">
            <button className="outline-button">
              VIEW CURRICULUM
            </button>
          </Link>

        </section>

      </div>

      <style jsx>{`
        .dashboard-home {
          width: 100%;
          font-family: 'Montserrat', sans-serif;
          color: #111827;
        }

        .wb {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          padding: 28px 30px;
          margin-bottom: 20px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #e7e7e7;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
        }

        .wb-g {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5px;
          background: #c9921a;
        }

        .wb-content {
          position: relative;
          z-index: 1;
          max-width: 760px;
        }

        .wb-eyebrow {
          margin-bottom: 8px;
          color: #c9921a;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
        }

        .wb-title {
          margin: 0;
          color: #0a1628;
          font-size: 25px;
          line-height: 1.3;
          font-weight: 700;
        }

        .wb-subtitle {
          max-width: 650px;
          margin: 9px 0 0;
          color: #707070;
          font-size: 13px;
          line-height: 1.7;
          font-weight: 400;
        }

        .wb-b {
          min-width: 100px;
          text-align: center;
        }

        .wb-bv {
          color: #0a1628;
          font-size: 30px;
          line-height: 1;
          font-weight: 800;
        }

        .wb-bl {
          margin-top: 6px;
          color: #999;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .bs {
          border: 0;
          border-radius: 7px;
          padding: 12px 17px;
          margin-top: 14px;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.8px;
        }

        .bs-g {
          background: #0a1628;
          color: #ffffff;
        }

        .g4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }

        .sc {
          min-height: 145px;
          padding: 18px;
          background: #ffffff;
          border: 1px solid #e7e7e7;
          border-radius: 14px;
          box-shadow: 0 6px 22px rgba(0, 0, 0, 0.03);
        }

        .sc-i {
          margin-bottom: 12px;
          font-size: 20px;
        }

        .sc-l {
          color: #8a8a8a;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.7px;
        }

        .sc-v {
          margin-top: 7px;
          color: #0a1628;
          font-size: 25px;
          font-weight: 800;
        }

        .module-name {
          font-size: 15px;
          letter-spacing: 0.5px;
        }

        .sc-v span {
          color: #aaa;
          font-size: 14px;
          font-weight: 500;
        }

        .gold {
          color: #c9921a;
        }

        .purple {
          color: #7652a5;
        }

        .green {
          color: #39884a;
        }

        .sc-s {
          margin-top: 5px;
          color: #999;
          font-size: 10px;
        }

        .g32 {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .wc {
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #e7e7e7;
          border-radius: 14px;
          box-shadow: 0 6px 22px rgba(0, 0, 0, 0.03);
        }

        .wch {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 16px 18px;
          border-bottom: 1px solid #eeeeee;
        }

        .wct {
          color: #0a1628;
          font-size: 13px;
          font-weight: 700;
        }

        .tag {
          padding: 5px 8px;
          border-radius: 5px;
          background: #f5f0df;
          color: #9a7318;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .wcb {
          padding: 18px;
        }

        .module-row {
          margin-bottom: 16px;
        }

        .module-row:last-child {
          margin-bottom: 0;
        }

        .module-top {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 7px;
        }

        .module-label {
          color: #0a1628;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .module-label.locked {
          color: #c8c8c8;
        }

        .lock {
          margin-left: 4px;
          font-size: 9px;
        }

        .module-percent {
          color: #c9c9c9;
          font-size: 10px;
          font-weight: 700;
        }

        .module-percent.active {
          color: #39884a;
        }

        .pw {
          height: 5px;
          overflow: hidden;
          border-radius: 20px;
          background: #eeeeee;
        }

        .pf {
          height: 100%;
          border-radius: 20px;
          background: #c9921a;
        }

        .quick-actions {
          padding: 8px 10px;
        }

        .quick-action {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 11px 9px;
          text-decoration: none;
          border-bottom: 1px solid #f1f1f1;
          transition: background 0.15s ease;
        }

        .quick-action:last-child {
          border-bottom: none;
        }

        .quick-action:hover {
          background: #faf9f4;
        }

        .qa-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          border: 1px solid #e8e8e8;
          border-radius: 8px;
          background: #faf8ef;
          font-size: 16px;
        }

        .qa-label {
          color: #0a1628;
          font-size: 11px;
          font-weight: 700;
        }

        .qa-sub {
          margin-top: 3px;
          color: #999;
          font-size: 9px;
        }

        .qa-arrow {
          margin-left: auto;
          color: #c8c8c8;
          font-size: 18px;
        }

        .bottom-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          padding: 25px;
          background: #ffffff;
          border: 1px solid #e7e7e7;
          border-radius: 14px;
        }

        .bottom-eyebrow {
          margin-bottom: 7px;
          color: #c9921a;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .bottom-card h2 {
          margin: 0;
          color: #0a1628;
          font-size: 18px;
        }

        .bottom-card p {
          max-width: 650px;
          margin: 7px 0 0;
          color: #777;
          font-size: 11px;
          line-height: 1.7;
        }

        .outline-button {
          flex-shrink: 0;
          padding: 11px 15px;
          border: 1px solid #0a1628;
          border-radius: 7px;
          background: transparent;
          color: #0a1628;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        @media (max-width: 1000px) {
          .g4 {
            grid-template-columns: repeat(2, 1fr);
          }

          .g32 {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .wb {
            flex-direction: column;
            align-items: flex-start;
            padding: 23px 20px;
          }

          .wb-b {
            text-align: left;
          }

          .g4 {
            grid-template-columns: 1fr;
          }

          .bottom-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .wb-title {
            font-size: 21px;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}

function QuickAction({ icon, label, sub, href }) {
  return (
    <Link
      href={href}
      className="quick-action"
    >
      <div className="qa-icon">
        {icon}
      </div>

      <div>
        <div className="qa-label">
          {label}
        </div>

        <div className="qa-sub">
          {sub}
        </div>
      </div>

      <span className="qa-arrow">
        ›
      </span>
    </Link>
  );
}