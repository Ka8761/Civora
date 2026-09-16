import ProgressBar from '../ui/ProgressBar';

export default function StudentProgress({
  progress = 0,
  currentModule = 'Orientation',
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: 24,
        backdropFilter: 'blur(16px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
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
            MY PROGRESS
          </div>

          <div
            style={{
              fontFamily: "'Playfair Display'",
              fontSize: 19,
              color: '#fff',
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            {currentModule}
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Playfair Display'",
            fontSize: 22,
            color: '#c9921a',
            fontWeight: 800,
          }}
        >
          {progress}%
        </div>
      </div>

      <ProgressBar progress={progress} />

      <div
        style={{
          marginTop: 10,
          fontFamily: "'Barlow Condensed'",
          fontSize: 10,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: 1,
        }}
      >
        Keep going. Your next lesson is waiting.
      </div>
    </div>
  );
}