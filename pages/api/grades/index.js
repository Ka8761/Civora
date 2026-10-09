import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
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

const label = (v) => (v === 'submitted' ? 'Submitted' : v === 'skipped' ? 'Skipped' : '—');

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  await connectDB();

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const progress = await Progress.findOne({ userId: session.user.id }).lean();
    const completedModules = progress?.completedModules || [];
    const currentModule = progress?.currentModule || 'cc';
    const grades = progress?.grades || {};

    const rows = COURSES.map((c) => {
      const g = grades[c.code] || {};
      const done = completedModules.includes(c.key);
      const hasScore = g.score != null;
      return {
        key: c.key,
        module: c.title,
        knowledgeCheck: hasScore ? `${g.score}%` : label(g.knowledge),
        reflection: label(g.reflection),
        status: computeStatus(c.key, completedModules, currentModule),
        grade: done ? (hasScore ? letterGrade(g.score) : 'PASS') : '—',
        done,
      };
    });

    const scored = COURSES.map((c) => grades[c.code]?.score).filter((s) => s != null);
    const avgScore = scored.length ? Math.round(scored.reduce((a, b) => a + b, 0) / scored.length) : 0;

    return res.status(200).json({
      rows,
      summary: {
        lessonsDone: completedModules.filter((k) => k !== 'final').length,
        totalLessons: COURSES.length - 1,
        avgScore,
        overallGrade: avgScore ? letterGrade(avgScore) : completedModules.length ? 'PASS' : '—',
        finalExamLocked: !completedModules.includes('c6'),
        finalExamDone: completedModules.includes('final'),
      },
    });
  } catch (err) {
    console.error('GET /api/grades error:', err);
    return res.status(500).json({ error: 'Failed to load grades' });
  }
}