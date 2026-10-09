const TIERS = {
  bronze: ['#f0b27a', '#cd7f32', '#7a4a1d'],
  silver: ['#ffffff', '#c0c4cc', '#7b828e'],
  gold: ['#fff1a8', '#e6b422', '#9a6d0a'],
};

export default function Medal({ id, tier, earned, size = 72 }) {
  const gid = `medal-${id}`;
  const [c1, c2, c3] = TIERS[tier === 'crown' ? 'gold' : tier];

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg
        viewBox="0 0 64 80"
        width={size}
        height={size}
        style={{ filter: earned ? 'none' : 'grayscale(1)', opacity: earned ? 1 : 0.3 }}
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="50%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
        </defs>

        {tier === 'crown' ? (
          <g transform="translate(0,6)">
            <path d="M6 52 L2 18 L20 32 L32 8 L44 32 L62 18 L58 52 Z" fill={`url(#${gid})`} stroke={c3} strokeWidth="1.5" strokeLinejoin="round" />
            <rect x="6" y="52" width="52" height="10" rx="2" fill={`url(#${gid})`} stroke={c3} strokeWidth="1.5" />
            <circle cx="32" cy="8" r="3.5" fill="#e11d48" stroke={c3} />
            <circle cx="2" cy="18" r="3" fill="#2563eb" stroke={c3} />
            <circle cx="62" cy="18" r="3" fill="#2563eb" stroke={c3} />
            <circle cx="20" cy="57" r="2" fill="#fff" opacity="0.8" />
            <circle cx="32" cy="57" r="2" fill="#fff" opacity="0.8" />
            <circle cx="44" cy="57" r="2" fill="#fff" opacity="0.8" />
          </g>
        ) : (
          <g>
            <polygon points="18,0 32,28 24,32 10,6" fill="#8b1e2d" />
            <polygon points="46,0 32,28 40,32 54,6" fill="#a8293b" />
            <circle cx="32" cy="50" r="24" fill={`url(#${gid})`} stroke={c3} strokeWidth="1.5" />
            <circle cx="32" cy="50" r="18" fill="none" stroke={c3} strokeWidth="1" opacity="0.7" />
            <polygon
              points="32,40 34.4,46.2 41,46.6 35.9,50.8 37.6,57 32,53.5 26.4,57 28.1,50.8 23,46.6 29.6,46.2"
              fill={c3}
              opacity="0.85"
            />
          </g>
        )}
      </svg>

      {!earned && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.34 }}>
          🔒
        </div>
      )}
    </div>
  );
}