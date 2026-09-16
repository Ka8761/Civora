import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/dbConnect';
import Course from '../../../models/Course';
import Progress from '../../../models/Progress';
import { COURSES, isUnlocked, computeStatus } from '../../../lib/curriculumData';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Course docs (title/description/thumbnail etc.) keyed by code, if present in DB.
      const dbCourses = await Course.find({ isActive: true }).sort({ order: 1 }).lean();
      const dbByCode = Object.fromEntries(dbCourses.map((c) => [c.code, c]));

      let progress = await Progress.findOne({ userId: session.user.id }).lean();
      const completedModules = progress?.completedModules || [];
      const currentModule = progress?.currentModule || 'cc';

      const curriculum = COURSES.map((c) => {
        const dbCourse = dbByCode[c.code];
        return {
          key: c.key,
          code: c.code,
          order: c.order,
          type: c.type,
          title: dbCourse?.title || c.title,
          subtitle: dbCourse?.subtitle || '',
          description: dbCourse?.description || '',
          lessonsCount: dbCourse?.lessonsCount || 0,
          passingScore: dbCourse?.passingScore ?? 70,
          unlocked: isUnlocked(c.key, completedModules),
          completed: completedModules.includes(c.key),
          status: computeStatus(c.key, completedModules, currentModule),
          isCurrent: c.key === currentModule,
        };
      });

      return res.status(200).json({ curriculum, currentModule, completedModules });
    } catch (err) {
      console.error('GET /api/curriculum error:', err);
      return res.status(500).json({ error: 'Failed to load curriculum' });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}