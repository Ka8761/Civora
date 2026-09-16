import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    completedLessons: { type: [String], default: [] },
    completedModules: { type: [String], default: [] },
    sermonsCompleted: { type: Number, default: 0 },
    completedSermonIds: { type: [Number], default: [] },
    currentModule: { type: String, default: 'cc' },
    grades: {
      cc: { score: Number, submitted: Boolean },
      c2: { score: Number, submitted: Boolean },
      c3: { score: Number, submitted: Boolean },
      c4: { score: Number, submitted: Boolean },
      c5: { score: Number, submitted: Boolean },
      c6: { score: Number, submitted: Boolean },
    },
    certificateIssued: { type: Boolean, default: false },
    certificateIssuedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
