import stripe from '../../../lib/stripe';
import { buffer } from 'micro';
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

