import React from 'react';

export default function ScrollTags() {
  const tags = [
    'Leadership Foundation School',
    '✦',
    '5 Core Courses',
    '✦',
    '60 Hours of Prayer',
    '✦',
    'Kingdom Training',
    '✦',
    'Capstone Examination',
    '✦',
    'COLIG Family',
    '✦',
    'Transformation & Love',
    '✦',
      'Discipled By The Word',
    '✦',
  ];

  return (
    <div className="scroll-tags">
      <div className="scroll-track">
        <div className="scroll-content">
          {tags.map((tag, index) => (
            <span className="scroll-tag" key={index}>
              {tag}
            </span>
          ))}
        </div>

        <div className="scroll-content" aria-hidden="true">
          {tags.map((tag, index) => (
            <span className="scroll-tag" key={`duplicate-${index}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scroll-tags {
          width: 100%;
          height: 10vh;

          margin: 0;
          padding: 0;

          overflow: hidden;

          background: #c9921a;

          display: flex;
          align-items: center;
        }

        .scroll-track {
          display: flex;
          width: max-content;

          animation: scrollRight 30s linear infinite;

          will-change: transform;
        }

        .scroll-content {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .scroll-tag {
          display: inline-flex;
          align-items: center;

          white-space: nowrap;

          margin: 0;
          padding: 0 18px;

          color: #071b3a;

          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 600;

          line-height: 15px;
          letter-spacing: 0.4px;
        }

        @keyframes scrollRight {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}