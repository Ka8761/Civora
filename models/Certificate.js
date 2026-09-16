import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },

    certificateNumber: {
      type: String,
      required: true,
      unique: true,
    },

    studentName: {
      type: String,
      required: true,
    },

    programName: {
      type: String,
      default: 'Leadership Foundation School',
    },

    finalScore: {
      type: Number,
      default: 0,
    },

    issueDate: {
      type: Date,
      default: Date.now,
    },

    certificateUrl: {
      type: String,
      default: '',
    },

    pdfUrl: {
      type: String,
      default: '',
    },

    verificationCode: {
      type: String,
      unique: true,
    },

    status: {
      type: String,
      enum: ['issued', 'revoked'],
      default: 'issued',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Certificate ||
  mongoose.model('Certificate', CertificateSchema);