import Link from 'next/link';
import LockIcon from '../ui/LockIcon';
import ProgressBar from '../ui/ProgressBar';

export default function CourseCard({
  course,
  progress = 0,
  locked = false,
}) {
  return (
    <div
      style={{
        background: locked
          ? 'rgba(255,255,255,0.02)'
          : 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: 22,
        opacity: locked ? 0.6 : 1,
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Barlow Condensed'",
              fontSize: 10,
              letterSpacing: 2.5,
              color: '#c9921a',
              fontWeight: 700,
            }}
          >
            {course.code}
          </div>

          <div
            style={{
              fontFamily: "'Playfair Display'",
              fontSize: 20,
              fontWeight: 700,
              color: '#fff',
              marginTop: 5,
            }}
          >
            {course.title}
          </div>

          <div
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontFamily: "'Barlow Condensed'",
              fontSize: 11,
              marginTop: 5,
            }}
          >
            {course.subtitle}
          </div>
        </div>

        {locked ? (
          <LockIcon />
        ) : (
          <div
            style={{
              color: '#c9921a',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            OPEN
          </div>
        )}
      </div>

      {!locked && (
        <>
          <div style={{ marginTop: 20 }}>
            <ProgressBar progress={progress} />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 12,
            }}
          >
            <span
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontFamily: "'Barlow Condensed'",
                fontSize: 10,
              }}
            >
              {progress}% COMPLETE
            </span>

            <Link
              href={`/dashboard/curriculum/${course._id}`}
              style={{
                color: '#c9921a',
                textDecoration: 'none',
                fontFamily: "'Barlow Condensed'",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              CONTINUE →
            </Link>
          </div>
        </>
      )}

      {locked && (
        <div
          style={{
            marginTop: 16,
            color: 'rgba(255,255,255,0.3)',
            fontFamily: "'Barlow Condensed'",
            fontSize: 10,
            letterSpacing: 1,
          }}
        >
          Complete the previous class to unlock this course.
        </div>
      )}
    </div>
  );
}
