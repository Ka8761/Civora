import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const SECTIONS = [
  { number: 1, name: 'Faith' },
  { number: 2, name: 'The Word' },
  { number: 3, name: 'Prayer' },
  { number: 4, name: 'The Holy Spirit' },
  { number: 5, name: 'Leadership' },
  { number: 6, name: 'Ministry' },
];

export default function SermonLibrary() {
  const { status } = useSession();

  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchSermons = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/sermons');

        if (!response.ok) {
          throw new Error('Unable to load sermons.');
        }

        const data = await response.json();

        const sermonList = Array.isArray(data)
          ? data
          : Array.isArray(data.sermons)
          ? data.sermons
          : [];

        setSermons(sermonList);
      } catch (err) {
        console.error('Sermon library error:', err);
        setError('Unable to load the sermon library right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, [status]);

  if (status === 'loading') {
    return (
      <main className="library-page">
        <div className="library-loading">
          <span className="loader"></span>
          <p>Loading library...</p>
        </div>

        <style jsx>{`
          .library-page {
            min-height: 100vh;
            background: #ffffff;
            color: #0a1628;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
          }

          .library-loading {
            text-align: center;
          }

          .loader {
            width: 32px;
            height: 32px;
            border: 3px solid #e5e7eb;
            border-top-color: #c9921a;
            border-radius: 50%;
            display: block;
            margin: 0 auto 15px;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          p {
            margin: 0;
            font-size: 14px;
          }
        `}</style>
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <main className="library-page">
        <div className="message-box">
          <h1>Sign in required</h1>
          <p>Please sign in to access the sermon library.</p>

          <Link href="/auth/login" className="gold-button">
            SIGN IN
          </Link>
        </div>

        <style jsx>{`
          .library-page {
            min-height: 100vh;
            background: #ffffff;
            color: #0a1628;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
            font-family: Arial, sans-serif;
          }

          .message-box {
            width: 100%;
            max-width: 500px;
            text-align: center;
            padding: 50px 30px;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
          }

          h1 {
            margin: 0 0 10px;
            font-size: 28px;
          }

          p {
            color: #64748b;
            margin: 0 0 25px;
          }

          .gold-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #c9921a;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 700;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="library-page">
      <div className="library-container">

        <div className="top-navigation">
          <Link href="/dashboard/sermon" className="back-link">
            ← BACK TO SERMON PROJECT
          </Link>
        </div>

        <header className="library-header">
          <p className="eyebrow">SERMON PROJECT</p>

          <h1>SERMON LIBRARY</h1>

          <p className="subtitle">
            Listen to the assigned messages and grow through the Word.
          </p>

          <div className="library-stats">
            <div className="stat">
              <strong>{sermons.length}</strong>
              <span>SERMONS</span>
            </div>

            <div className="stat">
              <strong>6</strong>
              <span>SECTIONS</span>
            </div>

            <div className="stat">
              <strong>61</strong>
              <span>TOTAL MESSAGES</span>
            </div>
          </div>
        </header>

        {loading && (
          <div className="loading-box">
            <span className="loader"></span>
            <p>Loading sermons...</p>
          </div>
        )}

        {error && (
          <div className="error-box">
            <strong>Unable to load library</strong>
            <p>{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              TRY AGAIN
            </button>
          </div>
        )}

        {!loading && !error && sermons.length === 0 && (
          <div className="empty-box">
            <div className="empty-icon">♪</div>

            <h2>No sermons available yet</h2>

            <p>
              Sermons will appear here once they have been added to the
              library.
            </p>
          </div>
        )}

        {!loading && !error && sermons.length > 0 && (
          <div className="sections">
            {SECTIONS.map((section) => {
              const sectionSermons = sermons
                .filter(
                  (sermon) =>
                    Number(sermon.section) === section.number
                )
                .sort(
                  (a, b) =>
                    Number(a.order || 0) - Number(b.order || 0)
                );

              if (sectionSermons.length === 0) {
                return null;
              }

              return (
                <section
                  className="sermon-section"
                  key={section.number}
                >
                  <div className="section-heading">
                    <div className="section-number">
                      0{section.number}
                    </div>

                    <div>
                      <p>SECTION 0{section.number}</p>
                      <h2>{section.name}</h2>
                    </div>

                    <span className="section-count">
                      {sectionSermons.length}{' '}
                      {sectionSermons.length === 1
                        ? 'MESSAGE'
                        : 'MESSAGES'}
                    </span>
                  </div>

                  <div className="sermon-list">
                    {sectionSermons.map((sermon, index) => (
                      <SermonCard
                        key={sermon._id || sermon.slug || index}
                        sermon={sermon}
                        index={index}
                        isPlaying={
                          playingId ===
                          (sermon._id || sermon.slug)
                        }
                        onPlay={() =>
                          setPlayingId(
                            sermon._id || sermon.slug
                          )
                        }
                        onStop={() => setPlayingId(null)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .library-page {
          min-height: 100vh;
          background: #ffffff;
          color: #0a1628;
          padding: 100px 30px 80px;
          font-family: Arial, sans-serif;
        }

        .library-container {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
        }

        .top-navigation {
          margin-bottom: 35px;
        }

        .back-link {
          color: #64748b;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          transition: color 0.2s ease;
        }

        .back-link:hover {
          color: #c9921a;
        }

        .library-header {
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 35px;
          margin-bottom: 45px;
        }

        .eyebrow {
          color: #c9921a;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
          margin: 0 0 12px;
        }

        .library-header h1 {
          margin: 0;
          font-size: clamp(38px, 6vw, 68px);
          line-height: 0.95;
          letter-spacing: -0.04em;
          font-weight: 900;
        }

        .subtitle {
          color: #64748b;
          font-size: 16px;
          line-height: 1.6;
          margin: 18px 0 0;
          max-width: 650px;
        }

        .library-stats {
          display: flex;
          gap: 45px;
          margin-top: 32px;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .stat strong {
          font-size: 25px;
          color: #0a1628;
        }

        .stat span {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #94a3b8;
        }

        .sections {
          display: flex;
          flex-direction: column;
          gap: 55px;
        }

        .sermon-section {
          width: 100%;
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 20px;
        }

        .section-number {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          border: 1px solid #c9921a;
          color: #c9921a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
        }

        .section-heading p {
          margin: 0 0 3px;
          color: #94a3b8;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .section-heading h2 {
          margin: 0;
          font-size: 25px;
          font-weight: 800;
        }

        .section-count {
          margin-left: auto;
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .sermon-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .loading-box,
        .empty-box,
        .error-box {
          text-align: center;
          padding: 60px 25px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }

        .loading-box p {
          color: #64748b;
          margin: 15px 0 0;
          font-size: 14px;
        }

        .loader {
          width: 30px;
          height: 30px;
          display: inline-block;
          border: 3px solid #e5e7eb;
          border-top-color: #c9921a;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .empty-icon {
          font-size: 35px;
          color: #c9921a;
          margin-bottom: 15px;
        }

        .empty-box h2,
        .error-box strong {
          margin: 0;
          font-size: 20px;
        }

        .empty-box p,
        .error-box p {
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
        }

        .error-box button {
          border: none;
          background: #0a1628;
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 5px;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 700px) {
          .library-page {
            padding: 90px 18px 50px;
          }

          .library-header h1 {
            font-size: 42px;
          }

          .library-stats {
            gap: 25px;
          }

          .section-heading {
            align-items: flex-start;
          }

          .section-number {
            width: 44px;
            height: 44px;
          }

          .section-heading h2 {
            font-size: 21px;
          }

          .section-count {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}

function SermonCard({
  sermon,
  index,
  isPlaying,
  onPlay,
  onStop,
}) {
  const sermonId = sermon._id || sermon.slug;

  /*
   * If audioUrl exists in MongoDB, use it.
   *
   * Otherwise, automatically look for the file in:
   *
   * public/audio/
   *
   * Example:
   * public/audio/faith-01.mp3
   *
   * can be played using:
   * /audio/faith-01.mp3
   */

  const audioSource = getAudioSource(sermon);

  return (
    <article className={`sermon-card ${isPlaying ? 'active' : ''}`}>
      <div className="sermon-number">
        {String(sermon.order || index + 1).padStart(2, '0')}
      </div>

      <div className="sermon-information">
        <div className="sermon-top">
          <span className="message-label">
            MESSAGE {String(sermon.order || index + 1).padStart(2, '0')}
          </span>

          {sermon.duration ? (
            <span className="duration">
              {formatDuration(sermon.duration)}
            </span>
          ) : null}
        </div>

        <h3>{sermon.title || 'Untitled Sermon'}</h3>

        {sermon.speaker && (
          <p className="speaker">
            {sermon.speaker}
          </p>
        )}

        {sermon.description && (
          <p className="description">
            {sermon.description}
          </p>
        )}

        {sermon.scripture && (
          <p className="scripture">
            {sermon.scripture}
          </p>
        )}
      </div>

      <div className="sermon-actions">
        <Link
          href={`/dashboard/sermon/${sermon.slug}`}
          className="details-button"
        >
          DETAILS
        </Link>

        {audioSource ? (
          <button
            type="button"
            className={`play-button ${isPlaying ? 'playing' : ''}`}
            onClick={isPlaying ? onStop : onPlay}
          >
            {isPlaying ? 'STOP' : 'PLAY'}
          </button>
        ) : (
          <span className="no-audio">
            AUDIO NOT FOUND
          </span>
        )}
      </div>

      {isPlaying && audioSource && (
        <div className="audio-player">
          <audio
            src={audioSource}
            controls
            autoPlay
            onEnded={onStop}
          />
        </div>
      )}

      <style jsx>{`
        .sermon-card {
          position: relative;
          display: grid;
          grid-template-columns: 55px 1fr auto;
          gap: 20px;
          align-items: center;
          padding: 22px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          border-radius: 10px;
          transition: border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .sermon-card:hover,
        .sermon-card.active {
          border-color: #c9921a;
          box-shadow: 0 8px 30px rgba(10, 22, 40, 0.06);
        }

        .sermon-number {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a1628;
          color: #ffffff;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 800;
        }

        .sermon-top {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 6px;
        }

        .message-label {
          color: #c9921a;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .duration {
          color: #94a3b8;
          font-size: 10px;
        }

        .sermon-information h3 {
          margin: 0;
          color: #0a1628;
          font-size: 17px;
          line-height: 1.35;
        }

        .speaker {
          margin: 5px 0 0;
          color: #64748b;
          font-size: 12px;
        }

        .description {
          margin: 8px 0 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.5;
        }

        .scripture {
          margin: 8px 0 0;
          color: #c9921a;
          font-size: 11px;
          font-style: italic;
        }

        .sermon-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .details-button,
        .play-button {
          height: 38px;
          padding: 0 15px;
          border-radius: 5px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.06em;
        }

        .details-button {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #dbe1e8;
          color: #0a1628;
          text-decoration: none;
        }

        .details-button:hover {
          border-color: #0a1628;
        }

        .play-button {
          border: 1px solid #c9921a;
          background: #c9921a;
          color: #ffffff;
          cursor: pointer;
        }

        .play-button.playing {
          background: #0a1628;
          border-color: #0a1628;
        }

        .no-audio {
          color: #dc2626;
          font-size: 8px;
          font-weight: 800;
        }

        .audio-player {
          grid-column: 2 / 4;
          padding-top: 10px;
        }

        .audio-player audio {
          width: 100%;
          height: 42px;
        }

        @media (max-width: 700px) {
          .sermon-card {
            grid-template-columns: 44px 1fr;
            gap: 14px;
            padding: 17px;
          }

          .sermon-information h3 {
            font-size: 15px;
          }

          .sermon-actions {
            grid-column: 1 / -1;
            width: 100%;
          }

          .details-button,
          .play-button {
            flex: 1;
          }

          .audio-player {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </article>
  );
}

function getAudioSource(sermon) {
  if (sermon.audioUrl) {
    return sermon.audioUrl;
  }

  if (sermon.audio) {
    return sermon.audio;
  }

  /*
   * This creates a predictable filename from the sermon slug.
   *
   * Example:
   * slug: "faith-and-believing"
   *
   * becomes:
   * /audio/faith-and-believing.mp3
   */

  if (sermon.slug) {
    return `/audio/${sermon.slug}.mp3`;
  }

  return '';
}

function formatDuration(seconds) {
  const totalSeconds = Number(seconds);

  if (!totalSeconds || totalSeconds <= 0) {
    return '';
  }

  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = Math.floor(totalSeconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}
```
