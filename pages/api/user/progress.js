
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import Progress from '../../../models/Progress';
import User from '../../../models/User';
import {
  COURSES,
  isUnlocked,
  getNextCourseKey,
  TOTAL_SERMONS,
  TOTAL_PRAYER_CHARGES,
} from '../../../lib/curriculumData';
import { recalc } from '../../../lib/progressUtil';

function payload(user, progress) {
  const p = progress.toObject ? progress.toObject() : progress;
  const u = user?.toObject ? user.toObject() : user || {};
  const charges = p.prayerChargesCompleted || 0;

  return {
    progress: p,
    user: {
      _id: u._id,
      name: u.name,
      email: u.email,
      phone: u.phone || '',
      state: u.state || '',
      completedModules: p.completedModules || [],
      completedLessons: p.completedLessons || [],
      currentModule: p.currentModule || 'cc',
      sermonsCompleted: p.sermonsCompleted || 0,
      completedSermonIds: p.completedSermonIds || [],
      prayerChargesCompleted: charges,
      prayerHoursLogged: charges * 10,
      overallProgress: p.overallProgress || 0,
      certificateIssued: !!p.certificateIssued,
    },
  };
}

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    await connectDB();

    const userId = session.user.id;

    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = await Progress.create({ userId });
    }

    // GET: retrieve progress and record user activity.
    if (req.method === 'GET') {
      const user = await User.findById(userId).select(
        '-password -resetPasswordToken -resetPasswordExpires'
      );

      if (
        !user?.lastActiveAt ||
        Date.now() - new Date(user.lastActiveAt).getTime() >
          60 * 60 * 1000
      ) {
        await User.updateOne(
          { _id: userId },
          { $set: { lastActiveAt: new Date() } }
        );
      }

      return res.status(200).json(payload(user, progress));
    }

    // PATCH: update progress and profile information.
    if (req.method === 'PATCH') {
      const {
        moduleId,
        knowledge,
        reflection,
        sermonId,
        prayerCharge,
        name,
        phone,
        state,
      } = req.body || {};

      // A final exam must be passed through the exam-verification
      // flow, not by directly marking the module as completed.
      if (moduleId === 'final') {
        return res.status(403).json({
          error: 'Pass the final exam to complete this stage.',
        });
      }

      // 1. Complete a curriculum module.
      if (moduleId) {
        if (!COURSES.some((course) => course.key === moduleId)) {
          return res.status(400).json({ error: 'Unknown module' });
        }

        if (!isUnlocked(moduleId, progress.completedModules)) {
          return res.status(403).json({
            error: 'Complete the previous course first.',
          });
        }

        if (!progress.completedModules.includes(moduleId)) {
          progress.completedModules.push(moduleId);
        }

        progress.currentModule = getNextCourseKey(moduleId) || moduleId;

        progress.set(`grades.${moduleId}.submitted`, true);
        progress.set(
          `grades.${moduleId}.knowledge`,
          knowledge === 'submitted' ? 'submitted' : 'skipped'
        );
        progress.set(
          `grades.${moduleId}.reflection`,
          reflection === 'submitted' ? 'submitted' : 'skipped'
        );
      }

      // 2. Record a sermon as heard.
      if (sermonId != null) {
        const n = Number(sermonId);

        if (
          Number.isInteger(n) &&
          n >= 1 &&
          !progress.completedSermonIds.includes(n)
        ) {
          progress.completedSermonIds.push(n);
          progress.sermonsCompleted =
            progress.completedSermonIds.length;
        }
      }

      // 3. Record prayer charges in order.
      if (prayerCharge != null) {
        const n = Number(prayerCharge);

        if (
          n !== progress.prayerChargesCompleted + 1 ||
          n > TOTAL_PRAYER_CHARGES
        ) {
          return res.status(400).json({
            error: 'Complete the previous prayer charge first.',
          });
        }

        progress.prayerChargesCompleted = n;
      }

      // Recalculate and save progress.
      recalc(progress);
      await progress.save();

      // 4. Update profile fields when supplied.
      const profile = {};

      if (typeof name === 'string' && name.trim()) {
        profile.name = name.trim();
      }

      if (typeof phone === 'string') {
        profile.phone = phone;
      }

      if (typeof state === 'string') {
        profile.state = state;
      }

      if (Object.keys(profile).length > 0) {
        await User.findByIdAndUpdate(userId, {
          $set: profile,
        });
      }

      const user = await User.findById(userId).select(
        '-password -resetPasswordToken -resetPasswordExpires'
      );

      return res.status(200).json(payload(user, progress));
    }

    res.setHeader('Allow', ['GET', 'PATCH']);

    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  } catch (err) {
    console.error(
      `API /api/user/progress ${req.method} error:`,
      err
    );

    return res.status(500).json({
      error: 'Failed to process progress request',
    });
  }
}
