export default function SermonCard({
  sermon,
  completed = false,
  onPlay,
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        padding: 18,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          background: 'rgba(201,146,26,0.1)',
          border: '1px solid rgba(201,146,26,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c9921a',
          flexShrink: 0,
        }}
      >
        {completed ? '✓' : '▶'}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "'Playfair Display'",
            fontSize: 15,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          {sermon.title}
        </div>

        <div
          style={{
            fontFamily: "'Barlow Condensed'",
            fontSize: 10,
            color: 'rgba(255,255,255,0.4)',
            marginTop: 4,
            letterSpacing: 1,
          }}
        >
          {sermon.speaker}
        </div>
      </div>

      <button
        onClick={() => onPlay?.(sermon)}
        style={{
          border: '1px solid rgba(201,146,26,0.35)',
          background: 'rgba(201,146,26,0.06)',
          color: '#c9921a',
          borderRadius: 6,
          padding: '8px 14px',
          cursor: 'pointer',
          fontFamily: "'Barlow Condensed'",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        PLAY
      </button>
    </div>
  );
}