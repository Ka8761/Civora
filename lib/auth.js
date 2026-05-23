import nodemailer from 'nodemailer';
import crypto from 'crypto';

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

export async function sendPasswordResetEmail(email, token, name) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${token}`;

  await transporter.sendMail({
    from: `"CIVORA FARMS" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Your CIVORA FARMS Password',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a1628;color:#fff;padding:40px;border-radius:12px;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:28px;color:#c9921a;letter-spacing:4px;">CIVORA FARMS</h1>
          <p style="color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:3px;">KADUNA AGRICULTURAL INVESTMENT</p>
        </div>
        <h2 style="color:#fff;font-size:22px;">Hello, ${name} 👋</h2>
        <p style="color:rgba(255,255,255,0.7);line-height:1.8;">
          We received a request to reset your password. Click the button below to set a new password. This link expires in <strong style="color:#c9921a;">1 hour</strong>.
        </p>
        <div style="text-align:center;margin:32px 0;">
          <a href="${resetUrl}" style="background:#c9921a;color:#0a1628;padding:16px 40px;border-radius:6px;font-weight:800;letter-spacing:2px;text-decoration:none;font-size:14px;">
            RESET MY PASSWORD
          </a>
        </div>
        <p style="color:rgba(255,255,255,0.4);font-size:12px;">
          If you didn't request this, you can safely ignore this email. Your password won't change.
        </p>
        <hr style="border-color:rgba(255,255,255,0.1);margin:24px 0;" />
        <p style="color:rgba(255,255,255,0.3);font-size:11px;text-align:center;">
          © 2026 CIVORA FARMS LIMITED · Kaduna, Nigeria
        </p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(email, name) {
  await transporter.sendMail({
    from: `"CIVORA FARMS" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to CIVORA FARMS 🌱',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a1628;color:#fff;padding:40px;border-radius:12px;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:28px;color:#c9921a;letter-spacing:4px;">CIVORA FARMS</h1>
        </div>
        <h2 style="color:#fff;">Welcome aboard, ${name}! 🌾</h2>
        <p style="color:rgba(255,255,255,0.7);line-height:1.8;">
          Your account has been created successfully. You can now browse our investment opportunities and start growing your wealth with real Nigerian farmland.
        </p>
        <div style="background:rgba(201,146,26,0.1);border:1px solid rgba(201,146,26,0.3);border-radius:8px;padding:20px;margin:24px 0;">
          <p style="color:#c9921a;font-weight:bold;margin:0 0 8px;">Quick facts:</p>
          <p style="color:rgba(255,255,255,0.7);margin:0;font-size:14px;">✓ Minimum investment: ₦50,000<br/>✓ Projected returns: 20–28% per season<br/>✓ Season duration: 4–6 months<br/>✓ CAC Registered & NAIC Insured</p>
        </div>
        <div style="text-align:center;margin:32px 0;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background:#c9921a;color:#0a1628;padding:16px 40px;border-radius:6px;font-weight:800;letter-spacing:2px;text-decoration:none;">
            GO TO DASHBOARD
          </a>
        </div>
        <p style="color:rgba(255,255,255,0.3);font-size:11px;text-align:center;">
          © 2026 CIVORA FARMS LIMITED · Kaduna, Nigeria
        </p>
      </div>
    `,
  });
}

