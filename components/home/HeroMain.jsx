import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import news from '../../styles/assets/news.jpg';

export default function HeroMain() {
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    setVideoOpen(true);
    setTimeout(() => {
      if (videoRef.current) videoRef.current.play();
    }, 50);
  };

  const handleClose = () => {
    setVideoOpen(false);
    if (videoRef.current) videoRef.current.pause();
  };

  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 90px;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.05);
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.35) 0%,
            rgba(0,0,0,0.25) 40%,
            rgba(0,0,0,0.65) 100%
          );
          z-index: 1;
        }

        /* TOP AREA */
        .hero-top {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 32px 40px 0;
        }

        .hero-top-text {
          position: absolute;
          top: 32px;
          left: 40px;
          max-width: 420px;
        }

        .hero-top-text p {
          font-family: 'Barlow', sans-serif;
          font-size: clamp(13px, 1.5vw, 15px);
          color: rgba(255,255,255,0.85);
          line-height: 1.7;
          margin: 0;
        }

        /* VIDEO */
        .video-thumb {
          width: 160px;
          height: 160px;
          border: 2px solid rgba(255,255,255,0.55);
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          background: rgba(0,0,0,0.4);
          margin-left: auto;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .video-thumb:hover {
          transform: scale(1.03);
          border-color: #fff;
        }

        .video-thumb video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }

        .play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: rgba(0,0,0,0.32);
        }

        .play-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .play-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #fff;
          text-transform: uppercase;
        }

        /* BOTTOM */
        .hero-bottom {
          position: relative;
          z-index: 2;
          padding: 0 48px 56px;
        }

        .hero-title-top {
          font-family: 'Playfair Display', serif;
          font-size: clamp(34px, 4.5vw, 60px);
          font-weight: 900;
          color: #fff;
          margin: 0;
          line-height: 1.05;
        }

        .hero-earn {
          font-family: 'Playfair Display', serif;
          font-size: clamp(16px, 2vw, 22px);
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          white-space: nowrap;
        }

        .hero-divider-row {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .hero-white-line {
          height: 2.5px;
          background: #fff;
          border: none;
        }

        .btn-invest {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 10px 26px;
          background: #fff;
          color: #000;
          border-radius: 4px;
          text-decoration: none;
          transition: 0.2s;
        }

        .btn-invest:hover {
          background: #2e7d32;
          color: #fff;
        }

        /* LIGHTBOX */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.88);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .lightbox-inner {
          width: min(880px, 92vw);
          aspect-ratio: 16/9;
          position: relative;
        }

        .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          color: #fff;
          font-size: 28px;
          background: none;
          border: none;
          cursor: pointer;
        }

        /* MOBILE */
        @media (max-width: 640px) {
          .hero-top {
            padding: 20px;
          }

          .hero-top-text {
            top: 20px;
            left: 20px;
            max-width: 70%;
          }

          .video-thumb {
            width: 100px;
            height: 100px;
          }

          .hero-bottom {
            padding: 0 20px 40px;
          }

          .hero-title-top {
            font-size: 32px;
          }
        }
      `}</style>

      <section className="hero-section">
        {/* BACKGROUND */}
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${news.src})` }}
        />
        <div className="hero-overlay" />

        {/* TOP */}
        <div className="hero-top">
          <div className="hero-top-text">
            <p>
              Invest in professionally managed farmland and earn returns from real
              agricultural production. CIVORA FARMS makes agricultural investing
              simple, transparent, and accessible to everyone.
            </p>
          </div>

          <div className="video-thumb" onClick={handleVideoClick}>
            <video
              src="../../public/videos/maizefarm.mp4"
              muted
              loop
              playsInline
            />
            <div className="play-overlay">
              <div className="play-icon">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                  <path
                    d="M1 1L13 8L1 15V1Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="play-label">Watch</span>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* BOTTOM */}
        <div className="hero-bottom">
          <h1 className="hero-title-top">
            Invest in <br />
            <span id="hero-subtitle">Real Farms.</span>
          </h1>

          <div className="hero-divider-row">
            <TitleWidthLine targetId="hero-subtitle" />
            <span className="hero-earn">Earn Real Returns.</span>
            <Link href="/invest" className="btn-invest">
              Invest Now →
            </Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {videoOpen && (
        <div className="lightbox" onClick={handleClose}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={handleClose}>
              ✕
            </button>
            <video
              ref={videoRef}
              src="../../public/videos/maizefarm.mp4"
              controls
              autoPlay
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      )}
    </>
  );
}

/* LINE MATCHES ONLY "REAL FARMS" */
function TitleWidthLine({ targetId }) {
  const [width, setWidth] = useState(200);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const update = () => {
      setWidth(el.getBoundingClientRect().width);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, [targetId]);

  return (
    <hr
      className="hero-white-line"
      style={{ width: `${width}px` }}
    />
  );
}