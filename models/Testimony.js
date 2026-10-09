import mongoose from 'mongoose';

const TestimonySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    authorName: { type: String, default: '' },
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true },
        showOnHome: { type: Boolean, default: false },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Testimony || mongoose.model('Testimony', TestimonySchema);