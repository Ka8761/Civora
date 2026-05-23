import ScrollReveal from '../ui/ScrollReveal';

const cards = [
  { icon: '📜', title: 'CAC Registered', desc: 'CIVORA FARMS LIMITED is a formally registered company with the Corporate Affairs Commission of Nigeria. You can verify our registration.' },
  { icon: '🏦', title: 'Escrow Fund Protection', desc: 'Your investment capital is held in a dedicated escrow account at a licensed Nigerian bank — separate from company funds, released only for farm operations.' },
  { icon: '🛡️', title: 'NAIC Crop Insurance', desc: 'Every farm season is insured through the Nigerian Agricultural Insurance Corporation. In the event of crop failure, insurance payouts protect investor principal.' },
  { icon: '📋', title: 'Legal Investor Contract', desc: 'Every investor signs a binding Farm Investment Agreement before funds are transferred. Your rights — and ours — are clearly defined in writing.' },
  { icon: '📊', title: 'Independent Audit', desc: 'End-of-season accounts are independently audited by a third party before any payout is made. Investors receive the full audit report before money moves.' },
  { icon: '📹', title: 'Monthly Farm Updates', desc: 'All investors receive monthly photo and video updates from the farm via WhatsApp and email. You always know what your money is doing.' },
];

export default function Trust() {
  return (
    <section className="section trust">
      <div className="section-inner">
        <ScrollReveal>
          <div className="sec-tag">Why Trust Us</div>
          <h2 className="sec-title">Built on <em>Accountability</em></h2>
          <p className="sec-sub">We built every protection possible into CIVORA FARMS before accepting a single naira.</p>
        </ScrollReveal>
        <div className="trust-grid">
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="trust-card">
                <div className="tc-icon">{card.icon}</div>
                <div className="tc-title">{card.title}</div>
                <div className="tc-desc">{card.desc}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}