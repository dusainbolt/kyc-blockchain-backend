const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DB_STATUS } = require('../utils/consts');

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    apiKey: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: DB_STATUS,
      default: DB_STATUS.ACTIVE,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'projects' }
);

module.exports = mongoose.model('Project', ProjectSchema);
