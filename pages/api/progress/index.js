import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import Progress from '../../../models/Progress';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated.' });

  await connectDB();

  if (req.method === 'GET') {
    let progress = await Progress.findOne({ userId: session.user.id });
    if (!progress) {
      progress = await Progress.create({ userId: session.user.id });
    }
    return res.status(200).json({ progress });
  }

  if (req.method === 'PATCH') {
    const { lessonKey, sermonId, moduleId } = req.body;

    let progress = await Progress.findOne({ userId: session.user.id });
    if (!progress) {
      progress = await Progress.create({ userId: session.user.id });
    }

    if (lessonKey && !progress.completedLessons.includes(lessonKey)) {
      progress.completedLessons.push(lessonKey);
    }

    if (sermonId && !progress.completedSermonIds.includes(sermonId)) {
      progress.completedSermonIds.push(sermonId);
      progress.sermonsCompleted = progress.completedSermonIds.length;
    }

    if (moduleId && !progress.completedModules.includes(moduleId)) {
      progress.completedModules.push(moduleId);
    }

    await progress.save();
    return res.status(200).json({ progress });
  }

  return res.status(405).end();
}
