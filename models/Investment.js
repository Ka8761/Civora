import mongoose from 'mongoose';

const InvestmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    crop: { type: String, enum: ['Maize', 'Groundnut', 'Soybean'], required: true },
    tier: { type: String, enum: ['Seedling', 'Harvest', 'Landowner'], required: true },
    amount: { type: Number, required: true }, // in Naira
    currency: { type: String, default: 'NGN' },
    status: {
      type: String,
      enum: ['pending', 'active', 'harvested', 'cancelled'],
      default: 'pending',
    },
    startDate: { type: Date, default: Date.now },
    expectedEndDate: { type: Date },
    actualEndDate: { type: Date },
    roiPercent: { type: Number, default: 0 }, // Set by admin
    projectedReturn: { type: Number, default: 0 },
    actualReturn: { type: Number, default: 0 },
    stripeSessionId: { type: String },
    stripePaymentIntentId: { type: String },
    farmLocation: { type: String, default: 'Zaria Road, Kafanchan, Kaduna State' },
    farmId: { type: String, default: '' },
    monthlyUpdates: [
      {
        month: String,
        message: String,
        imageUrl: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

// Auto-calculate projected return
InvestmentSchema.pre('save', function (next) {
  if (this.roiPercent && this.amount) {
    this.projectedReturn = this.amount * (1 + this.roiPercent / 100);
  }
  next();
});

export default mongoose.models.Investment || mongoose.model('Investment', InvestmentSchema);
