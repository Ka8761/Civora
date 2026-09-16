export default function GlassCard({
  children,
  style = {},
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}