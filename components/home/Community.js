
import { useEffect, useRef } from 'react';
import Image from 'next/image';

import prayerGathering from '../../public/images/prayer-gathering.jpeg';
import bibleStudy from '../../public/images/bible-study.jpeg';
import worship from '../../public/images/worship.jpeg';
import fellowship from '../../public/images/fellowship.jpeg';

export default function Community() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('comm-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="community-section" ref={sectionRef}>
      <div className="community-container">
        <div className="comm-left">
          <span className="comm-eyebrow">
            LIFE AT COLIG
          </span>

          <h2 className="comm-heading">
            One family.
            <br />
            <span>One foundation.</span>
          </h2>

          <p className="comm-description">
            At COLIG Leadership Foundation School, we are more
            than a learning community. We are a family growing
            together in faith, building meaningful relationships,
            and preparing to make a lasting impact.
          </p>

          <div className="comm-stats">
            <Stat number="01" label="ONE FAMILY" />
            <Stat number="02" label="SHARED FAITH" />
            <Stat number="03" label="LASTING IMPACT" />
          </div>

          <a href="/community" className="comm-cta">
            JOIN OUR COMMUNITY
            <span aria-hidden="true"> →</span>
          </a>
        </div>

        <div className="comm-right">
          <div className="comm-image-grid">
            <div className="comm-photo ph-a">
              <div className="ph-placeholder">
                <Image
                  src={prayerGathering}
                  alt="Students gathered together in prayer"
                  fill
                  sizes="(max-width: 768px) 45vw, 220px"
                  style={{ objectFit: 'cover' }}
                  priority
                />

                <p>PRAYER GATHERING</p>
              </div>
            </div>

            <div className="comm-photo ph-b">
              <div className="ph-placeholder">
                <Image
                  src={bibleStudy}
                  alt="Students studying the Bible together"
                  fill
                  sizes="(max-width: 768px) 45vw, 220px"
                  style={{ objectFit: 'cover' }}
                />

                <p>BIBLE STUDY</p>
              </div>
            </div>

            <div className="comm-photo ph-c">
              <div className="ph-placeholder">
                <Image
                  src={worship}
                  alt="Students worshipping together"
                  fill
                  sizes="(max-width: 768px) 45vw, 220px"
                  style={{ objectFit: 'cover' }}
                />

                <p>WORSHIP</p>
              </div>
            </div>

            <div className="comm-photo ph-d">
              <div className="ph-placeholder">
                <Image
                  src={fellowship}
                  alt="Students enjoying fellowship together"
                  fill
                  sizes="(max-width: 768px) 45vw, 220px"
                  style={{ objectFit: 'cover' }}
                />

                <p>FELLOWSHIP</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .community-section {
          position: relative;
          overflow: hidden;
          padding: 100px 6%;
          background: #f8f7f2;
          opacity: 0;
          transform: translateY(25px);
          transition:
            opacity 0.8s ease,
            transform 0.8s ease;
        }

        .community-section.comm-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .community-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 70px;
        }

        .comm-left {
          max-width: 540px;
        }

        .comm-eyebrow {
          display: inline-block;
          margin-bottom: 20px;
          color: #bd9147;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 4px;
        }

        .comm-heading {
          margin: 0 0 24px;
          color: #14243a;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(42px, 5vw, 68px);
          font-weight: 800;
          line-height: 0.98;
          letter-spacing: -1px;
        }

        .comm-heading span {
          color: #bd9147;
        }

        .comm-description {
          max-width: 490px;
          margin: 0 0 32px;
          color: #626a73;
          font-size: 16px;
          line-height: 1.9;
        }

        .comm-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          margin-bottom: 35px;
        }

        .comm-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 25px;
          background: #14243a;
          color: #fff;
          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          transition:
            background 0.25s ease,
            transform 0.25s ease;
        }

        .comm-cta:hover {
          background: #bd9147;
          transform: translateY(-2px);
        }

        .comm-right {
          width: 100%;
          min-width: 0;
        }

        .comm-image-grid {
          position: relative;
          width: 100%;
          max-width: 510px;
          height: 480px;
          margin: 0 auto;
        }

        .comm-photo {
          position: absolute;
          overflow: hidden;
          background: #e7e1d5;
          border: 5px solid #fff;
          box-shadow: 0 15px 40px rgba(20, 36, 58, 0.12);
        }

        .ph-a {
          top: 0;
          left: 0;
          width: 54%;
          height: 54%;
          z-index: 1;
          transform: rotate(-4deg);
        }

        .ph-b {
          top: 8%;
          right: 0;
          width: 48%;
          height: 48%;
          z-index: 2;
          transform: rotate(4deg);
        }

        .ph-c {
          bottom: 0;
          left: 7%;
          width: 48%;
          height: 48%;
          z-index: 3;
          transform: rotate(3deg);
        }

        .ph-d {
          right: 2%;
          bottom: 2%;
          width: 48%;
          height: 49%;
          z-index: 4;
          transform: rotate(-3deg);
        }

        .ph-placeholder {
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .ph-placeholder p {
          position: absolute;
          z-index: 2;
          right: 8px;
          bottom: 10px;
          left: 8px;
          margin: 0;
          padding: 9px 5px;
          border-radius: 4px;
          background: rgba(10, 22, 40, 0.76);
          color: #fff;
          text-align: center;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        @media (max-width: 900px) {
          .community-section {
            padding: 75px 5%;
          }

          .community-container {
            gap: 35px;
          }

          .comm-image-grid {
            height: 400px;
          }

          .comm-stats {
            gap: 20px;
          }
        }

        @media (max-width: 700px) {
          .community-section {
            padding: 65px 6%;
          }

          .community-container {
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .comm-left {
            max-width: none;
          }

          .comm-heading {
            font-size: clamp(42px, 11vw, 60px);
          }

          .comm-description {
            font-size: 15px;
          }

          .comm-image-grid {
            max-width: 440px;
            height: min(440px, 105vw);
          }
        }

        @media (max-width: 400px) {
          .comm-image-grid {
            height: 340px;
          }

          .comm-photo {
            border-width: 3px;
          }

          .ph-placeholder p {
            right: 4px;
            bottom: 5px;
            left: 4px;
            padding: 7px 3px;
            font-size: 8px;
            letter-spacing: 1px;
          }

          .comm-stats {
            gap: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .community-section {
            transition: none;
            transform: none;
          }

          .comm-cta {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div className="comm-stat">
      <div className="comm-stat-number">{number}</div>
      <div className="comm-stat-label">{label}</div>

      <style jsx>{`
        .comm-stat {
          min-width: 75px;
        }

        .comm-stat-number {
          margin-bottom: 5px;
          color: #14243a;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 27px;
          font-weight: 800;
        }

        .comm-stat-label {
          color: #8a8d90;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }
      `}</style>
    </div>
  );
}
