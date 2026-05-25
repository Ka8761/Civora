import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

  await connectDB();

  if (req.method === 'GET') {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    return res.status(200).json({ users });
  }

  return res.status(405).end();
}

