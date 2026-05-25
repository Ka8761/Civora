import Head from 'next/head';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import newsHero from '../styles/assets/news.jpg';
import SupportButton from '../components/ui/SupportButton';
import ScrollReveal from '../components/ui/ScrollReveal';

const articles = [
  {
    date: 'May 2026',
    tag: 'LAUNCH',
    title:
      'CIVORA FARMS Opens Pre-Launch Registration for 2026 Planting Season',
    body:
      'We are excited to announce that CIVORA FARMS is now officially open for investor registrations for our maiden 2026 season. Our team has secured farmland across Kaduna State for Maize, Groundnut, and Soybean cultivation.\n\nSlots are strictly limited. Priority will be given to registered investors who complete their investment contracts before planting begins.',
  },
  {
    date: 'April 2026',
    tag: 'UPDATE',
    title: 'CAC Registration & NAIC Insurance Policy Confirmed',
    body:
      "CIVORA FARMS LIMITED has completed its corporate registration with the Corporate Affairs Commission of Nigeria (RC Number pending public display). We have also successfully secured a comprehensive crop insurance policy with the Nigerian Agricultural Insurance Corporation (NAIC) for the 2026 season.\n\nThis means every investor's capital is protected against crop failure due to natural causes.",
  },
  {
    date: 'March 2026',
    tag: 'MARKET',
    title: 'Kaduna Commodity Prices Show Strong Q2 2026 Outlook',
    body:
      'Market data from the Kaduna State Agricultural Development Programme shows an 18% increase in maize prices compared to the same period last year. Groundnut oil prices have also firmed up, driven by rising food production demand.\n\nThese trends are positive indicators for our 2026 harvest season and support our projected 20–28% ROI estimates.',
  },
  {
    date: 'February 2026',
    tag: 'TEAM',
    title: 'CIVORA FARMS Completes Farm Site Survey & Prepares for Planting',
    body:
      'Our agricultural team has completed a full soil and land survey of our Kafanchan-area farmland. Results show optimal conditions for our three target crops. Planting infrastructure and equipment are now being positioned.\n\nInvestors who register early will have the option to visit the farm site during planting season.',
  },
];

export default function NewsPage() {
  return (
    <>
      <Head>
        <title>News & Updates — CIVORA FARMS</title>
      </Head>

      <Navbar />

      <div
        style={{
          paddingTop: 72,
          fontFamily: 'Montserrat, sans-serif',
          background: '#ffffff',
          color: '#000',
        }}
      >
     {/* hero  */}
<div
  style={{
    position: 'relative',
    padding: '90px 60px',
    textAlign: 'center',
    overflow: 'hidden',
    backgroundImage: `url(${newsHero.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: 'Montserrat, sans-serif',
  }}
>
  {/* DARK GREEN OVERLAY */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(10,40,20,0.5)',
    }}
  />

  <div
    style={{
      position: 'relative',
      maxWidth: 800,
      margin: '0 auto',
    }}
  >
    <h1
      style={{
        fontSize: 'clamp(32px,5vw,56px)',
        fontWeight: 900,
        color: '#fff',
        lineHeight: 1.1,
        marginBottom: 14,
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      News & <span style={{ color: '#49b34c' }}>Updates</span>
    </h1>

    <p
      style={{
        fontSize: 16,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 1.8,
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      Stay informed with the latest platform news, market insights, and farm progress reports from CIVORA FARMS.
    </p>
  </div>
</div>

        {/* ARTICLES */}
        <div
          style={{
            maxWidth: 850,
            margin: '0 auto',
            padding: '70px 20px',
          }}
        >
          {articles.map((article, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                style={{
                  marginBottom: 50,
                  paddingBottom: 50,
                  borderBottom:
                    i < articles.length - 1
                      ? '1px solid #eaeaea'
                      : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 3,
                      color: '#0a2814',
                      padding: '5px 12px',
                      border: '1px solid #0a2814',
                      borderRadius: 20,
                    }}
                  >
                    {article.tag}
                  </span>

                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: 2,
                      color: '#666',
                    }}
                  >
                    {article.date}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(20px,3vw,28px)',
                    fontWeight: 800,
                    color: '#000',
                    lineHeight: 1.4,
                    marginBottom: 16,
                    textAlign: 'center',
                  }}
                >
                  {article.title}
                </h2>

                {article.body.split('\n\n').map((para, j) => (
                  <p
                    key={j}
                    style={{
                      fontSize: 15,
                      color: 'rgba(0,0,0,0.7)',
                      lineHeight: 1.85,
                      marginBottom: 12,
                      textAlign: 'center',
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          ))}

          {/* VIEW MORE BUTTON (BEFORE SUBSCRIBE) */}
          <div
            style={{
              textAlign: 'center',
              marginTop: 10,
              marginBottom: 50,
            }}
          >
            <button
              style={{
                padding: '14px 34px',
                borderRadius: 10,
                border: '2px solid #0a2814',
                background: '#0a2814',
                color: '#fff',
                fontWeight: 800,
                letterSpacing: 2,
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              VIEW MORE →
            </button>
          </div>

          {/* SUBSCRIBE SECTION */}
          <ScrollReveal>
            <div
              style={{
                backgroundImage: "url('/assets/news.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 18,
                padding: '50px 25px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* DARK GREEN OVERLAY */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(10,40,20,0.88)',
                }}
              />

              <div style={{ position: 'relative' }}>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    marginBottom: 10,
                    color: '#fff',
                  }}
                >
                  Subscribe for Farm Updates
                </h3>

                <p
                  style={{
                    fontSize: 14,
                    marginBottom: 18,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  Get latest news, planting updates, and investment alerts directly in your inbox.
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 10,
                    flexWrap: 'wrap',
                  }}
                >
                  <input
                    placeholder="Enter your email"
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: 'none',
                      outline: 'none',
                      width: 240,
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  />

                  <button
                    style={{
                      padding: '12px 18px',
                      borderRadius: 10,
                      border: '2px solid #fff',
                      background: '#0a2814',
                      color: '#fff',
                      fontWeight: 800,
                      cursor: 'pointer',
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Footer />
      <SupportButton />
    </>
  );
}