const mongoose = require('mongoose');
const { KYC_STATUS } = require('../utils/consts');
const Schema = mongoose.Schema;

const KycSchema = new Schema(
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
    status: {
      type: Number,
      enum: KYC_STATUS,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { usePushEach: true, timestamps: { updatedAt: true, createdAt: false } }
);

module.exports = mongoose.model('KycHistory', KycSchema);
