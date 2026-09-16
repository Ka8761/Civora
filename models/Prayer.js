import mongoose from 'mongoose';

const PrayerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    answered: { type: Boolean, default: false },
    sharedWithCommunity: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Prayer || mongoose.model('Prayer', PrayerSchema);
