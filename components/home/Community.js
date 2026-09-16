import { useEffect, useRef } from 'react';

export default function Community() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="comm-sec" id="community">
      <div className="comm-inner">

        <div ref={leftRef} className="comm-left reveal-l">
          <div className="comm-eyebrow">
            Join Community
          </div>

          <h2 className="comm-title">
            One family.
            <br />
            <em>One foundation.</em>
          </h2>

          <p className="comm-body">
            The COLIG Leadership Foundation School is not just a
            programme — it is a family. You will journey alongside other
            believers who are committed to the same standard of truth,
            prayer, and transformation. Iron sharpens iron, and together
            you will grow stronger.
          </p>

          <div className="comm-stats">
            <Stat value="142" label="STUDENTS ENROLLED" />
            <Stat value="6" label="COHORTS LAUNCHED" />
            <Stat value="38" label="ACTIVE THIS WEEK" />
          </div>

          <button className="comm-cta">
            JOIN THE COMMUNITY →
          </button>
        </div>

        <div ref={rightRef} className="comm-right">

          <div className="ph-ring"></div>
          <div className="ph-dot"></div>

          <div className="ph-a">
            <div className="ph-placeholder">
              <span>🙏</span>
              <p>PRAYER GATHERING</p>
            </div>
          </div>

          <div className="ph-b">
            <div className="ph-placeholder">
              <span>📖</span>
              <p>BIBLE STUDY</p>
            </div>
          </div>

          <div className="ph-c">
            <div className="ph-placeholder">
              <span>🎵</span>
              <p>WORSHIP</p>
            </div>
          </div>

          <div className="ph-d">
            <div className="ph-placeholder">
              <span>🤝</span>
              <p>FELLOWSHIP</p>
            </div>
          </div>

        </div>

      </div>

      <style jsx>{`
        .comm-sec {
          background: #fff;
          padding: 96px 60px;
          overflow: hidden;
        }

        .comm-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .comm-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          letter-spacing: 4px;
          font-weight: 700;
          color: #c9921a;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .comm-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 40px);
          font-weight: 900;
          color: #0a1628;
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .comm-title em {
          font-style: italic;
          color: #c9921a;
        }

        .comm-body {
          font-size: 15px;
          color: #4a5568;
          line-height: 1.85;
          margin-bottom: 28px;
        }

        .comm-stats {
          display: flex;
          gap: 24px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .comm-stat-v {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 900;
          color: #c9921a;
          line-height: 1;
        }

        .comm-stat-l {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          color: #4a5568;
          margin-top: 3px;
        }

        .comm-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #0a1628;
          color: #c9921a;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          padding: 13px 28px;
          border-radius: 6px;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }

        .comm-cta:hover {
          background: #c9921a;
          color: #0a1628;
        }

        .comm-right {
          position: relative;
          height: 520px;
        }

        .ph-a,
        .ph-b,
        .ph-c,
        .ph-d {
          position: absolute;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(10, 22, 40, 0.2);
        }

        .ph-a {
          left: 0;
          top: 40px;
          width: 220px;
          height: 300px;
          transform: rotate(-2deg);
          animation: floatA 6s ease-in-out infinite;
        }

        .ph-b {
          right: 0;
          top: 0;
          width: 190px;
          height: 190px;
          transform: rotate(2.5deg);
          animation: floatB 7s ease-in-out infinite;
        }

        .ph-c {
          right: 40px;
          top: 210px;
          width: 170px;
          height: 160px;
          transform: rotate(-1.5deg);
          animation: floatC 5.5s ease-in-out infinite;
        }

        .ph-d {
          left: 80px;
          bottom: 0;
          width: 200px;
          height: 175px;
          transform: rotate(1.5deg);
          animation: floatD 6.5s ease-in-out infinite;
        }

        .ph-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 8px;
        }

        .ph-placeholder span {
          font-size: 32px;
        }

        .ph-placeholder p {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
        }

        .ph-a .ph-placeholder {
          background: linear-gradient(135deg, #1a0a3a, #0a1628);
        }

        .ph-b .ph-placeholder {
          background: linear-gradient(135deg, #1a3a1f, #0a2010);
        }

        .ph-c .ph-placeholder {
          background: linear-gradient(135deg, #2d0a5a, #1a0a3a);
        }

        .ph-d .ph-placeholder {
          background: linear-gradient(135deg, #0a1628, #1e3a5f);
        }

        .ph-ring {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid rgba(201, 146, 26, 0.3);
          top: 180px;
          left: 180px;
          animation: spin 20s linear infinite;
          z-index: 0;
        }

        .ph-dot {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #c9921a;
          bottom: 130px;
          left: 50px;
          animation: floatB 4s ease-in-out infinite;
        }

        .reveal-l {
          opacity: 0;
          transform: translateX(-36px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }

        .reveal-l.vis {
          opacity: 1;
          transform: translateX(0);
        }

        @keyframes floatA {
          0%,
          100% {
            transform: rotate(-2deg) translateY(0);
          }

          50% {
            transform: rotate(-2deg) translateY(-10px);
          }
        }

        @keyframes floatB {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes floatC {
          0%,
          100% {
            transform: rotate(-1.5deg) translateY(0);
          }

          50% {
            transform: rotate(-1.5deg) translateY(-12px);
          }
        }

        @keyframes floatD {
          0%,
          100% {
            transform: rotate(1.5deg) translateY(0);
          }

          50% {
            transform: rotate(1.5deg) translateY(-9px);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 900px) {
          .comm-sec {
            padding: 64px 22px;
          }

          .comm-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .comm-right {
            height: 340px;
          }

          .ph-a {
            width: 150px;
            height: 200px;
          }

          .ph-b {
            width: 130px;
            height: 130px;
          }

          .ph-c {
            width: 120px;
            height: 110px;
          }

          .ph-d {
            width: 140px;
            height: 120px;
          }
        }
      `}</style>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="comm-stat">
      <div className="comm-stat-v">{value}</div>
      <div className="comm-stat-l">{label}</div>
    </div>
  );
}