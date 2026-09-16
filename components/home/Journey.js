import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Complete 5 Courses',
    description:
      'Work through all five foundation modules at your own pace. Each course builds upon the last, progressively deepening your doctrinal foundation and equipping you for ministry.',
  },
  {
    number: '02',
    title: 'Pass the Capstone Exam',
    description:
      'Demonstrate your mastery of the material in our comprehensive final examination. Only your highest attempt is recorded on your academic transcript.',
  },
  {
    number: '03',
    title: '12-Hour Prayer & Interview',
    description:
      'Complete a final 12-hour prayer requirement and a personal interview with the pastorate to complete your induction into the COLIG workforce.',
  },
];

export default function Journey() {
  const journeyRef = useRef(null);

  useEffect(() => {
    const journeyElement = journeyRef.current;

    if (!journeyElement) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            journeyElement.classList.add('is-visible');
            observer.unobserve(journeyElement);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(journeyElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={journeyRef}
      className="journey-sec"
      id="journey"
    >
      <div className="journey-inner">
        <div className="journey-layout">
          <div className="journey-left">
            <div className="journey-copy">
              <div className="journey-tag">
                Your Journey
              </div>

              <div className="journey-title">
                Three steps to <em>the workforce</em>
              </div>

              <p className="journey-sub">
                Becoming a worker in COLIG is a systematic process of training,
                impartation, and dedication.
              </p>
            </div>

            <div className="journey-note">
              <div className="journey-note-icon">
                🎓
              </div>

              <div>
                <div className="journey-note-t">
                  Your Certificate Awaits
                </div>

                <div className="journey-note-d">
                  Upon successful completion of all requirements, a personalised
                  Certificate of Completion is automatically generated in your
                  name and made available for immediate download from your
                  student portal.
                </div>
              </div>
            </div>
          </div>

          <div className="journey-right">
            <div className="journey-process">
              <svg
                className="journey-lines"
                viewBox="0 0 700 760"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <path
                  className="journey-line journey-line-one"
                  d="M 365 285 L 300 285 Q 245 285 245 230 L 245 175"
                />

                <path
                  className="journey-line journey-line-two"
                  d="M 365 335 L 365 500 Q 365 555 310 555 L 245 555 Q 195 555 195 650 L 195 690"
                />
              </svg>

              <div className="journey-steps">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`jstep jstep-${index + 1}`}
                  >
                    <div className="jstep-icon">
                      {step.number}
                    </div>

                    <div className="jstep-content">
                      <div className="jstep-title">
                        {step.title}
                      </div>

                      <p className="jstep-desc">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .journey-sec {
          overflow: hidden;
          padding: 96px 60px;
          background: #faf8f3;
        }

        .journey-inner {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }

        .journey-layout {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 70px;
          align-items: center;
        }

        .journey-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .journey-copy {
          text-align: left;
        }

        .journey-tag {
          margin-bottom: 12px;
          color: #c9921a;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        .journey-title {
          margin-bottom: 14px;
          color: #0a1628;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 900;
          line-height: 1.12;
        }

        .journey-title em {
          color: #c9921a;
          font-style: italic;
        }

        .journey-sub {
          max-width: 460px;
          margin: 0;
          color: #4a5568;
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          line-height: 1.8;
        }

        .journey-note {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 46px;
          padding: 28px 30px;
          border-radius: 12px;
          background: #0a1628;
        }

        .journey-note-icon {
          flex-shrink: 0;
          font-size: 32px;
        }

        .journey-note-t {
          margin-bottom: 4px;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .journey-note-d {
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          line-height: 1.7;
        }

        .journey-right {
          min-width: 0;
          width: 100%;
        }

        .journey-process {
          position: relative;
          width: 100%;
          min-height: 760px;
        }

        .journey-lines {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .journey-line {
          fill: none;
          stroke: #c9921a;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1100;
          stroke-dashoffset: 1100;
          opacity: 0.7;
          transition: stroke-dashoffset 5s ease;
        }

        .journey-line-one {
          transition-delay: 0.8s;
        }

        .journey-line-two {
          transition-delay: 2.8s;
        }

        .journey-sec.is-visible .journey-line {
          stroke-dashoffset: 0;
        }

        .journey-steps {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 760px;
        }

        .jstep {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 22px;
          width: min(360px, 70%);
          opacity: 0;
          transition:
            opacity 3s ease,
            transform 3s ease;
        }

        .jstep-1 {
          top: 70px;
          left: 0;
          transform: translateX(-70px);
          transition-delay: 0.4s;
        }

        .jstep-2 {
          top: 275px;
          right: 0;
          left: auto;
          transform: translateY(70px);
          transition-delay: 1.7s;
        }

        .jstep-3 {
          top: 660px;
          left: 0;
          transform: translateX(-70px);
          transition-delay: 3.8s;
        }

        .journey-sec.is-visible .jstep {
          opacity: 1;
          transform: translate(0);
        }

        .jstep-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 76px;
          height: 76px;
          border: 3px solid #c9921a;
          border-radius: 50%;
          background: #0a1628;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 800;
          box-shadow: 0 10px 25px rgba(10, 22, 40, 0.15);
          transition: transform 0.4s ease;
        }

        .jstep:hover .jstep-icon {
          transform: scale(1.06);
        }

        .jstep-content {
          flex: 1;
          min-width: 0;
          padding-right: 10px;
        }

        .jstep-title {
          margin-bottom: 8px;
          color: #0a1628;
          font-family: 'Montserrat', sans-serif;
          font-size: 17px;
          font-weight: 800;
          line-height: 1.3;
        }

        .jstep-desc {
          margin: 0;
          color: #4a5568;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          line-height: 1.7;
        }

        @media (max-width: 1100px) {
          .journey-layout {
            gap: 35px;
          }

          .jstep {
            width: min(330px, 78%);
          }

          .jstep-2 {
            right: 0;
          }
        }

        @media (max-width: 900px) {
          .journey-sec {
            padding: 70px 22px;
          }

          .journey-layout {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 24px;
          }

          .journey-note {
            padding: 24px;
          }

          .journey-process {
            min-height: 620px;
          }

          .journey-steps {
            min-height: 620px;
          }

          .jstep {
            gap: 14px;
            width: 88%;
          }

          .jstep-icon {
            width: 62px;
            height: 62px;
            font-size: 15px;
          }

          .jstep-title {
            font-size: 14px;
          }

          .jstep-desc {
            font-size: 10px;
          }

          .jstep-1 {
            top: 40px;
          }

          .jstep-2 {
            top: 220px;
          }

          .jstep-3 {
            top: 535px;
          }
        }

        @media (max-width: 680px) {
          .journey-sec {
            padding: 64px 18px;
          }

          .journey-layout {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .journey-title {
            font-size: clamp(23px, 7vw, 34px);
          }

          .journey-sub {
            font-size: 12px;
            line-height: 1.7;
          }

          .journey-note {
            align-items: flex-start;
            gap: 12px;
            margin-top: 32px;
            padding: 18px;
          }

          .journey-note-icon {
            font-size: 24px;
          }

          .journey-note-t {
            font-size: 10px;
          }

          .journey-note-d {
            font-size: 9px;
            line-height: 1.6;
          }

          .journey-process {
            min-height: 520px;
          }

          .journey-steps {
            min-height: 520px;
          }

          .jstep {
            gap: 8px;
            width: 96%;
          }

          .jstep-icon {
            width: 48px;
            height: 48px;
            border-width: 2px;
            font-size: 12px;
          }

          .jstep-title {
            margin-bottom: 5px;
            font-size: 11px;
          }

          .jstep-desc {
            font-size: 8px;
            line-height: 1.5;
          }

          .jstep-1 {
            top: 35px;
          }

          .jstep-2 {
            top: 180px;
          }

          .jstep-3 {
            top: 445px;
          }

          .journey-line {
            stroke-width: 2;
          }
        }

        @media (max-width: 480px) {
          .journey-layout {
            gap: 10px;
          }

          .journey-tag {
            font-size: 8px;
            letter-spacing: 2px;
          }

          .journey-title {
            font-size: 21px;
          }

          .journey-sub {
            font-size: 10px;
          }

          .journey-note {
            grid-column: 1 / -1;
            width: 100%;
            margin-top: 28px;
          }

          .journey-process {
            min-height: 470px;
          }

          .journey-steps {
            min-height: 470px;
          }

          .jstep {
            width: 100%;
          }

          .jstep-icon {
            width: 40px;
            height: 40px;
            font-size: 10px;
          }

          .jstep-title {
            font-size: 9px;
          }

          .jstep-desc {
            font-size: 7px;
          }

          .jstep-1 {
            top: 28px;
          }

          .jstep-2 {
            top: 160px;
          }

          .jstep-3 {
            top: 400px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-line,
          .jstep {
            transition: none;
          }

          .journey-line {
            stroke-dashoffset: 0;
          }

          .jstep {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}