import { useState } from 'react';

const SECTIONS = [
  { id: 'all', label: 'All Sermons' },
  { id: '1',   label: 'Section 1 — Faith & the Word',      color: '#c9921a' },
  { id: '2',   label: 'Section 2 — Prayer & Intercession',  color: '#9333ea' },
  { id: '3',   label: 'Section 3 — The New Birth',          color: '#4caf50' },
  { id: '4',   label: 'Section 4 — Walking in the Spirit',  color: '#2196f3' },
  { id: '5',   label: 'Section 5 — Kingdom Authority',      color: '#ef4444' },
  { id: '6',   label: 'Section 6 — Servant Leadership',     color: '#ff9800' },
];

export default function SermonLibrary({ sermons, currentId, completedIds, onPlay }) {
  const [filter, setFilter] = useState('all');

  const visible = filter === 'all'
    ? sermons
    : sermons.filter(s => String(s.section) === filter);

  return (
    <div>
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {SECTIONS.map(sec => (
          <button
            key={sec.id}
            onClick={() => setFilter(sec.id)}
            className="bs"
            style={{
              fontSize: 11, padding: '7px 13px',
              background: filter === sec.id ? 'var(--gold)' : 'transparent',
              color:      filter === sec.id ? 'var(--navy)' : 'var(--mid)',
              border:     filter === sec.id ? 'none' : '1.5px solid #e0e0e0',
            }}
          >
            {sec.id === 'all' ? 'ALL (61)' : `S${sec.id}`}
          </button>
        ))}
      </div>

      {/* Sermon rows */}
      {visible.map(sermon => {
        const locked    = sermon.id > 5 && !completedIds.includes(sermon.id - 1);
        const done      = completedIds.includes(sermon.id);
        const isPlaying = currentId === sermon.id;
        const sec       = SECTIONS.find(s => String(s.id) === String(sermon.section));

        return (
          <div
            key={sermon.id}
            className={`srow ${locked ? 'lk2' : ''} ${done ? 'done' : ''} ${isPlaying ? 'playing' : ''}`}
            onClick={() => !locked && onPlay(sermon)}
          >
            <div className="s-num">{sermon.id}</div>

            <div className="s-inf">
              <div className="s-title">{sermon.title}</div>
              <div className="s-meta">{sermon.speaker}</div>
              <div className="s-sec" style={{ color: sec?.color || 'var(--gold)' }}>
                {sec?.label || ''}
              </div>
            </div>

            <div className="s-acts">
              {locked ? (
                <span style={{ fontSize: 18, color: '#ccc' }}>🔒</span>
              ) : isPlaying ? (
                <div className="ppeq" style={{ display: 'flex' }}>
                  <span /><span /><span />
                </div>
              ) : done ? (
                <span style={{ fontSize: 16 }}>✅</span>
              ) : null}
              {!locked && (
                <button className="splay" onClick={e => { e.stopPropagation(); onPlay(sermon); }}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

