import mongoose from 'mongoose';

const TestimonySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    testimony: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        'answered-prayer',
        'spiritual-growth',
        'healing',
        'provision',
        'breakthrough',
        'other',
      ],
      default: 'other',
    },

    dateOfTestimony: {
      type: Date,
      default: Date.now,
    },

    isPrivate: {
      type: Boolean,
      default: true,
    },

    sharedWithCommunity: {
      type: Boolean,
      default: false,
    },

    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Testimony ||
  mongoose.model('Testimony', TestimonySchema);