import mongoose from 'mongoose';

const GradeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      default: null,
    },

    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      default: null,
    },

    type: {
      type: String,
      enum: [
        'knowledge-check',
        'assignment',
        'reflection',
        'final-exam',
      ],
      required: true,
    },

    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    passingScore: {
      type: Number,
      default: 70,
    },

    passed: {
      type: Boolean,
      default: false,
    },

    attempts: {
      type: Number,
      default: 1,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

GradeSchema.pre('save', function (next) {
  this.passed = this.score >= this.passingScore;
  next();
});

export default mongoose.models.Grade ||
  mongoose.model('Grade', GradeSchema);