import mongoose from 'mongoose';

const grade = () => ({
  score: { type: Number },
  submitted: { type: Boolean, default: false },
  knowledge: { type: String, default: '' },   // 'submitted' | 'skipped'
  reflection: { type: String, default: '' },  // 'submitted' | 'skipped'
});

const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    completedLessons: { type: [String], default: [] },
    completedModules: { type: [String], default: [] },
    currentModule: { type: String, default: 'cc' },
    sermonsCompleted: { type: Number, default: 0 },
    completedSermonIds: { type: [Number], default: [] },
    prayerChargesCompleted: { type: Number, default: 0, min: 0, max: 6 },
    overallProgress: { type: Number, default: 0 },
    grades: {
      cc: grade(), c2: grade(), c3: grade(), c4: grade(), c5: grade(), c6: grade(), final: grade(),  attempts: { type: Number, default: 0 },
    },
    certificateIssued: { type: Boolean, default: false },
    certificateIssuedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);