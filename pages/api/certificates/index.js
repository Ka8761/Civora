// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../auth/[...nextauth]';
// import dbConnect from '../../../lib/dbConnect';
// import Progress from '../../../models/Progress';
// import User from '../../../models/User';

// const REQUIRED_MODULES = ['cc', 'c2', 'c3', 'c4', 'c5', 'c6'];
// const REQUIRED_PRAYER_HOURS = 12;

// function buildCertNumber(userId, issuedAt) {
//   const y = new Date(issuedAt).getFullYear();
//   const shortId = userId.toString().slice(-6).toUpperCase();
//   return `COLIG-${y}-${shortId}`;
// }

// export default async function handler(req, res) {
//   const session = await getServerSession(req, res, authOptions);
//   if (!session) return res.status(401).json({ error: 'Not authenticated' });

//   await dbConnect();
//   const userId = session.user.id;

//   if (req.method === 'GET') {
//     try {
//       const [progress, user] = await Promise.all([
//         Progress.findOne({ userId }).lean(),
//         User.findById(userId).lean(),
//       ]);

//       const completedModules = progress?.completedModules || [];
//       const modulesComplete = REQUIRED_MODULES.every((m) => completedModules.includes(m));
//       const finalExamPassed = !!progress?.grades?.final?.submitted;
//       const prayerHoursLogged = user?.prayerHoursLogged || 0;
//       const prayerComplete = prayerHoursLogged >= REQUIRED_PRAYER_HOURS;

//       const eligible = modulesComplete && finalExamPassed && prayerComplete;
//       const issued = !!progress?.certificateIssued;

//       return res.status(200).json({
//         eligible,
//         issued,
//         requirements: {
//           modulesComplete,
//           finalExamPassed,
//           prayerComplete,
//           prayerHoursLogged,
//           prayerHoursRequired: REQUIRED_PRAYER_HOURS,
//         },
//         certificate: issued
//           ? {
//               name: user?.name,
//               certificateNumber: buildCertNumber(userId, progress.certificateIssuedAt),
//               issuedAt: progress.certificateIssuedAt,
//             }
//           : null,
//       });
//     } catch (err) {
//       console.error('GET /api/certificates error:', err);
//       return res.status(500).json({ error: 'Failed to check certificate eligibility' });
//     }
//   }

//   if (req.method === 'POST') {
//     try {
//       const [progress, user] = await Promise.all([
//         Progress.findOne({ userId }),
//         User.findById(userId),
//       ]);

//       if (!progress || !user) return res.status(404).json({ error: 'Profile not found' });

//       const completedModules = progress.completedModules || [];
//       const modulesComplete = REQUIRED_MODULES.every((m) => completedModules.includes(m));
//       const finalExamPassed = !!progress.grades?.final?.submitted;
//       const prayerComplete = (user.prayerHoursLogged || 0) >= REQUIRED_PRAYER_HOURS;

//       if (!modulesComplete || !finalExamPassed || !prayerComplete) {
//         return res.status(400).json({
//           error: 'Requirements not yet met',
//           requirements: { modulesComplete, finalExamPassed, prayerComplete },
//         });
//       }

//       if (!progress.certificateIssued) {
//         progress.certificateIssued = true;
//         progress.certificateIssuedAt = new Date();
//         await progress.save();

//         user.certificateIssued = true;
//         await user.save();
//       }

//       return res.status(200).json({
//         issued: true,
//         certificate: {
//           name: user.name,
//           certificateNumber: buildCertNumber(userId, progress.certificateIssuedAt),
//           issuedAt: progress.certificateIssuedAt,
//         },
//       });
//     } catch (err) {
//       console.error('POST /api/certificates error:', err);
//       return res.status(500).json({ error: 'Failed to issue certificate' });
//     }
//   }

//   res.setHeader('Allow', ['GET', 'POST']);
//   return res.status(405).json({ error: `Method ${req.method} not allowed` });
// }
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/dbConnect';
import Notification from '../../../models/Notification';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  await dbConnect();
  const userId = session.user.id;

  if (req.method === 'GET') {
    try {
      const notifications = await Notification.find({ userId })
        .sort({ createdAt: -1 })
        .limit(50)
        .lean();
      const unreadCount = notifications.filter((n) => !n.read).length;
      return res.status(200).json({ notifications, unreadCount });
    } catch (err) {
      console.error('GET /api/notification error:', err);
      return res.status(500).json({ error: 'Failed to load notifications' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, message, type, link } = req.body || {};
      if (!title || !message) {
        return res.status(400).json({ error: 'title and message are required' });
      }
      const notification = await Notification.create({
        userId,
        title,
        message,
        type: type || 'system',
        link: link || '',
      });
      return res.status(201).json({ notification });
    } catch (err) {
      console.error('POST /api/notification error:', err);
      return res.status(500).json({ error: 'Failed to create notification' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { id, markAllRead } = req.body || {};

      if (markAllRead) {
        await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
        return res.status(200).json({ success: true });
      }

      if (!id) return res.status(400).json({ error: 'id is required' });

      const notification = await Notification.findOneAndUpdate(
        { _id: id, userId },
        { $set: { read: true } },
        { new: true }
      );
      if (!notification) return res.status(404).json({ error: 'Notification not found' });

      return res.status(200).json({ notification });
    } catch (err) {
      console.error('PATCH /api/notification error:', err);
      return res.status(500).json({ error: 'Failed to update notification' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}