import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import Investment from '../../../models/Investment';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

  await connectDB();

  if (req.method === 'GET') {
    const investments = await Investment.find({}).populate('userId', 'name email phone').sort({ createdAt: -1 });
    return res.status(200).json({ investments });
  }

  return res.status(405).end();
}
