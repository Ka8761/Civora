export default function CurriculumSidebar({ curriculum = [], activeKey, onSelect }) {
  return (
    <aside className="cs">
      <div className="cs-head">CURRICULUM MAP</div>

      {curriculum.map((c, i) => {
        const locked = c.status === 'LOCKED';
        return (
          <button
            key={c.key}
            type="button"
            disabled={locked}
            className={`cs-item ${c.key === activeKey ? 'active' : ''} ${locked ? 'locked' : ''}`}
            onClick={() => onSelect(c.key)}
          >
            <span className="cs-num">{i + 1}</span>
            <span className="cs-title">{c.title}</span>
            <span className={`cs-status s-${c.status.replace(' ', '-').toLowerCase()}`}>
              {locked ? '🔒' : c.status}
            </span>
          </button>
        );
      })}

      <style jsx>{`
        .cs { background: #0a1628; border-radius: 14px; padding: 14px 0; }
        .cs-head { padding: 6px 20px 12px; font-size: 10px; letter-spacing: 3px; font-weight: 700; color: #c9921a; }
        .cs-item {
          display: flex; align-items: center; gap: 12px; width: 100%;
          padding: 13px 20px; background: none; border: none; border-left: 3px solid transparent;
          color: rgba(255,255,255,0.8); text-align: left; cursor: pointer; font-size: 12px; font-weight: 600;
        }
        .cs-item:hover:not(:disabled) { background: rgba(255,255,255,0.05); }
        .cs-item.active { background: rgba(201,146,26,0.12); border-left-color: #c9921a; color: #c9921a; }
        .cs-item.locked { opacity: 0.4; cursor: not-allowed; }
        .cs-num { width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
        .cs-title { flex: 1; }
        .cs-status { font-size: 8px; letter-spacing: 1px; font-weight: 700; color: rgba(255,255,255,0.45); }
        .s-complete { color: #4caf50; }
        .s-in-progress { color: #c9921a; }
      `}</style>
    </aside>
  );
}