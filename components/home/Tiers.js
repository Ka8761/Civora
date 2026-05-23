import Link from 'next/link';
import ScrollReveal from '../ui/ScrollReveal';

const tiers = [
  {
    name: 'Seedling', min: '₦50K', popular: false,
    features: ['Access to 1 farm per season', 'Monthly farm updates', 'Legal investor contract', 'Bank transfer payout', 'Email & WhatsApp support'],
  },
  {
    name: 'Harvest', min: '₦250K', popular: true,
    features: ['Access to up to 3 farms', 'Monthly farm video updates', 'Priority payout processing', 'Dedicated account manager', 'Farm visit eligibility', 'First access to new launches'],
  },
  {
    name: 'Landowner', min: '₦1M+', popular: false,
    features: ['Unlimited farm access', 'Weekly live farm reports', 'White-glove onboarding', 'Co-branding opportunities', 'Direct founder access', 'CAC-backed legal contract'],
  },
];

export default function Tiers() {
  return (
    <section className="section tiers">
      <div className="section-inner">
        <ScrollReveal>
          <div className="sec-tag">Investment Tiers</div>
          <h2 className="sec-title">Choose Your <em>Level</em></h2>
          <p className="sec-sub">Whether you&apos;re starting with ₦50,000 or ₦1 million, there&apos;s a tier designed for you.</p>
        </ScrollReveal>
        <div className="tiers-grid">
          {tiers.map((tier, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={`tier-card ${tier.popular ? 'popular' : ''}`}>
                {tier.popular && <div className="popular-badge">MOST POPULAR</div>}
                <div className="tier-name">{tier.name}</div>
                <div className="tier-min">{tier.min} <span className="tier-suffix">minimum</span></div>
                <div className="tier-roi">
                  <span className="tier-roi-l">Projected Season ROI</span>
                  <span className="tier-roi-v">20–28%</span>
                </div>
                <ul className="tier-features">
                  {tier.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
                <Link
                  href="/invest"
                  style={{
                    display: 'block', textAlign: 'center', marginTop: 20,
                    padding: '12px', borderRadius: 6, textDecoration: 'none',
                    fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, letterSpacing: 2,
                    background: tier.popular ? 'var(--gold)' : 'transparent',
                    color: tier.popular ? 'var(--navy)' : 'var(--gold)',
                    border: tier.popular ? 'none' : '1.5px solid var(--gold)',
                  }}
                >
                  INVEST NOW →
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#9a9a9a', marginTop: 20, fontStyle: 'italic' }}>
          * All ROI figures are projected estimates based on expected farm performance. Actual returns may vary.
        </p>
      </div>
    </section>
  );
}

