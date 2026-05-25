import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SupportButton from '../components/ui/SupportButton';
import ScrollReveal from '../components/ui/ScrollReveal';
import Trust from '../components/home/Trust';

export default function AboutPage() {
  return (
    <>
      <title>About Us — CIVORA FARMS</title>
      <Navbar />
      <div style={{ paddingTop: 72 }}>
        {/* Hero */}
        <div style={{ background: 'var(--navy)', padding: '80px 60px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="hero-bg-glow" style={{ opacity: 0.6 }} />
          <div className="hero-dots" />
          <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 5, color: 'rgba(201,146,26,0.7)', marginBottom: 16 }}>OUR STORY</div>
            <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Growing</em> Wealth From the Ground Up
            </h1>
            <p style={{ fontFamily: "'Barlow'", fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, maxWidth: 620, margin: '0 auto' }}>
              CIVORA FARMS was founded with a single mission: to make the wealth of Nigerian agriculture accessible to every Nigerian, regardless of how much land they own or how much money they have.
            </p>
          </div>
        </div>

        {/* Mission */}
        <section className="section about">
          <div className="section-inner">
            <div className="about-grid">
              <ScrollReveal>
                <div className="about-text">
                  <div className="sec-tag">Our Mission</div>
                  <h2 className="sec-title">Democratizing <em>Agricultural Wealth</em></h2>
                  <p>For generations, the wealth created by Nigerian farmland has been concentrated in the hands of those who already own land. CIVORA FARMS changes that.</p>
                  <p>We believe that a civil servant in Kaduna, a student in Lagos, or a trader in Kano should be able to invest in real, productive farmland and earn real returns — just like large landowners and agribusiness corporations have always done.</p>
                  <p>Our technology platform makes this possible by pooling investor capital into managed farm units, handled end-to-end by our professional agricultural team.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div>
                  <div className="sec-tag" style={{ marginBottom: 16 }}>Our Values</div>
                  {[
                    { icon: '🌱', title: 'Transparency First', desc: 'Every naira is tracked. Every investor has a legal contract. Independent audits before every payout.' },
                    { icon: '🤝', title: 'Community Impact', desc: 'We employ local Kaduna farmers, support rural agriculture, and contribute to Nigeria\'s food security.' },
                    { icon: '🏆', title: 'Excellence in Agriculture', desc: 'Our farm management team brings decades of experience in Kaduna State crop production.' },
                    { icon: '🔒', title: 'Investor Protection', desc: 'Escrow-held capital. NAIC crop insurance. Legal agreements. Multiple layers of protection.' },
                  ].map((v, i) => (
                    <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--cream)', border: '1px solid rgba(26,58,31,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{v.icon}</div>
                      <div>
                        <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 14, fontWeight: 800, letterSpacing: 1, color: 'var(--navy)', marginBottom: 4 }}>{v.title}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.6 }}>{v.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Trust />

        {/* CTA */}
        <section style={{ background: 'var(--navy)', padding: '80px 60px', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 5, color: 'rgba(201,146,26,0.7)', marginBottom: 16 }}>READY TO START?</div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
              Join the CIVORA <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Farm Family</em>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 36 }}>
              Start investing from ₦50,000. Create your account and pick your first farm today.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/invest" style={{ fontFamily: "'Barlow Condensed'", fontSize: 14, fontWeight: 800, letterSpacing: 3, color: 'var(--navy)', background: 'var(--gold)', padding: '16px 40px', borderRadius: 4, textDecoration: 'none' }}>
                INVEST NOW →
              </Link>
              <Link href="/auth/signup" style={{ fontFamily: "'Barlow Condensed'", fontSize: 14, fontWeight: 800, letterSpacing: 3, color: 'var(--gold)', background: 'transparent', border: '2px solid rgba(201,146,26,0.4)', padding: '16px 40px', borderRadius: 4, textDecoration: 'none' }}>
                CREATE ACCOUNT
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <SupportButton />
    </>
  );}

