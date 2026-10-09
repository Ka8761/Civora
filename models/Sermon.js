import mongoose from 'mongoose';

const SermonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
        number: { type: Number, index: true },   // overall position 1..61

    speaker: {
      type: String,
      default: '',
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    category: {
      type: String,
      enum: [
        'faith',
        'the-word',
        'prayer',
        'holy-spirit',
        'leadership',
        'ministry',
      ],
      required: true,
    },

    section: {
      type: Number,
      min: 1,
      max: 6,
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },

    audioUrl: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      default: 0,
    },

    thumbnail: {
      type: String,
      default: '',
    },

    scripture: {
      type: String,
      default: '',
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    requiresPreviousSermon: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

SermonSchema.index({
  category: 1,
  order: 1,
});

export default mongoose.models.Sermon ||
  mongoose.model('Sermon', SermonSchema);