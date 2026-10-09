import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendPasswordResetEmail(email, token, name) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${token}`;

  await transporter.sendMail({
    from: `"COLIG Foundation School" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Your Password — COLIG Foundation School',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a2a43;color:#fff;padding:40px;border-radius:12px;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:28px;color:#c9921a;letter-spacing:4px;">
            COLIG FOUNDATION
          </h1>
          <p style="color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:3px;">
            LEADERSHIP FOUNDATION SCHOOL
          </p>
        </div>

        <h2 style="color:#fff;font-size:22px;">
          Hello, ${name}
        </h2>

        <p style="color:rgba(255,255,255,0.7);line-height:1.8;">
          We received a request to reset your password.
          Click the button below to set a new password.
          This link expires in
          <strong style="color:#c9921a;">1 hour</strong>.
        </p>

        <div style="text-align:center;margin:32px 0;">
          <a
            href="${resetUrl}"
            style="background:#c9921a;color:#0a2a43;padding:16px 40px;border-radius:6px;font-weight:800;letter-spacing:2px;text-decoration:none;font-size:14px;"
          >
            RESET MY PASSWORD
          </a>
        </div>

        <p style="color:rgba(255,255,255,0.4);font-size:12px;">
          If you didn't request this, you can safely ignore this email.
        </p>

        <hr style="border-color:rgba(255,255,255,0.1);margin:24px 0;" />

        <p style="color:rgba(255,255,255,0.3);font-size:11px;text-align:center;">
          © 2026 COLIG Leadership Foundation School · Nigeria
        </p>
      </div>
    `,
  });
}
export async function sendInactivityEmail(email, name, daysAway) {
  await transporter.sendMail({
    from: `"COLIG Foundation School" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "We've missed you — continue your course at COLIG Foundation School",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a2a43;color:#fff;padding:40px;border-radius:12px;">
        <h1 style="font-size:26px;color:#c9921a;letter-spacing:4px;text-align:center;">COLIG FOUNDATION</h1>
        <h2 style="color:#fff;font-size:20px;">Hello, ${name}</h2>
        <p style="color:rgba(255,255,255,0.75);line-height:1.8;">
          You've been away from the Leadership Foundation School for ${daysAway} days.
          Your course is waiting for you — pick up where you stopped, keep your prayer
          charges going, and keep moving toward your certificate.
        </p>
        <div style="text-align:center;margin:32px 0;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard/curriculum"
             style="background:#c9921a;color:#0a2a43;padding:16px 40px;border-radius:6px;font-weight:800;letter-spacing:2px;text-decoration:none;font-size:14px;">
            COMPLETE YOUR COURSE NOW
          </a>
        </div>
        <p style="color:rgba(255,255,255,0.4);font-size:12px;">
          "Be steadfast, immovable, always abounding in the work of the Lord." — 1 Corinthians 15:58
        </p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(email, name) {
  await transporter.sendMail({
    from: `"COLIG Foundation School" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to COLIG Leadership Foundation School',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a2a43;color:#fff;padding:40px;border-radius:12px;">
        <h1 style="font-size:28px;color:#c9921a;letter-spacing:4px;">
          COLIG FOUNDATION
        </h1>

        <h2 style="color:#fff;">
          Welcome, ${name}!
        </h2>

        <p style="color:rgba(255,255,255,0.7);line-height:1.8;">
          Your account has been created successfully.
          You are now enrolled in the COLIG Leadership Foundation School.
        </p>

        <div style="background:rgba(201,146,26,0.1);border:1px solid rgba(201,146,26,0.3);border-radius:8px;padding:20px;margin:24px 0;">
          <p style="color:#c9921a;font-weight:bold;">
            Your first steps:
          </p>

          <p style="color:rgba(255,255,255,0.7);font-size:14px;">
            ✓ Start with CC Orientation<br/>
            ✓ Log your first prayer request<br/>
            ✓ Join the Community<br/>
            ✓ Begin the Sermon Project
          </p>
        </div>

        <div style="text-align:center;margin:32px 0;">
          <a
            href="${process.env.NEXTAUTH_URL}/dashboard"
            style="background:#c9921a;color:#0a2a43;padding:16px 40px;border-radius:6px;font-weight:800;letter-spacing:2px;text-decoration:none;"
          >
            GO TO DASHBOARD
          </a>
        </div>
      </div>
    `,
  });
}