// TIERS.tsx

import Link from 'next/link';
import ScrollReveal from '../ui/ScrollReveal';

const tiers = [
  {
    name: 'Seedling',
    min: '₦50K',
    popular: false,
    features: [
      'Access to 1 farm',
      'Monthly updates',
      'Legal contract',
      'Bank transfer payout',
    ],
  },
  {
    name: 'Harvest',
    min: '₦250K',
    popular: true,
    features: [
      'Access to 3 farms',
      'Priority payout',
      'Dedicated manager',
      'Farm visit eligibility',
    ],
  },
  {
    name: 'Landowner',
    min: '₦1M+',
    popular: false,
    features: [
      'Unlimited farm access',
      'Weekly reports',
      'Founder access',
      'Premium onboarding',
    ],
  },
];

export default function Tiers() {
  return (
    <section
      className="section tiers"
      style={{
        background: '#0b0b0b',
        padding: '100px 20px',
        fontFamily: 'Montserrat, sans-serif',
        textAlign: 'center',
      }}
    >
      <div
        className="section-inner"
        style={{
          maxWidth: 1250,
          margin: '0 auto',
        }}
      >
        {/* HEADER */}
        <ScrollReveal>
          <div
            className="sec-tag"
            style={{
              color: '#49b34c',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            Investment Tiers
          </div>

          <h2
            className="sec-title"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: 18,
              lineHeight: 1.1,
              textAlign: 'center',
            }}
          >
            Choose Your <span style={{ color: '#49b34c' }}>Level</span>
          </h2>

          <p
            className="sec-sub"
            style={{
              maxWidth: 700,
              margin: '0 auto 70px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 16,
              lineHeight: 1.8,
              textAlign: 'center',
            }}
          >
            Flexible investment levels for every investor.
          </p>
        </ScrollReveal>

        {/* GRID */}
        <div
          className="tiers-grid"
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 28,
            justifyItems: 'center',
          }}
        >
          {tiers.map((tier, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                className={`tier-card ${
                  tier.popular ? 'popular' : ''
                }`}
                style={{
                  background: '#121212',
                  borderRadius: 26,
                  padding: '35px 28px',
                  width: '100%',
                  maxWidth: 320,
                  textAlign: 'center',
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {/* POPULAR BADGE */}
                {tier.popular && (
                  <div
                    className="popular-badge"
                    style={{
                      position: 'absolute',
                      top: 15,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#49b34c',
                      color: '#000',
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '6px 12px',
                      borderRadius: 999,
                      letterSpacing: 1,
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}

                <div
                  className="tier-name"
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#fff',
                    marginTop: tier.popular ? 20 : 0,
                    marginBottom: 10,
                  }}
                >
                  {tier.name}
                </div>

                <div
                  className="tier-min"
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: '#49b34c',
                    marginBottom: 10,
                  }}
                >
                  {tier.min}{' '}
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    minimum
                  </span>
                </div>

                <div
                  className="tier-roi"
                  style={{
                    marginBottom: 18,
                    fontSize: 14,
                    color: '#fff',
                  }}
                >
                  <span style={{ opacity: 0.7 }}>
                    Projected ROI
                  </span>{' '}
                  <span
                    style={{
                      color: '#49b34c',
                      fontWeight: 700,
                    }}
                  >
                    20–28%
                  </span>
                </div>

                <ul
                  className="tier-features"
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 25px',
                  }}
                >
                  {tier.features.map((f, j) => (
                    <li
                      key={j}
                      style={{
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: 14,
                        marginBottom: 10,
                      }}
                    >
                      • {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/invest"
                  className="tier-btn"
                  style={{
                    display: 'inline-block',
                    padding: '12px 18px',
                    background: '#49b34c',
                    color: '#000',
                    fontWeight: 800,
                    textDecoration: 'none',
                    borderRadius: 10,
                    letterSpacing: 1,
                  }}
                >
                  INVEST NOW →
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}