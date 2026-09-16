import mongoose from 'mongoose';

const SermonProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    sermon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sermon',
      required: true,
      index: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    listenedSeconds: {
      type: Number,
      default: 0,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    lastPlayedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

SermonProgressSchema.index(
  { user: 1, sermon: 1 },
  { unique: true }
);

export default mongoose.models.SermonProgress ||
  mongoose.model('SermonProgress', SermonProgressSchema);