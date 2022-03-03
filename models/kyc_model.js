const mongoose = require('mongoose');
const { DB_STATUS, KYC_GENDER, ID_IMAGE } = require('../utils/consts');
const Schema = mongoose.Schema;

const KycSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
      required: true,
      enum: KYC_GENDER,
      default: 0,
    },
    birthday: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      require: true,
    },
    nowAdress: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: DB_STATUS,
      required: true,
    },
    identifierImage: [
      {
        type: { type: Number, enum: ID_IMAGE },
        src: { type: String },
      },
    ],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { usePushEach: true, timestamps: true }
);

module.exports = mongoose.model('KYC', KycSchema);
