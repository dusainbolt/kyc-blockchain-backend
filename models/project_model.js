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
    apiKey: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: DB_STATUS,
      default: DB_STATUS.INACTIVE,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { usePushEach: true, timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
