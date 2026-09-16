import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import Progress from '../../../models/Progress';
import { sendWelcomeEmail } from '../../../lib/email';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectDB();

  const { name, email, phone, state, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  try {
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      state,
      password,
      provider: 'credentials',
    });

    // Create empty progress record
    await Progress.create({ userId: user._id });

    // Send welcome email (non-blocking)
    sendWelcomeEmail(email, name).catch(console.error);

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create account. Please try again.' });
  }
}
