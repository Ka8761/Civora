import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const backgroundImages = [
  '/images/bg-one.jpg',
  '/images/bg-four.jpg',
  '/images/bg-nine.jpg',
  '/images/bg-six.jpg',
  '/images/bg-eight.jpg',
  '/images/bg-ten.jpg',
];

export default function HeroMain() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previous) => {
        return (previous + 1) % backgroundImages.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleVideoClick = () => {
    setVideoOpen(true);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 50);
  };

  const handleClose = () => {
    setVideoOpen(false);

    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <>
      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 90px;
          background: var(--blue-dark);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          animation: heroBackgroundFade 5s ease-in-out infinite;
        }

        /*
          bg-one and bg-nine need more of the upper
          part of the original image to remain visible.
        */
        .person-bg {
          background-position: center 15%;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(6, 26, 44, 0.45) 0%,
            rgba(10, 42, 67, 0.38) 40%,
            rgba(6, 26, 44, 0.82) 100%
          );
          z-index: 1;
        }

        @keyframes heroBackgroundFade {
          0% {
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          80% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }

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
          max-width: 500px;
        }

        .hero-top-text .programme {
          font-family: "Barlow Condensed", sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-bottom: 12px;
        }

        .hero-top-text p {
          font-family: "Barlow", sans-serif;
          font-size: clamp(13px, 1.5vw, 16px);
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
          margin: 0;
        }

        .video-thumb {
          width: 160px;
          height: 160px;
          border: 2px solid rgba(232, 184, 75, 0.7);
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          background: rgba(6, 26, 44, 0.6);
          margin-left: auto;
          transition:
            transform 0.25s ease,
            border-color 0.25s ease;
        }

        .video-thumb:hover {
          transform: scale(1.03);
          border-color: var(--gold-bright);
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
          background: rgba(6, 26, 44, 0.4);
        }

        .play-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--gold-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .play-icon svg path {
          fill: var(--gold-light);
          stroke: var(--gold-light);
        }

        .play-label {
          font-family: "Barlow Condensed", sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #fff;
          text-transform: uppercase;
        }

        .hero-bottom {
          position: relative;
          z-index: 2;
          padding: 0 48px 56px;
        }

        .hero-title-top {
          font-family: "Playfair Display", serif;
          font-size: clamp(34px, 4.5vw, 60px);
          font-weight: 900;
          color: #fff;
          margin: 0;
          line-height: 1.05;
        }

        .hero-title-top span {
          color: var(--gold-light);
        }

        .hero-earn {
          font-family: "Playfair Display", serif;
          font-size: clamp(16px, 2vw, 22px);
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          white-space: nowrap;
        }

        .hero-divider-row {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .hero-white-line {
          height: 2.5px;
          background: var(--gold);
          border: none;
          margin: 0;
        }

        .btn-invest {
          font-family: "Barlow Condensed", sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 10px 26px;
          background: var(--gold);
          color: var(--blue-dark);
          border-radius: 4px;
          text-decoration: none;
          transition:
            background 0.2s ease,
            color 0.2s ease;
        }

        .btn-invest:hover {
          background: var(--gold-light);
          color: var(--blue-dark);
        }

        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(6, 26, 44, 0.94);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .lightbox-inner {
          width: min(880px, 92vw);
          aspect-ratio: 16 / 9;
          position: relative;
        }

        .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          color: var(--gold-light);
          font-size: 28px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .lightbox-close:hover {
          color: var(--gold-bright);
        }

        @media (max-width: 640px) {
          .hero-top {
            padding: 20px;
          }

          .hero-top-text {
            top: 20px;
            left: 20px;
            max-width: 70%;
          }

          .hero-top-text .programme {
            font-size: 11px;
            letter-spacing: 2px;
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

          .hero-earn {
            font-size: 17px;
            white-space: normal;
          }

          .hero-divider-row {
            gap: 12px;
          }

          .btn-invest {
            padding: 10px 20px;
          }

          .person-bg {
            background-position: center 10%;
          }
        }
      `}</style>

      <section className="hero-section">
        <div
          key={currentImage}
          className={`hero-bg ${
            currentImage === 0 || currentImage === 2 ? 'person-bg' : ''
          }`}
          style={{
            backgroundImage: `url(${backgroundImages[currentImage]})`,
          }}
        />

        <div className="hero-overlay" />

        <div className="hero-top">
          <div className="hero-top-text">
            <div className="programme">
              Leadership Foundation School Programme
            </div>

            <p>
              We aren't just a church family. We are a military bootcamp where
              Kingdom generals are forged and raised.
            </p>
          </div>

          <div className="video-thumb" onClick={handleVideoClick}>
            <video
              src="/videos/MinMoyongVid.mp4"
              loop
              playsInline
            />

            <div className="play-overlay">
              <div className="play-icon">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 14 16"
                  fill="none"
                >
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

        <div className="hero-bottom">
          <h1 className="hero-title-top">
            Become a
            <br />
            <span id="hero-subtitle">COLIG Member</span>
          </h1>

          <div className="hero-divider-row">
            <TitleWidthLine targetId="hero-subtitle" />

            <span className="hero-earn">
              Transformed by the Spirit and discipled by the Word
            </span>

            <Link href="/auth/signup" className="btn-invest">
              Join COLIG
            </Link>
          </div>
        </div>
      </section>

      {videoOpen && (
        <div className="lightbox" onClick={handleClose}>
          <div
            className="lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={handleClose}
              aria-label="Close video"
            >
              &times;
            </button>

            <video
              ref={videoRef}
              src="/videos/MinMoyongVid.mp4"
              controls
              autoPlay
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

function TitleWidthLine({ targetId }) {
  const [width, setWidth] = useState(200);

  useEffect(() => {
    const el = document.getElementById(targetId);

    if (!el) {
      return;
    }

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
      style={{
        width: `${width}px`,
      }}
    />
  );
}