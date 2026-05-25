'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from '../ui/ScrollReveal';

import groundnut from '../../styles/assets/Groundnut.jpg';
import maizee from '../../styles/assets/maize.jpg';
import soybean from '../../styles/assets/Soybean.jpg';

export default function About() {
  const [expanded, setExpanded] = useState(false);

  const crops = [
    {
      name: 'MAIZE',
      image: maizee,
      desc: 'High-demand staple crop with strong market value and stable seasonal returns.',
      roi: '20–28%',
    },
    {
      name: 'GROUNDNUT',
      image: groundnut,
      desc: 'Premium oil crop with profitable export and processing opportunities.',
      roi: '20–26%',
    },
    {
      name: 'SOYBEAN',
      image: soybean,
      desc: 'High-protein commodity with increasing industrial and food demand.',
      roi: '22–28%',
    },
  ];

  return (
    <section
      className="section about"
      style={{
        padding: '100px 0',
      }}
    >
      <div
        className="section-inner"
        style={{
          width: 'min(1200px, 92%)',
          margin: 'auto',
        }}
      >
        <ScrollReveal>
          <div
            className="sec-tag"
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: '#5c8c3e',
              marginBottom: 12,
              fontFamily: 'Montserrat, sans-serif',
              textAlign: 'center',
            }}
          >
            About Civora Farms
          </div>

          <h2
            className="sec-title"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 50,
              textAlign: 'center',
              fontFamily: 'Montserrat, sans-serif',
              width: '100%',
            }}
          >
            <span style={{ display: 'block' }}>What We Are —</span>
            <span style={{ display: 'block', color: '#5c8c3e' }}>
              And What We&apos;re Building
            </span>
          </h2>
        </ScrollReveal>

        <div
          className="about-grid"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 50,
            textAlign: 'center',
          }}
        >
          {/* ABOUT TEXT */}
          <ScrollReveal delay={0.1}>
            <div
              className="about-text"
              style={{
                maxWidth: 850,
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.9,
                  color: '#ffffff',
                  marginBottom: 18,
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                <strong>CIVORA FARMS</strong> is an agricultural investment platform based in Kaduna State, Nigeria.
                We connect investors, from first-timers to experienced   {!expanded && (
                <span
                  className="ellipsis"
                  style={{
                    fontSize: 30,
                    color: '#ffffff',
                    marginBottom: 15,
                  }}
                >
                  ...
                </span>
              )}
               {expanded && (
                
                  <span
                    style={{
                      fontSize: 16,
                      lineHeight: 1.9,
                      color: '#ffffff',
                      marginBottom: 18,
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    portfolio builders directly to productive farmland, managed by experienced local farmers.
                    Our model is simple: you buy a percentage stake in one of our farm units. We plant, manage,
                    and harvest the crops. <br/>No farming experience needed. No land to buy.
                    No logistics to manage. Just invest, track your crops monthly, and earn at harvest.</span>
                  
               )}</p>
                  
          
              <button
                className="view-more-btn"
                onClick={() => setExpanded(!expanded)}
                style={{
                  padding: '12px 22px',
                  border: 'none',
                  background: '#5c8c3e',
                  color: 'white',
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  marginTop: 10,
                }}
              >
                {expanded ? 'View Less' : 'View More'}
              </button>
            </div>
          </ScrollReveal>

          {/* CROPS SECTION */}
          <ScrollReveal delay={0.2}>
            <div>

              <div
                className="crops-grid"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 22,
                  flexWrap: 'wrap',
                  marginTop: 30,
                }}
              >
                {crops.map((crop, i) => (
                  <div
                    className="crop-card"
                    key={i}
                    style={{
                      position: 'relative',
                      width: 320,
                      height: 240,
                      overflow: 'hidden',
                      borderRadius: 22,
                    }}
                  >
                    <Image
                      src={crop.image}
                      alt={crop.name}
                      fill
                      priority
                      style={{
                        objectFit: 'cover',
                      }}
                    />

                    {/* DARK OVERLAY */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.6)',
                        zIndex: 1,
                      }}
                    />

                    {/* TEXT OVERLAY */}
                    <div
                      className="crop-overlay"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: 24,
                        color: '#fff',
                        textAlign: 'left',
                        fontFamily: 'Montserrat, sans-serif',
                      }}
                    >
                      <div
                        className="crop-name"
                        style={{
                          fontSize: 24,
                          fontWeight: 800,
                          marginBottom: 8,
                          color: '#fff',
                        }}
                      >
                        {crop.name}
                      </div>

                      <div
                        className="crop-desc"
                        style={{
                          fontSize: 14,
                          lineHeight: 1.6,
                          marginBottom: 14,
                          maxWidth: '90%',
                          color: '#fff',
                        }}
                      >
                        {crop.desc}
                      </div>

                      <div
                        className="crop-roi"
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: '#fff',
                        }}
                      >
                        {crop.roi}{' '}
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            opacity: 0.9,
                            color: '#fff',
                          }}
                        >
                          est. ROI
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}