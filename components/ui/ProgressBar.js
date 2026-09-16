export default function ProgressBar({
  progress = 0,
  height = 5,
}) {
  return (
    <div
      style={{
        width: '100%',
        height,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 999,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${Math.min(Math.max(progress, 0), 100)}%`,
          height: '100%',
          background: '#c9921a',
          borderRadius: 999,
          transition: 'width 0.5s ease',
        }}
      />
    </div>
  );
}