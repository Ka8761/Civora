import ScrollReveal from '../ui/ScrollReveal';

const steps = [
  { num: '01', icon: '📝', title: 'Register Interest', desc: 'Fill in this form. Our team contacts you within 24 hours to walk you through the available farms and investment options.' },
  { num: '02', icon: '📋', title: 'Sign Your Contract', desc: 'You receive a binding legal investment agreement. Review it with anyone you trust. Sign when you&apos;re ready.' },
  { num: '03', icon: '💳', title: 'Transfer Your Capital', desc: 'Funds go into a dedicated escrow account at a licensed Nigerian bank. You receive confirmation and a digital investment certificate.' },
  { num: '04', icon: '🌾', title: 'Earn at Harvest', desc: 'Track your farm through monthly updates. At harvest, your returns are calculated, audited and paid to your bank within 14 days.' },
];

export default function HowItWorks() {
  return (
    <section className="section how">
      <div className="section-inner">
        <ScrollReveal>
          <div className="sec-tag">The Process</div>
          <h2 className="sec-title">From Interest to <em>Harvest Returns</em></h2>
          <p className="sec-sub">Four simple steps. No farming experience required. Everything is managed by our professional farm team.</p>
        </ScrollReveal>
        <div className="steps">
          {steps.map((step, i) => (
            <div className="step" key={i}>
              <div className="step-num">{step.num}</div>
              <div className="step-icon-wrap">{step.icon}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

