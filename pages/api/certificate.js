import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import connectDB from '../../lib/mongodb';
import Progress from '../../models/Progress';
import User from '../../models/User';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  if (req.method !== 'GET') return res.status(405).end();

  await connectDB();
  const userId = session.user.id;
  const [progress, user] = await Promise.all([
    Progress.findOne({ userId }).lean(),
    User.findById(userId).select('name').lean(),
  ]);

  if (!progress?.completedModules?.includes('final')) {
    return res.status(200).json({ eligible: false });
  }

  const issued = progress.certificateIssuedAt ? new Date(progress.certificateIssuedAt) : new Date();
  return res.status(200).json({
    eligible: true,
    studentName: user?.name || session.user.name || 'Student',
    completionDate: issued.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    certificateNumber: `COLIG-${issued.getFullYear()}-${String(userId).slice(-6).toUpperCase()}`,
    finalScore: progress.grades?.final?.score ?? null,
  });
}