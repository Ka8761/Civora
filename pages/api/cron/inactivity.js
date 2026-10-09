import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import Progress from '../../../models/Progress';
import { sendInactivityEmail } from '../../../lib/Email';

const AWAY_DAYS = 2;
const REMIND_EVERY_DAYS = 7;
const DAY = 24 * 60 * 60 * 1000;

export default async function handler(req, res) {
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await connectDB();
  const now = Date.now();
  const awayCutoff = new Date(now - AWAY_DAYS * DAY);
  const remindCutoff = new Date(now - REMIND_EVERY_DAYS * DAY);

  const finished = await Progress.find({ completedModules: 'final' }).distinct('userId');

  const users = await User.find({
    role: 'student',
    _id: { $nin: finished },
    $and: [
      { $or: [{ lastActiveAt: { $lt: awayCutoff } }, { lastActiveAt: null, createdAt: { $lt: awayCutoff } }] },
      { $or: [{ lastReminderAt: null }, { lastReminderAt: { $lt: remindCutoff } }] },
    ],
  })
    .select('name email lastActiveAt createdAt')
    .limit(200);

  let sent = 0;
  const failed = [];
  for (const u of users) {
    const last = new Date(u.lastActiveAt || u.createdAt).getTime();
    const daysAway = Math.max(AWAY_DAYS, Math.floor((now - last) / DAY));
    try {
      await sendInactivityEmail(u.email, u.name, daysAway);
      await User.updateOne({ _id: u._id }, { $set: { lastReminderAt: new Date() } });
      sent++;
    } catch (err) {
      console.error('Inactivity email failed for', u.email, err.message);
      failed.push(u.email);
    }
  }

  return res.status(200).json({ checked: users.length, sent, failed: failed.length });
}