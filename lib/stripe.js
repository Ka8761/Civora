import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export default stripe;

export const INVESTMENT_PACKAGES = {
  seedling: {
    name: 'Seedling',
    minAmount: 50000, // in Naira
    stripePriceId: null, // dynamic pricing
    features: ['Access to 1 farm per season', 'Monthly farm updates', 'Legal investor contract', 'Bank transfer payout'],
  },
  harvest: {
    name: 'Harvest',
    minAmount: 250000,
    stripePriceId: null,
    features: ['Access to up to 3 farms', 'Priority payout processing', 'Dedicated account manager', 'Farm visit eligibility'],
  },
  landowner: {
    name: 'Landowner',
    minAmount: 1000000,
    stripePriceId: null,
    features: ['Unlimited farm access', 'Weekly live farm reports', 'White-glove onboarding', 'Direct founder access'],
  },
};
