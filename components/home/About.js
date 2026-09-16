
'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from '../ui/ScrollReveal';

export default function About() {
  const [expanded, setExpanded] = useState(false);

  const images = [
    '/images/ten.jpeg',
    '/images/eleven.jpeg',
    '/images/twelve.jpeg',
    '/images/four.jpeg',
  ];

  return (
    <section
      className="section about"
      style={{
        background: '#000000',
        padding: '100px 0',
        overflow: 'hidden',
      }}
    >
      <div
        className="section-inner"
        style={{
          width: 'min(1200px, 92%)',
          margin: 'auto',
        }}
      >
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            alignItems: 'center',
            gap: 70,
          }}
        >
          {/* =========================
              LEFT: PROGRAMME CONTENT
          ========================== */}
          <ScrollReveal>
            <div
              className="about-content"
              style={{
                maxWidth: 680,
              }}
            >
              {/* TAG */}
              <div
                style={{
                  display: 'inline-block',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: '#D4AF37',
                  marginBottom: 18,
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                About the Programme
              </div>

              {/* TITLE */}
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
                  fontWeight: 800,
                  lineHeight: 1.08,
                  margin: '0 0 32px',
                  color: '#ffffff',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                The Rise of{' '}
                <span style={{ color: '#D4AF37' }}>
                  Kingdom Leaders
                </span>{' '}
                and Functionaries
              </h2>

              {/* BLUE LINE */}
              <div
                style={{
                  width: 70,
                  height: 4,
                  background: '#1769AA',
                  marginBottom: 30,
                  borderRadius: 10,
                }}
              />

              {/* CONTENT */}
              <div
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#E8E8E8',
                  fontSize: 16,
                  lineHeight: 1.9,
                }}
              >
                {!expanded ? (
                  <>
                    <p style={{ marginBottom: 20 }}>
                      The leadership training is a transformative foundational
                      programme designed to equip believers with the fundamental
                      doctrines of the Christian faith and Leadership. In Matthew
                      7:24, Jesus illustrates the vital importance of building on a
                      solid rock, and we take that mandate seriously...
                    </p>

                    <button
                      onClick={() => setExpanded(true)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #D4AF37',
                        color: '#D4AF37',
                        padding: '11px 22px',
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 700,
                        fontFamily: 'Montserrat, sans-serif',
                        cursor: 'pointer',
                        letterSpacing: 0.5,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Read More
                    </button>
                  </>
                ) : (
                  <>
                    <p style={{ marginBottom: 20 }}>
                      The leadership training is a transformative foundational
                      programme designed to equip believers with the fundamental
                      doctrines of the Christian faith and Leadership. In Matthew
                      7:24, Jesus illustrates the vital importance of building on a
                      solid rock, and we take that mandate seriously.
                    </p>

                    <p style={{ marginBottom: 20 }}>
                      This programme is a journey specifically designed to prepare,
                      equip, and establish you as a worker in God&apos;s vineyard.
                      You will progress through{' '}
                      <strong style={{ color: '#D4AF37' }}>
                        6 courses
                      </strong>{' '}
                      at your own pace via our dedicated e-portal, taking you from
                      basic doctrines all the way to leadership and ministerial
                      service.
                    </p>

                    <p style={{ marginBottom: 20 }}>
                      If you successfully finish the foundational course you should
                      be equipped enough to be a teacher at a basic level.
                    </p>

                    <p style={{ marginBottom: 20 }}>
                      We firmly believe that intellectual knowledge must be
                      converted to revelation in the heart through prayer. As
                      scripture says in 2 Corinthians 3:6,{' '}
                      <em style={{ color: '#D4AF37' }}>
                        &ldquo;...for the letter kills, but the Spirit gives
                        life.&rdquo;
                      </em>{' '}
                      Because of this, the leadership training is not a regular
                      classroom setup. It is a spiritual quarry site.
                    </p>

                    <p style={{ marginBottom: 20 }}>
                      During your training, you will be expected to meet strict
                      prayer targets and listen to assigned sermons from our Lead
                      Steward Min Miracle Moyong. Every process is put in place to
                      guarantee that you will not leave the same way you started.
                    </p>

                    <button
                      onClick={() => setExpanded(false)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #D4AF37',
                        color: '#D4AF37',
                        padding: '11px 22px',
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 700,
                        fontFamily: 'Montserrat, sans-serif',
                        cursor: 'pointer',
                        letterSpacing: 0.5,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Read Less
                    </button>
                  </>
                )}
              </div>

              {/* PROGRAMME HIGHLIGHTS */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginTop: 32,
                }}
              >
              
              </div>
            </div>
          </ScrollReveal>

          {/* =========================
              RIGHT: ANIMATED IMAGES
          ========================== */}
          <ScrollReveal delay={0.2}>
            <div
              className="about-image-area"
              style={{
                position: 'relative',
                width: '100%',
                height: 600,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* GOLD DECORATIVE CIRCLE */}
              <div
                style={{
                  position: 'absolute',
                  width: 420,
                  height: 420,
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '50%',
                }}
              />

              {/* BLUE DECORATIVE CIRCLE */}
              <div
                style={{
                  position: 'absolute',
                  width: 330,
                  height: 330,
                  border: '1px solid rgba(23, 105, 170, 0.3)',
                  borderRadius: '50%',
                }}
              />

              {/* IMAGE STACK */}
              <div
                className="about-image-stack"
                style={{
                  position: 'relative',
                  width: 340,
                  height: 540,
                }}
              >
                {images.map((image, index) => (
                  <div
                    key={image}
                    className="about-image-card"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      width: 300,
                      height: 500,
                      borderRadius: 18,
                      overflow: 'hidden',

                      /* GOLD FRAME REMOVED */
                      border: 'none',

                      /* Keeps the image clean while still giving it depth */
                      boxShadow: '0 20px 60px rgba(0,0,0,0.55)',

                      transform: 'translateX(-50%)',
                      animation: 'aboutImageAnimation 16s infinite',
                      animationDelay: `${index * 4}s`,
                      opacity: 0,
                      zIndex: index + 1,
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Leadership programme ${index + 1}`}
                      fill
                      sizes="300px"
                      style={{
                        objectFit: 'cover',
                      }}
                    />

                    {/* IMAGE OVERLAY */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.5), transparent 50%)',
                      }}
                    />

                    {/* IMAGE NUMBER */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 18,
                        left: 18,
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        background: '#D4AF37',
                        color: '#000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 800,
                        fontFamily: 'Montserrat, sans-serif',
                      }}
                    >
                      0{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* =========================
          ANIMATION + RESPONSIVE CSS
      ========================== */}
      <style jsx>{`
        @keyframes aboutImageAnimation {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.94);
          }

          5% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }

          22% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }

          27% {
            opacity: 0;
            transform: translateX(-50%) scale(0.96);
          }

          100% {
            opacity: 0;
            transform: translateX(-50%) scale(0.94);
          }
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }

          .about-content {
            max-width: 100% !important;
            text-align: left;
          }

          .about-image-area {
            height: 560px !important;
          }

          .about-image-stack {
            width: 340px !important;
            height: 520px !important;
          }

          .about-image-card {
            width: 300px !important;
            height: 500px !important;
          }
        }

        @media (max-width: 600px) {
          .about-image-area {
            height: 500px !important;
          }

          .about-image-stack {
            width: 290px !important;
            height: 450px !important;
          }

          .about-image-card {
            width: 255px !important;
            height: 420px !important;
          }

          .about-image-area > div:first-child {
            width: 320px !important;
            height: 320px !important;
          }

          .about-image-area > div:nth-child(2) {
            width: 250px !important;
            height: 250px !important;
          }
        }
      `}</style>
    </section>
  );
}

