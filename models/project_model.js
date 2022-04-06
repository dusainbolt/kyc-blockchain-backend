const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DB_STATUS } = require('../utils/consts');

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
      default: null,
    },
    encodeABI: {
      type: String,
      trim: true,
      required: true,
    },
    encodeShareKycABI: {
      type: String,
      trim: true,
      default: null,
    },
    apiKey: {
      type: String,
      required: true,
    },
    projectIndex: {
      type: Number,
      default: -1,
    },
    status: {
      type: Number,
      enum: DB_STATUS,
      default: DB_STATUS.INACTIVE,
    },
    userId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { usePushEach: true, timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
