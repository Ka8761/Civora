import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['module_unlocked', 'grade_posted', 'certificate', 'reminder', 'system'],
      default: 'system',
    },
    read: { type: Boolean, default: false },
    link: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model('Notification', NotificationSchema);