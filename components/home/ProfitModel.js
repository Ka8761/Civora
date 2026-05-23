import ScrollReveal from '../ui/ScrollReveal';

export default function ProfitModel() {
  return (
    <section className="section profit">
      <div className="section-inner">
        <ScrollReveal>
          <div className="sec-tag">How You Earn</div>
          <h2 className="sec-title">The <em>Profit Formula</em></h2>
          <p className="sec-sub">Every naira of farm revenue is split fairly and transparently. Here&apos;s exactly how it works.</p>
        </ScrollReveal>
        <div className="profit-grid">
          <ScrollReveal delay={0.1}>
            <div className="profit-visual">
              <div className="pv-title">REVENUE DISTRIBUTION MODEL</div>
              <div className="pv-bars">
                {[
                  { label: 'Investors (You)', val: '70%', width: '70%', cls: 'fill-gold' },
                  { label: 'Operations & Management', val: '20%', width: '20%', cls: 'fill-green' },
                  { label: 'Contingency Buffer Fund', val: '10%', width: '10%', cls: 'fill-navy' },
                ].map((bar, i) => (
                  <div className="pv-bar-item" key={i}>
                    <div className="pv-bar-header">
                      <div className="pv-bar-label">{bar.label}</div>
                      <div className="pv-bar-val">{bar.val}</div>
                    </div>
                    <div className="pv-bar-track">
                      <div className={`pv-bar-fill ${bar.cls}`} style={{ width: bar.width }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pv-example">
                <div className="pve-title">EXAMPLE: ₦100,000 INVESTMENT AT 25% ROI</div>
                {[
                  { k: 'You invest', v: '₦100,000', cls: '' },
                  { k: 'Projected return', v: '₦25,000', cls: 'gold' },
                  { k: 'You collect at harvest', v: '₦125,000', cls: 'green' },
                  { k: 'Season duration', v: '4–6 months', cls: '' },
                  { k: 'Payout method', v: 'Direct bank transfer', cls: '' },
                ].map((row, i) => (
                  <div className="pve-row" key={i}>
                    <span className="k">{row.k}</span>
                    <span className={`v ${row.cls}`}>{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="profit-text">
              {[
                { num: '70', title: 'Your Money, Your Return', desc: "70% of all net farm revenue goes back to investors, distributed proportionally to each person's stake percentage. The more you invest, the more you earn." },
                { num: '20', title: 'Operations Covered', desc: '20% covers all farm operations — planting, labor, inputs, harvesting, logistics and management fees. You pay nothing extra beyond your investment.' },
                { num: '10', title: 'Your Safety Net', desc: '10% goes into a contingency buffer fund held in reserve. In the rare event of underperformance, this fund protects investor returns. Combined with NAIC crop insurance, your capital has multiple layers of protection.' },
                { num: '14', title: 'Days to Your Account', desc: 'After harvest and sale are completed, returns are independently audited and paid directly to your bank account within 14 business days. No delays. No excuses.' },
              ].map((pt, i) => (
                <div className="profit-point" key={i}>
                  <div className="pp-num">{pt.num}</div>
                  <div>
                    <div className="pp-title">{pt.title}</div>
                    <div className="pp-desc">{pt.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}