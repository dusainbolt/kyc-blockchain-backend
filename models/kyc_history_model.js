const mongoose = require('mongoose');
// const { KYC_STATUS, KYC_GENDER, ID_IMAGE } = require('../utils/consts');
const Schema = mongoose.Schema;

const KycSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    kycId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'KYC',
    },
    adminId: {
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
  { usePushEach: true, timestamps: { updatedAt: true } }
);

module.exports = mongoose.model('KycHistory', KycSchema);
