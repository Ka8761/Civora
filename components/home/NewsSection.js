import Link from 'next/link';
import ScrollReveal from '../ui/ScrollReveal';

const news = [
  {
    date: 'May 2026',
    tag: 'LAUNCH',
    title:
      'CIVORA FARMS Opens Pre-Launch Registration for 2026 Planting Season',
    excerpt:
      'We are now accepting investor expressions of interest for our maiden season. Limited slots available for Maize, Groundnut, and Soybean farms across Kaduna State.',
  },
  {
    date: 'April 2026',
    tag: 'UPDATE',
    title:
      'CAC Registration Confirmed & NAIC Insurance Policy Activated',
    excerpt:
      'CIVORA FARMS LIMITED has completed its corporate registration and secured crop insurance coverage for the 2026 season with the Nigerian Agricultural Insurance Corporation.',
  },
  {
    date: 'March 2026',
    tag: 'MARKET',
    title:
      'Kaduna State Maize Prices Rise 18% — Good News for 2026 Investors',
    excerpt:
      'Market data shows strong commodity prices for our primary crops. Analysts project continued demand growth through Q3 2026, boosting expected harvest returns.',
  },
];

export default function NewsSection() {
  return (
    <section
      className="section"
      style={{
        background: '#ffffff',
        padding: '100px 20px',
        fontFamily: 'Montserrat, sans-serif',
        color: '#000',
      }}
    >
      <div
        className="section-inner"
        style={{
          maxWidth: 1250,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          <div
            className="sec-tag"
            style={{
              color: '#49b34c',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Latest Updates
          </div>

          <h2
            className="sec-title"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#000',
              marginBottom: 14,
              lineHeight: 1.1,
            }}
          >
            News &{' '}
            <span style={{ color: '#49b34c' }}>
              Farm Updates
            </span>
          </h2>

          <p
            className="sec-sub"
            style={{
              maxWidth: 750,
              margin: '0 auto 60px',
              fontSize: 16,
              lineHeight: 1.8,
              color: 'rgba(0,0,0,0.65)',
            }}
          >
            Stay up to date with platform news, market insights, and farm progress reports.
          </p>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            justifyItems: 'center',
          }}
        >
          {news.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                style={{
                  background: '#f7f7f7',
                  borderRadius: 22,
                  overflow: 'hidden',
                  maxWidth: 360,
                  width: '100%',
                  textAlign: 'center',
                  border: '1px solid #eaeaea',
                  transition: '0.3s ease',
                }}
              >
                <div
                  style={{
                    background: '#ffffff',
                    padding: '18px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #eaeaea',
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 2,
                      color: '#49b34c',
                    }}
                  >
                    {item.tag}
                  </span>

                  <span
                    style={{
                      fontSize: 11,
                      color: 'rgba(0,0,0,0.5)',
                      letterSpacing: 1,
                    }}
                  >
                    {item.date}
                  </span>
                </div>

                <div style={{ padding: 24 }}>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: '#000',
                      marginBottom: 14,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 14,
                      color: 'rgba(0,0,0,0.65)',
                      lineHeight: 1.7,
                      marginBottom: 18,
                    }}
                  >
                    {item.excerpt}
                  </p>

                  <Link
                    href="/news"
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: 2,
                      color: '#49b34c',
                      textDecoration: 'none',
                    }}
                  >
                    READ MORE →
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Link
            href="/news"
            style={{
              display: 'inline-block',
              padding: '14px 38px',
              borderRadius: 10,
              border: '2px solid #49b34c',
              color: '#49b34c',
              fontWeight: 800,
              letterSpacing: 2,
              fontSize: 13,
              textDecoration: 'none',
            }}
          >
            VIEW ALL NEWS →
          </Link>
        </div>
      </div>
    </section>
  );
}