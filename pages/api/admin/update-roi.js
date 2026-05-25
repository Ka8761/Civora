import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import Investment from '../../../models/Investment';
import User from '../../../models/User';
import Notification from '../../../models/Notification';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

  if (req.method !== 'PATCH') return res.status(405).end();

  await connectDB();

  const { investmentId, roiPercent, status, notes } = req.body;
  if (!investmentId) return res.status(400).json({ error: 'investmentId required' });

  const investment = await Investment.findById(investmentId);
  if (!investment) return res.status(404).json({ error: 'Investment not found' });

  const prevStatus = investment.status;
  investment.roiPercent = roiPercent ?? investment.roiPercent;
  investment.status = status ?? investment.status;
  investment.notes = notes ?? investment.notes;

  if (roiPercent && investment.amount) {
    investment.projectedReturn = investment.amount * (1 + roiPercent / 100);
  }

  if (status === 'harvested' && prevStatus !== 'harvested') {
    investment.actualEndDate = new Date();
    investment.actualReturn = investment.projectedReturn;
    // Update user's total returns
    await User.findByIdAndUpdate(investment.userId, {
      $inc: { totalReturns: investment.actualReturn }
    });
    // Notify user
    await Notification.create({
      userId: investment.userId,
      title: '🌾 Harvest Complete! Your Returns Are Ready',
      message: `Your ${investment.crop} farm investment has been harvested! ₦${investment.actualReturn?.toLocaleString()} will be transferred to your bank account within 365 days.`,
      type: 'harvest',
      link: '/dashboard/investments',
    });
  }

  await investment.save();
  return res.status(200).json({ investment });
}
