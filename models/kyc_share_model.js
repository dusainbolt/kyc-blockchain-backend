const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KycShareSchema = new Schema(
  {
    kycId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'KYC',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    transactionHash: {
      type: String,
    },
  },
  { usePushEach: true, timestamps: { updatedAt: true, createdAt: false } }
);

module.exports = mongoose.model('KycShare', KycShareSchema);
