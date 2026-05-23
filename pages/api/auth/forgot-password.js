
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { generateToken, sendPasswordResetEmail } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectDB();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const user = await User.findOne({ email: email.toLowerCase() });

  // Always return 200 to prevent email enumeration
  if (!user) return res.status(200).json({ success: true });

  const token = generateToken();
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
  await user.save();

  try {
    await sendPasswordResetEmail(user.email, token, user.name);
  } catch (err) {
    console.error('Email failed:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }

  return res.status(200).json({ success: true });
}