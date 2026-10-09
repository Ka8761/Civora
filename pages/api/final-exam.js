import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import connectDB from '../../lib/mongodb';
import Progress from '../../models/Progress';
import { FINAL_EXAM, PASSING_SCORE } from '../../lib/finalExamData';
import { recalc } from '../../lib/progressUtil';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  await connectDB();

  const userId = session.user.id;
  let progress = await Progress.findOne({ userId });
  if (!progress) progress = await Progress.create({ userId });

  // The final exam only opens once C6 is complete
  if (!progress.completedModules.includes('c6')) {
    return res.status(403).json({ error: 'Complete C6 first to unlock the final exam.' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      questions: FINAL_EXAM.map(({ q, options }, id) => ({ id, q, options })),
      passingScore: PASSING_SCORE,
      passed: progress.completedModules.includes('final'),
      bestScore: progress.grades?.final?.score ?? null,
    });
  }

  if (req.method === 'POST') {
    const { answers } = req.body || {};
    if (!Array.isArray(answers) || answers.length !== FINAL_EXAM.length) {
      return res.status(400).json({ error: 'Answer every question.' });
    }

    const total = FINAL_EXAM.length;
    const correct = FINAL_EXAM.filter((x, i) => answers[i] === x.answer).length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= PASSING_SCORE;

    progress.set('grades.final.attempts', (progress.grades?.final?.attempts || 0) + 1);
    if (score > (progress.grades?.final?.score ?? -1)) progress.set('grades.final.score', score);

    if (passed && !progress.completedModules.includes('final')) {
      progress.completedModules.push('final');
      progress.currentModule = 'final';
      progress.set('grades.final.submitted', true);
      progress.set('grades.final.knowledge', 'submitted');
      progress.set('grades.final.reflection', 'submitted');
      progress.certificateIssued = true;
      progress.certificateIssuedAt = new Date();
    }

    recalc(progress);
    await progress.save();
    return res.status(200).json({ score, correct, total, passed, passingScore: PASSING_SCORE });
  }

  return res.status(405).end();
}