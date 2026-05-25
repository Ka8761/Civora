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
