import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import Testimony from '../../../models/Testimony';
import User from '../../../models/User';
import { getSessionUserId } from '../../../lib/sessionUser';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated.' });

  await connectDB();
  const userId = await getSessionUserId(session);
  if (!userId) return res.status(401).json({ error: 'Could not identify your account. Please log in again.' });

  if (req.method === 'GET') {
    const testimonies = await Testimony.find({ userId }).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ testimonies });
  }

  if (req.method === 'POST') {
    const { title, text, showOnHome } = req.body || {};
    if (!title?.trim() || !text?.trim()) {
      return res.status(400).json({ error: 'Title and text are required.' });
    }
    try {
      const user = await User.findById(userId).select('name').lean();
      const testimony = await Testimony.create({
        userId,
        authorName: user?.name || session.user.name || 'Student',
        title: title.trim(),
        text: text.trim(),
        showOnHome: !!showOnHome,
      });
      return res.status(201).json({ testimony });
    } catch (err) {
      console.error('POST /api/testimonies error:', err);
      return res.status(500).json({ error: 'Could not save your testimony.' });
    }
  }

  if (req.method === 'PATCH') {
    const { id, showOnHome } = req.body || {};
    const testimony = await Testimony.findOneAndUpdate(
      { _id: id, userId },
      { $set: { showOnHome: !!showOnHome } },
      { new: true }
    );
    if (!testimony) return res.status(404).json({ error: 'Testimony not found' });
    return res.status(200).json({ testimony });
  }

  return res.status(405).end();
}