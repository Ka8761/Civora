import { useEffect, useRef, useState } from 'react';

const courses = [
  {
    number: '01',
    badge: 'FOUNDATION',
    title: 'New Birth',
    description:
      'Start by understanding your new identity in Christ and the practical steps of true repentance. This module shows you how to leave guilt behind and walk in total assurance of your salvation.',
  },
  {
    number: '02',
    badge: 'DOCTRINE',
    title: 'Spiritual Milk',
    description:
      'Feed your spirit with the basic doctrines every believer must know to mature. Clear scriptural positions on faith, baptism, and eternal judgement are laid out plainly here.',
  },
  {
    number: '03',
    badge: 'CHARACTER',
    title: 'Growing in Love',
    description:
      'Build Christian character that outlasts temporary emotional highs. Discipline your actions, endure hard seasons, and practise the unconditional love of God daily.',
  },
  {
    number: '04',
    badge: 'MINISTRY',
    title: 'Stewardship & Leadership',
    description:
      'Learn the exact standards God requires from those He trusts to lead His work: accountability, excellence, and the purity expected of anyone serving in ministry.',
  },
  {
    number: '05',
    badge: 'CULTURE',
    title: 'COLIG Cultures',
    description:
      'Discover the specific traditions and family lifestyle that guide how our church operates. Learn why we value strict discipline, how we honour one another, and where you fit in the workforce.',
  },
  {
    number: '06',
    badge: 'ADVANCED',
    title: 'Advanced Leadership Training',
    description:
      'Go deeper into what it takes to be a leader in every sphere of influence. Learn what it means to lead with grace and effective wisdom in the kingdom of God.',
    featured: true,
  },
];

