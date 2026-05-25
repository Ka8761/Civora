import ScrollReveal from '../ui/ScrollReveal';

const cards = [
  {
    title: 'CAC Registered',
    desc: 'Officially registered with the Corporate Affairs Commission of Nigeria.',
  },
  {
    title: 'Escrow Protection',
    desc: 'Investor funds are secured in a dedicated escrow account.',
  },
  {
    title: 'NAIC Insurance',
    desc: 'Farm seasons are protected through crop insurance.',
  },
  {
    title: 'Legal Contracts',
    desc: 'Every investor signs a binding investment agreement.',
  },
  {
    title: 'Independent Audits',
    desc: 'Returns are verified before any payout is processed.',
  },
  {
    title: 'Monthly Updates',
    desc: 'Receive regular photos and reports from the farm.',
  },
];

export default function Trust() {
  return (
    <section
      className="section trust"
      style={{
        background: '#f2f4f1',
        padding: '100px 20px',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <div
        className="section-inner"
        style={{
          maxWidth: 1250,
          margin: '0 auto',
        }}
      >
        {/* TOP SECTION */}
        <ScrollReveal>
          <div
            className="sec-tag"
            style={{
              textAlign: 'center',
              color: '#49b34c',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Why Trust Us
          </div>

          <h2
            className="sec-title"
            style={{
              textAlign: 'center',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#000',
              marginBottom: 18,
              lineHeight: 1.1,
            }}
          >
            Built on{' '}
            <span
              style={{
                color: '#49b34c',
              }}
            >
              Accountability
            </span>
          </h2>

          <p
            className="sec-sub"
            style={{
              textAlign: 'center',
              maxWidth: 700,
              margin: '0 auto 70px',
              color: 'rgba(0,0,0,0.65)',
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            Every layer of CIVORA FARMS is designed for transparency.
          </p>
        </ScrollReveal>

        {/* GRID */}
        <div
          className="trust-grid"
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 28,
          }}
        >
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div
                className="trust-card"
                style={{
                  background: '#ffffff',
                  borderRadius: 24,
                  padding: '35px 28px',
                  transition: '0.3s ease',
                  minHeight: 220,

                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',

                  boxShadow:
                    '0 8px 30px rgba(0,0,0,0.04)',
                }}
              >
                {/* GREEN TOP LINE */}
                <div
                  style={{
                    width: 55,
                    height: 5,
                    borderRadius: 999,
                    background: '#49b34c',
                    marginBottom: 24,
                  }}
                />

                <div
                  className="tc-title"
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#000',
                    marginBottom: 16,
                    lineHeight: 1.3,
                  }}
                >
                  {card.title}
                </div>

                <div
                  className="tc-desc"
                  style={{
                    color: 'rgba(0,0,0,0.7)',
                    lineHeight: 1.8,
                    fontSize: 15,
                  }}
                >
                  {card.desc}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}