import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';

const STATES = [
  'Kaduna',
  'Abuja (FCT)',
  'Lagos',
  'Kano',
  'Katsina',
  'Sokoto',
  'Zamfara',
  'Niger',
  'Plateau',
  'Nasarawa',
  'Bauchi',
  'Gombe',
  'Adamawa',
  'Taraba',
  'Borno',
  'Yobe',
  'Jigawa',
  'Kebbi',
  'Kwara',
  'Kogi',
  'Benue',
  'Rivers',
  'Delta',
  'Enugu',
  'Anambra',
  'Imo',
  'Abia',
  'Ogun',
  'Oyo',
  'Osun',
  'Ondo',
  'Ekiti',
  'Cross River',
  'Akwa Ibom',
  'Bayelsa',
  'Edo',
  'Outside Nigeria'
];

export default function InvestorForm() {

  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    hear: '',
    questions: ''
  });

  const toggleCrop = (crop) => {
    setSelectedCrops((prev) =>
      prev.includes(crop)
        ? prev.filter((c) => c !== crop)
        : [...prev, crop]
    );
  };

  const handleSubmit = () => {

    if (!formData.name) {
      alert('Please enter your full name.');
      return;
    }

    if (!formData.phone) {
      alert('Please enter your phone number.');
      return;
    }

    if (!formData.state) {
      alert('Please select your state.');
      return;
    }

    if (!selectedAmount) {
      alert('Please select an investment range.');
      return;
    }

    const msg = encodeURIComponent(
      `NEW INVESTOR INTEREST — CIVORA FARMS

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'Not provided'}
State: ${formData.state}
Investment Range: ${selectedAmount}
Crops: ${selectedCrops.join(', ') || 'Not specified'}
Heard from: ${formData.hear || 'Not specified'}
Likelihood: ${selectedRating || 'Not specified'}
Questions: ${formData.questions || 'None'}`
    );

    setSubmitted(true);

    setTimeout(() => {
      window.open(
        `https://wa.me/2349030117888?text=${msg}`,
        '_blank'
      );
    }, 800);
  };

  return (
    <>
      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

        *{
          font-family: 'Montserrat', sans-serif !important;
          box-sizing: border-box;
        }

        .form-section{
          background: #000;
          padding: 100px 20px;
          color: #fff;
        }

        .section-inner{
          max-width: 1200px;
          margin: 0 auto;
        }

        .sec-tag{
          display: inline-block;
          padding: 10px 18px;
          border: 1px solid #14532d;
          background: #07140f;
          border-radius: 999px;
          color: #4ade80;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .sec-title{
          font-size: 58px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 18px;
          color: #fff;
        }

        .sec-title em{
          color: #22c55e;
          font-style: normal;
        }

        .sec-sub{
          max-width: 760px;
          color: #cfcfcf;
          font-size: 18px;
          line-height: 1.7;
          margin-bottom: 60px;
        }

        .form-wrap{
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .left-info{
          display: flex;
          flex-direction: column;
          gap: 28px;
          padding-top: 20px;
        }

        .info-item{
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .tick{
          width: 24px;
          height: 24px;
          min-width: 24px;
          border-radius: 50%;
          background: #14532d;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          margin-top: 3px;
        }

        .fi-title{
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #fff;
        }

        .fi-desc{
          color: #bdbdbd;
          line-height: 1.7;
          font-size: 15px;
        }

        .the-form{
          background: #07140f;
          border: 1px solid #123524;
          border-radius: 28px;
          padding: 40px;
        }

        .form-title{
          font-size: 34px;
          font-weight: 800;
          margin-bottom: 12px;
          color: #fff;
        }

        .form-subtitle{
          color: #bdbdbd;
          margin-bottom: 35px;
          line-height: 1.6;
          font-size: 15px;
          font-weight: 500;
        }

        .form-group{
          margin-bottom: 24px;
        }

        .form-label{
          display: block;
          margin-bottom: 10px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          font-family: 'Montserrat', sans-serif !important;
          letter-spacing: 0.2px;
        }

        .req{
          color: #22c55e;
        }

        .form-input,
        .form-select,
        .form-textarea,
        .amount-btn,
        .crop-check-label,
        .rating-btn,
        .submit-btn,
        option,
        select,
        input,
        textarea,
        button{
          font-family: 'Montserrat', sans-serif !important;
        }

        .form-input,
        .form-select,
        .form-textarea{
          width: 100%;
          background: #000;
          border: 1px solid #1f4d38;
          border-radius: 16px;
          padding: 16px 18px;
          color: #fff;
          outline: none;
          font-size: 15px;
          font-weight: 500;
          transition: 0.3s ease;
        }

        .form-input::placeholder,
        .form-textarea::placeholder{
          color: #8d8d8d;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus{
          border-color: #22c55e;
        }

        .form-textarea{
          min-height: 140px;
          resize: vertical;
        }

        .amount-options,
        .crop-checks,
        .rating-row{
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .amount-btn,
        .crop-check-label,
        .rating-btn{
          padding: 14px 18px;
          border-radius: 14px;
          border: 1px solid #1f4d38;
          background: #000;
          color: #fff;
          cursor: pointer;
          transition: 0.3s ease;
          font-size: 14px;
          font-weight: 600;
        }

        .amount-btn:hover,
        .crop-check-label:hover,
        .rating-btn:hover{
          border-color: #22c55e;
        }

        .amount-btn.selected,
        .crop-check-label.checked,
        .rating-btn.selected{
          background: #14532d;
          border-color: #22c55e;
        }

        .submit-btn{
          width: 100%;
          padding: 18px;
          border: none;
          border-radius: 18px;
          background: #14532d;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s ease;
          margin-top: 10px;
        }

        .submit-btn:hover{
          background: #1d6b3a;
        }

        .form-disclaimer{
          margin-top: 14px;
          color: #9f9f9f;
          font-size: 13px;
          line-height: 1.6;
          text-align: center;
          font-weight: 500;
        }

        .success-msg{
          text-align: center;
          padding: 50px 20px;
        }

        .success-title{
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 20px;
          color: #fff;
        }

        .success-sub{
          color: #cfcfcf;
          line-height: 1.8;
          font-size: 17px;
          font-weight: 500;
        }

        .success-contact{
          margin-top: 25px;
          color: #22c55e;
          font-weight: 700;
          font-size: 18px;
        }

        @media (max-width: 991px){

          .form-wrap{
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .sec-title{
            font-size: 42px;
          }

          .the-form{
            padding: 28px;
          }
        }

        @media (max-width: 600px){

          .form-section{
            padding: 70px 16px;
          }

          .sec-title{
            font-size: 34px;
          }

          .sec-sub{
            font-size: 16px;
          }

          .form-title{
            font-size: 28px;
          }

          .amount-btn,
          .crop-check-label,
          .rating-btn{
            width: 100%;
            text-align: center;
          }

          .the-form{
            padding: 24px;
            border-radius: 22px;
          }
        }

      `}</style>

      <section className="form-section" id="register">

        <div className="section-inner">

          <ScrollReveal>

            <div className="sec-tag">
              Pre-Launch Registration
            </div>

            <h2 className="sec-title">
              Register Your <em>Interest</em>
            </h2>

            <p className="sec-sub">
              Fill in your details below. Our team will contact
              you within 24 hours to discuss your investment
              and answer any questions.
            </p>

          </ScrollReveal>

          <div className="form-wrap">

            {/* LEFT SIDE */}

            <div className="left-info">

              {[
                {
                  title: 'Priority Access',
                  desc:
                    'Pre-launch registrants get first access to farm slots before public launch.'
                },
                {
                  title: 'No Commitment Yet',
                  desc:
                    'This form is only an expression of interest. No payment is required now.'
                },
                {
                  title: 'We Contact You',
                  desc:
                    'A CIVORA FARMS team member will contact you within 24 hours after submission.'
                },
                {
                  title: '2026 Season Opening',
                  desc:
                    'Early registration gives you a better chance of securing your preferred investment slot.'
                },
                {
                  title: 'Need Help?',
                  desc:
                    '+234 903 011 7888\ncivorafarms@gmail.com'
                }
              ].map((item, i) => (

                <div className="info-item" key={i}>

                  <div className="tick">
                    ✓
                  </div>

                  <div>

                    <div className="fi-title">
                      {item.title}
                    </div>

                    <div
                      className="fi-desc"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {item.desc}
                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* FORM */}

            <div className="the-form">

              {!submitted ? (
                <>

                  <div className="form-title">
                    Investor Interest Form
                  </div>

                  <div className="form-subtitle">
                    Takes less than 2 minutes. No payment required.
                  </div>

                  <div className="form-group">

                    <label className="form-label">
                      Full Name <span className="req">*</span>
                    </label>

                    <input
                      className="form-input"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          name: e.target.value
                        }))
                      }
                    />

                  </div>

                  <div className="form-group">

                    <label className="form-label">
                      WhatsApp / Phone Number <span className="req">*</span>
                    </label>

                    <input
                      className="form-input"
                      placeholder="+234 000 000 0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          phone: e.target.value
                        }))
                      }
                    />

                  </div>

                  <div className="form-group">

                    <label className="form-label">
                      Email Address
                    </label>

                    <input
                      className="form-input"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          email: e.target.value
                        }))
                      }
                    />

                  </div>

                  <div className="form-group">

                    <label className="form-label">
                      State of Residence <span className="req">*</span>
                    </label>

                    <select
                      className="form-select"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          state: e.target.value
                        }))
                      }
                    >

                      <option value="">
                        Select your state...
                      </option>

                      {STATES.map((s) => (
                        <option key={s}>
                          {s}
                        </option>
                      ))}

                    </select>

                  </div>

                  <div className="form-group">

                    <label className="form-label">
                      Investment Range <span className="req">*</span>
                    </label>

                    <div className="amount-options">

                      {[
                        '₦50K – ₦99K',
                        '₦100K – ₦249K',
                        '₦250K – ₦499K',
                        '₦500K – ₦999K',
                        '₦1M+',
                        'Still Deciding'
                      ].map((amt, i) => (

                        <div
                          key={i}
                          className={`amount-btn ${
                            selectedAmount === amt
                              ? 'selected'
                              : ''
                          }`}
                          onClick={() => setSelectedAmount(amt)}
                        >
                          {amt}
                        </div>

                      ))}

                    </div>

                  </div>

                  <div className="form-group">

                    <label className="form-label">
                      Crops You Prefer
                    </label>

                    <div className="crop-checks">

                      {[
                        'Maize',
                        'Groundnut',
                        'Soybean',
                        'Open to All'
                      ].map((crop, i) => (

                        <label
                          key={i}
                          className={`crop-check-label ${
                            selectedCrops.includes(crop)
                              ? 'checked'
                              : ''
                          }`}
                          onClick={() => toggleCrop(crop)}
                        >

                          <input
                            type="checkbox"
                            style={{ display: 'none' }}
                            readOnly
                            checked={selectedCrops.includes(crop)}
                          />

                          {crop}

                        </label>

                      ))}

                    </div>

                  </div>

                  <div className="form-group">

                    <label className="form-label">
                      How Did You Hear About Us?
                    </label>

                    <select
                      className="form-select"
                      value={formData.hear}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          hear: e.target.value
                        }))
                      }
                    >

                      <option value="">
                        Select an option...
                      </option>

                      {[
                        'Instagram',
                        'Facebook',
                        'WhatsApp',
                        'TikTok',
                        'Referral',
                        'Google Search',
                        'Other'
                      ].map((o) => (

                        <option key={o}>
                          {o}
                        </option>

                      ))}

                    </select>

                  </div>

                  <div className="form-group">

                    <label className="form-label">
                      Investment Likelihood
                    </label>

                    <div className="rating-row">

                      {[
                        'Very Likely',
                        'Likely',
                        'Undecided',
                        'Exploring'
                      ].map((r, i) => (

                        <div
                          key={i}
                          className={`rating-btn ${
                            selectedRating === r
                              ? 'selected'
                              : ''
                          }`}
                          onClick={() => setSelectedRating(r)}
                        >
                          {r}
                        </div>

                      ))}

                    </div>

                  </div>

                  <div className="form-group">

                    <label className="form-label">
                      Questions or Comments
                    </label>

                    <textarea
                      className="form-textarea"
                      placeholder="Ask us anything..."
                      value={formData.questions}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          questions: e.target.value
                        }))
                      }
                    />

                  </div>

                  <button
                    className="submit-btn"
                    onClick={handleSubmit}
                  >
                    SUBMIT MY INTEREST
                  </button>

                  <p className="form-disclaimer">
                    Your information is kept confidential.
                  </p>

                </>
              ) : (

                <div className="success-msg">

                  <div className="success-title">
                    Thank You, {formData.name.split(' ')[0]}!
                  </div>

                  <div className="success-sub">
                    Your interest has been registered.
                    A member of the CIVORA FARMS team
                    will contact you within 24 hours.
                  </div>

                  <div className="success-contact">
                    +234 903 011 7888 · civorafarms@gmail.com
                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      </section>
    </>
  );
}