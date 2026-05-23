
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import stripe from '../../../lib/stripe';
import connectDB from '../../../lib/mongodb';
import Investment from '../../../models/Investment';

// Naira to USD rate (update as needed) — or use a real-time rate API
const NGN_TO_USD = 1 / 1550;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  const { crop, tier, amount } = req.body;
  if (!crop || !tier || !amount) return res.status(400).json({ error: 'Missing fields' });

  await connectDB();

  // Convert NGN to USD cents for Stripe
  const amountUSD = Math.round(amount * NGN_TO_USD * 100); // cents
  const minUSD = 100; // Stripe minimum $1.00

  if (amountUSD < minUSD) return res.status(400).json({ error: 'Investment amount too small for processing' });

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `CIVORA FARMS — ${crop} Investment (${tier} Tier)`,
            description: `Kaduna State farmland investment. Season: 4–6 months. Projected ROI: 20–28%.`,
          },
          unit_amount: amountUSD,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/investments?success=true&crop=${crop}&tier=${tier}&amount=${amount}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/invest?cancelled=true`,
      metadata: {
        userId: session.user.id,
        crop,
        tier,
        amountNGN: amount.toString(),
      },
    });

    return res.status(200).json({ sessionId: stripeSession.id });
  } catch (err) {
    console.error('Stripe error:', err);
    return res.status(500).json({ error: 'Failed to create payment session' });
  }
}