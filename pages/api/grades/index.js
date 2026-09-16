import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/dbConnect';
import Progress from '../../../models/Progress';
import { COURSES, computeStatus } from '../../../lib/curriculumData';

function letterGrade(score) {
  if (score == null) return '—';
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  await dbConnect();

  if (req.method === 'GET') {
    try {
      const progress = await Progress.findOne({ userId: session.user.id }).lean();
      const completedModules = progress?.completedModules || [];
      const currentModule = progress?.currentModule || 'cc';
      const grades = progress?.grades || {};

      const rows = COURSES.map((c) => {
        const g = grades[c.code] || {};
        const done = !!completedModules.includes(c.key);
        return {
          key: c.key,
          module: c.title,
          knowledgeCheck: g.score != null ? `${g.score}%` : '—',
          reflection: g.submitted ? 'Submitted' : '—',
          status: computeStatus(c.key, completedModules, currentModule),
          grade: done ? letterGrade(g.score) : '—',
          done,
        };
      });

      const scored = rows.filter((r) => r.done && r.knowledgeCheck !== '—');
      const avgScore = scored.length
        ? Math.round(
            scored.reduce((sum, r) => sum + parseInt(r.knowledgeCheck, 10), 0) / scored.length
          )
        : 0;

      return res.status(200).json({
        rows,
        summary: {
          lessonsDone: completedModules.length,
          totalLessons: COURSES.length - 1, // excludes final exam
          avgScore,
          overallGrade: avgScore ? letterGrade(avgScore) : '—',
          finalExamLocked: !completedModules.includes('c6'),
        },
      });
    } catch (err) {
      console.error('GET /api/grades error:', err);
      return res.status(500).json({ error: 'Failed to load grades' });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}