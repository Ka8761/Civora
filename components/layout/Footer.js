export default function Footer() {
  return (
    <footer className="ft">

      <div className="footer-main">

        <div>
          <div className="fl">
            COLIG FOUNDATION
          </div>

          <div className="fd">
            Leadership Foundation School — equipping believers with
            sound doctrine, spiritual discipline, and servant leadership
            for the 21st century.
          </div>
        </div>

        <div>
          <div className="fh">
            QUICK LINKS
          </div>

          <div className="flink">
            Student Login
          </div>

          <div className="flink">
            Enrol Now
          </div>

          <div className="flink">
            About COLIG
          </div>

          <div className="flink">
            Contact Us
          </div>
        </div>

        <div>
          <div className="fh">
            CONTACT
          </div>

          <div className="flink">
            📧 info@coligfoundation.org
          </div>

          <div className="flink">
            📞 +234 000 000 0000
          </div>

          <div className="flink">
            📍 Nigeria
          </div>
        </div>

      </div>

      <div className="fbot">
        <span>
          © 2025 COLIG Leadership Foundation School. All rights reserved.
        </span>

        <span>
          Rooted in the Word. Rising in Leadership.
        </span>
      </div>

      <style jsx>{`
        .ft {
          background: #04080a;
          padding: 36px 60px 20px;
          border-top: 1px solid rgba(201, 146, 26, 0.1);
        }

        .footer-main {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 28px;
          margin-bottom: 20px;
        }

        .fl {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 4px;
          color: #c9921a;
          margin-bottom: 6px;
        }

        .fd {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.28);
          max-width: 280px;
          line-height: 1.7;
        }

        .fh {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.24);
          margin-bottom: 10px;
          font-weight: 700;
        }

        .flink {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.38);
          margin-bottom: 5px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .flink:hover {
          color: #c9921a;
        }

        .fbot {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 16px;
          margin-top: 20px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.18);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }

        @media (max-width: 900px) {
          .ft {
            padding: 32px 22px 16px;
          }
        }
      `}</style>
    </footer>
  );
}