import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import Prayer from '../../../models/Prayer';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated.' });

  await connectDB();

  if (req.method === 'GET') {
    const prayers = await Prayer.find({ userId: session.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ prayers });
  }

  if (req.method === 'POST') {
    const { title, text } = req.body;
    if (!title || !text) {
      return res.status(400).json({ error: 'Title and text are required.' });
    }
    const prayer = await Prayer.create({ userId: session.user.id, title, text });
    return res.status(201).json({ prayer });
  }

  if (req.method === 'PATCH') {
    const { prayerId, answered } = req.body;
    const prayer = await Prayer.findOneAndUpdate(
      { _id: prayerId, userId: session.user.id },
      { answered },
      { new: true }
    );
    return res.status(200).json({ prayer });
  }

  return res.status(405).end();
}

