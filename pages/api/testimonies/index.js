import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import Testimony from '../../../models/Testimony';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated.' });

  await connectDB();

  if (req.method === 'GET') {
    const shared = req.query.shared === 'true';
    const query = shared ? { sharedWithCommunity: true } : { userId: session.user.id };
    const testimonies = await Testimony.find(query)
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    return res.status(200).json({ testimonies });
  }

  if (req.method === 'POST') {
    const { title, text, sharedWithCommunity } = req.body;
    if (!title || !text) {
      return res.status(400).json({ error: 'Title and text are required.' });
    }
    const testimony = await Testimony.create({
      userId: session.user.id,
      authorName: session.user.name,
      title,
      text,
      sharedWithCommunity: !!sharedWithCommunity,
    });
    return res.status(201).json({ testimony });
  }

  return res.status(405).end();
}

