import Link from 'next/link';
import ScrollReveal from '../ui/ScrollReveal';

const news = [
  { date: 'May 2026', tag: 'LAUNCH', title: 'CIVORA FARMS Opens Pre-Launch Registration for 2026 Planting Season', excerpt: 'We are now accepting investor expressions of interest for our maiden season. Limited slots available for Maize, Groundnut, and Soybean farms across Kaduna State.' },
  { date: 'April 2026', tag: 'UPDATE', title: 'CAC Registration Confirmed & NAIC Insurance Policy Activated', excerpt: 'CIVORA FARMS LIMITED has completed its corporate registration and secured crop insurance coverage for the 2026 season with the Nigerian Agricultural Insurance Corporation.' },
  { date: 'March 2026', tag: 'MARKET', title: 'Kaduna State Maize Prices Rise 18% — Good News for 2026 Investors', excerpt: 'Market data shows strong commodity prices for our primary crops. Analysts project continued demand growth through Q3 2026, boosting expected harvest returns.' },
];

export default function NewsSection() {
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="section-inner">
        <ScrollReveal>
          <div className="sec-tag">Latest Updates</div>
          <h2 className="sec-title">News & <em>Farm Updates</em></h2>
          <p className="sec-sub">Stay up to date with platform news, market insights, and farm progress reports.</p>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {news.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div style={{ background: 'var(--cream)', border: '1px solid #e8e8e8', borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(201,146,26,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ background: 'var(--navy)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, fontWeight: 700, letterSpacing: 3, color: 'var(--gold)', padding: '4px 10px', border: '1px solid rgba(201,146,26,0.3)', borderRadius: 20 }}>{item.tag}</span>
                  <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 2 }}>{item.date}</span>
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.4, marginBottom: 12 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.65, marginBottom: 16 }}>{item.excerpt}</p>
                  <Link href="/news" style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--gold)', textDecoration: 'none' }}>READ MORE →</Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/news" style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, letterSpacing: 3, color: 'var(--navy)', background: 'transparent', border: '2px solid var(--navy)', padding: '14px 40px', borderRadius: 4, textDecoration: 'none' }}>
            VIEW ALL NEWS →
          </Link>
        </div>
      </div>
    </section>
  );
}

