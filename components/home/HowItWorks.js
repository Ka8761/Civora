import ScrollReveal from '../ui/ScrollReveal';

const steps = [
  {
    num: '01',
    title: 'Register Interest',
    desc: 'Fill in the form and our team contacts you within 24 hours.',
  },
  {
    num: '02',
    title: 'Sign Your Contract',
    desc: 'Receive and review your legal investment agreement.',
  },
  {
    num: '03',
    title: 'Transfer Capital',
    desc: 'Funds are securely transferred into escrow.',
  },
  {
    num: '04',
    title: 'Earn at Harvest',
    desc: 'Track progress and receive returns after harvest.',
  },
];

export default function HowItWorks() {
  return (
    <section
      className="section how"
      style={{
        height: '80vh',
        minHeight: '780px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 20px',
        fontFamily: 'Montserrat, sans-serif',
        background: '#000',
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <source src="/videos/maizefarm.mp4" type="video/mp4" />
      </video>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.72), rgba(0,0,0,0.42))',
          zIndex: 2,
        }}
      />

      <div
        className="section-inner"
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          <div
            className="sec-tag"
            style={{
              display: 'inline-block',
              padding: '10px 18px',
              border: '1px solid transparent',
              background: 'rgba(7,20,15,0.8)',
              borderRadius: 999,
              color: '#4ade80',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              marginBottom: 18,
              fontFamily: 'Montserrat, sans-serif',
              boxShadow: 'none',
              outline: 'none',
            }}
          >
            The Process
          </div>

          <h2
            className="sec-title"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: 18,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            From Interest to <span style={{ color: '#22c55e' }}>Harvest Returns</span>
          </h2>

          <p
            className="sec-sub"
            style={{
              fontSize: 16,
              color: '#d1d5db',
              maxWidth: 700,
              margin: '0 auto 55px',
              lineHeight: 1.8,
              fontWeight: 500,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            Four simple steps. Fully managed by our professional farm team from onboarding to harvest payout.
          </p>
        </ScrollReveal>

        <div
  style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <div
    className="steps"
    style={{
      display: 'flex',
      gap: 20,
      alignItems: 'stretch',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      margin: '0 auto',
      outline: 0,
      border: 0,
      
    }}
  >
    {steps.map((step, i) => (
      <ScrollReveal delay={i * 0.1} key={i}>
        <div
          className="step"
          style={{
            background: 'rgba(7,20,15,0.92)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.35)',
            borderRadius: 26,
            padding: '28px 22px',
            minHeight: 260,
            width: 290,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(6px)',
            transition: '0.3s ease',
            border: '0',
            outline: '0',
            boxSizing: 'border-box',
          }}
        >
          <div
            className="step-num"
            style={{
              width: 62,
              height: 62,
              borderRadius: '50%',
              background: '#14532d',
              border: 'none',
              color: '#fff',
              fontSize: 20,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              fontFamily: 'Montserrat, sans-serif',
              boxShadow: 'none',
              outline: 'none',
            }}
          >
            {step.num}
          </div>

          <div
            style={{
              width: 50,
              height: 3,
              background: '#22c55e',
              borderRadius: 999,
              marginBottom: 20,
            }}
          />

          <div
            className="step-title"
            style={{
              fontSize: 21,
              fontWeight: 700,
              color: '#fff',
              marginBottom: 14,
              lineHeight: 1.3,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {step.title}
          </div>

          <div
            className="step-desc"
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              color: '#d1d5db',
              fontWeight: 500,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {step.desc}
          </div>
        </div>
      </ScrollReveal>
    ))}
  </div>
</div>
      </div>

      <style jsx>{`
        * {
          font-family: Montserrat, sans-serif;
          box-sizing: border-box;
        }

        .step,
        .step-num,
        .sec-tag {
          border: none !important;
          outline: none !important;
        }

        @media (max-width: 1250px) {
          .steps {
            flex-wrap: wrap !important;
          }

          .step {
            width: calc(50% - 10px) !important;
          }
        }

        @media (max-width: 768px) {
          .section.how {
            height: auto !important;
            min-height: auto !important;
            padding: 80px 18px !important;
          }

          .steps {
            flex-direction: column !important;
            gap: 18px !important;
            align-items: center !important;
          }

          .step {
            width: 100% !important;
            max-width: 420px !important;
            min-height: auto !important;
            padding: 24px 20px !important;
          }

          .sec-sub {
            margin-bottom: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}