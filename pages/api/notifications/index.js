
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

