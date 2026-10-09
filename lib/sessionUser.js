import User from '../models/User';

export async function getSessionUserId(session) {
  if (session?.user?.id) return String(session.user.id);
  if (session?.user?.email) {
    const u = await User.findOne({ email: session.user.email.toLowerCase() }).select('_id').lean();
    if (u) return String(u._id);
  }
  return null;
}