import { useEffect, useRef, useState } from 'react';

export default function SermonPlayer({ sermon }) {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [sermon]);

  if (!sermon) {
    return (
      <div
        style={{
          padding: 50,
          textAlign: 'center',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        Select a sermon from the library to begin listening.
      </div>
    );
  }

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const value = Number(e.target.value);

    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) return '00:00';

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, '0')}:${String(
      secs
    ).padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: 28,
      }}
    >
      <audio
        ref={audioRef}
        src={sermon.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
      />

      <div
        style={{
          fontFamily: "'Barlow Condensed'",
          color: '#c9921a',
          fontSize: 10,
          letterSpacing: 2.5,
          fontWeight: 700,
        }}
      >
        NOW PLAYING
      </div>

      <div
        style={{
          fontFamily: "'Playfair Display'",
          color: '#fff',
          fontSize: 23,
          fontWeight: 700,
          marginTop: 7,
        }}
      >
        {sermon.title}
      </div>

      <div
        style={{
          color: 'rgba(255,255,255,0.4)',
          fontFamily: "'Barlow Condensed'",
          fontSize: 11,
          marginTop: 5,
        }}
      >
        {sermon.speaker}
      </div>

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        style={{
          width: '100%',
          marginTop: 28,
          accentColor: '#c9921a',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: 'rgba(255,255,255,0.35)',
          fontFamily: "'Barlow Condensed'",
          fontSize: 10,
        }}
      >
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 18,
          marginTop: 20,
        }}
      >
        <button
          onClick={() => {
            audioRef.current.currentTime = Math.max(
              0,
              currentTime - 10
            );
          }}
          style={controlButton}
        >
          ↶ 10
        </button>

        <button
          onClick={togglePlay}
          style={{
            ...controlButton,
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: '#c9921a',
            color: '#07110c',
            fontSize: 18,
          }}
        >
          {playing ? '❚❚' : '▶'}
        </button>

        <button
          onClick={() => {
            audioRef.current.currentTime = Math.min(
              duration,
              currentTime + 10
            );
          }}
          style={controlButton}
        >
          10 ↷
        </button>
      </div>

      <a
        href={sermon.audioUrl}
        download
        style={{
          display: 'block',
          textAlign: 'center',
          marginTop: 24,
          color: '#c9921a',
          fontFamily: "'Barlow Condensed'",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.5,
          textDecoration: 'none',
        }}
      >
        ↓ DOWNLOAD AUDIO
      </a>
    </div>
  );
}

const controlButton = {
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.04)',
  color: '#fff',
  borderRadius: 6,
  padding: '9px 13px',
  cursor: 'pointer',
  fontFamily: "'Barlow Condensed'",
  fontSize: 10,
};