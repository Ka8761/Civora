import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      default: '',
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    order: {
      type: Number,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ['orientation', 'course', 'final-assessment'],
      default: 'course',
    },

    thumbnail: {
      type: String,
      default: '',
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lessonsCount: {
      type: Number,
      default: 0,
    },

    passingScore: {
      type: Number,
      default: 70,
    },

    requiresPreviousCourse: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Course ||
  mongoose.model('Course', CourseSchema);