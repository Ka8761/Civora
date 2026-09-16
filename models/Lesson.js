import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    image: { type: String, default: '' },
    phone: { type: String, default: '' },
    state: { type: String, default: '' },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    provider: { type: String, default: 'credentials' },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    // Progress tracking
    currentModule: { type: String, default: 'cc' },
    completedModules: { type: [String], default: [] },
    completedLessons: { type: [String], default: [] },
    sermonsCompleted: { type: Number, default: 0 },
    overallProgress: { type: Number, default: 0 },
    certificateIssued: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
