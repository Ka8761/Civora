import connectDB from '../../../lib/mongodb';
import Testimony from '../../../models/Testimony';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    await connectDB();
    const testimonies = await Testimony.aggregate([
            { $match: { approved: true, showOnHome: true } },
      { $sample: { size: 50 } },
      { $project: { title: 1, text: 1, authorName: 1, createdAt: 1 } },
    ]);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ testimonies });
  } catch (err) {
    console.error('GET /api/testimonies/public error:', err);
    return res.status(500).json({ testimonies: [] });
  }
}