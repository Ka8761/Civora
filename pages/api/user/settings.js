
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  await connectDB();

  if (req.method === 'PATCH') {
    const { bankName, bankAccountNumber, bankAccountName, emailNotifications, whatsappNotifications } = req.body;
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { bankName, bankAccountNumber, bankAccountName, emailNotifications, whatsappNotifications },
      { new: true }
    ).select('-password');
    return res.status(200).json({ user });
  }

  return res.status(405).end();
}


