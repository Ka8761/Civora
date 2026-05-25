import ScrollReveal from '../ui/ScrollReveal';

export default function ProfitModel() {
  return (
    <section
      className="section profit"
      style={{
        background: '#000',
        padding: '100px 20px',
        color: '#fff',
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
            How You Earn
          </div>

          <h2
            className="sec-title"
            style={{
              textAlign: 'center',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: 18,
              lineHeight: 1.1,
            }}
          >
            The{' '}
            <em
              style={{
                color: '#49b34c',
                fontStyle: 'normal',
              }}
            >
              Profit Formula
            </em>
          </h2>

          <p
            className="sec-sub"
            style={{
              textAlign: 'center',
              maxWidth: 750,
              margin: '0 auto 70px',
              color: 'rgba(255,255,255,0.72)',
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            Every naira of farm revenue is split fairly and transparently.
            Here&apos;s exactly how it works.
          </p>
        </ScrollReveal>

        {/* MAIN GRID */}
        <div
          className="profit-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 40,
            alignItems: 'start',
          }}
        >
          {/* LEFT SIDE */}
          <ScrollReveal delay={0.1}>
            <div
              className="profit-visual"
              style={{
                background: '#0d0d0d',
                borderRadius: 24,
                padding: 35,
              }}
            >
              <div
                className="pv-title"
                style={{
                  color: '#49b34c',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 1,
                  marginBottom: 35,
                }}
              >
                REVENUE DISTRIBUTION MODEL
              </div>

              <div className="pv-bars">
                {[
                  {
                    label: 'Investors (You)',
                    val: '70%',
                    width: '70%',
                    color: '#49b34c',
                  },
                  {
                    label: 'Operations & Management',
                    val: '20%',
                    width: '20%',
                    color: '#ffffff',
                  },
                  {
                    label: 'Contingency Buffer Fund',
                    val: '10%',
                    width: '10%',
                    color: '#1d1d1d',
                  },
                ].map((bar, i) => (
                  <div
                    className="pv-bar-item"
                    key={i}
                    style={{
                      marginBottom: 26,
                    }}
                  >
                    <div
                      className="pv-bar-header"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}
                    >
                      <div
                        className="pv-bar-label"
                        style={{
                          fontSize: 14,
                          color: '#fff',
                          fontWeight: 600,
                        }}
                      >
                        {bar.label}
                      </div>

                      <div
                        className="pv-bar-val"
                        style={{
                          fontSize: 14,
                          color: '#49b34c',
                          fontWeight: 700,
                        }}
                      >
                        {bar.val}
                      </div>
                    </div>

                    <div
                      className="pv-bar-track"
                      style={{
                        width: '100%',
                        height: 10,
                        background: '#1b1b1b',
                        borderRadius: 999,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        className="pv-bar-fill"
                        style={{
                          width: bar.width,
                          height: '100%',
                          background: bar.color,
                          borderRadius: 999,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* EXAMPLE */}
              <div
                className="pv-example"
                style={{
                  marginTop: 45,
                  background: '#111',
                  borderRadius: 20,
                  padding: 24,
                }}
              >
                <div
                  className="pve-title"
                  style={{
                    color: '#49b34c',
                    fontSize: 14,
                    fontWeight: 700,
                    marginBottom: 22,
                    lineHeight: 1.5,
                  }}
                >
                  EXAMPLE: ₦100,000 INVESTMENT AT 25% ROI
                </div>

                {[
                  { k: 'You invest', v: '₦100,000', cls: '' },
                  {
                    k: 'Projected return',
                    v: '₦25,000',
                    cls: 'green',
                  },
                  {
                    k: 'You collect at harvest',
                    v: '₦125,000',
                    cls: 'green',
                  },
                  {
                    k: 'Season duration',
                    v: '4–6 months',
                    cls: '',
                  },
                  {
                    k: 'Payout method',
                    v: 'Direct bank transfer',
                    cls: '',
                  },
                ].map((row, i) => (
                  <div
                    className="pve-row"
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom:
                        i !== 4
                          ? '1px solid rgba(255,255,255,0.06)'
                          : 'none',
                    }}
                  >
                    <span
                      className="k"
                      style={{
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: 14,
                      }}
                    >
                      {row.k}
                    </span>

                    <span
                      className="v"
                      style={{
                        color:
                          row.cls === 'green'
                            ? '#49b34c'
                            : '#fff',

                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT SIDE */}
          <ScrollReveal delay={0.2}>
            <div
              className="profit-text"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              {[
                {
                  num: '70',
                  title: 'Your Money, Your Return',
                  desc:
                    '70% of all net farm revenue goes back to investors, distributed proportionally to each person’s stake percentage.',
                },
                {
                  num: '20',
                  title: 'Operations Covered',
                  desc:
                    '20% covers planting, labor, harvesting, logistics and management. No extra hidden charges.',
                },
                {
                  num: '10',
                  title: 'Your Safety Net',
                  desc:
                    '10% goes into a reserve contingency fund for added investor protection and stability.',
                },
                {
                  num: '14',
                  title: 'Days to Your Account',
                  desc:
                    'Returns are audited and transferred directly to your bank account within 14 business days.',
                },
              ].map((pt, i) => (
                <div
                  className="profit-point"
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 18,
                    background: '#0d0d0d',
                    padding: 24,
                    borderRadius: 22,
                  }}
                >
                  <div
                    className="pp-num"
                    style={{
                      minWidth: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: '#49b34c',
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    {pt.num}
                  </div>

                  <div>
                    <div
                      className="pp-title"
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: 10,
                      }}
                    >
                      {pt.title}
                    </div>

                    <div
                      className="pp-desc"
                      style={{
                        color: 'rgba(255,255,255,0.72)',
                        lineHeight: 1.7,
                        fontSize: 15,
                      }}
                    >
                      {pt.desc}
                    </div>
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