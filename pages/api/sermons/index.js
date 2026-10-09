import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import { syncSermonsFromAudio } from '../../../lib/sermonSeed';
import Sermon from '../../../models/Sermon';
import Progress from '../../../models/Progress';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  await connectDB();

  if (req.method !== 'GET') return res.status(405).end();

  try {
    const find = () => Sermon.find({ isActive: true }).sort({ section: 1, order: 1 }).lean();
    let sermons = await find();
    let sync = null;

    // Empty DB, or ?sync=1 after you drop new files in public/audio
    if (sermons.length === 0 || req.query.sync === '1') {
      sync = await syncSermonsFromAudio();
      sermons = await find();
    }

    const progress = await Progress.findOne({ userId: session.user.id }).lean();
    return res.status(200).json({
      sermons,
      completedIds: progress?.completedSermonIds || [],
      sync,
    });
  } catch (err) {
    console.error('GET /api/sermons error:', err);
    return res.status(500).json({ error: 'Failed to load sermons' });
  }
}