export default function Curriculum() {
  const revealRefs = useRef([]);
  const [openCourses, setOpenCourses] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealRefs.current.forEach(element => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleCourse = index => {
    setOpenCourses(previousCourses => {
      if (previousCourses.includes(index)) {
        return previousCourses.filter(courseIndex => courseIndex !== index);
      }

      return [...previousCourses, index];
    });
  };

  return (
    <section className="curr-sec" id="curriculum">
      <div className="curr-inner">
        <div className="curr-intro">
          <div
            ref={element => {
              revealRefs.current[0] = element;
            }}
            className="reveal"
          >
            <div className="curr-tag">Our Curriculum</div>

            <div className="curr-title">
              Five courses.
              <br />
              <em>One complete foundation.</em>
            </div>

            <p className="curr-sub">
              Progress through our core modules at your own pace. Each course
              is meticulously crafted to establish you firmly in the faith.
            </p>
          </div>

          <div
            ref={element => {
              revealRefs.current[1] = element;
            }}
            className="curr-note reveal-r"
          >
            <p>
              <strong>How it works:</strong> Each module must be completed
              before the next unlocks. Complete all six courses, pass the
              capstone exam, fulfil your 12-hour prayer requirement, and
              undergo a personal interview with the pastorate to be inducted
              into the COLIG workforce.
            </p>
          </div>
        </div>

        <div className="course-list">
          {courses.map((course, index) => {
            const isOpen = openCourses.includes(index);

            return (
              <div
                key={course.number}
                className={`course-card ${
                  course.featured ? 'featured' : ''
                } ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="course-header"
                  onClick={() => toggleCourse(index)}
                  aria-expanded={isOpen}
                  aria-controls={`course-content-${course.number}`}
                >
                  <div className="course-left">
                    <div className="cc-num">{course.number}</div>

                    <div>
                      <div className="cc-badge">{course.badge}</div>

                      <div className="cc-title">{course.title}</div>
                    </div>
                  </div>

                  <div
                    className={`accordion-icon ${
                      isOpen ? 'active' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                  </div>
                </button>

                <div
                  id={`course-content-${course.number}`}
                  className={`course-content ${
                    isOpen ? 'show' : ''
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className="cc-desc">{course.description}</div>

                  <div className="cc-rule" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .curr-sec {
          background: #0a1628;
          padding: 96px 60px;
        }

        .curr-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .curr-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 64px;
        }

        .curr-tag {
          margin-bottom: 12px;
          color: #c9921a;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        .curr-title {
          margin-bottom: 14px;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 900;
          line-height: 1.12;
        }

        .curr-title em {
          color: #c9921a;
          font-style: italic;
        }

        .curr-sub {
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          line-height: 1.8;
        }

        .curr-note {
          padding: 22px 24px;
          border: 1px solid rgba(201, 146, 26, 0.2);
          border-radius: 10px;
          background: rgba(201, 146, 26, 0.08);
        }

        .curr-note p {
          color: rgba(255, 255, 255, 0.6);
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          line-height: 1.75;
        }

        .curr-note strong {
          color: #c9921a;
        }

        .course-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .course-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(201, 146, 26, 0.16);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          transition:
            border-color 0.25s ease,
            background 0.25s ease,
            transform 0.25s ease;
        }

        .course-card::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(
            135deg,
            rgba(201, 146, 26, 0.06) 0%,
            transparent 60%
          );
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .course-card:hover {
          border-color: #c9921a;
          background: rgba(255, 255, 255, 0.07);
          transform: translateY(-2px);
        }

        .course-card:hover::before {
          opacity: 1;
        }

        .course-card.featured {
          border-color: rgba(201, 146, 26, 0.35);
          background: rgba(201, 146, 26, 0.06);
        }

        .course-card.open {
          border-color: rgba(201, 146, 26, 0.5);
        }

        .course-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 24px 28px;
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
          text-align: left;
        }

        .course-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .cc-num {
          min-width: 48px;
          color: rgba(201, 146, 26, 0.22);
          font-family: 'Montserrat', sans-serif;
          font-size: 32px;
          font-weight: 900;
          line-height: 1;
        }

        .cc-badge {
          display: inline-block;
          margin-bottom: 8px;
          padding: 3px 10px;
          border: 1px solid rgba(201, 146, 26, 0.3);
          border-radius: 4px;
          background: rgba(201, 146, 26, 0.15);
          color: #c9921a;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .featured .cc-badge {
          border-color: rgba(201, 146, 26, 0.5);
          background: rgba(201, 146, 26, 0.25);
        }

        .cc-title {
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .accordion-icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          border: 1px solid rgba(201, 146, 26, 0.4);
          border-radius: 50%;
          transition:
            background 0.3s ease,
            border-color 0.3s ease;
        }

        .accordion-icon span {
          position: absolute;
          width: 10px;
          height: 1.5px;
          background: #c9921a;
          transition: transform 0.3s ease;
        }

        .accordion-icon span:last-child {
          transform: rotate(90deg);
        }

        .accordion-icon.active {
          border-color: #c9921a;
          background: rgba(201, 146, 26, 0.15);
        }

        .accordion-icon.active span:last-child {
          transform: rotate(0deg);
        }

        .course-content {
          display: grid;
          grid-template-rows: 0fr;
          position: relative;
          z-index: 1;
          padding: 0 28px 0 100px;
          opacity: 0;
          transition:
            grid-template-rows 0.4s ease,
            opacity 0.3s ease,
            padding 0.4s ease;
        }

        .course-content::before {
          content: '';
          min-height: 0;
        }

        .course-content.show {
          grid-template-rows: 1fr;
          padding: 0 28px 26px 100px;
          opacity: 1;
        }

        .cc-desc {
          min-height: 0;
          max-width: 850px;
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          line-height: 1.8;
        }

        .cc-rule {
          width: 32px;
          height: 2px;
          margin-top: 18px;
          background: #c9921a;
          opacity: 0.4;
        }

        .featured .cc-rule {
          opacity: 1;
        }

        .reveal,
        .reveal-r {
          opacity: 0;
          transition:
            opacity 0.75s ease,
            transform 0.75s ease;
        }

        .reveal {
          transform: translateY(36px);
        }

        .reveal-r {
          transform: translateX(36px);
        }

        .reveal.vis,
        .reveal-r.vis {
          opacity: 1;
          transform: translate(0);
        }

        @media (max-width: 900px) {
          .curr-sec {
            padding: 64px 22px;
          }

          .curr-intro {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .course-header {
            padding: 20px;
          }

          .course-left {
            gap: 16px;
          }

          .cc-num {
            min-width: 38px;
            font-size: 26px;
          }

          .cc-title {
            font-size: 16px;
          }

          .course-content {
            padding: 0 20px 0 74px;
          }

          .course-content.show {
            padding: 0 20px 22px 74px;
          }
        }

        @media (max-width: 500px) {
          .course-left {
            gap: 12px;
          }

          .cc-num {
            min-width: 32px;
            font-size: 22px;
          }

          .cc-badge {
            font-size: 8px;
            letter-spacing: 1.5px;
          }

          .cc-title {
            font-size: 14px;
          }

          .accordion-icon {
            width: 26px;
            height: 26px;
          }

          .course-content,
          .course-content.show {
            padding-left: 20px;
          }
        }
      `}</style>
    </section>
  );
}