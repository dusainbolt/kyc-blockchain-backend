const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DB_STATUS } = require('../utils/consts');

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: {
        unique: true,
        collation: { locale: 'en', strength: 2 },
      },
    },
    note: {
      type: String,
      required: false,
    },
    adminId: {
      type: Schema.Types.ObjectId, 
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: DB_STATUS,
      default: DB_STATUS.ACTIVE,
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
  {usePushEach: true},
);
ProjectSchema.index({ name: 1 }, { background: true });

module.exports = mongoose.model('Project', ProjectSchema);
