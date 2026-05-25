
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  await connectDB();

  if (req.method === 'GET') {
    const user = await User.findById(session.user.id).select('-password -resetPasswordToken -resetPasswordExpires');
    return res.status(200).json({ user });
  }

  if (req.method === 'PATCH') {
    const { name, phone, state } = req.body;
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { name, phone, state },
      { new: true }
    ).select('-password');
    return res.status(200).json({ user });
  }

  return res.status(405).end();
}