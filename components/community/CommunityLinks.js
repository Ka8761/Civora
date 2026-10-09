const WHATSAPP_LINK = 'YOUR_WHATSAPP_INVITE_LINK';
const TELEGRAM_LINK = 'https://t.me/Cityoflightglobaltg';

export default function CommunityLinks() {
  return (
    <div className="community-links">
      {/* WhatsApp Community */}
      <div className="community-link-card whatsapp-card">
        <div className="community-logo whatsapp-logo">
          <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.88c0 2.1.55 4.15 1.59 5.96L.12 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.47-8.44ZM12.1 21.77a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.83 9.83 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89a9.82 9.82 0 0 1 7.01 2.91 9.82 9.82 0 0 1 2.9 7.01c0 5.45-4.44 9.89-9.89 9.89Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
          </svg>
        </div>

        <div className="community-link-info">
          <div className="community-platform">WHATSAPP COMMUNITY</div>
          <h3>Join the Foundation Family</h3>
          <p>Connect with fellow students, share testimonies, encourage one another, and grow together.</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="community-join whatsapp-join">
            JOIN WHATSAPP COMMUNITY ↗
          </a>
        </div>
      </div>

      {/* Telegram Community */}
      <div className="community-link-card telegram-card">
        <div className="community-logo telegram-logo">
          <svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true">
            <path d="M22.05 2.15 1.95 9.9c-1.37.55-1.36 1.31-.25 1.65l5.16 1.61 1.98 6.06c.24.67.12.94.82.94.55 0 .8-.25 1.11-.55l2.5-2.43 5.2 3.84c.96.53 1.65.26 1.89-.89l3.41-16.06c.35-1.41-.54-2.05-1.72-1.48ZM8.2 12.8l11.33-7.15c.56-.34 1.08-.16.66.22l-9.37 8.46-.36 3.85L8.2 12.8Z" />
          </svg>
        </div>

        <div className="community-link-info">
          <div className="community-platform">TELEGRAM COMMUNITY</div>
          <h3>Stay Connected &amp; Equipped</h3>
          <p>Join the conversation, receive community updates, and stay connected with the COLIG family.</p>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="community-join telegram-join">
            JOIN TELEGRAM COMMUNITY ↗
          </a>
        </div>
      </div>

      <style jsx>{`
        .community-links { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; margin-bottom: 22px; }
        .community-link-card {
          display: flex; gap: 18px; align-items: flex-start; padding: 24px;
          background: var(--navy); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 30px rgba(10, 22, 40, 0.12);
        }
        .community-logo {
          width: 64px; height: 64px; flex-shrink: 0; border-radius: 16px;
          display: flex; align-items: center; justify-content: center; color: #fff;
        }
        .whatsapp-logo { background: #25d366; }
        .telegram-logo { background: #229ed9; }
        .community-platform { font-size: 9px; font-weight: 800; letter-spacing: 2.5px; color: var(--gold); margin-bottom: 6px; }
        h3 { font-size: 18px; font-weight: 700; color: #fff; margin: 0 0 8px; }
        p { font-size: 12px; line-height: 1.7; color: rgba(255, 255, 255, 0.6); margin: 0 0 16px; }
        .community-join {
          display: inline-block; padding: 11px 16px; border-radius: 7px; color: #fff;
          font-size: 10px; font-weight: 800; letter-spacing: 1px; text-decoration: none;
        }
        .whatsapp-join { background: #25d366; }
        .telegram-join { background: #229ed9; }
        .community-join:hover { filter: brightness(1.08); }
        @media (max-width: 800px) { .community-links { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}