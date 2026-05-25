import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SupportButton from '../components/ui/SupportButton';
import ScrollReveal from '../components/ui/ScrollReveal';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CROPS = [
  { id: 'Maize', icon: '', desc: 'High-demand staple crop. Strong year-round market prices.', roi: '20–28%' },
  { id: 'Groundnut', icon: '', desc: "Premium oil crop. One of Kaduna's most profitable exports.", roi: '20–26%' },
  { id: 'Soybean', icon: '', desc: 'High-protein commodity with growing industrial demand.', roi: '22–28%' },
];

const TIERS = [
  { id: 'Seedling', min: 50000, label: '₦50,000', popular: false },
  { id: 'Harvest', min: 250000, label: '₦250,000', popular: true },
  { id: 'Landowner', min: 1000000, label: '₦1,000,000+', popular: false },
];

export default function InvestPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedTier, setSelectedTier] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1=crop, 2=tier, 3=amount, 4=checkout

  const handleCheckout = async () => {
    if (!session) {
      router.push('/auth/login?redirect=/invest');
      return;
    }
    if (!selectedCrop || !selectedTier || !amount) {
      toast.error('Please complete all selections');
      return;
    }
    const numAmount = parseInt(amount.replace(/,/g, ''));
    const tierObj = TIERS.find(t => t.id === selectedTier);
    if (numAmount < tierObj.min) {
      toast.error(`Minimum investment for ${selectedTier} tier is ₦${tierObj.min.toLocaleString()}`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/investments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop: selectedCrop, tier: selectedTier, amount: numAmount }),
      });
      const { sessionId, error } = await res.json();
      if (error) {
        toast.error(error);
        setLoading(false);
        return;
      }
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      toast.error('Payment initialization failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Head><title>Invest Now — CIVORA FARMS</title></Head>
      <Navbar />
      <div style={{ background: '#ffffff', minHeight: '100vh', paddingTop: 72, fontFamily: 'Montserrat, sans-serif' }}>
        <style jsx>{`
          .hover-box {
            transition: all 0.25s ease;
          }
          .hover-box:hover {
            transform: translateY(-4px);
            box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
            border-color: #0f2f1d !important;
          }
          .hover-btn {
            transition: all 0.25s ease;
          }
          .hover-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 22px rgba(15, 47, 29, 0.12);
          }
          @media (max-width: 900px) {
            .invest-hero {
              padding: 56px 20px 36px !important;
            }
            .invest-wrap {
              padding: 0 20px 56px !important;
            }
            .invest-grid {
              grid-template-columns: 1fr !important;
            }
            .invest-step-row {
              flex-wrap: wrap;
              justify-content: flex-start !important;
              gap: 10px !important;
            }
            .invest-step-item {
              flex-wrap: wrap;
            }
            .invest-title {
              font-size: clamp(30px, 8vw, 52px) !important;
            }
          }
          @media (max-width: 520px) {
            .invest-hero {
              padding: 44px 16px 28px !important;
            }
            .invest-wrap {
              padding: 0 16px 44px !important;
            }
            .invest-card {
              padding: 22px !important;
            }
            .invest-input {
              font-size: 20px !important;
            }
          }
        `}</style>

        <div style={{ background: '#ffffff', minHeight: '100vh' }}>
          {/* Hero */}
          <div className="invest-hero" style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px 60px', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ fontSize: 11, letterSpacing: 5, color: '#0f2f1d', marginBottom: 16, fontWeight: 700 }}>
                2026 SEASON NOW OPEN
              </div>
              <h1 className="invest-title" style={{ fontSize: 'clamp(36px,6vw,64px)', fontWeight: 800, color: '#000', lineHeight: 1.05, marginBottom: 16, fontFamily: 'Montserrat, sans-serif' }}>
                Invest in <em style={{ color: '#0f2f1d', fontStyle: 'italic' }}>Real Farmland</em>
              </h1>
              <p style={{ fontSize: 18, color: '#444', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
                Choose your crop, pick your investment tier, and start earning at harvest.
              </p>
            </motion.div>
          </div>

          {/* Steps */}
          <div className="invest-wrap" style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px 80px' }}>
            {/* Progress */}
            <div className="invest-step-row" style={{ display: 'flex', gap: 8, marginBottom: 48, justifyContent: 'center', alignItems: 'center' }}>
              {['Pick Crop', 'Choose Tier', 'Set Amount', 'Checkout'].map((s, i) => (
                <div key={i} className="invest-step-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, background: step > i + 1 ? '#0f2f1d' : step === i + 1 ? '#0f2f1d' : 'rgba(0,0,0,0.08)', color: step >= i + 1 ? '#fff' : '#666' }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 11, letterSpacing: 2, color: step >= i + 1 ? '#0f2f1d' : '#777' }}>{s}</span>
                  {i < 3 && <div style={{ width: 24, height: 1, background: 'rgba(0,0,0,0.12)' }} />}
                </div>
              ))}
            </div>

            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
              {/* Step 1: Crop */}
              {step === 1 && (
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#000', textAlign: 'center', marginBottom: 32, fontFamily: 'Montserrat, sans-serif' }}>
                    Which crop would you like to invest in?
                  </div>
                  <div className="invest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                    {CROPS.map((crop) => (
                      <button
                        key={crop.id}
                        onClick={() => {
                          setSelectedCrop(crop.id);
                          setStep(2);
                        }}
                        className="hover-box invest-card"
                        style={{
                          background: selectedCrop === crop.id ? 'rgba(15,47,29,0.06)' : '#fff',
                          border: selectedCrop === crop.id ? '2px solid #0f2f1d' : '2px solid rgba(0,0,0,0.08)',
                          borderRadius: 12,
                          padding: 28,
                          cursor: 'pointer',
                          textAlign: 'center',
                          color: '#000',
                          fontFamily: 'Montserrat, sans-serif',
                        }}
                      >
                        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12, color: '#000' }}>{crop.id}</div>
                        <div style={{ fontSize: 12, color: '#444', lineHeight: 1.6, marginBottom: 12 }}>{crop.desc}</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#0f2f1d' }}>{crop.roi}</div>
                        <div style={{ fontSize: 10, color: '#777', letterSpacing: 2 }}>EST. ROI</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Tier */}
              {step === 2 && (
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#000', textAlign: 'center', marginBottom: 32, fontFamily: 'Montserrat, sans-serif' }}>
                    Choose your investment tier
                  </div>
                  <div className="invest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                    {TIERS.map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => {
                          setSelectedTier(tier.id);
                          setStep(3);
                        }}
                        className="hover-box invest-card"
                        style={{
                          background: tier.popular ? 'rgba(15,47,29,0.06)' : '#fff',
                          border: `2px solid ${tier.popular ? '#0f2f1d' : 'rgba(0,0,0,0.08)'}`,
                          borderRadius: 12,
                          padding: 28,
                          cursor: 'pointer',
                          position: 'relative',
                          textAlign: 'center',
                          color: '#000',
                          fontFamily: 'Montserrat, sans-serif',
                        }}
                      >
                        {tier.popular && (
                          <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#0f2f1d', color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: 2, padding: '4px 12px', borderRadius: 20 }}>
                            POPULAR
                          </div>
                        )}
                        <div style={{ fontSize: 22, fontWeight: 800, color: '#0f2f1d', marginBottom: 8 }}>{tier.id}</div>
                        <div style={{ fontSize: 32, fontWeight: 900, color: '#000', marginBottom: 4 }}>{tier.label}</div>
                        <div style={{ fontSize: 10, color: '#777', letterSpacing: 2 }}>MINIMUM</div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(1)} style={{ display: 'block', margin: '24px auto 0', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 12, letterSpacing: 2, fontFamily: 'Montserrat, sans-serif' }}>
                    ← BACK
                  </button>
                </div>
              )}

              {/* Step 3: Amount */}
              {step === 3 && (
                <div style={{ maxWidth: 480, margin: '0 auto' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#000', textAlign: 'center', marginBottom: 8, fontFamily: 'Montserrat, sans-serif' }}>
                    How much are you investing?
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: 32, fontSize: 12, color: '#666', letterSpacing: 2 }}>
                    {selectedCrop} · {selectedTier} Tier
                  </div>
                  <div className="hover-box invest-card" style={{ background: '#fff', border: '1px solid rgba(15,47,29,0.18)', borderRadius: 12, padding: 32 }}>
                    <label style={{ fontSize: 10, letterSpacing: 3, color: '#0f2f1d', display: 'block', marginBottom: 10 }}>
                      INVESTMENT AMOUNT (₦)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={`Minimum ₦${TIERS.find(t => t.id === selectedTier)?.min?.toLocaleString()}`}
                      className="invest-input"
                      style={{
                        width: '100%',
                        background: '#fff',
                        border: '1.5px solid rgba(0,0,0,0.12)',
                        borderRadius: 8,
                        padding: '16px 20px',
                        fontSize: 28,
                        fontWeight: 800,
                        color: '#000',
                        outline: 'none',
                        textAlign: 'center',
                        fontFamily: 'Montserrat, sans-serif',
                      }}
                    />
                    {amount > 0 && (
                      <div style={{ marginTop: 20, background: 'rgba(15,47,29,0.06)', border: '1px solid rgba(15,47,29,0.18)', borderRadius: 8, padding: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 12, color: '#444' }}>Projected return (20%)</span>
                          <span style={{ fontWeight: 800, color: '#0f2f1d' }}>₦{(parseInt(amount) * 0.2).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 12, color: '#444' }}>You collect at harvest</span>
                          <span style={{ fontWeight: 800, color: '#000' }}>₦{(parseInt(amount) * 1.2).toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => setStep(4)}
                      disabled={!amount}
                      className="hover-btn"
                      style={{
                        width: '100%',
                        marginTop: 20,
                        padding: 16,
                        background: amount ? '#0f2f1d' : 'rgba(0,0,0,0.08)',
                        color: amount ? '#fff' : '#777',
                        fontSize: 14,
                        fontWeight: 800,
                        letterSpacing: 3,
                        border: 'none',
                        borderRadius: 8,
                        cursor: amount ? 'pointer' : 'default',
                        transition: 'all 0.2s',
                        fontFamily: 'Montserrat, sans-serif',
                      }}
                    >
                      CONTINUE TO PAYMENT →
                    </button>
                  </div>
                  <button onClick={() => setStep(2)} style={{ display: 'block', margin: '16px auto 0', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 12, letterSpacing: 2, fontFamily: 'Montserrat, sans-serif' }}>
                    ← BACK
                  </button>
                </div>
              )}

              {/* Step 4: Checkout */}
              {step === 4 && (
                <div style={{ maxWidth: 480, margin: '0 auto' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#000', textAlign: 'center', marginBottom: 32, fontFamily: 'Montserrat, sans-serif' }}>
                    Review & Pay
                  </div>
                  <div className="hover-box" style={{ background: '#fff', border: '1px solid rgba(15,47,29,0.18)', borderRadius: 12, padding: 32, marginBottom: 20 }}>
                    {[
                      { k: 'Crop', v: selectedCrop },
                      { k: 'Tier', v: selectedTier },
                      { k: 'Amount', v: `₦${parseInt(amount)?.toLocaleString()}` },
                      { k: 'Projected Return (est.)', v: `₦${(parseInt(amount) * 1.2)?.toLocaleString()}` },
                      { k: 'Season Duration', v: '4–6 months' },
                      { k: 'Farm Location', v: 'Kaduna State, Nigeria' },
                    ].map((row, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 5 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                        <span style={{ fontSize: 12, letterSpacing: 1, color: '#666' }}>{row.k}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#000' }}>{row.v}</span>
                      </div>
                    ))}
                  </div>
                  {!session && (
                    <div style={{ background: 'rgba(15,47,29,0.08)', border: '1px solid rgba(15,47,29,0.18)', borderRadius: 8, padding: 16, marginBottom: 16, fontSize: 12, color: '#0f2f1d', textAlign: 'center', letterSpacing: 1 }}>
                      You need to be logged in to complete your investment.
                    </div>
                  )}
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="hover-btn"
                    style={{
                      width: '100%',
                      padding: 18,
                      background: loading ? 'rgba(15,47,29,0.5)' : '#0f2f1d',
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: 3,
                      border: 'none',
                      borderRadius: 8,
                      cursor: loading ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    {loading ? 'REDIRECTING TO STRIPE...' : session ? 'PAY WITH STRIPE →' : 'LOGIN TO CONTINUE →'}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: 11, color: '#666', marginTop: 12, fontStyle: 'italic' }}>
                    Payments processed securely by Stripe. Your funds are held in escrow.
                  </p>
                  <button onClick={() => setStep(3)} style={{ display: 'block', margin: '12px auto 0', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 12, letterSpacing: 2, fontFamily: 'Montserrat, sans-serif' }}>
                    ← BACK
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <Footer />
        <SupportButton />
      </div>
    </>
  );
}