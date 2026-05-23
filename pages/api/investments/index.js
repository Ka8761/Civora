import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import Investment from '../../../models/Investment';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  await connectDB();

  if (req.method === 'GET') {
    const investments = await Investment.find({ userId: session.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ investments });
  }

  return res.status(405).end();
}


═══════════════════════════════════════════════════════════
FILE 47: pages/api/webhooks/stripe.js
═══════════════════════════════════════════════════════════

import { buffer } from 'micro';
import stripe from '../../../lib/stripe';
import connectDB from '../../../lib/mongodb';
import Investment from '../../../models/Investment';
import User from '../../../models/User';
import Notification from '../../../models/Notification';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  const body = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  await connectDB();

  if (event.type === 'checkout.session.completed') {
    const stripeSession = event.data.object;
    const { userId, crop, tier, amountNGN } = stripeSession.metadata;

    const expectedEnd = new Date();
    expectedEnd.setMonth(expectedEnd.getMonth() + 5); // 5 months default

    const investment = await Investment.create({
      userId,
      crop,
      tier,
      amount: parseInt(amountNGN),
      status: 'active',
      stripeSessionId: stripeSession.id,
      stripePaymentIntentId: stripeSession.payment_intent,
      expectedEndDate: expectedEnd,
    });

    // Update user's totalInvested
    await User.findByIdAndUpdate(userId, { $inc: { totalInvested: parseInt(amountNGN) } });

    // Create notification
    await Notification.create({
      userId,
      title: '🌾 Investment Confirmed!',
      message: `Your ₦${parseInt(amountNGN).toLocaleString()} investment in ${crop} (${tier} Tier) is now active. Your farm season has begun!`,
      type: 'success',
      link: '/dashboard/investments',
    });
  }

  return res.status(200).json({ received: true });
}


═══════════════════════════════════════════════════════════
FILE 48: pages/api/notifications/index.js
═══════════════════════════════════════════════════════════

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import Notification from '../../../models/Notification';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  await connectDB();

  if (req.method === 'GET') {
    const notifications = await Notification.find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(50);
    return res.status(200).json({ notifications });
  }

  if (req.method === 'PATCH') {
    // Mark all as read
    await Notification.updateMany({ userId: session.user.id, read: false }, { read: true });
    return res.status(200).json({ success: true });
  }

  return res.status(405).end();
}


═══════════════════════════════════════════════════════════
FILE 49: pages/api/user/profile.js
═══════════════════════════════════════════════════════════

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  await connectDB();

  if (req.method === 'GET') {
    const user = await User.findById(session.user.id).select('-password -resetPasswordToken -resetPasswordExpires');
    return res.status(200).json({ user });
  }

  if (req.method === 'PATCH') {
    const { name, phone, state } = req.body;
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { name, phone, state },
      { new: true }
    ).select('-password');
    return res.status(200).json({ user });
  }

  return res.status(405).end();
}