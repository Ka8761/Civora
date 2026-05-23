import ScrollReveal from '../ui/ScrollReveal';

export default function About() {
  return (
    <section className="section about">
      <div className="section-inner">
        <ScrollReveal>
          <div className="sec-tag">About Civora Farms</div>
          <h2 className="sec-title">What We Are — <em>And What We&apos;re Building</em></h2>
        </ScrollReveal>
        <div className="about-grid">
          <ScrollReveal delay={0.1}>
            <div className="about-text">
              <p><strong>CIVORA FARMS</strong> is an agricultural investment platform based in Kaduna State, Nigeria. We connect investors — from first-timers to experienced portfolio builders — directly to productive farmland, managed by experienced local farmers.</p>
              <p>Our model is simple: you buy a <strong>percentage stake</strong> in one of our farm units. We plant, manage, and harvest the crops. At the end of each season, your share of the profit is paid directly to your bank account.</p>
              <p>No farming experience needed. No land to buy. No logistics to manage. Just invest, watch your crops grow through monthly updates, and collect at harvest.</p>
              <div className="about-highlight">
                <div className="ah-title">WHY CIVORA EXISTS</div>
                <div className="ah-items">
                  {[
                    { icon: '🌱', title: 'Access to Agriculture', desc: "Most Nigerians can't access the wealth of agriculture because land is expensive. We solve that." },
                    { icon: '💰', title: 'Beat Inflation', desc: 'Bank savings lose value yearly. Farm returns at 20–28% per season consistently outperform.' },
                    { icon: '🤝', title: 'Trust & Transparency', desc: 'CAC registered, NAIC insured, escrow protected. Every investor has a legal contract.' },
                  ].map((item, i) => (
                    <div className="ah-item" key={i}>
                      <div className="ah-icon">{item.icon}</div>
                      <div className="ah-text">
                        <strong>{item.title}</strong>
                        <span>{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <div className="sec-tag" style={{ marginBottom: 14 }}>Our Crops & Location</div>
              <div className="crops-grid">
                {[
                  { icon: '🌽', name: 'MAIZE', desc: 'High-demand staple crop. Fast growing season with strong market prices year-round.', roi: '20–28%' },
                  { icon: '🥜', name: 'GROUNDNUT', desc: "Premium oil crop. One of Kaduna's most profitable agricultural exports.", roi: '20–26%' },
                  { icon: '🌿', name: 'SOYBEAN', desc: 'High-protein commodity with growing industrial and food demand across Nigeria.', roi: '22–28%' },
                ].map((crop, i) => (
                  <div className="crop-card" key={i}>
                    <div className="crop-icon">{crop.icon}</div>
                    <div className="crop-name">{crop.name}</div>
                    <div className="crop-desc">{crop.desc}</div>
                    <div className="crop-roi">{crop.roi} <span>est. ROI</span></div>
                  </div>
                ))}
                <div className="location-card">
                  <div className="lc-icon">📍</div>
                  <div>
                    <div className="lc-name">Kaduna State, Nigeria</div>
                    <div className="lc-desc">Zaria Road, Kafanchan. One of Nigeria&apos;s most fertile and productive agricultural regions — ideal climate, rich soil, established market routes.</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

